/* globals xui, document, HTMLElement */

(function()
{
    "use strict";

	/**
	 * XUI utility class for parsing JSON and XML
	 * 
	 * @module xui.utils
	 * @class XML
	 */
    function XML(){}
    
    /**
     * Converts XML to JSON
     *
     * @static
     * @method toJSON
     * @param   {String} xml
     * @return  {Object} json
     */
    XML.toJSON = function(xml)
    {
        if (!xml)
        {
            return null;
        }

        // process short ended tags
        var SHORT_ENDED_TAG_PATTERN = /<([^\s>]+)([^>]+)\/>/g;

        function _processShortEndedTags(match, tagName, attributes)
        {
            return "<" + tagName + attributes + "></" + tagName + ">";
        }

        xml = xml.replace(SHORT_ENDED_TAG_PATTERN, _processShortEndedTags);

        var container = document.createElement("div");
        container.innerHTML = xml;

        var obj = _processNode(container);

        return obj.children;
    };
        
    
    /**
     * Converts JSON to XML
     * 
     * @static
     * @method fromJSON
     * @param   {String} json
     * @return  {Object} xml
     */
    XML.fromJSON = function(json)
    {
        var attributes = "",
            RESERVED   = /^(children|tag|value)$/i;

        if (!json.value)
        {
            json.value = "";
        }

        for (var key in json)
        {
            if (!RESERVED.test(key) && json[key] !== undefined)
            {
                attributes += " " + key + "=\"" + json[key] + "\"";      
            }
        }

        for (var i in json.children)
        {
            json.value += XML.fromJSON(json.children[i]);
        }

        var xml = "<" + json.tag + attributes + ">" + 
            json.value + "</" + json.tag + ">";

        return xml;
    };
    
    /**
     * Encodes XML to html entities
     * 
     * @static
     * @method encode
     * @param   {String} string XML string
     * @returns {String} Encoded string
     */
    XML.encode = function(string)
    {
        return string.replace(/[&<>"']/g, function($0) {
            return "&" + {
                "&":"amp", 
                "<":"lt", 
                ">":"gt", 
                '"':"quot", 
                "'":"#39"
            }[$0] + ";";
        });
    };

    xui.utils.XML = XML;
    
    //--------------------------------------------------------------------------
    // private components
    
    function _processNode(__node)
    {
        var nodeJSON = {};

        nodeJSON.tag = __node.tagName.toLowerCase();

        // process attributes
        for (var a = 0; a < __node.attributes.length; a++)
        {
            var attribute = __node.attributes[a];

            nodeJSON[attribute.name] = attribute.value;
        }

        // process child nodes
        nodeJSON.children = [];

        for (var c = 0; c < __node.childNodes.length; c++)
        {
            var childNode = __node.childNodes[c];

            if (childNode instanceof HTMLElement)
            {
                nodeJSON.children.push(_processNode(childNode));
            }
        }

        // process value
        if (
            nodeJSON.value === undefined &&
            nodeJSON.children.length === 0
        ) {
            delete nodeJSON.children;
            nodeJSON.value = __node.textContent;
        }

        return nodeJSON;
    }
})();