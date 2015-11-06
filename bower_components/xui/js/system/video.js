/* globals xui */

(function()
{
	"use strict";
	
	/**
	 * 
	 * @module xui.system
	 * @class Video
	 */
	function Video(props) 
	{
	}
    
    /**
     * Converts Video object to XML
     * 
     * @method toXML
     * @returns {String} XMl format
     */
    Video.prototype.toXML = function()
    {
        var videosource = {};
        videosource.tag = "dev";
        videosource.name = this.name;
        videosource.disp = this.disp;
        
        return xui.utils.XML.fromJSON(videosource);
    };
    
    /**
     * Preferred method of generating a Video object from its properties.
     * 
     * @static
     * @method parse
     * @returns {Video} Video object
     */
    Video.parse = function(args)
    {
        var video = new Video();

        if (args !== undefined)
        {
            /**
             * @property    name
             * @type        String
             */
            video.name = args.name;
            
            /**
             * @property    disp
             * @type        String
             */
            video.disp = args.disp;
        }

        return video;
    }

	xui.system.Video = Video;
})();