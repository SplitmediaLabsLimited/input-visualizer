/* globals window, EventEmitter, internal */

(function()
{
	'use strict';

	/** This class is intended to be used by source plugin developers 
	 *   who intend to create their own plugins. This class exposes 
	 *   methods for setting how the configuration HTML should be
	 *   rendered, as well as listen to results from async callbacks.
	 *   It should be compatible with the rest of the plugin framework.
	 */

	var instance;

	var ConfigWindow = function()
	{
		window.addEventListener("message", function(event)
		{
			try
			{
				var data = JSON.parse(event.data);
			}
			catch (e)
			{
				// syntax error probably happened, exit gracefully
				return;
			}

			switch(data.event)
			{
				// currently, restrict messages to selected set
				case "set-language":
				case "set-selected-tab":
					this.emit(data.event, data.value);
					break;
				case "async-callback":
					this.emit(data.event, {
							asyncId : data.value.asyncId,
							result  : data.value.result
						});
					break;
				case "config-load":
					this.emit(data.event);
					break;
			}
		}.bind(this));

		instance = this;
	};

	ConfigWindow.prototype = Object.create(EventEmitter.prototype);

	ConfigWindow.getInstance = function()
	{
		if (instance === undefined)
		{
			instance = new ConfigWindow();
		}
		return instance;
	};

	ConfigWindow.RenderMode =
	{
		HIDDEN : "hidden",
		EMBEDDED : "embedded",
		FULLSCREEN : "full"
	};

	// helper function to config parent
	ConfigWindow.prototype._notify = function(obj)
	{
		window.parent.postMessage(JSON.stringify(obj), "*");
	};

	/**
	 * Specifies the desired rendering mode for
	 * the configuration HTML.
	 * 
	 * @method setRenderMode
	 * @param {ConfigWindow.RenderMode} renderMode
	 */
	ConfigWindow.prototype.setRenderMode = function(renderMode)
	{
		this._notify({
			event: "set-mode",
			value: renderMode
		});
	};

	/**
	 * Specifies the desired order of tabs,
	 * if plugin is using embedded mode.
	 * 
	 * @method setTaborder
	 * @param {Array} tabArray (names of tabs)
	 */
	ConfigWindow.prototype.setTabOrder = function(tabArray)
	{
		this._notify({
			event: "set-tab-order",
			value: JSON.stringify(tabArray)
		});
	};

	/**
	 * Allows the configuration HTML to declare
	 * which new tabs should be created for it.
	 * Should only be used in embedded mode.
	 * 
	 * @method declareCustomTabs
	 * @param {Array} tabArray (names of tabs)
	 */
	ConfigWindow.prototype.declareCustomTabs = function(tabArray)
	{
		this._notify({
			event: "set-custom-tabs",
			value: JSON.stringify(tabArray)
		});
	};

	/** Allows the configuration HTML to resize itself.
	 *
	 * @method resizeConfig
	 * @param {Number} width
	 * @param {Number} height
	 */
	ConfigWindow.prototype.resizeConfig = function(width, height)
	{
		internal.exec("SetDialogSize", width, height);
		this._notify({
			event: "resize",
			value: JSON.stringify({
				width: width,
				height: height
			})
		});
	};

	/** Allows the configuration HTML to close itself.
	 *
	 * @method closeConfig
	 */
	ConfigWindow.prototype.closeConfig = function()
	{
		internal.exec("Close");
	};

	if (window.xui === undefined)
	{
		window.xui = {};
	}

	if (window.xui.config === undefined)
	{
		window.xui.config = {};
	}

	window.xui.config.ConfigWindow = ConfigWindow;

	window.addEventListener("load", function()
	{
		window.xui.config.ConfigWindow.getInstance()._notify({
			event: "load"
		});
	});

})();
