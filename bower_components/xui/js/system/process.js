/* globals xui, internal */

(function()
{
    'use strict';

     var iApp    = internal.core.App;

    /**
     *
     * @module xui.core
     * @class Window
     */
    function Process(props)
    {
        props = (props !== undefined) ? props : {};
        
        var pid, detail, hwnds, modules;
        
        Object.defineProperties(this,
        {
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
                    value = value.toString();
                    
                    detail = iApp.callDll("xsplit.GetProcessDetails", value);
                    this.modules = iApp.callDll('xsplit.GetProcessModules', 
                                                value);
                    this.hwnds = iApp.callDll('xsplit.GetProcessWindowsList', 
                                                value);
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
            
            hwnds:
            {
                get: function(){ return hwnds || []; },
                set: function(value)
                {
                    if (value === undefined) 
                    { 
                        return;
                    }
                    value = value.split(',');
                    hwnds = value.filter(function(v){return v!=='';});
                }
            },
            
            modules:
            {
                get: function(){ return modules || []; },
                set: function(value)
                {
                    if (value === undefined) 
                    { 
                        return;
                    }
                    
                    value = value.split(',');
                    modules = value.filter(function(v){return v!=='';});
                }
            },
        });
    }
    
    /**
     * Preferred method of creating a Process object.
     * 
     * @method parse
     * @static
     * @param {object} args: should contain a pid (number) object
     * @returns {Process} Process object
     */
    Process.parse = function(args)
    {
        var proc = new Process();

        if (args.pid)
        {
            proc.pid = args.pid;
        }

        return proc;
    }

    xui.system.Process = Process;
})();