/* globals xui, internal */

(function()
{
    'use strict';

    var Scene   = xui.core.Scene,
        XML     = xui.utils.XML,
        iApp    = internal.core.App,
        iExec   = internal.execCallback;

    /**
     *
     * @module xui.core
     * @class  View
     * @constructor
     */
    function View(id) 
    {
        this.id = id || 0;
        this.scenes = [];
    }

    View.MAIN       = new View(0);
    View.PREVIEW    = new View(1);

    /**
     * Get list of scenes
     *
     * @method  getScenes
     * @param   {Function} callback (Scene[] scene)
     */
    View.prototype.getScenes = function(callback)
    {
        (function(_this, _callback)
        {
            iApp.getList('presetconfig', function(scenesJSON)
            {
                _this.scenes = [];
                
                for (var i = 0; i < scenesJSON.length; i++)
                {
                    var scene = new Scene(scenesJSON[i]);
                    scene.id  = i;
                    scene.viewID = _this.id;
                    
                    _this.scenes.push(scene);
                }

                iExec.call(_this, _callback, _this.scenes);
            });
        })(this, callback);
    };
    
    /**
     * Get the count of scenes or highest scene index with content
     * 
     * @method  getScenesCount
     * @param   {Function}   callback (Number count)
     */
    View.prototype.getScenesCount = function(callback)
    {
        (function(_this, _callback)
        {   
            iApp.get('presetcount', function(count)
            {
                count = Number(count);

                if (count !== _this.scenes.length)
                {
                    _this.getScenes();
                }

	            internal.execCallback.call(_this, _callback, count);
            });
        })(this, callback);
    };
    
    /**
     * Set active scene
     *
     * @method  setActiveScene
     * @param   {Scene} scene
     */
    View.prototype.setActiveScene = function(scene)
    {
        var isNumber = !isNaN(scene) &&
            parseInt(Number(scene)) == scene &&
            !isNaN(parseInt(scene), 10) &&
            /^\d+$/.test(scene);

        if (!(scene instanceof Scene || isNumber))
        {
            return;
        }

        if (isNumber)
        {
            this.getScenes(function(_scenes)
            {
                for (var i = 0; i < _scenes.length; i++)
                {
                    if (_scenes[i].id === scene)
                    {
                        iApp.set('preset', _scenes[i].id + '');  
                        break;
                    }
                }

                // number invalid
                return;
            }.bind(this));
        }
        else
        {
            this.activeScene = scene;
            iApp.set('preset', this.activeScene.id + '');  
        }        
    };

    /**
     * Get current scene
     * 
     * @method getActiveScene
     * @param  {Function} callback (Scene current)
     */
    View.prototype.getActiveScene = function(callback)
    {
        (function(_this, _callback)
        {
            iApp.get('preset:' + _this.id, function(id)
            {
                var scene = new Scene();
                scene.id = id;
                scene.viewID = _this.id;

                _this.activeScene = scene;

                iExec.call(_this, _callback, _this.activeScene);
            });
        })(this, callback);
    };

    /**
     * Get a specific scene
     *
     * @method  getScene
     * @param   {Function} callback (Scene[] scene)
     * @param   {String}   scene    Scene ID
     */
    View.prototype.getScene = function(callback, sceneID)
    {
        (function(_this, _callback, _sceneID)
        {
            iApp.get('presetconfig:' + _sceneID, function(sceneXML)
            {
                var propsJSON = XML.toJSON(sceneXML);

                var scene = new Scene(propsJSON[0]);
                scene.id  = _sceneID;
                scene.viewID = _this.id;

                iExec.call(_this, _callback, scene);
            });
        })(this, callback, sceneID);
    };
    
    xui.core.View = View;
})();