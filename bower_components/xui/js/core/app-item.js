/* globals xui, internal */

(function()
{
    'use strict';

    var App     = xui.core.App,
        Item    = xui.core.Item,
        Game    = xui.system.Game,
        XML     = xui.utils.XML,
        iApp    = internal.core.App;

    /**
     * Adds a camera source to the current scene.
     * 
     * @static
     * @method addCamera
     * @param {String} deviceId
     */
    App.addCamera = function(device)
    {
        if(typeof device !== 'undefined')
        {
            var item    = new Item();
            item.value  = XML.encode(device.disp.toUpperCase());
            item.name   = device.name;
            item.type   = Item.TYPE_LIVE;

            iApp.callFunc('additem', item.toXML());
        }
    };
    
    /**
     * Adds a game source to the current scene.
     * 
     * @static
     * @method  addGameSource
     * @param {Object} gameSource
     */
    App.addGameSource = function(gameSource)
    {
        if(typeof gameSource !== 'undefined')
        {
            var game        = Game.parse(gameSource),
                item        = new Item();

            item.name       = game.wndname + ' (' + game.gapitype + ')';
            item.value      = XML.encode(game.toXML());
            item.type       = Item.TYPE_GAMESOURCE;
            item.visible    = true;
            item.volume     = 100;

            iApp.callFunc('additem', item.toXML());
        }
    };
    
    /**
     * Adds a File
     * 
     * @static
     * @method  addFile
     * @param {String} file
     */
    App.addFile = function(file)
    {
        if(typeof file !== 'undefined')
        {
            var item    = new Item();
            item.value  = file;
            item.name   = file;
            item.type   = Item.TYPE_FILE;

            iApp.callFunc('additem', item.toXML());
        }
    };
    
    /**
     * Adds screen
     * 
     * @static
     * @method  addScreen
     */
    App.addScreen = function()
    {
        iApp.callFunc('addscreen', '');
    };
    
    /**
     * Adds URL
     * 
     * @static
     * @method  addUrl
     * @param {String} url
     */
    App.addUrl = function(url)
    {
        if(typeof url !== 'undefined')
        {
            var item    = new Item();
            item.value  = url;
            item.name   = url;
            item.type   = Item.TYPE_HTML;

            iApp.callFunc('additem', item.toXML());
        }
    };
    
    /**
     * Removes the selected source(s) from the scene.
     * 
     * @static
     * @method removeSource
     * @param {Object} Item
     */
    App.removeSource = function(item)
    {
        if(typeof item !== 'undefined')
        {
            iApp.callFunc('removesrc', item.id);    
        }        
    };
})();