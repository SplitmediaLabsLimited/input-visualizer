/* globals xui, Object */

(function()
{
    'use strict';

	/**
	 * XUI utility class for parsing Rectangle
	 * 
	 * @module xui.utils
	 * @class Rectangle
	 */
    function Rectangle(props)
    {
        props = props || {};
        
        var top, left, width, height, right, bottom;

        Object.defineProperties(this, 
        {
            top:
            {
                get: function(){ return top; },
                set: function(value)
                {
                    top = parseFloat(value);

                    if (bottom !== undefined)
                    {
                        height = Math.abs(top - bottom);
                    }
                    else if (height !== undefined)
                    {
                        bottom = top + height;
                    }
                }
            },

            left:
            {
                get: function(){ return left; },
                set: function(value)
                {
                    left = parseFloat(value);

                    if (right !== undefined)
                    {
                        width = Math.abs(right - left);    
                    }
                    else if (width !== undefined)
                    {
                        right = left + width;
                    }
                }
            },

            right:
            {
                get: function(){ return right; },
                set: function(value)
                {
                    right = parseFloat(value);

                    if (left !== undefined)
                    {
                        width = Math.abs(right - left);    
                    }
                    else if (width !== undefined)
                    {
                        left = right - width;
                    }
                }
            },

            bottom:
            {
                get: function(){ return bottom; },
                set: function(value)
                {
                    bottom = parseFloat(value);

                    if (top !== undefined)
                    {
                        height = Math.abs(top - bottom);
                    }
                    else if (height !== undefined)
                    {
                        top = bottom - height;
                    }
                }
            },

            width:
            {
                get: function(){ return width; },
                set: function(value)
                {
                    width = parseFloat(value);

                    if (right !== undefined)
                    {
                        left = right - width;
                    }
                    else if (left !== undefined)
                    {
                        right = left + width;
                    }
                }
            },

            height:
            {
                get: function(){ return height; },
                set: function(value)
                {
                    height = parseFloat(value);

                    if (top !== undefined)
                    {
                        bottom = top + height;
                    }
                    else if (bottom !== undefined)
                    {
                        top = bottom - height;
                    }
                }
            }
        });

        this.top    = props.top || this.top;
        this.left   = props.left || this.left;
        this.right  = props.right || this.right;
        this.bottom = props.bottom || this.bottom;
        this.width  = props.width || this.width;
        this.height = props.height || this.height;
    }

    Rectangle.parse = function(rectString)
    {
        var params  = rectString.split(','),
            rect    = new Rectangle();

        if(params.length === 4)
        {
            rect.top    = Number(params[0]);
            rect.left   = Number(params[1]);
            rect.right  = Number(params[2]);
            rect.bottom = Number(params[3]);    
        }
        
        if(params.length === 2)
        {
            rect.width  = Number(params[0]);
            rect.height = Number(params[1]);    
        }

        return rect;
    };

    Rectangle.prototype.toString = function(format)
    {
        format = format || ':left,:top,:right,:bottom';

        format = format.replace(':left',     this.left);
        format = format.replace(':top',      this.top);
        format = format.replace(':right',    this.right);
        format = format.replace(':bottom',   this.bottom);
        format = format.replace(':width',    this.width);
        format = format.replace(':height',   this.height);

        return format;
    };
    
    xui.utils.Rectangle = Rectangle;
})();