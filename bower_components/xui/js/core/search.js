/* globals xui, internal */

(function()
{
    'use strict';

    var View    = xui.core.View,
        Item    = xui.core.Item,
        iExec   = internal.execCallback;

    /**
     * Search
     *
     * @module xui.core
     * @class Search
     */
    function Search() {}

    /**
     * Get Scenes by Name
     * @static
     * @method getScenesByName
     * @param {String}   name     scene name (can be RegEx)
     * @param {Function} callback
     */
    Search.getScenesByName = function(name, callback)
    {
        (function(_this, _name, _callback)
        {
            View.MAIN.getScenes(function(scenes)
            {
                var search          = new RegExp(name, 'gi'),
                    matchedScenes   = [];
                
                for (var i = 0; i < scenes.length; i++)
                {
                    if (search.test(scenes[i].name))
                    {
                        matchedScenes.push(scenes[i]);
                    }
                }
                
                iExec.call(_this, _callback, matchedScenes);
            });
        })(this, name, callback);
    };
    
    /**
     * Get item by ID
     * @static
     * @method getItemById
     * @param {String}   id       Item ID
     * @param {Function} callback
     */
    Search.getItemById = function(id, callback)
    {
        (function(_id, _callback)
        {
            View.MAIN.getScenes(function(scenes)
            {
                for (var i = 0; i < scenes.length; i++)
                {
                    var items = scenes[i].items;
                    
                    if(Array.isArray(items))
                    {
                        for (var j = 0; j < items.length; j++)
                        {
                            if(items[j].id === _id)
                            {
                                iExec.call(this, _callback, items[j]);
                            }
                        }
                    }
                }
            });
        })(id, callback);
    };
    
    /**
     * Get ALL items in ALL scenes by name or item property
     * @static
     * @method getItems
     * @param {String}   keyword  name or item property (can be RegEx)
     * @param {Function} callback
     */
    Search.getItems = function(keyword, callback)
    {
        (function(_keyword, _callback)
        {
            var matches = [];
            View.MAIN.getScenes(function(scenes)
            {
                for (var i = 0; i < scenes.length; i++)
                {
                    var items = scenes[i].items;
                    
                    if(Array.isArray(items))
                    {
                        for (var j = 0; j < items.length; j++)
                        {
                            var item = new Item(items[j]);

                            // By Item name or value
                            if(item.name.match(_keyword) !== null ||
                               item.value.match(_keyword) !== null)
                            {
                                matches.push(item);    
                                continue;
                            }
                        }
                    }
                }
                
                iExec.call(this, _callback, matches);
            });
            
        })(keyword, callback);  
    };

    xui.core.Search = Search;

})();