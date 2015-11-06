/* globals xui, internal */

(function()
{
    'use strict';

    var App     = xui.core.App,
        iApp    = internal.core.App;

    /**
     * Creates a borderless modal dialog, for a non-modal window
     * 
     * @static
     * @method  newDialog
     * @param   URL (local or remote) or HTML markup 
     */
    App.newDialog = function(url)
    {
        if (url !== undefined && url !== '')
        {
            iApp.callFunc('newdialog', url);
        }
    };
    
    /**
     * Creates a borderless modal dialog, for a non-modal window
     * window automatically closes upon mouse click to any area 
     * outside of the window area.
     * 
     * @static
     * @method  newAutoDialog
     * @param   URL (local or remote) or HTML markup 
     */
    App.newAutoDialog = function(url)
    {
        if (url !== undefined && url !== '')
        {
            iApp.callFunc('newautodialog', url);   
        }
    };
    
    /**
     * Resize window size
     * @param {Number} width  window's width
     * @param {Number} height window's height
     */
    App.resizeDialog = function(width, height)
    {
        iApp.postMessage(iApp.POSTMESSAGE_SIZE, width + '', height + '');
    };
    
    /**
     * Closes the Dialog box
     */
    App.closeDialog = function()
    {
        iApp.postMessage(iApp.POSTMESSAGE_CLOSE, '');
    };
    
})();