/* globals xui, internal */

(function()
{
    'use strict';
    
    var App     = xui.core.App,        
        XML     = xui.utils.XML,
        Audio   = xui.system.Audio,
        iApp    = internal.core.App,
        iExec   = internal.execCallback;

    /**
     * List Audio input and output devices
     * currently used by the application
     * 
     * @static
     * @method  getAudioDevices
     * @param {Function} callback (Audio[] devices)
     */
    App.getAudioDevices = function(callback)
    {
        (function(_callback)
        {
            iApp.getList('microphonedev2', function(devicesJSON)
            {
                var devices = [];

                if (devicesJSON)
                {
                    devicesJSON.forEach(function(device)
                    {
                        devices.push(Audio.parse(device));
                    });
                }
                
                iExec.call(this, _callback, devices);
            });
        })(callback);
    };
    
    /**
     * Sets Audio devices properties 
     * currently used by the application 
     * WITHOUT any restriction
     * 
     * @static
     * @method setAudioDevices
     * @param {Array} audioDevices (Audio[] devices)
     */
    App.setAudioDevices = function(audioDevices)
    {
        var dev = '';

        if (Array.isArray(audioDevices))
        {
            for (var i = 0; i < audioDevices.length; i++)
            {
                dev += audioDevices[i].toXML();
            }
            
            iApp.set('microphonedev2', '<devices>' + dev + '</devices>');
        }
    };
    
    /**
     * Refers to the primary microphone’s gain filter configuration.
     * 
     * @static
     * @method getAudioGain
     * @param {Function} callback
     */
    App.getAudioGain = function(callback)
    {
        (function(_callback)
        {
            iApp.get('microphonegain', function(config)
            {
                var configJSON = XML.toJSON(config);

                iExec.call(this, _callback, configJSON[0]);
            });
        })(callback);
    };
    
    /**
     * Sets the primary microphone’s gain filter configuration.
     * 
     * @static
     * @method setAudioGain
     * @param {Object} audioGainConfig
     */
    App.setAudioGain = function(config)
    {
        config.tag = 'configuration';

        iApp.set('microphonegain',  XML.fromJSON(config));
    };
})();