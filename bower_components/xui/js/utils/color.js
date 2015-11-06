/* globals xui, Object */

(function()
{
    'use strict';

    /**
     * XUI utility class for parsing Colors
     *
     * @module xui.utils
     * @class Color
     */
    function Color(props) 
    {
        props = props || {};

        var rgb, rgbdecimal, bgr, bgrdecimal;

        Object.defineProperties(this,
        {
            rgb:
            {
                get: function(){ return rgb; },
                set: function(value)
                {
                    if (value === undefined) 
                    { 
                        return;
                    }

                    rgb         = value.replace(/^#/, '');
                    rgbdecimal  = parseInt(rgb, 16);

                    bgr         = rgb.substring(4, 6) + rgb.substring(2, 4) +
                                    rgb.substring(0, 2);
                    bgrdecimal  = parseInt(bgr, 16);
                }
            },

            bgr:
            {
                get: function() { return bgr; },
                set: function(value)
                {
                    if (value === undefined) 
                    { 
                        return;
                    }

                    this.rgb = value.substring(4, 6) + value.substring(2, 4) +
                                value.substring(0, 2);
                }
            },

            rgbdecimal:
            {
                get: function(){ return rgbdecimal; },
                set: function(value)
                {
                    if (value === undefined) 
                    { 
                        return;
                    }

                    var _rgb = Number(value).toString(16);

                    while (_rgb.length < 6) 
                    {
                        _rgb = '0' + _rgb;
                    }

                    this.rgb = _rgb;
                }
            },

            bgrdecimal:
            {
                get: function(){ return bgrdecimal; },
                set: function(value)
                {
                    if (value === undefined) 
                    { 
                        return;
                    }

                    var _bgr = Number(value).toString(16);

                    while (_bgr.length < 6) 
                    {
                        _bgr = '0' + _bgr;
                    }

                    this.bgr = _bgr;
                }
            }
        });

        this.rgb        = props.rgb || this.rgb;
        this.rgbdecimal = props.rgbdecimal || this.rgbdecimal;

        this.bgr        = props.bgr || this.bgr;
        this.bgrdecimal = props.bgrdecimal || this.bgrdecimal;
    }

    Color.getPixelColor = function(x, y)
    {
        var color = internal.exec("GetScreenPixel");

        var blue = color.substring(2,4);
        var green = color.substring(4,6);
        var red = color.substring(6);

        color = "#" + red + green + blue;
        return new Color({ rgb : color });
    };
 
    xui.utils.Color = Color;
})();