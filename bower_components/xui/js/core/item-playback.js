/* globals xui, internal */

(function()
{
    'use strict';

    var Item  = xui.core.Item,
        iItem = internal.core.Item,
        iExec = internal.execCallback;

    function attach()
    {
        /* jshint validthis:true */
        iItem.attach(this.id + '', this.viewID + '');
    }

    //------------------------------------------------------------------
    // Playback Start Position
    //------------------------------------------------------------------

    Item.prototype.setPlaybackStartPos = function(position)
    {
        attach.call(this);

        this.playbackStartPosition = Number(position, { min: 0 });

        iItem.set('prop:InPoint', (this.playbackStartPosition * 10) + '');
    };

    Item.prototype.getPlaybackStartPos = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:InPoint', function(position)
            {
                _this.playbackStartPosition = Number(position) / 10;

                iExec.call(_this, _callback, _this.playbackStartPosition);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Playback End Position
    //------------------------------------------------------------------
    
    Item.prototype.setPlaybackEndPos = function(position)
    {
        attach.call(this);

        this.playbackEndtPosition = Number(position, { min: 0 });

        iItem.set('prop:OutPoint', (this.playbackEndtPosition * 10) + '');
    };

    Item.prototype.getPlaybackEndPos = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:OutPoint', function(position)
            {
                _this.playbackEndtPosition = Number(position) / 10;

                iExec.call(_this, _callback, _this.playbackEndtPosition);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Playback End Action
    //------------------------------------------------------------------
    
    Item.PLAYBACK_END_ACTION_NOTHING = 0;
    Item.PLAYBACK_END_ACTION_REWIND  = 1;
    Item.PLAYBACK_END_ACTION_LOOP    = 2;
    Item.PLAYBACK_END_ACTION_HIDE    = 3;

    Item.prototype.setPlaybackEndAction = function(action)
    {
        attach.call(this);

        this.playbackEndAction = Number(action, { min: 0, max: 3 });

        iItem.set('prop:OpWhenFinished', this.playbackEndAction + '');
    };

    Item.prototype.getPlaybackEndAction = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:OpWhenFinished', function(action)
            {
                _this.playbackEndAction = Number(action);

                iExec.call(_this, _callback, _this.playbackEndAction);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Playback Duration
    //------------------------------------------------------------------
    
    Item.prototype.getPlaybackDuration = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('sync:duration', function(duration)
            {
                _this.playbackDuration = Number(duration);

                iExec.call(_this, _callback, _this.playbackDuration);
            });
        })(this, callback);
    };
})();