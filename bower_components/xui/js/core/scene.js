/* globals xui, internal */

(function()
{
    'use strict';
    
    var Item  = xui.core.Item,
        iApp  = internal.core.App,
        iExec = internal.execCallback;

    /**
     * This class provides scene related methods
     * 
     * @module xui.core
     * @class Scene
     * @constructor
     * @param {Object} props
     */
    function Scene(props)
    {
        props = props || {};

        this.id     = props.id || 0;
        this.name   = props.name || 'None';
        this.viewID = props.viewID || 0;
        this.items  = Array.isArray(props.children) ? props.children : [];
    }

    /**
     * Get contents of a scene
     *
     * @method  getItems
     * @param   {Function} callback   (Item[] items)
     * @param   {String}   [stats]
     */
    Scene.prototype.getItems = function(callback)
    {
        (function(_this, _callback)
        {
            iApp.getList('presetconfig:' + _this.id, function(itemsJSON)
            {
                _this.items = [];

                if (Array.isArray(itemsJSON))
                {
                    for (var i = 0; i < itemsJSON.length; i++)
                    {
                        var item     = new Item(itemsJSON[i]);
                        item.sceneID = _this.id;
                        item.viewID  = _this.viewID;

                        _this.items.push(item);
                    }    
                }                

	            iExec.call(_this, _callback, _this.items);
            });
        })(this, callback);
    };
    
    /**
     * Check if specified scene is empty
     * 
     * @method  isEmpty
     * @param   {Function}   callback (Boolean isEmpty)
     */
    Scene.prototype.isEmpty = function(callback)
    {
        (function(_this, _callback)
        {
            iApp.get('presetisempty:' + _this.id, function(value)
            {
                var isEmpty = (value === '1');

                if (isEmpty)
                {
                    _this.items = [];
                }

	            iExec.call(_this, _callback, isEmpty);
            });
        })(this, callback);
    };
    
    /**
     * Get preset name of the specified scene ID
     * 
     * @method  getName
     * @param  {Function}   callback (String scenename)
     */
    Scene.prototype.getName = function(callback)
    {
        (function(_this, _callback)
    	{
    		iApp.get('presetname:' + _this.id, function(name)
	        {
                _this.name = name;

	            iExec.call(_this, _callback, _this.name);
	        });
    	})(this, callback);
    };

    xui.core.Scene = Scene;
})();