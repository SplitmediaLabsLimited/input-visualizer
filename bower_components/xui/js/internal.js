/* globals console, window, document, CustomEvent */

(function()
{
    "use strict";
    
    /*
	 * @module internal
	 */
    var internal    = {};
    
    /*
     * Executes an external function
     * 
     * @method  exec
     * @return  {Object} mixed
     */
    internal.exec = function()
    {
        var ret = false;
        
        if (arguments.length === 0)
        {
            return ret;
        }
        
        var args = [].slice.apply(arguments),
        funcName = args.shift();
        
        // extract callback if present
        var callback = null;
        
        if (args.length > 0)
        {    
            callback = args[args.length - 1];
            
            if (typeof callback === "function" || 
                callback === undefined)
            {
                args.pop();
            }
            else
            {
                callback = null;
            }
        }
        
        // BEGIN DEBUG
        console.log("external.exec(\"" + funcName + "\") " + 
        JSON.stringify(args));
        // END DEBUG
        
        if (window.external && window.external[funcName] &&
            typeof window.external[funcName] === "function")
        {
            ret = window.external[funcName].apply(this, args);
        }
        
        // register callback if present
        if (callback !== null)
        {
            _callbacks[ret] = callback;
        }
        
        return ret;
    };
    
    internal.execCallback = function(callback)
    {
        if (typeof callback === "function")
        {
            var args = [].slice.call(arguments);
            args.shift();
            
            return callback.apply(this, args);
        }
        
        return false;
    };
    
    /*
     * Triggered when an async method is called, 
     * asyncID is returned value in async method call 
     * and result is real return value for method call.
     * 
     * @param {Number} asyncID
     * @param {Mixed} result
     */
    var _callbacks  = {};
    
    window.OnAsyncCallback = function(asyncID, result)
    {
        var callback = _callbacks[asyncID];
        
        if (typeof callback === "function")
        {
            callback.call(this, decodeURIComponent(result));
        }
    };
    
    /*
     * Triggered when scene changes for any view
     * 
     * @param {Number} view
     * @param {Number} scene
     */
    window.OnSceneLoad = function(view, scene)
    {
        var event = new CustomEvent(
            "scene-load",
            {
                detail:
                {
                    view: view,
                    scene: scene
                }
            }
        );
        
        document.dispatchEvent(event);
    };


    /*
     * Triggered when configuration window sets Browser Configuration.
     * Used only by source plugins.
     * 
     * @param {String} config
     */
    window.SetConfiguration = function(config)
    {
        var event = new CustomEvent(
            "set-configuration",
            {
                config  : configString
            }
        );

        document.dispatchEvent(event);
    };

    /*
     * Triggered when configuration window sets background color.
     * Used only by source plugins.
     * 
     * @param {String} color
     */
    window.SetBackGroundColor = function(color)
    {
        var event = new CustomEvent(
            "set-background-color",
            {
                color : color
            }
        );
    };

    /*
     * Triggered when configuration window sets volume.
     * Used only by source plugins.
     * 
     * @param {int} volume
     */
    window.SetVolume = function(volume)
    {
        var event = new CustomEvent(
            "set-volume",
            {
                volume  : volume
            }
        );
    };

    /*
     * Triggered when modal dialog calls SetDialogResult
     * 
     * @param {String} result
     */
    window.OnDialogResult = function(result)
    {
        var event = new CustomEvent(
            "dialog-result",
            {
                detail: { result: result }
            }
        );
        
        document.dispatchEvent(event);
    };

    /*
     * Triggered when eyedropper function is being used and cursor is moved.
     *
     * @param {int} x
     * @param {int} y
     */
    window.OnMouseMove = function(x, y)
    {
        var event = new CustomEvent(
            "mouse-move",
            {
                detail: { x : x, y : y }
            }
        );
        
        document.dispatchEvent(event);
    };

    /*
     * Triggered when user selects a pixel while using eyedropper mode.
     *
     * @param {int} x
     * @param {int} y
     */
    window.OnEyedropApply = function(x, y)
    {
        var event = new CustomEvent(
            "eyedrop-apply",
            {
                detail: { x : x, y : y }
            }
        );
        
        document.dispatchEvent(event);
    };

    /*
     * Triggered when user exits eyedropper mode without selecting a pixel.
     *
     */
    window.OnEyedropCancel = function()
    {
        var event = new CustomEvent(
            "eyedrop-cancel"
        );
        
        document.dispatchEvent(event);
    };
   
    /*
     * Triggered when an external dialog begins to load.
     *
     */
    window.OnDialogLoadStart = function(url)
    {
        var event = new CustomEvent(
            "dialog-load-start",
            {
                url : url
            }
        );
        
        document.dispatchEvent(event);
    };

    /*
     * Triggered when an external dialog stops loading.
     *
     */
    window.OnDialogLoadEnd = function(url, code)
    {
        var event = new CustomEvent(
            "dialog-load-end",
            {
                url : url,
                code : code
            }
        );
        
        document.dispatchEvent(event);
    };

    /*
     * Triggered when an external dialog's title changes.
     *
     */
    window.OnDialogTitleChange = function(title)
    {
        var event = new CustomEvent(
            "dialog-title-change",
            {
                title : title
            }
        );
        
        document.dispatchEvent(event);
    };

    /*
     * Triggered when an external dialog is about to navigate to a new URL.
     *
     */
    window.OnDialogBeforeNavigation = function(url)
    {
        var event = new CustomEvent(
            "dialog-before-navigation",
            {
                url : url
            }
        );
        
        document.dispatchEvent(event);
    };

    /*
     * Triggered when a video file duration is received.
     *
     * @param {string} file
     * @param {number} duration  (in units of 10E-7 seconds)
     */
    window.OnGetVideoDuration = function(file, duration)
    {
        var event = new CustomEvent(
            "get-video-duration",
            {
                file : file,
                duration : duration
            }
        );
        
        document.dispatchEvent(event);
    };

    /*
     * Triggered when a video file duration fails to be retrieved.
     *
     * @param {string} file
     * @param {number} duration  (in units of 10E-7 seconds)
     */
    window.OnGetVideoDurationFailed = function(file)
    {
        var event = new CustomEvent(
            "get-video-duration-failed",
            {
                file : file
            }
        );
        
        document.dispatchEvent(event);
    };

    

    window.internal = internal;
})();
