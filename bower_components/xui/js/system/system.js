/* globals xui, internal */

(function()
{
	'use strict';
	
    var Audio   = xui.system.Audio,
        Process = xui.system.Process,
        Game    = xui.system.Game,
        Video   = xui.system.Video,
        Window  = xui.system.Window,
        iApp    = internal.core.App,
        iExec   = internal.execCallback;

    /**
	 * 
	 * @module xui.core
	 * @class System
	 */
    function System(){}
    
    /**
	 * List audio input and output devices
	 * 
	 * @method getAudioDevices
	 * @param {Function} callback (Audio[] devices)
	 * @param {String}   [dataflow='all']
	 * @param {String}   [state='Active']
	 */
    System.getAudioDevices = function(callback, dataflow, state)
    {
        (function(_callback, _dataflow, _state)
		{
            if (_dataflow === undefined)
            {
                _dataflow = 'all';
            }
            
            if (_state === undefined)
            {
                _state = Audio.STATE_ACTIVE;
            }
            
			iApp.getList('wasapienum', function(devicesJSON)
            {
                var devices  = [];

                if (devicesJSON)
                {
                    for (var i = 0; i < devicesJSON.length; i++)
                    {
                        var device = devicesJSON[i];
                        
                        if (!/^all$/i.test(_state) && _state !== device.state)
                        {
                            continue;
                        }
                        
                        if (!/^all$/i.test(_dataflow) && 
                            _dataflow !== device.dataflow)
                        {
                            continue;
                        }

                        devices.push(Audio.parse(device));
                    }
                }

                iExec.call(System, _callback, devices);
            });
		})(callback, dataflow, state);
    };
    
    /**
	 * List video devices
	 * 
	 * @method getVideoDevices
	 * @param {Function} callback (Video[] devices)
	 */
	System.getVideoDevices = function(callback)
    {
        (function(_callback)
		{
			iApp.getList('dshowenum:vsrc', function(devicesJSON)
            {
                var devices  = [];

                if (devicesJSON)
                {
                    for (var i = 0; i < devicesJSON.length; i++)
                    {
                        var device = devicesJSON[i];
                        
                        devices.push(Video.parse(device));
                    }
                }

                iExec.call(System, _callback, devices);
            });
		})(callback);
    };
    
    /**
	 * List current open games
	 * 
	 * @method getGames
	 * @param {Function} callback (Game[] games)
	 */
	System.getGames = function(callback)
    {
        (function(_callback)
		{
			iApp.getList('gsenum', function(gamesJSON)
            {
                var games  = [];

                if (gamesJSON)
                {
                    for (var i = 0; i < gamesJSON.length; i++)
                    {
                        var game = gamesJSON[i];
                        
                        games.push(Game.parse(game));
                    }
                }

                iExec.call(System, _callback, games);
            });
		})(callback);
    };

    /**
     * Gets Processes and Process Details
     * 
     * @static
     * @method getProcesses
     * @param {Function} callback
     */
    System.getProcesses = function(callback)
    {
        (function(_callback)
        {
            var list        = iApp.callDll('xsplit.EnumProcesses') || '',
                processes   = [];
                list        = list.split(',');

            for (var i = 0; i < list.length; i++)
            {
                processes.push(Process.parse({ pid : list[i] }));
            }

            iExec.call(this, _callback, processes);
        })(callback);
    };
    
    /**
     * Retrieves ALL Visible windows
     * 
     * @static
     * @method getVisibleWindows
     * @param {Function} callback
     */
    System.getVisibleWindows = function(callback)
    {
        (function(_callback)
        {
            var list = iApp.callDll('xsplit.EnumParentWindows') || '';
            list = list.split(',');

            var windows = [];

            for (var i = 0; i < list.length; i++)
            {
                windows.push(Window.parse({ hwnd : list[i] }));
            }

            iExec.call(this, _callback, windows);
        })(callback);
    };
    
    /**
     * Gets Active/Foreground Window
     * 
     * @static
     * @method getActiveWindow
     * @param {Function} callback
     */
    System.getActiveWindow = function(callback)
    {
        (function(_callback)
        {
            var hwnd = iApp.callDll('xsplit.GetForegroundWindow');

            iExec.call(this, _callback, Window.parse({ hwnd : hwnd}));
        })(callback);
    };
    
    //--------------------------------------------------------------------------
    // CPU / Memory Info
    //--------------------------------------------------------------------------
    
    /**
     * Get CPU usage for system
     * 
     * @static
     * @method getSystemCpu
     * @param {Object} usage System CPU Usage
     * @param {Function} callback
     */
    System.getCpuUsage = function(callback)
    {
        var result = iApp.callDll('xsplit.GetSysCpuUsage', [0, 0 , 0].join());
        result = result.split('|');
            
        var usage = {};
            
        if (result.length === 2)
        {
            usage.usage = result[0];

            var time = result[1].split(',');
            
            usage.idleTime      = time[0];
            usage.kernelTime    = time[1];
            usage.userTime      = time[2];
        }

        iExec.call(System, callback, usage);
    };
    
    /**
     * Get CPU usage for process
     * 
     * @static
     * @method getProcessCpuUsage
     * @param {Number}   pid      Process ID
     * @param {Function} callback
     */
    System.getProcessCpuUsage = function(pid, callback)
    {
        (function(_pid, _callback)
        {
            var result = iApp.callDll(
                'xsplit.GetProcCpuUsage', [_pid, 0, 0 , 0].join()
            );
            result = result.split('|');
            
            var usage = {};

            if (result.length === 2)
            {
                usage.usage = result[0];

                var time = result[1].split(',');
                
                usage.pid           = time[0] || _pid;
                usage.idleTime      = time[1] || 0;
                usage.kernelTime    = time[2] || 0;
                usage.userTime      = time[3] || 0;
            }
            
            iExec.call(System, _callback, usage);
        })(pid, callback);
    };

    /**
     * Retrieves total and available physics memory in bytes
     * 
     * @static
     * @method getSystemMemoryUsage
     * @param {Function} callback
     */
    System.getMemoryUsage = function(callback)
    {
        (function(_callback)
        {
            var usage = {},
                result = iApp.callDll('xsplit.GetSysMemoryUsage');
            
            result = result.split(',');

            if (result.length >= 2)
            {
                usage.total     = result[0] || 0;
                usage.available = result[1] || 0;    
            }
            
            iExec.call(System, _callback, usage);
        })(callback);
    };
    
    /**
     * Retrieves current working set size, in bytes.
     * @static
     * @method getProcessMemoryUsage
     * @param {Number}   pid      Process ID
     * @param {Function} callback
     */
    System.getProcessMemoryUsage = function(pid, callback)
    {
        (function(_pid, _callback)
        {
            var result = iApp.callDll('xsplit.GetProcMemoryUsage', _pid + '');

            iExec.call(System, _callback, result);
        })(pid, callback);
    };
    
    System.selectScreen = function(callback)
    {
        internal.exec('SelScreenArea', callback);
    };

    xui.system.System = System;
})();