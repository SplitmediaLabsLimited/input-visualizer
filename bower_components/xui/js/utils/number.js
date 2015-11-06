/* globals xui, window */

(function()
{
    'use strict';

    function Number(value, options) 
    {
        options = options || {};
        
        value = window.Number(value);

        if (options.min)
        {
            value = (value < options.min) ? options.min : value;
        }

        if (options.max)
        {
            value = (value > options.max) ? options.max : value;
        }

        return isNaN(value) ? 0 : value;
    }
 
    xui.utils.Number = Number;
})();