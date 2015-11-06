/* globals xui, internal */

(function()
{
    'use strict';

    var Color  = xui.utils.Color,
        Item   = xui.core.Item,
        Number = xui.utils.Number,
        iItem  = internal.core.Item,
        iExec  = internal.execCallback;

    function attach()
    {
        /* jshint validthis:true */
        iItem.attach(this.id + '', this.viewID + '');
    }

    //------------------------------------------------------------------
    // Chroma Key Enabled
    //------------------------------------------------------------------
    
    Item.prototype.setChromaKeyEnabled = function(chromaKeyEnabled)
    {
        attach.call(this);

        this.chromaKeyEnabled = !!chromaKeyEnabled;

        iItem.set('prop:key_chromakey', this.chromaKeyEnabled ? '1' : '0');
    };

    Item.prototype.isChromaEnabled = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:key_chromakey', function(isEnabled)
            {
                _this.chromaKeyEnabled = (isEnabled === '1');

                iExec.call(_this, _callback, _this.chromaKeyEnabled);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Chroma Brightness
    //------------------------------------------------------------------

    Item.prototype.setChromaBrightness = function(chromaBrightness)
    {
        attach.call(this);

        this.chromaBrightness = Number(chromaBrightness, { min: 0, max: 255 });

        iItem.set('prop:key_chromabr', this.chromaBrightness + '');
    };
    
    Item.prototype.getChromaBrightness = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:key_chromabr', function(chromaBrightness)
            {
                _this.chromaBrightness = Number(chromaBrightness);

                iExec.call(_this, _callback, _this.chromaBrightness);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Chroma Saturation
    //------------------------------------------------------------------

    Item.prototype.setChromaSaturation = function(chromaSaturation)
    {
        attach.call(this);

        this.chromaSaturation = Number(chromaSaturation, { min: 0, max: 255 });

        iItem.set('prop:key_chromasat', this.chromaSaturation + '');
    };

    Item.prototype.getChromaSaturation = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:key_chromasat', function(chromaSaturation)
            {
                _this.chromaSaturation = Number(chromaSaturation);

                iExec.call(_this, _callback, _this.chromaSaturation);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Chroma Type
    //------------------------------------------------------------------
    
    Item.CHROMA_TYPE_CHROMA_KEY     = 0;
    Item.CHROMA_TYPE_COLOR_KEY      = 1;
    Item.CHROMA_TYPE_CHROMA_KEY_RGB = 2;

    Item.prototype.setChromaType = function(chromaType)
    {
        attach.call(this);

        this.chromaType = Number(chromaType, { min: 0, max: 2 });

        iItem.set('prop:key_chromakeytype', this.chromaType + '');
    };

    Item.prototype.getChromaType = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:key_chromakeytype', function(chromaType)
            {
                _this.chromaType = Number(chromaType);

                iExec.call(_this, _callback, _this.chromaType);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Chroma Color
    //------------------------------------------------------------------

    Item.prototype.setChromaColor = function(chromaColor)
    {
        attach.call(this);

        this.chromaColor = new Color({ rgb: chromaColor });

        iItem.set('prop:key_colorrgb', this.chromaColor.bgrdecimal + '');
    };

    Item.prototype.getChromaColor = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:key_colorrgb', function(bgrdecimal)
            {
                _this.chromaColor = new Color({ bgrdecimal: bgrdecimal });
                
                iExec.call(_this, _callback, _this.chromaColor);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Chroma Primary Color
    //------------------------------------------------------------------
    
    Item.CHROMA_PRIMARY_COLOR_RED   = 0;
    Item.CHROMA_PRIMARY_COLOR_GREEN = 1;
    Item.CHROMA_PRIMARY_COLOR_BLUE  = 2;

    Item.prototype.setChromaPrimaryColor = function(chromaPrimaryColor)
    {
        attach.call(this);

        this.chromaPrimaryColor = Number(
            chromaPrimaryColor, { min: 0, max: 2 }
        );

        iItem.set(
            'prop:key_chromargbkeyprimary', this.chromaPrimaryColor + ''
        );
    };

    Item.prototype.getChromaPrimaryColor = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:key_chromargbkeyprimary', function(primaryColor)
            {
                _this.chromaPrimaryColor = Number(primaryColor);
                
                iExec.call(_this, _callback,  _this.chromaPrimaryColor);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Chroma Balance
    //------------------------------------------------------------------
    
    Item.prototype.setChromaBalance = function(chromaBalance)
    {
        attach.call(this);

        this.chromaBalance = Number(chromaBalance, { min: 0, max: 255 });

        iItem.set('prop:key_chromargbkeybalance', this.chromaBalance + '');
    };

    Item.prototype.getChromaBalance = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:key_chromargbkeybalance', function(chromaBalance)
            {
                _this.chromaBalance = Number(chromaBalance);

                iExec.call(_this, _callback, _this.chromaBalance);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Chroma Antialias
    //------------------------------------------------------------------
    
    Item.CHROMA_ANTIALIAS_NONE = 0;
    Item.CHROMA_ANTIALIAS_LOW  = 1;
    Item.CHROMA_ANTIALIAS_HIGH = 2;

    Item.prototype.setChromaAntiAlias = function(strength)
    {
        attach.call(this);

        this.chromaAntiAlias = Number(strength, { min: 0, max: 2 });

        iItem.set('prop:key_antialiasing', this.chromaAntiAlias + '');
    };

    Item.prototype.getChromaAntiAlias = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:key_antialiasing', function(strength)
            {
                _this.chromaAntiAlias = Number(strength);

                iExec.call(_this, _callback, _this.chromaAntiAlias);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Chroma Hue
    //------------------------------------------------------------------
    
    Item.prototype.setChromaHue = function(hue)
    {
        attach.call(this);

        this.chromaHue = Number(hue, { min: -180, max: 180 });

        iItem.set('prop:key_chromahue', this.chromaHue + '');
    };

    Item.prototype.getChromaHue = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:key_chromahue', function(chromaHue)
            {
                _this.chromaHue = Number(chromaHue, { min: -180, max: 180 });

                iExec.call(_this, _callback, _this.chromaHue);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Chroma Threshold
    //------------------------------------------------------------------
    
    Item.prototype.setChromaThreshold = function(threshold)
    {
        attach.call(this);
        
        this.chromaThreshold = Number(threshold, { min: 0, max: 255 });

        iItem.set('prop:key_chromarang', this.chromaThreshold + '');
    };

    Item.prototype.getChromaThreshold = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:key_chromarang', function(threshold)
            {
                _this.chromaThreshold = Number(threshold);

                iExec.call(_this, _callback, _this.chromaThreshold);
            });
        })(this, callback);
    };

    //------------------------------------------------------------------
    // Chroma Threshold with Antialias
    //------------------------------------------------------------------
    
    Item.prototype.setChromaThresholdWithAntialias = function(threshold)
    {
        attach.call(this);

        this.chromaThreshold = Number(threshold, { min: 0, max: 255 });

        iItem.set('prop:key_chromaranga', this.chromaThreshold + '');
    };

    Item.prototype.getChromaThresholdWithAntialias = function(callback)
    {
        (function(_this, _callback)
        {
            attach.call(_this);

            iItem.get('prop:key_chromaranga', function(threshold)
            {
                _this.chromaThresholdWithAntialias = Number(threshold);

                iExec.call(
                    _this, _callback, _this.chromaThresholdWithAntialias
                );
            });
        })(this, callback);
    };
})();