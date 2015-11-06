/* globals xui, internal */

(function()
{
    'use strict';

    var Item  = xui.core.Item,
        iItem = internal.core.Item,
        iExec = internal.execCallback,
        iEnv  = internal.core.Environment;

    function attach()
    {
        /* jshint validthis:true */
        iItem.attach(this.id + '', this.viewID + '');
    }
    
    /* This class handles source BrowserConfigurations. */
    Item.getCurrentSource = function()
    {
        return new Item();
    }

    /**
     * Gets the Browser Configuration for a video item.
     * 
     * @static
     * @method getConfiguration
     */
    Item.prototype.getConfiguration = function(callback)
    {
        if (this.id === "") // source plugin
        {
            iItem.get("prop:BrowserConfiguration", function(config)
            {
                iExec.call(this, callback, config);
            });
        }
        else
        {
            attach.call(this);

            iItem.get("prop:BrowserConfiguration", function(config)
            {
                iExec.call(this, callback, config);
            });
        }
    };

    /**
     * Sets the Browser Configuration for a video item.
     * 
     * @static
     * @method setConfiguration
     */
    Item.prototype.setConfiguration = function(config)
    {
        if (this.id === "") // source plugin HTML OR Config
        {
            if (iEnv.isSourceHtml()) // source
            {
                internal.exec("SetBrowserProperty", "Configuration", config);
            }
            else // config
            {
                iItem.set("prop:BrowserConfiguration", config);
            }
        }
        else
        {
            attach.call(this);

            iItem.set("prop:BrowserConfiguration", config);
        }
    };

})();