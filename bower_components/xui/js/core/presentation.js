/* globals xui */

(function()
{
    'use strict';

    var XML = xui.utils.XML;

    /**
     * 
     * @module xui.core
     * @class Presentation
     */
    function Presentation(props)
    {
        props = props || {};
        
        this.currentScene = props.currentScene;
        this.version      = props.version;
        
        this.placements   = props.placements || [];
        this.global       = props.global || [];
    }
    
    /**
     * Converts scene objects to Presentation XML
     * @static
     * @method toXML
     */
    Presentation.prototype.toXML = function()
    {
        var xml      = {};
        xml.tag      = 'configuration';
        xml.cur      = this.currentScene;
        xml.Version  = this.version;
        xml.children = [];

        var node, items;

        for (var i = 0; i < this.placements.length; i++)
        {
            node = {};
            node.tag = 'placement';
            node.name = this.placements[i].name;

            items = this.placements[i].items;

            for (var j = 0; j < items.length; j++)
            {
                var item = items[j].item;

                if (item !== undefined)
                {
                    items[j].item = XML.encode(item);
                }

                items[j].name = XML.encode(items[j].name);
            }

            node.children = items;
            xml.children.push(node);
        }

        node     = {};
        node.tag = 'global';
        items    = this.global;

        if (items !== undefined)
        {
            for (var k = 0; k < items.length; k++)
            {
                items[k].id = XML.encode(items[k].id);
            }

            node.children = items;
            xml.children.push(node);      
        }

        return XML.fromJSON(xml);
    };
    
    xui.core.Presentation = Presentation;
})();