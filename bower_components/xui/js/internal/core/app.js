/* globals xui, internal */

(function()
{
    "use strict";
    
    /*
     * This class deals with native calls or properties
	 * 
	 * @namespace internal.core
	 * @class App
	 * @access private
	 * @private
	 */
    function App(){}
    
    /**
    * PostMessageToParent Key
    */
    App.POSTMESSAGE_CLOSE = "1";
    App.POSTMESSAGE_SIZE  = "2";
    
    /*
     * Get an application property value
     * 
     * @access private
     * @method get
     * @static
     * @param  {String}   name     Property name
     * @param  {Function} callback Callback function
     * @return {Mixed}             Value of property specified by 
     *                             prop parameter or async ID
     */
    App.get = function(name, callback)
    {
        var func = "AppGetProperty";

        if (typeof callback === "function")
        {
            func += "Async";
        }

        return internal.exec(func, name, callback);
    };

    /*
     * Get an application global property value
     * 
     * @access private
     * @method get
     * @static
     * @param  {String}   name     Property name
     * @param  {Function} callback Callback function
     * @return {string}            Value of global property
     */
    App.getGlobalProperty = function(name)
    {
        // there exists no async call for global properties
        return internal.exec("GetGlobalProperty", name);
    };
    
    /*
     * Get the list of devices of an application property
     * 
     * @access private
     * @method getList
     * @static
     * @param   {String}   name     Property name
     * @param   {Function} callback Callback function
     * @return none
     */
    App.getList = function(name, callback)
    {
        (function(_name, _callback)
		{
			App.get(_name, function(xml)
			{
				var devicesJSON = xui.utils.XML.toJSON(xml);
				
				if (!devicesJSON)
				{
                    internal.execCallback.call(this, _callback, []);
					return false;
				}
				
                devicesJSON = devicesJSON[0].children;
                
				internal.execCallback.call(this, _callback, devicesJSON);
			});	
		})(name, callback);
    };
    
    /*
     * Set an application property value
     * 
     * @access private
     * @method set
     * @static
     * @param  {String}   name     Property name
     * @param  {String}   value    New value
     * @param  {Function} callback Callback function
     * @return {Mixed}             Return HRESULT or async ID
     */
    App.set = function(name, value, callback)
    {
        var func = "AppSetProperty";

        if (typeof callback === "function")
        {
            func += "Async";
        }

        return internal.exec(func, name, value, callback);
    };
    
    /**
     * Execute an application method
     * 
     * @access private
     * @method callFunc
     * @param  {String}   func     Function name
     * @param  {String}   arg      Function arguments
     * @param  {Function} callback Callback function
     */
    App.callFunc = function(func, arg, callback)
    {
        internal.exec("AppCallFuncAsync", func, arg, callback);
    };
    
    /**
     * Sets the window property or action 
     * @param {String}   postmessageKey (close = 1, resize = 2)
     * @param {Array}    arg            Parameters
     * @param {Function} callback       
     */
    App.postMessage = function(postmessageKey, arg, callback)
    {
        internal.exec("PostMessageToParent", postmessageKey, arg, callback);
    };
    
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
        var args = [].slice.call(arguments);
        args.unshift("CallDll");
        return internal.exec.apply(this, args);
    };
    
    internal.core.App = App;
})();