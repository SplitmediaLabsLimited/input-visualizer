/* globals xui, internal */

(function()
{
    "use strict";

    var iApp    = internal.core.App;

    // Hides the window and activates another window.
    Window.STATE_HIDE = 0; 
    
    // Activates and displays a window. 
    Window.STATE_SHOWNORMAL = 1; 
    
    // Activates the window and displays it as a minimized window.
    Window.STATE_SHOWMINIMIZED = 2; 
    
    // Maximizes the specified window.
    Window.STATE_MAXIMIZE = 3; 
    
    // Displays a window in its most recent size and position. 
    // This value is similar to SW_SHOWNORMAL, 
    // except the window is not activated.
    Window.STATE_SHOWNOACTIVATE = 4; 
    
    // Activates the window and displays it in its current size and position.
    Window.STATE_SHOW = 5;     
    
    // Minimizes the specified window and activates the next top-level 
    // window in the z-order.
    Window.STATE_MINIMIZE = 6;
    
    // Displays the window as a minimized window. 
    // This value is similar to SW_SHOWMINIMIZED, 
    // except the window is not activated.
    Window.STATE_SHOWMINNOACTIVE = 7; 
    
    // Displays the window in its current size and position. 
    // This value is similar to SW_SHOW, except the window is not activated.
    Window.STATE_SHOWNA = 8; 
    
    // Activates and displays the window. 
    // If the window is minimized or maximized, 
    // the system restores it to its original size and position.
    Window.STATE_RESTORE = 9; 

    /**
     *
     * @module xui.core
     * @class Window
     */
    function Window(props)
    {
        var hwnd, pid, title, state, detail;

        Object.defineProperties(this,
        {
            hwnd:
            {
                get: function(){ return hwnd; },
                set: function(value)
                {
                    if (value === undefined) 
                    { 
                        return;
                    }
                    
                    value = value.toString();
                    hwnd = parseInt(value);
                    title  = iApp.callDll("xsplit.GetWindowTitle", value);
                    this.state  = iApp.callDll("xsplit.GetWindowState", value);
                    this.pid = iApp.callDll("xsplit.GetWindowProcessId", value);
                }
            },
            
            pid:
            {
                get: function(){ return pid; },
                set: function(value)
                {
                    if (value === undefined) 
                    { 
                        return;
                    }
                    
                    pid = parseInt(value);
                    detail = iApp.callDll("xsplit.GetProcessDetails", 
                                                   value.toString());
                }
            },
            
            detail:
            {
                get: function(){ return detail; },
                set: function(value)
                {
                    if (value === undefined) 
                    { 
                        return;
                    }
                }
            },
            
            title:
            {
                get: function(){ return title; },
                set: function(value)
                {
                    if (value === undefined) 
                    { 
                        return;
                    }
                }
            },
            
            state:
            {
                get: function(){ return state; },
                set: function(value)
                {
                    if (value === undefined) 
                    { 
                        return;
                    }
                    
                    state = parseInt(value);
                }
            },
        });
    }

    /**
     * Preferred method of creating a Window object from
     * its window handle.
     * 
     * @static
     * @method parse
     * @param {object} args : may contain a hwnd {number} object
     * @returns {Window} Window object
     */
    Window.parse = function(args)
    {
        var win = new Window();
        
        if (args.hwnd)
        {
            win.hwnd = args.hwnd;
        }

        return win;
    };
    
    xui.system.Window = Window;
    
})();