/* globals xui, internal */

(function()
{
    'use strict';

    var Color      = xui.utils.Color,
        Number     = xui.utils.Number,
        Rectangle  = xui.utils.Rectangle,
        iItem      = internal.core.Item,
        iExec      = internal.execCallback;

    function attach()
    {
        /* jshint validthis:true */
        iItem.attach(this.id + '', this.viewID + '');
    }

    /**
     * 
     * @module xui.core
     * @class Item
     */
    function Item(props)
    {
        props = props || {};

        this.name       = props.name || '';
        this.value      = props.item || '';
        this.id         = props.id || '';
        this.sceneID    = props.sceneID || 0;
        this.viewID     = props.viewID || 0;
    }

    //------------------------------------------------------------------
    // Name
    //------------------------------------------------------------------
    
    Item.prototype.setName = function(name)
    {
        attach.call(this);

        this.name = name;

        iItem.set('prop:name', this.name);
    };
    
    /**
     * Get the default video item name that appears on the sources list.
     *
     * @method getName
     * @param  {Function} callback default video item name
     */
    Item.prototype.getName = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:name', function(name)
            {
                _this.name = name;

                iExec.call(_this, _callback, _this.name);
            });
        })(this, callback);
    };
    
    //------------------------------------------------------------------
    // Item Type
    //------------------------------------------------------------------
    
    Item.TYPE_UNDEFINED  = 0;
    Item.TYPE_FILE       = 1;
    Item.TYPE_LIVE       = 2;
    Item.TYPE_TEXT       = 3;
    Item.TYPE_BITMAP     = 4;
    Item.TYPE_SCREEN     = 5;
    Item.TYPE_FLASHFILE  = 6;
    Item.TYPE_GAMESOURCE = 7;
    Item.TYPE_HTML       = 8;

    Item.prototype.getType = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:type', function(type)
            {
                _this.type = Number(type);

                iExec.call(_this, _callback, _this.type);
            });
        })(this, callback);
    };
    
    //------------------------------------------------------------------
    // Item Main definition
    //------------------------------------------------------------------
    /**
     * Set the video item’s main definition
     *
     * @method setValue
     * @param  {Object} Item value
     */
    Item.prototype.setValue = function(value)
    {
        attach.call(this);

        this.value = value;
        
        var xml = (typeof this.value === 'string') ? 
            this.value : 
            xui.utils.XML.fromJSON(this.value);

        iItem.set('prop:item', xml);
    };
    
    Item.prototype.getValue = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:item', function(value)
            {
                value = xui.utils.XML.toJSON(value) || value;
                _this.value = (typeof value === 'object') ? value[0] : value;
                iExec.call(_this, _callback, _this.value);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Track Window Title
    //------------------------------------------------------------------
        
    Item.prototype.setTrackTitle = function(trackTitle)
    {
        attach.call(this);

        this.trackTitle = trackTitle ? '0' : '1';

        iItem.set('prop:ScrCapTrackWindowTitle', this.trackTitle + '');
    };
    
    Item.prototype.getTrackTitle = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:ScrCapTrackWindowTitle', function(trackTitle)
            {
                _this.trackTitle = trackTitle === '0' ? true : false;

                iExec.call(_this, _callback, _this.trackTitle);
            });
        })(this, callback);
    };
    
    //------------------------------------------------------------------
    // Volume
    //------------------------------------------------------------------
    
    Item.prototype.setVolume = function(volume)
    {        
        attach.call(this);

        this.volume = Number(volume, { min: 0, max: 100 });

        iItem.set('prop:volume', this.volume + '');
    };

    Item.prototype.getVolume = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:volume', function(volume)
            {
                _this.volume = Number(volume);
                
                iExec.call(_this, _callback, _this.volume);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Transparency
    //------------------------------------------------------------------

    Item.prototype.setTransparency = function(transparency)
    {
        attach.call(this);

        this.transparency = Number(transparency, { min: 0, max: 255 });

        iItem.set('prop:alpha', this.transparency + '');
    };

    Item.prototype.getTransparency = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:alpha', function(transparency)
            {
                _this.transparency = Number(transparency);

                iExec.call(_this, _callback, _this.transparency);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Border Color
    //------------------------------------------------------------------
    
    Item.prototype.setBorderColor = function(color)
    {
        if (!(color instanceof Color))
        {
            return;
        }
        
        attach.call(this);

        this.borderColor = color;

        iItem.set('prop:border', color.bgrdecimal - 0x80000000 + '');
    };

    Item.prototype.getBorderColor = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:border', function(bgrdecimal)
            {
                bgrdecimal = parseInt(bgrdecimal) - 0x80000000;
                
                _this.borderColor = new Color({ bgrdecimal : bgrdecimal });

                iExec.call(_this, _callback, _this.borderColor);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Brightness
    //------------------------------------------------------------------

    Item.prototype.setBrightness = function(brightness)
    {
        attach.call(this);

        this.brightness = Number(brightness, { min: -100, max: 100 });

        iItem.set('prop:cc_brightness', this.brightness + '');
    };

    Item.prototype.getBrightness = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:cc_brightness', function(brightness)
            {
                _this.brightness = Number(brightness);
                iExec.call(_this, _callback, _this.brightness);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Contrast
    //------------------------------------------------------------------
        
    Item.prototype.setContrast = function(contrast)
    {
        attach.call(this);

        this.contrast = Number(contrast, { min: -100, max: 100 });

        iItem.set('prop:cc_contrast', this.contrast + '');
    };

    Item.prototype.getContrast = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:cc_contrast', function(contrast)
            {
                _this.contrast = Number(contrast);

                iExec.call(_this, _callback, _this.contrast);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Hue
    //------------------------------------------------------------------
    
    Item.prototype.setHue = function(hue)
    {
        attach.call(this);

        this.hue = Number(hue, { min: -180, max: 180 });
        
        iItem.set('prop:cc_hue', this.hue + '');
    };

    Item.prototype.getHue = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:cc_hue', function(hue)
            {
                _this.hue = Number(hue);

                iExec.call(_this, _callback, _this.hue);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Saturation
    //------------------------------------------------------------------
    
    Item.prototype.setSaturation = function(saturation)
    {
        attach.call(this);

        this.saturation = Number(saturation, { min: -100, max: 100 });

        iItem.set('prop:cc_saturation', this.saturation + '');
    };

    Item.prototype.getSaturation = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:cc_saturation', function(saturation)
            {
                _this.saturation = Number(saturation);

                iExec.call(_this, _callback, _this.saturation);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Custom Name
    //------------------------------------------------------------------
    
    Item.prototype.setCustomName = function(customName)
    {
        attach.call(this);

        this.customName = customName;

        iItem.set('prop:cname', this.customName);
    };

    Item.prototype.getCustomName = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:cname', function(customName)
            {
                _this.customName = customName;

                iExec.call(_this, _callback, _this.customName);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Cue Points
    //------------------------------------------------------------------

    Item.prototype.setCuePoints = function(cuepoints)
    {
        if (!Array.isArray(cuepoints)) 
        {
            return;
        }
        
        attach.call(this);

        this.cuepoints = [];

        for (var i = 0; i < cuepoints.length; i++)
        {
            this.cuepoints.push(cuepoints[i] * 10);
        }

        iItem.set('prop:CuePoints', this.cuepoints.join(','));
    };

    Item.prototype.getCuePoints = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:CuePoints', function(cuepoints)
            {
                _this.cuepoints = [];

                cuepoints = cuepoints.split(',');

                for (var i = 0; i < cuepoints.length; i++)
                {
                    _this.cuepoints.push(Number(cuepoints[i]) / 10);
                }

                iExec.call(_this, _callback, _this.cuepoints);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Keep Aspect Ratio
    //------------------------------------------------------------------

    Item.prototype.setKeepAspectRatio = function(keepAspectRatio)
    {
        attach.call(this);

        this.keepAspectRatio = !!keepAspectRatio;

        iItem.set('prop:keep_ar', this.keepAspectRatio ? '1' : '0');
    };

    //------------------------------------------------------------------
    // Position Locked
    //------------------------------------------------------------------
    
    Item.prototype.setPositionLocked = function(locked)
    {
        attach.call(this);

        this.positionLocked = locked;

        iItem.set('prop:lockmove', locked ? '1' : '0');
    };

    Item.prototype.isPositionLocked = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:lockmove', function(locked)
            {
                _this.positionLocked = (locked === '1');

                iExec.call(_this, _callback, _this.positionLocked);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Enhanced Resize Enabled
    //------------------------------------------------------------------

    Item.prototype.setEnhancedResizeEnabled = function(enabled)
    {
        attach.call(this);

        this.enhanceResizeEnabled = enabled;

        iItem.set('prop:mipmaps', enabled ? '1' : '0');
    };

    Item.prototype.isEnhancedResizeEnabled = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:mipmaps', function(enabled)
            {
                _this.enhanceResizeEnabled = (enabled === '1');
                
                iExec.call(_this, _callback, _this.enhanceResizeEnabled);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Mute
    //------------------------------------------------------------------
    
    Item.prototype.setMute = function(mute)
    {
        attach.call(this);

        this.mute = mute;

        iItem.set('prop:mute', mute ? '1' : '0');
    };

    Item.prototype.isMute = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:mute', function(mute)
            {
                _this.mute = (mute === '1');

                iExec.call(_this, _callback, _this.mute);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Pixel Alignment
    //------------------------------------------------------------------

    Item.prototype.setPixelAlignmentEnabled = function(enabled)
    {
        attach.call(this);

        this.pixelAlignmentEnabled = enabled;

        iItem.set('prop:pixalign', this.pixelAlignmentEnabled ? '1' : '0');
    };

    Item.prototype.isPixelAlignmentEnabled = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:pixalign', function(enabled)
            {
                _this.pixelAlignmentEnabled = (enabled === '1');

                iExec.call(_this, _callback, _this.pixelAlignmentEnabled);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Position
    //------------------------------------------------------------------

    Item.prototype.setPosition = function(position)
    {
        if (!(position instanceof Rectangle))
        {
            return;
        }
        
        attach.call(this);

        this.position = position;

        iItem.set(
            'prop:pos', this.position.toString(':left,:top,:right,:bottom')
        );
    };

    Item.prototype.getPosition = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:pos', function(position)
            {
                _this.position = Rectangle.parse(position);
             
                iExec.call(_this, _callback, _this.position);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Crop
    //------------------------------------------------------------------
    
    Item.prototype.crop = function(rect)
    {
        attach.call(this);

        iItem.set('prop:crop', rect.toString(':left,:top,:right,:bottom'));
    };

    //------------------------------------------------------------------
    // Keep Loaded
    //------------------------------------------------------------------
    
    Item.prototype.setKeepLoaded = function(keepLoaded)
    {
        attach.call(this);

        this.keepLoaded = !!keepLoaded;

        iItem.set('prop:keeploaded', this.keepLoaded ? '1' : '0');
    };
    
    /**
     * Create XML item
     * 
     * @method toXML
     * @returns {String} XML format of Item
     */
    Item.prototype.toXML = function()
    {
        var item = {};
        item.tag = 'item';
        item.pos_left   = this.left || '0.250000';
        item.pos_top    = this.top || '0.250000';
        item.pos_right  = this.right || '0.750000';
        item.pos_bottom = this.bottom || '0.750000';
        item.name = this.name;
        item.item = this.value;
        item.type = this.type;
        
        return xui.utils.XML.fromJSON(item);
    };

    xui.core.Item = Item;
})();