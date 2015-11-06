/* globals xui, internal */

(function()
{
    'use strict';

    var App     = xui.core.App,
        iApp    = internal.core.App,
        iExec   = internal.execCallback;

    App.TRANSITION_CLOCK            = 'clock';
    App.TRANSITION_COLLAPSE         = 'collapse';
    App.TRANSITION_MOVE_BOTTOM      = 'move_bottom';
    App.TRANSITION_MOVE_LEFT        = 'move_left';
    App.TRANSITION_MOVE_LEFT_RIGHT  = 'move_left_right';
    App.TRANSITION_MOVE_RIGHT       = 'move_right';
    App.TRANSITION_MOVE_TOP         = 'move_top';
    App.TRANSITION_FAN              = 'fan';
    App.TRANSITION_HOLE             = 'hole';
    App.TRANSITION_WAVE             = 'wave';

    /**
     * Refers to the transition used when scene changes.
     * 
     * @static
     * @method getTransition
     * @param {Function} callback
     */
    App.getTransition = function(callback)
    {
        (function(_callback)
        {
            iApp.get('transitionid', function(transition)
            {
                iExec.call(this, _callback, transition);
            });
        })(callback);
    };
    
    /**
     * Sets the ID of transition used when scene changes.
     * 
     * @static
     * @method setTransitionId
     * @param {String} transitionId
     */
    App.setTransition = function(transition)
    {
        iApp.set('transitionid',  transition);
    };
    
    /**
     * Refers to duration of scene transition in milliseconds
     * 
     * @static
     * @method getTransitionTime
     * @param {Function} callback
     */
    App.getTransitionTime = function(callback)
    {
        (function(_callback)
        {
            iApp.get('transitiontime', function(time)
            {
                iExec.call(this, _callback, time);
            });
        })(callback);
    };
    
    /**
     * Sets the duration of scene transition in milliseconds
     * 
     * @static
     * @method setTransitionTime
     * @param {String} transitionTime
     */
    App.setTransitionTime = function(time)
    {
        iApp.set('transitiontime',  time.toString());
    };
    
})();