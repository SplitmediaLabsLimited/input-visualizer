/* globals xui */

(function()
{
	"use strict";
	
    // TODO: Game class documentation
	/**
	 * 
	 * @module xui.system
	 * @class Game
	 */
	function Game(props) 
	{
	}
    
    /**
     * Converts Game object to XML
     * 
     * @method toXML
     * @returns {String} XMl format
     */
    Game.prototype.toXML = function()
    {
        var gamesource = {};
        gamesource.tag = "src";
        gamesource.pid = this.pid;
        gamesource.handle = this.handle;
        gamesource.hwnd = this.hwnd;
        gamesource.gapitype = this.gapitype;
        gamesource.width = this.width;
        gamesource.height = this.height;
        gamesource.flags = this.flags;
        gamesource.wndname = this.wndname;
        gamesource.lastframets = this.lastframets;
        
        return xui.utils.XML.fromJSON(gamesource);
    };

    /**
     * Preferred method of generating a Game object from its properties.
     * 
     * @static
     * @method parse
     * @returns {Game} Game object
     */
    Game.parse = function(args)
    {
        var game = new Game();

        if (args === undefined)
        {
            return game;
        }
        
        var props = args;

        /**
         * @property    pid
         * @type        Number
         */
        game.pid = parseInt(props.pid || 0);
        
        /**
         * @property    handle
         * @type        Number
         */
        game.handle = parseInt(props.handle || 0);
        
        /**
         * @property    hwnd
         * @type        Number
         */
        game.hwnd = parseInt(props.hwnd || 0);
        
        /**
         * @property    gapitype
         * @type        String
         */
        game.gapitype = props.gapitype;
        
        /**
         * @property    width
         * @type        Number
         */
        game.width = parseInt(props.width || 0);
        
        /**
         * @property    height
         * @type        Number
         */
        game.height = parseInt(props.height || 0);
        
        /**
         * @property    flags
         * @type        Number
         */
        game.flags = parseInt(props.flags || 0);
        
        /**
         * @property    wndname
         * @type        String
         */
        game.wndname = props.wndname || '';
        
        /**
         * @property    lastframets
         * @type        Number
         */
        game.lastframets = parseInt(props.lastframets || 0);

        return game;
    }
    
	xui.system.Game = Game;
})();