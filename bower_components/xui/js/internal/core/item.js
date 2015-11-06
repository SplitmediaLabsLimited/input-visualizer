/* globals internal */

(function()
{
    "use strict";

    /*
     * This class deals with native calls or properties
     * 
     * @namespace internal.core
     * @class Item
     * @access private
     * @private
     */
    internal.core.Item = function() {};

    /*
     * Attach the item for use
     * 
     * @param  {String} itemID Item ID
     * @param  {String} view   View ID
     */
    internal.core.Item.attach = function(itemID, view)
    {
        internal.exec("SearchVideoItem", itemID, view);
    };
    
    /*
     * Get an item local property
     * 
     * @access private
     * @method get
     * @static
     * @param   {String}   name     Property name
     * @param   {Function} callback Callback function
     * @param   {String}   slot     Slot number
     * @return none
     */
    internal.core.Item.get = function(name, callback, slot)
    {
        var func = "GetLocalProperty";

        if (typeof callback === "function")
        {
            func += "Async";
        }

        if (!isNaN(slot))
        {
            func += (String(slot) === "1") ? "" : "2";
        }

        return internal.exec(func, name, callback);
    };
    
    /*
     * Set an item local property
     * 
     * @access private
     * @method set
     * @static
     * @param   {String}   name     Property name
     * @param   {String}   value    New value
     * @param   {Function} callback Callback function
     * @param   {String}   slot     Slot number
     * @return  {Mixed}             Return HRESULT or async ID
     */
    internal.core.Item.set = function(name, value, callback, slot)
    {
        var func = "SetLocalProperty";

        if (typeof callback === "function")
        {
            func += "Async";
        }

        if (!isNaN(slot))
        {
            func += (String(slot) === "1") ? "" : "2";
        }

        return internal.exec(func, name, value, callback);
    };

    internal.core.Item.callFunc = function(func, arg)
    {
        internal.exec("CallInner", func, arg);
    };
})();