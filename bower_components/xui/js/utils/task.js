/* globals xui */

(function()
{
	'use strict';

	/**
	 * @deprecated
	 */
	function Task()
	{
		this.callbacks = [].slice.call(arguments);

		this.next();
	}

	Task.prototype.next = function()
	{
		var callback = this.callbacks.shift();

		if (typeof callback === 'function')
		{
			var args = [].slice.call(arguments);
			
			args.unshift(this.next.bind(this));

			callback.apply(this, args);
		}
	};

	xui.utils.Task = Task;
})();