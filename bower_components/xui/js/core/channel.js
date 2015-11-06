/* globals xui, internal */

(function()
{
    'use strict';
    
    var iApp    = internal.core.App,
        iExec   = internal.execCallback;

    /**
     * Channel
     *
     * @module xui.core
     * @class Channel
     */
    function Channel(props)
    {
        props = (props !== undefined) ? props : {};            
        
        this.name       = props.name;
        this.stat       = props.stat;
        this.channel    = props.channel;    
    }
    
     /**
     * Refers to the amount of frames dropped and not dropped
     * 
     * @static
     * @method getStreamDrops
     * @param {Function} callback (dropped, rendered)
     */
    Channel.prototype.getStreamDrops = function(callback)
    {
        iApp.get('streamdrops:' + this.name, function(drops)
        {
            drops = drops.split(',');

            var dropped     = drops[0] || 0,
                rendered    = drops[1] || 0;
            
            iExec.call(this, callback, dropped, rendered);
        });
    };
    
     /**
     * Refers to the current duration of <stream> in microseconds
     * 
     * @static
     * @method getStreamDuration
     * @param {Function} callback
     */
    Channel.prototype.getStreamTime = function(callback)
    {
        iApp.get('streamtime:' + this.name, function(duration)
        {   
            duration = parseInt(duration) / 10; // convert to micro

            iExec.call(this, callback, duration);
        });    
    };
    
    xui.core.Channel = Channel;
})();