/* globals xui, internal */

(function()
{
    'use strict';

    var App             = xui.core.App,
        Presentation    = xui.core.Presentation,
        View            = xui.core.View,
        Thread          = xui.utils.Thread,
        iApp            = internal.core.App,
        iExec           = internal.execCallback;

    /**
     * Gets current Presentation object
     * @static
     * @method getCurrentPresentation
     * @param {Function} callback
     */
    App.getCurrentPresentation = function(callback)
    {
        (function(_callback)
        {   
			Thread.sync(
                
                // get current Scene Object
				function(next)
				{        
                    View.MAIN.getActiveScene(next);    
				},
                
                //get Version
                function(next, scene)
				{        
                    this.currentScene = scene.id;

                    App.getVersion(next);
				},
                
                // get all scenes
                function(next, version)
				{        
                    this.version = version;
                    
                    View.MAIN.getScenes(next);
				},
                
                // compile to presenation object
                function(next, scenes)
                {
                    this.placements = [];

                    for (var i = 0; i < scenes.length; i++)
                    {
                        this.placements.push(scenes[i]);    
                    }
                    
                    this.global = this.placements.pop().items;
                    
                    iExec.call(this, _callback, new Presentation(this)); 
                }
			);
        })(callback);
    };
    
    /**
     * loads a Presentation object to the App
     * 
     * @static
     * @method load
     * @param {Object} presentation Presentation Object or Properties
     */
    App.load = function(presentation)
    {
        iApp.callFunc("loadpresets", presentation.toXML());            
    };
    
    /**
     * Saves the Presentation to a file
     * 
     * static
     * @method save
     * @param {String} filename Full Filepath and name
     */
    App.save = function(filename)
    {
        iApp.callFunc("savepresets", filename);
    };

    /**
     * Clears the presentation
     * 
     * @static
     * @method clearPresentation
     */
    App.clearPresentation = function()
    {
        iApp.callFunc("newpresets", presentation.toXML());            
    };

})();