/* globals xui */

(function()
{
    'use strict';

    function Coordinate(props)
    {
        props = props || {};

        this.x = props.x;
        this.y = props.y;
        this.z = props.z;
    }

    xui.utils.Coordinate = Coordinate;
})();