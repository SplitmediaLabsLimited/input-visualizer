/* globals xui */

(function()
{
	"use strict";
	
	/**
	 * 
	 * @module xui.system
	 * @class Audio
	 */
	function Audio(props) 
	{
	}
	
    Audio.STATE_ACTIVE  = "Active";
    
    Audio.DATAFLOW_RENDER  = "Render";
    Audio.DATAFLOW_CAPTURE = "Capture";
    
    /**
     * Converts device(s) properties to XML
     * 
     * @method toXML
     * @returns {String} XML format of Audio device
     */
    Audio.prototype.toXML = function()
    {
        var dev     = {};
        dev.tag     = "dev";
        dev.id      = this.id;
        dev.name    = this.name;
        dev.adapter = this.adapter;
        dev.adapterdev = this.adapterdev;
        dev.dataflow    = this.dataflow;
        dev.guid    = this.guid;
        dev.state    = this.state;
        dev.waveid    = this.waveid;
        dev.mix     = this.mix;
        dev.level   = this.level;
        dev.enable  = this.enable;
        dev.hwlevel = this.hwlevel;
        dev.hwenable = this.hwenable;
        dev.delay   = this.delay;
        dev.mix     = this.mix;
        
        return xui.utils.XML.fromJSON(dev);
    };

    /**
     * Preferred method of generating an Audio object from its properties.
     * 
     * @static
     * @method parse
     * @returns {Audio} Audio object
     */
    Audio.parse = function(args)
    {
        var audio = new Audio();

        if (args !== undefined)
        {
            /**
             * @property    id
             * @type        String
             */
            audio.id = args.id;
            
            /**
             * @property    name
             * @type        String
             */
            audio.name = args.name;
            
            /**
             * @property    adapter
             * @type        String
             */
            audio.adapter = args.adapter;
            
            /**
             * @property    adapterdev
             * @type        String
             */
            audio.adapterdev = args.adapterdev;
            
            /**
             * @property    guid
             * @type        String
             */
            audio.guid = args.dsoundguid;
            
            /**
             * @property    state
             * @type        String
             */
            audio.state = args.state;
            
            /**
             * @property    dataflow
             * @type        String
             */
            audio.dataflow = args.dataflow;
            
            /**
             * @property    value
             * @type        String
             */
            audio.value = args.value;
            
            /**
             * @property    waveid
             * @type        String
             */
            audio.waveid = args.waveid;
            
            /**
             * @property    level
             * @type        String
             */
            audio.level = args.level;
            
            /**
             * @property    enable
             * @type        String
             */
            audio.enable = args.enable;
            
            /**
             * @property    hwlevel
             * @type        String
             */
            audio.hwlevel = args.hwlevel;
            
            /**
             * @property    hwenable
             * @type        String
             */
            audio.hwenable = args.hwenable;
            
            /**
             * @property    delay
             * @type        String
             */
            audio.delay = args.delay;
            
            /**
             * @property    mix
             * @type        String
             */
            audio.mix = args.mix;
        }

        return audio;
    }
    
    xui.system.Audio = Audio;
    
})();