/* globals xui, internal */

(function()
{
    'use strict';
	
    var Channel     = xui.core.Channel,
        System      = xui.system.System,
        Window      = xui.system.Window,
        Rectangle   = xui.utils.Rectangle,
        XML         = xui.utils.XML,
        iApp        = internal.core.App,
        iExec       = internal.execCallback;

	/**
	 * This class provides methods to communicate directly with the application
	 * 
	 * @module xui.core
	 * @class App
	 */
    function App(){}
    
    /**
     * Call method of DLL present in Scriptdlls folder of 
     * XSplit Broadcaster’s application directory or DLL
     * specified in ScriptDLL node of XML Settings File
     * 
     * @method callDll
     * @return {Mixed} return value of called DLL method
     */
    App.callDll = function()
    {
        return iApp.callDll.apply(this, arguments);
    };
    
    /**
     * Refers to application’s frame time (duration of each frame in 100ns unit)
     * 
     * @static
     * @method getFrametime
     * @param {Function} callback
     */
    App.getFrametime = function(callback)
    {
        (function(_callback)
        {
            iApp.get('frametime', function(frametime)
            {
                iExec.call(App, _callback, frametime);
            });
        })(callback);
    };
    

    /**
     * Refers to application’s default output resolution
     * 
     * @static
     * @method getResolution
     * @param {Function} callback
     */
    App.getResolution = function(callback)
    {
        (function(_callback)
        {
            iApp.get('resolution', function(resolution)
            {
                iExec.call(App, _callback, Rectangle.parse(resolution));
            });
        })(callback);
    };
    
    /**
     * Refers to application’s viewport display resolution.
     * 
     * @static
     * @method getViewport
     * @param {Function} callback
     */
    App.getViewport = function(callback)
    {
        (function(_callback)
        {
            iApp.get('viewport', function(resolution)
            {
                iExec.call(App, _callback, Rectangle.parse(resolution));
            });
        })(callback);
    };
    
    /**
     * Refers to XSplit Broadcaster DLL file version number
     * 
     * @static
     * @method getVersion
     * @param {Function} callback 
     */
    App.getVersion = function(callback)
    {
        (function(_callback)
        {
            iApp.get('version', function(version)
            {
                iExec.call(App, _callback, version);
            });
        })(callback);  
    };
    
    /**
     * Get Active streams
     * 
     * @static
     * @method getActiveStreamChannels
     * @param {Function} callback
     */
    App.getActiveStreamChannels = function(callback)
    {
        (function(_callback)
        {
            iApp.get('recstat', function(activeStream)
            {
                var recstat         = XML.toJSON(activeStream),
                    channelsJSON    = recstat[0].children || []; // stream channels
                
                var channels = [];
            
                for (var i = 0; i < channelsJSON.length; i++)
                {
                    var channelJSON = channelsJSON[i],
                        channel     = new Channel();

                    channel.stat    = channelJSON.children[0];
                    channel.channel = channelJSON.children[1];
                    channel.name    = channelJSON.name;
                    
                    channels.push(channel);
                }
                
                iExec.call(App, _callback, channels);         
            });
        })(callback);
    };
    
    
    /**
     * Refers to the total number of frames rendered.
     * 
     * @static
     * @method getFramesRendered
     * @param {Function} callback
     */
    App.getFramesRendered = function(callback)
    {
        (function(_callback)
        {
            iApp.get('framesrendered', function(frames)
            {
                iExec.call(App, _callback, frames);
            });
        })(callback);
    };
    
    
    App.windowSelector = function(callback)
    {
        (function(_callback)
        {
            System.selectScreen(function(screen)
            {
                if(screen)
                {
                    var config = XML.toJSON(screen)[0];
                    _callback(new Window({ hwnd : config.hwnd }));
                }
                
            });
        })(callback);  
    };
    
    xui.core.App = App;
})();