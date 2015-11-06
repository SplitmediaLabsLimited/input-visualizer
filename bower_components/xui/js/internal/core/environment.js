/* globals internal */

(function()
{
    "use strict";
    
    /*
     * This class exposes static helper methods to detect the environment
     * we are running in.
     *
     * @namespace internal.core
     * @class Environment
     * @access private
     * @private
     */
    function Environment() {}

    var _environment;

    var initialize = function()
    {
        _environment = 
        {
            sourceHTML : (window.external &&
                window.external.AttachVideoItem === undefined),
            sourceConfig : (window.external &&
                window.external.AttachVideoItem !== undefined &&
                window.external.GetViewId !== undefined &&
                window.external.GetViewId() !== undefined),
            scriptPlugin : (window.external &&
                window.external.AttachVideoItem !== undefined &&
                window.external.GetViewId !== undefined &&
                window.external.GetViewId() === undefined)
        };
    };

    Environment.isSourceHtml = function()
    {
        if (_environment === undefined)
        {
            initialize();
        }
        return _environment.sourceHTML;
    };

    Environment.isSourceConfig = function()
    {
        if (_environment === undefined)
        {
            initialize();
        }
        return _environment.sourceConfig;
    };

    Environment.isScriptPlugin = function()
    {  
        if (_environment === undefined)
        {
            initialize();
        }
        return _environment.scriptPlugin;
    };

    internal.core.Environment = Environment;
})();