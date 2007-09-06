/*

  OpenLayers.js -- OpenLayers Map Viewer Library

  Copyright 2005-2006 MetaCarta, Inc., released under a modified BSD license.
  Please see http://svn.openlayers.org/trunk/openlayers/repository-license.txt
  for the full text of the license.

  Includes compressed code under the following licenses:

  (For uncompressed versions of the code used please see the
  OpenLayers SVN repository: <http://openlayers.org/>)

*/

/* Contains portions of Prototype.js:
 *
 * Prototype JavaScript framework, version 1.4.0
 *  (c) 2005 Sam Stephenson <sam@conio.net>
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 *
/*--------------------------------------------------------------------------*/

/**  
*  
*  Contains portions of Rico <http://openrico.org/>
* 
*  Copyright 2005 Sabre Airline Solutions  
*  
*  Licensed under the Apache License, Version 2.0 (the "License"); you
*  may not use this file except in compliance with the License. You
*  may obtain a copy of the License at
*  
*         http://www.apache.org/licenses/LICENSE-2.0  
*  
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
*  implied. See the License for the specific language governing
*  permissions and limitations under the License. 
*
**/

/* ======================================================================
    OpenLayers/SingleFile.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */

OpenLayers = {
    singleFile: true
};


/* ======================================================================
    OpenLayers.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */

/* 
 * @requires OpenLayers/BaseTypes.js
 */ 

(function() {
    /**
     * Before creating the OpenLayers namespace, check to see if
     * OpenLayers.singleFile is true.  This occurs if the
     * OpenLayers/SingleFile.js script is included before this one - as is the
     * case with single file builds.
     */
    var singleFile = (typeof OpenLayers == "object" && OpenLayers.singleFile);
    
    /**
     * Namespace: OpenLayers
     * The OpenLayers object provides a namespace for all things OpenLayers
     */
    OpenLayers = {
        
        /**
         * Property: _scriptName
         * {String} Relative path of this script.
         */
        _scriptName: (!singleFile) ? "lib/OpenLayers.js" : "OpenLayers.js",

        /**
         * Function: _getScriptLocation
         * Return the path to this script.
         *
         * Return:
         * Path to this script
         */
        _getScriptLocation: function () {
            var scriptLocation = "";
            var scriptName = OpenLayers._scriptName;
         
            var scripts = document.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i++) {
                var src = scripts[i].getAttribute('src');
                if (src) {
                    var index = src.lastIndexOf(scriptName); 
                    // is it found, at the end of the URL?
                    if ((index > -1) && (index + scriptName.length == src.length)) {  
                        scriptLocation = src.slice(0, -scriptName.length);
                        break;
                    }
                }
            }
            return scriptLocation;
         }
    };
    /**
     * OpenLayers.singleFile is a flag indicating this file is being included
     * in a Single File Library build of the OpenLayers Library.
     * 
     * When we are *not* part of a SFL build we dynamically include the
     * OpenLayers library code.
     * 
     * When we *are* part of a SFL build we do not dynamically include the 
     * OpenLayers library code as it will be appended at the end of this file.
      */
    if(!singleFile) {
        var jsfiles = new Array(
            "OpenLayers/Util.js",
            "OpenLayers/BaseTypes.js",
            "OpenLayers/BaseTypes/Class.js",
            "OpenLayers/BaseTypes/Bounds.js",
            "OpenLayers/BaseTypes/Element.js",
            "OpenLayers/BaseTypes/LonLat.js",
            "OpenLayers/BaseTypes/Pixel.js",
            "OpenLayers/BaseTypes/Size.js",
            "OpenLayers/Console.js",
            "Rico/Corner.js",
            "Rico/Color.js",
            "OpenLayers/Ajax.js",
            "OpenLayers/Events.js",
            "OpenLayers/Map.js",
            "OpenLayers/Layer.js",
            "OpenLayers/Icon.js",
            "OpenLayers/Marker.js",
            "OpenLayers/Marker/Box.js",
            "OpenLayers/Popup.js",
            "OpenLayers/Tile.js",
            "OpenLayers/Feature.js",
            "OpenLayers/Feature/Vector.js",
            "OpenLayers/Feature/WFS.js",
            "OpenLayers/Tile/Image.js",
            "OpenLayers/Tile/WFS.js",
            "OpenLayers/Layer/Image.js",
            "OpenLayers/Layer/EventPane.js",
            "OpenLayers/Layer/FixedZoomLevels.js",
            "OpenLayers/Layer/Google.js",
            "OpenLayers/Layer/VirtualEarth.js",
            "OpenLayers/Layer/Yahoo.js",
            "OpenLayers/Layer/HTTPRequest.js",
            "OpenLayers/Layer/Grid.js",
            "OpenLayers/Layer/MapServer.js",
            "OpenLayers/Layer/MapGuide.js",
            "OpenLayers/Layer/MapServer/Untiled.js",
            "OpenLayers/Layer/KaMap.js",
            "OpenLayers/Layer/MultiMap.js",
            "OpenLayers/Layer/Markers.js",
            "OpenLayers/Layer/Text.js",
            "OpenLayers/Layer/WorldWind.js",
            "OpenLayers/Layer/WMS.js",
            "OpenLayers/Layer/WMS/Untiled.js",
            "OpenLayers/Layer/GeoRSS.js",
            "OpenLayers/Layer/Boxes.js",
            "OpenLayers/Layer/TMS.js",
            "OpenLayers/Layer/TileCache.js",
            "OpenLayers/Popup/Anchored.js",
            "OpenLayers/Popup/AnchoredBubble.js",
            "OpenLayers/Handler.js",
            "OpenLayers/Handler/Point.js",
            "OpenLayers/Handler/Path.js",
            "OpenLayers/Handler/Polygon.js",
            "OpenLayers/Handler/Feature.js",
            "OpenLayers/Handler/Drag.js",
            "OpenLayers/Handler/Box.js",
            "OpenLayers/Handler/MouseWheel.js",
            "OpenLayers/Handler/Keyboard.js",
            "OpenLayers/Control.js",
            "OpenLayers/Control/ZoomBox.js",
            "OpenLayers/Control/ZoomToMaxExtent.js",
            "OpenLayers/Control/DragPan.js",
            "OpenLayers/Control/Navigation.js",
            "OpenLayers/Control/MouseDefaults.js",
            "OpenLayers/Control/MousePosition.js",
            "OpenLayers/Control/OverviewMap.js",
            "OpenLayers/Control/KeyboardDefaults.js",
            "OpenLayers/Control/PanZoom.js",
            "OpenLayers/Control/PanZoomBar.js",
            "OpenLayers/Control/ArgParser.js",
            "OpenLayers/Control/Permalink.js",
            "OpenLayers/Control/Scale.js",
            "OpenLayers/Control/LayerSwitcher.js",
            "OpenLayers/Control/DrawFeature.js",
            "OpenLayers/Control/Panel.js",
            "OpenLayers/Control/SelectFeature.js",
            "OpenLayers/Geometry.js",
            "OpenLayers/Geometry/Rectangle.js",
            "OpenLayers/Geometry/Collection.js",
            "OpenLayers/Geometry/Point.js",
            "OpenLayers/Geometry/MultiPoint.js",
            "OpenLayers/Geometry/Curve.js",
            "OpenLayers/Geometry/LineString.js",
            "OpenLayers/Geometry/LinearRing.js",        
            "OpenLayers/Geometry/Polygon.js",
            "OpenLayers/Geometry/MultiLineString.js",
            "OpenLayers/Geometry/MultiPolygon.js",
            "OpenLayers/Geometry/Surface.js",
            "OpenLayers/Renderer.js",
            "OpenLayers/Renderer/Elements.js",
            "OpenLayers/Renderer/SVG.js",
            "OpenLayers/Renderer/VML.js",
            "OpenLayers/Layer/Vector.js",
            "OpenLayers/Layer/GML.js",
            "OpenLayers/Format.js",
            "OpenLayers/Format/XML.js",
            "OpenLayers/Format/GML.js",
            "OpenLayers/Format/KML.js",
            "OpenLayers/Format/GeoRSS.js",
            "OpenLayers/Format/WFS.js",
            "OpenLayers/Format/WKT.js",
            "OpenLayers/Layer/WFS.js",
            "OpenLayers/Control/MouseToolbar.js",
            "OpenLayers/Control/NavToolbar.js",
            "OpenLayers/Control/EditingToolbar.js"
        ); // etc.



        var allScriptTags = "";
        var host = OpenLayers._getScriptLocation() + "lib/";
    
        for (var i = 0; i < jsfiles.length; i++) {
            if (/MSIE/.test(navigator.userAgent) || /Safari/.test(navigator.userAgent)) {
                var currentScriptTag = "<script src='" + host + jsfiles[i] + "'></script>"; 
                allScriptTags += currentScriptTag;
            } else {
                var s = document.createElement("script");
                s.src = host + jsfiles[i];
                var h = document.getElementsByTagName("head").length ? 
                           document.getElementsByTagName("head")[0] : 
                           document.body;
                h.appendChild(s);
            }
        }
        if (allScriptTags) document.write(allScriptTags);
    }
})();

/**
 * Constant: VERSION_NUMBER
 */
OpenLayers.VERSION_NUMBER="$Revision: 3862 $";
/* ======================================================================
    OpenLayers/Util.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */


/**
 * Namespace: Util
 */
OpenLayers.Util = {};

/** 
 * Function: getElement
 * This is the old $() from prototype
 */
OpenLayers.Util.getElement = function() {
    var elements = [];

    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        if (typeof element == 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length == 1) {
            return element;
        }
        elements.push(element);
    }
    return elements;
};

/** 
 * Maintain $() from prototype
 */
if ($ == null) {
    var $ = OpenLayers.Util.getElement;
}

/**
 * APIFunction: extend
 * Copy all properties of a source object to a destination object.  Modifies
 *     the passed in destination object.
 *
 * Parameters:
 * destination - {Object} The object that will be modified
 * source - {Object} The object with properties to be set on the destination
 *
 * Returns:
 * {Object} The destination object.
 */
OpenLayers.Util.extend = function(destination, source) {
    if(destination && source) {
        for(var property in source) {
            destination[property] = source[property];
        }
        /**
         * IE doesn't include the toString property when iterating over an object's
         * properties with the for(property in object) syntax.  Explicitly check if
         * the source has its own toString property.
         */
        if(source.hasOwnProperty && source.hasOwnProperty('toString')) {
            destination.toString = source.toString;
        }
    }
    return destination;
};


/** 
 * Function: removeItem
 * Remove an object from an array. Iterates through the array
 *     to find the item, then removes it.
 *
 * Parameters:
 * array - {Array}
 * item - {Object}
 * 
 * Return
 * {Array} A reference to the array
 */
OpenLayers.Util.removeItem = function(array, item) {
    for(var i=0; i < array.length; i++) {
        if(array[i] == item) {
            array.splice(i,1);
            //break;more than once??
        }
    }
    return array;
};

/**
 * Function: clearArray
 * *Deprecated*. This function will disappear in 3.0.
 * Please use "array.length = 0" instead.
 * 
 * Parameters:
 * array - {Array}
 */
OpenLayers.Util.clearArray = function(array) {
    var msg = "OpenLayers.Util.clearArray() is Deprecated." +
              " Please use 'array.length = 0' instead.";
    OpenLayers.Console.warn(msg);
    array.length = 0;
};

/** 
 * Function: indexOf
 * Seems to exist already in FF, but not in MOZ.
 * 
 * Parameters:
 * array - {Array}
 * obj - {Object}
 * 
 * Returns:
 * {Integer} The index at, which the object was found in the array.
 *           If not found, returns -1.v
 */
OpenLayers.Util.indexOf = function(array, obj) {

    for(var i=0; i < array.length; i++) {
        if (array[i] == obj) return i;
    }
    return -1;   
};



/**
 * Function: modifyDOMElement
 * 
 * Modifies many properties of a DOM element all at once.  Passing in 
 * null to an individual parameter will avoid setting the attribute.
 *
 * Parameters:
 * id - {String} The element id attribute to set.
 * px - {<OpenLayers.Pixel>} The left and top style position.
 * sz - {<OpenLayers.Size>}  The width and height style attributes.
 * position - {String}       The position attribute.  eg: absolute, 
 *                           relative, etc.
 * border - {String}         The style.border attribute.  eg:
 *                           solid black 2px
 * overflow - {String}       The style.overview attribute.  
 * opacity - {Float}         Fractional value (0.0 - 1.0)
 */
OpenLayers.Util.modifyDOMElement = function(element, id, px, sz, position, 
                                            border, overflow, opacity) {

    if (id) {
        element.id = id;
    }
    if (px) {
        element.style.left = px.x + "px";
        element.style.top = px.y + "px";
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px";
    }
    if (position) {
        element.style.position = position;
    }
    if (border) {
        element.style.border = border;
    }
    if (overflow) {
        element.style.overflow = overflow;
    }
    if (opacity) {
        element.style.opacity = opacity;
        element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
    }
};

/** 
 * Function: createDiv
 * Creates a new div and optionally set some standard attributes.
 * Null may be passed to each parameter if you do not wish to
 * set a particular attribute.d
 * 
 * Note: zIndex is NOT set
 * 
 * Parameters:
 * id - {String} An identifier for this element.  If no id is
 *               passed an identifier will be created 
 *               automatically.
 * px - {<OpenLayers.Pixel>} The element left and top position. 
 * sz - {<OpenLayers.Size>} The element width and height.
 * imgURL - {String} A url pointing to an image to use as a 
 *                   background image.
 * position - {String} The style.position value. eg: absolute,
 *                     relative etc.
 * border - {String} The the style.border value. 
 *                   eg: 2px solid black
 * overflow - {String} The style.overflow value. Eg. hidden
 * opacity - {Float} Fractional value (0.0 - 1.0)
 * 
 * Return: 
 * {DOMElement} A DOM Div created with the specified attributes.
 */
OpenLayers.Util.createDiv = function(id, px, sz, imgURL, position, 
                                     border, overflow, opacity) {

    var dom = document.createElement('div');

    if (imgURL) {
        dom.style.backgroundImage = 'url(' + imgURL + ')';
    }

    //set generic properties
    if (!id) {
        id = OpenLayers.Util.createUniqueID("OpenLayersDiv");
    }
    if (!position) {
        position = "absolute";
    }
    OpenLayers.Util.modifyDOMElement(dom, id, px, sz, position, 
                                     border, overflow, opacity);

    return dom;
};

/**
 * Function: createImage
 * Creates an img element with specific attribute values.
 *  
 * Parameters:
 * id - {String} The id field for the img.  If none assigned one will be
 *               automatically generated.
 * px - {<OpenLayers.Pixel>} The left and top positions.
 * sz - {<OpenLayers.Size>} The style.width and style.height values.
 * imgURL - {String} The url to use as the image source.
 * position - {String} The style.position value.
 * border - {String} The border to place around the image.
 * delayDisplay - {Boolean} If true waits until the image has been
 *                          loaded.
 * opacity - {Float} Fractional value (0.0 - 1.0)
 * 
 * Return:
 * {DOMElement} A DOM Image created with the specified attributes.
 */
OpenLayers.Util.createImage = function(id, px, sz, imgURL, position, border,
                                       opacity, delayDisplay) {

    var image = document.createElement("img");

    //set generic properties
    if (!id) {
        id = OpenLayers.Util.createUniqueID("OpenLayersDiv");
    }
    if (!position) {
        position = "relative";
    }
    OpenLayers.Util.modifyDOMElement(image, id, px, sz, position, 
                                     border, null, opacity);

    if(delayDisplay) {
        image.style.display = "none";
        OpenLayers.Event.observe(image, "load", 
                      OpenLayers.Util.onImageLoad.bind(image));
        OpenLayers.Event.observe(image, "error", 
                      OpenLayers.Util.onImageLoadError.bind(image));
        
    }
    
    //set special properties
    image.style.alt = id;
    image.galleryImg = "no";
    if (imgURL) {
        image.src = imgURL;
    }


        
    return image;
};

/**
 * Function: setOpacity
 * Deprecated.
 * This function has been deprecated. Instead, please use 
 *     OpenLayers.Util.modifyDOMElement() 
 *     or 
 *     OpenLayers.Util.modifyAlphaImageDiv()
 * 
 * Set the opacity of a DOM Element
 *     Note that for this function to work in IE, elements must "have layout"
 *     according to:
 *     http://msdn.microsoft.com/workshop/author/dhtml/reference/properties/haslayout.asp
 *
 * Parameters:
 * element - {DOMElement} Set the opacity on this DOM element
 * opacity - {Float} Opacity value (0.0 - 1.0)
 */
OpenLayers.Util.setOpacity = function(element, opacity) {
    OpenLayers.Util.modifyDOMElement(element, null, null, null,
                                     null, null, null, opacity);
}

/**
 * Function: onImageLoad
 */
OpenLayers.Util.onImageLoad = function() {
    // The complex check here is to solve issues described in #480.
    // Every time a map view changes, it increments the 'viewRequestID' 
    // property. As the requests for the images for the new map view are sent
    // out, they are tagged with this unique viewRequestID. 
    // 
    // If an image has no viewRequestID property set, we display it regardless, 
    // but if it does have a viewRequestID property, we check that it matches 
    // the viewRequestID set on the map.
    // 
    // If the viewRequestID on the map has changed, that means that the user
    // has changed the map view since this specific request was sent out, and
    // therefore this tile does not need to be displayed (so we do not execute
    // this code that turns its display on).
    //
    if (!this.viewRequestID ||
        (this.map && this.viewRequestID == this.map.viewRequestID)) { 
        this.style.backgroundColor = null;
        this.style.display = "";  
    }
};

/**
 * Property: onImageLoadErrorColor
 * {String} The color tiles with load errors will turn.
 *          Default is "pink"
 */
OpenLayers.Util.onImageLoadErrorColor = "pink";

/**
 * Property: onImageLoadErrorColor
 * {Integer} How many times should we try to reload an image before giving up?
 *           Default is 0
 */
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 0;

/**
 * Function: onImageLoadError 
 */
OpenLayers.Util.onImageLoadError = function() {
    this._attempts = (this._attempts) ? (this._attempts + 1) : 1;
    if(this._attempts <= OpenLayers.IMAGE_RELOAD_ATTEMPTS) {
        this.src = this.src;
    } else {
        this.style.backgroundColor = OpenLayers.Util.onImageLoadErrorColor;
    }
    this.style.display = "";
};

/**
 * Function: alphaHack
 * Checks whether it's necessary (and possible) to use the png alpha
 * hack which allows alpha transparency for png images under Internet
 * Explorer.
 * 
 * Return:
 * {Boolean} true if alpha has is necessary and possible, false otherwise.
 */
OpenLayers.Util.alphaHack = function() {
    var arVersion = navigator.appVersion.split("MSIE");
    var version = parseFloat(arVersion[1]);
    var filter = false;
    
    // IEs4Lin dies when trying to access document.body.filters, because 
    // the property is there, but requires a DLL that can't be provided. This
    // means that we need to wrap this in a try/catch so that this can
    // continue.
    
    try { 
        filter = document.body.filters;
    } catch (e) {
    }    
    
    return ( filter &&
                      (version >= 5.5) && (version < 7) );
}

/** 
 * Function: modifyAlphaImageDiv
 * 
 * div - {DOMElement} Div containing Alpha-adjusted Image
 * id - {String}
 * px - {<OpenLayers.Pixel>}
 * sz - {<OpenLayers.Size>}
 * imgURL - {String}
 * position - {String}
 * border - {String}
 * sizing {String} 'crop', 'scale', or 'image'. Default is "scale"
 * opacity - {Float} Fractional value (0.0 - 1.0)
 */ 
OpenLayers.Util.modifyAlphaImageDiv = function(div, id, px, sz, imgURL, 
                                               position, border, sizing, 
                                               opacity) {

    OpenLayers.Util.modifyDOMElement(div, id, px, sz);

    var img = div.childNodes[0];

    if (imgURL) {
        img.src = imgURL;
    }
    OpenLayers.Util.modifyDOMElement(img, div.id + "_innerImage", null, sz, 
                                     "relative", border);
    if (opacity) {
        div.style.opacity = opacity;
        div.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
    }
    
    if (OpenLayers.Util.alphaHack()) {

        div.style.display = "inline-block";
        if (sizing == null) {
            sizing = "scale";
        }
        
        div.style.filter = "progid:DXImageTransform.Microsoft" +
                           ".AlphaImageLoader(src='" + img.src + "', " +
                           "sizingMethod='" + sizing + "')";
        if (div.style.opacity) {
            div.style.filter += " alpha(opacity=" + div.style.opacity * 100 + ")";
        }

        img.style.filter = "progid:DXImageTransform.Microsoft" +
                                ".Alpha(opacity=0)";
    }
};

/** 
 * Function: createAlphaImageDiv
 * 
 * id - {String}
 * px - {<OpenLayers.Pixel>}
 * sz - {<OpenLayers.Size>}
 * imgURL - {String}
 * position - {String}
 * border - {String}
 * sizing {String} 'crop', 'scale', or 'image'. Default is "scale"
 * delayDisplay{Boolean}
 * 
 * Return:
 * {DOMElement} A DOM Div created with a DOM Image inside it. If the hack is 
 *              needed for transparency in IE, it is added.
 */ 
OpenLayers.Util.createAlphaImageDiv = function(id, px, sz, imgURL, 
                                               position, border, sizing, 
                                               opacity, delayDisplay) {
    
    var div = OpenLayers.Util.createDiv();
    var img = OpenLayers.Util.createImage(null, null, null, null, null, null, 
                                          null, false);
    div.appendChild(img);

    if (delayDisplay) {
        img.style.display = "none";
        OpenLayers.Event.observe(img, "load",
                      OpenLayers.Util.onImageLoad.bind(div));
        OpenLayers.Event.observe(img, "error",
                      OpenLayers.Util.onImageLoadError.bind(div));
    }

    OpenLayers.Util.modifyAlphaImageDiv(div, id, px, sz, imgURL, position, 
                                        border, sizing, opacity);
    
    return div;
};


/** 
 * Function: upperCaseObject
 * Creates a new hashtable and copies over all the keys from the 
 *     passed-in object, but storing them under an uppercased
 *     version of the key at which they were stored.
 * 
 * Parameters: 
 * object - {Object}
 * 
 * Returns: 
 * {Object} A new Object with all the same keys but uppercased
 */
OpenLayers.Util.upperCaseObject = function (object) {
    var uObject = {};
    for (var key in object) {
        uObject[key.toUpperCase()] = object[key];
    }
    return uObject;
};

/** 
 * Function: applyDefaults
 * Takes a hashtable and copies any keys that don't exist from
 *     another hashtable, by analogy with OpenLayers.Util.extend() from
 *     Prototype.js.
 * 
 * Parameters:
 * to - {Object}
 * from - {Object}
 */
OpenLayers.Util.applyDefaults = function (to, from) {
    for (var key in from) {
        if (to[key] == null) {
            to[key] = from[key];
        }
    }
};

/**
 * Function: getParameterString
 * 
 * Parameters:
 * params - {Object}
 * 
 * Return:
 * {String} A concatenation of the properties of an object in 
 *          http parameter notation. 
 *          (ex. <i>"key1=value1&key2=value2&key3=value3"</i>)
 *          If a parameter is actually a list, that parameter will then
 *          be set to a comma-seperated list of values (foo,bar) instead
 *          of being URL escaped (foo%3Abar). 
 */
OpenLayers.Util.getParameterString = function(params) {
    paramsArray = [];
    
    for (var key in params) {
      var value = params[key];
      if ((value != null) && (typeof value != 'function')) {
        var encodedValue;
        if (typeof value == 'object' && value.constructor == Array) {
          /* value is an array; encode items and separate with "," */
          var encodedItemArray = [];
          for (var itemIndex=0; itemIndex<value.length; itemIndex++) {
            encodedItemArray.push(encodeURIComponent(value[itemIndex]));
          }
          encodedValue = encodedItemArray.join(",");
        }
        else {
          /* value is a string; simply encode */
          encodedValue = encodeURIComponent(value);
        }
        paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
      }
    }
    
    return paramsArray.join("&");
};

/**
 * Property: ImgPath
 * {String} Default is ''.
 */
OpenLayers.ImgPath = '';

/** 
 * Function: getImagesLocation
 * 
 * Return:
 * {String} The fully formatted image location string
 */
OpenLayers.Util.getImagesLocation = function() {
    return OpenLayers.ImgPath || (OpenLayers._getScriptLocation() + "img/");
};


/** 
 * Function: Try
 * Execute functions until one of them doesn't throw an error. 
 *     Capitalized because "try" is a reserved word in JavaScript.
 *     Taken directly from OpenLayers.Util.Try()
 * 
 * Parameters:
 * [*] - {Function} Any number of parameters may be passed to Try()
 *    It will attempt to execute each of them until one of them 
 *    successfully executes. 
 *    If none executes successfully, returns null.
 * 
 * Return:
 * {*} The value returned by the first successfully executed function.
 */
OpenLayers.Util.Try = function() {
    var returnValue = null;

    for (var i = 0; i < arguments.length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) {}
    }

    return returnValue;
}


/** 
 * Function: getNodes
 * 
 * These could/should be made namespace aware?
 * 
 * Parameters:
 * p - {}
 * tagName - {String}
 * 
 * Return:
 * {Array}
 */
OpenLayers.Util.getNodes=function(p, tagName) {
    var nodes = OpenLayers.Util.Try(
        function () {
            return OpenLayers.Util._getNodes(p.documentElement.childNodes,
                                            tagName);
        },
        function () {
            return OpenLayers.Util._getNodes(p.childNodes, tagName);
        }
    );
    return nodes;
};

/**
 * Function: _getNodes
 * 
 * Parameters:
 * nodes - {Array}
 * tagName - {String}
 * 
 * Return:
 * {Array}
 */
OpenLayers.Util._getNodes=function(nodes, tagName) {
    var retArray = [];
    for (var i=0;i<nodes.length;i++) {
        if (nodes[i].nodeName==tagName) {
            retArray.push(nodes[i]);
        }
    }

    return retArray;
};



/**
 * Function: getTagText
 * 
 * Parameters:
 * parent - {}
 * item - {String}
 * index - {Integer}
 * 
 * Return:
 * {String}
 */
OpenLayers.Util.getTagText = function (parent, item, index) {
    var result = OpenLayers.Util.getNodes(parent, item);
    if (result && (result.length > 0))
    {
        if (!index) {
            index=0;
        }
        if (result[index].childNodes.length > 1) {
            return result.childNodes[1].nodeValue; 
        }
        else if (result[index].childNodes.length == 1) {
            return result[index].firstChild.nodeValue; 
        }
    } else { 
        return ""; 
    }
};

/**
 * Function: getXmlNodeValue
 * 
 * Parameters:
 * node - {XMLNode}
 * 
 * Return:
 * {String} The text value of the given node, without breaking in firefox or IE
 */
OpenLayers.Util.getXmlNodeValue = function(node) {
    var val = null;
    OpenLayers.Util.Try( 
        function() {
            val = node.text;
            if (!val)
                val = node.textContent;
            if (!val)
                val = node.firstChild.nodeValue;
        }, 
        function() {
            val = node.textContent;
        }); 
    return val;
};

/** 
 * Function: mouseLeft
 * 
 * Parameters:
 * evt - {Event}
 * div - {HTMLDivElement}
 * 
 * Return:
 * {Boolean}
 */
OpenLayers.Util.mouseLeft = function (evt, div) {
    // start with the element to which the mouse has moved
    var target = (evt.relatedTarget) ? evt.relatedTarget : evt.toElement;
    // walk up the DOM tree.
    while (target != div && target != null) {
        target = target.parentNode;
    }
    // if the target we stop at isn't the div, then we've left the div.
    return (target != div);
};

/**
 * Function: rad
 * 
 * Parameters:
 * x - {Float}
 * 
 * Return:
 * {Float}
 */
OpenLayers.Util.rad = function(x) {return x*Math.PI/180;};

/**
 * Function: distVincenty
 * 
 * Parameters:
 * p1 - {Float}
 * p2 - {Float}
 * 
 * Return:
 * {Float}
 */
OpenLayers.Util.distVincenty=function(p1, p2) {
    var a = 6378137, b = 6356752.3142,  f = 1/298.257223563;
    var L = OpenLayers.Util.rad(p2.lon - p1.lon);
    var U1 = Math.atan((1-f) * Math.tan(OpenLayers.Util.rad(p1.lat)));
    var U2 = Math.atan((1-f) * Math.tan(OpenLayers.Util.rad(p2.lat)));
    var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
    var lambda = L, lambdaP = 2*Math.PI;
    var iterLimit = 20;
    while (Math.abs(lambda-lambdaP) > 1e-12 && --iterLimit>0) {
        var sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
        var sinSigma = Math.sqrt((cosU2*sinLambda) * (cosU2*sinLambda) +
        (cosU1*sinU2-sinU1*cosU2*cosLambda) * (cosU1*sinU2-sinU1*cosU2*cosLambda));
        if (sinSigma==0) return 0;  // co-incident points
        var cosSigma = sinU1*sinU2 + cosU1*cosU2*cosLambda;
        var sigma = Math.atan2(sinSigma, cosSigma);
        var alpha = Math.asin(cosU1 * cosU2 * sinLambda / sinSigma);
        var cosSqAlpha = Math.cos(alpha) * Math.cos(alpha);
        var cos2SigmaM = cosSigma - 2*sinU1*sinU2/cosSqAlpha;
        var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1-C) * f * Math.sin(alpha) *
        (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));
    }
    if (iterLimit==0) return NaN  // formula failed to converge
    var uSq = cosSqAlpha * (a*a - b*b) / (b*b);
    var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
    var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));
    var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
        B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
    var s = b*A*(sigma-deltaSigma);
    var d = s.toFixed(3)/1000; // round to 1mm precision
    return d;
};

/**
 * Function: getArgs
 * 
 * Parameters:
 * url - {String} Optional url used to extract the query string.
 *                If null, query string is taken from page location.
 * 
 * Return:
 * {Object} An object of key/value pairs from the query string.
 */
OpenLayers.Util.getArgs = function(url) {
    if(url == null) {
        url = window.location.href;
    }

    var start = url.indexOf('?');
    var stop = url.indexOf('#');
    
    if (start != -1) {
        if (stop != -1) {
            var query = url.substring(start + 1, stop);
        } else {
            var query = url.substring(start + 1);
        }
    } else {
        return {};
    }
        
    var args = {};
    pairs = query.split(/[&;]/);
    for(var i = 0; i < pairs.length; ++i) {
        keyValue = pairs[i].split('=');
        if (keyValue[0]) {
            if (keyValue[1]) { 
                args[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
            } else {
                args[decodeURIComponent(keyValue[0])] = '';
            }
        }
    }
    return args;
}

/**
 * Property: lastSeqID
 * {Integer} The ever-incrementing count variable.
 *           Used for generating unique ids.
 */
OpenLayers.Util.lastSeqID = 0;

/**
 * Function: createUniqueID
 * 
 * Parameters:
 * prefix {String} String to prefix unique id. 
 *                 If null, default is "id_"
 * 
 * Return:
 * {String} A unique id string, built on the passed in prefix
 */
OpenLayers.Util.createUniqueID = function(prefix) {
    if (prefix == null) {
        prefix = "id_";
    }
    OpenLayers.Util.lastSeqID += 1; 
    return prefix + OpenLayers.Util.lastSeqID;        
};

/**
 * Constant: INCHES_PER_UNIT
 * {Object} Constant inches per unit -- borrowed from MapServer mapscale.c
 */
OpenLayers.INCHES_PER_UNIT = { 
    'inches': 1.0,
    'ft': 12.0,
    'mi': 63360.0,
    'm': 39.3701,
    'km': 39370.1,
    'dd': 4374754
};
OpenLayers.INCHES_PER_UNIT["in"]= OpenLayers.INCHES_PER_UNIT.inches;
OpenLayers.INCHES_PER_UNIT["degrees"] = OpenLayers.INCHES_PER_UNIT.dd;

/** 
 * Constant: DOTS_PER_INCH
 * {Integer} 72 (A sensible default)
 */
OpenLayers.DOTS_PER_INCH = 72;

/**
 * Function: normalzeScale
 * 
 * Parameters:
 * scale - {float}
 * 
 * Return:
 * {Float} A normalized scale value, in 1 / X format. 
 *         This means that if a value less than one ( already 1/x) is passed
 *         in, it just returns scale directly. Otherwise, it returns 
 *         1 / scale
 */
OpenLayers.Util.normalizeScale = function (scale) {
    var normScale = (scale > 1.0) ? (1.0 / scale) 
                                  : scale;
    return normScale;
};

/**
 * Function: getResolutionFromScale
 * 
 * Parameters:
 * scale - {Float}
 * units - {String} Index into OpenLayers.INCHES_PER_UNIT hashtable.
 *                  Default is degrees
 * 
 * Return:
 * {Float} The corresponding resolution given passed-in scale and unit 
 *         parameters.
 */
OpenLayers.Util.getResolutionFromScale = function (scale, units) {

    if (units == null) {
        units = "degrees";
    }

    var normScale = OpenLayers.Util.normalizeScale(scale);

    var resolution = 1 / (normScale * OpenLayers.INCHES_PER_UNIT[units]
                                    * OpenLayers.DOTS_PER_INCH);
    return resolution;
};

/**
 * Function: getScaleFromResolution
 * 
 * Parameters:
 * resolution - {Float}
 * units - {String} Index into OpenLayers.INCHES_PER_UNIT hashtable.
 *                  Default is degrees
 * 
 * Return:
 * {Float} The corresponding scale given passed-in resolution and unit 
 *         parameters.
 */
OpenLayers.Util.getScaleFromResolution = function (resolution, units) {

    if (units == null) {
        units = "degrees";
    }

    var scale = resolution * OpenLayers.INCHES_PER_UNIT[units] *
                    OpenLayers.DOTS_PER_INCH;
    return scale;
};

/**
 * Function: safeStopPropagation
 * Deprecated.
 * 
 * This function has been deprecated. Please use directly 
 *     OpenLayers.Event.stop() passing 'true' as the 2nd 
 *     argument (preventDefault)
 * 
 * Safely stop the propagation of an event *without* preventing
 *   the default browser action from occurring.
 * 
 * Parameter:
 * evt - {Event}
 */
OpenLayers.Util.safeStopPropagation = function(evt) {
    OpenLayers.Event.stop(evt, true);
};

/**
 * Function: pagePositon
 * Calculates the position of an element on the page. 
 *
 * Parameters:
 * forElement - {DOMElement}
 * 
 * Return:�
 * {Array} two item array, L value then T value.
 */
OpenLayers.Util.pagePosition = function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      // Safari fix
      if (element.offsetParent==document.body)
        if (OpenLayers.Element.getStyle(element,'position')=='absolute') break;

    } while (element = element.offsetParent);

    element = forElement;
    do {
      valueT -= element.scrollTop  || 0;
      valueL -= element.scrollLeft || 0;
    } while (element = element.parentNode);

    return [valueL, valueT];
};


/** 
 * Function: isEquivalentUrl
 * Test two URLs for equivalence. 
 * 
 * Setting 'ignoreCase' allows for case-independent comparison.
 * 
 * Comparison is based on: 
 *  - Protocol
 *  - Host (evaluated without the port)
 *  - Port (set 'ignorePort80' to ignore "80" values)
 *  - Hash ( set 'ignoreHash' to disable)
 *  - Pathname (for relative <-> absolute comparison) 
 *  - Arguments (so they can be out of order)
 *  
 * Parameters:
 * url1 - {String}
 * url2 - {String}
 * options - {Object} Allows for customization of comparison:
 *                    'ignoreCase' - Default is True
 *                    'ignorePort80' - Default is True
 *                    'ignoreHash' - Default is True
 *
 * Return:
 * {Boolean} Whether or not the two URLs are equivalent
 */
OpenLayers.Util.isEquivalentUrl = function(url1, url2, options) {
    options = options || {};

    OpenLayers.Util.applyDefaults(options, {
        ignoreCase: true,
        ignorePort80: true,
        ignoreHash: true
    });

    urlObj1 = OpenLayers.Util.createUrlObject(url1, options);
    urlObj2 = OpenLayers.Util.createUrlObject(url2, options);

    //compare all keys (host, port, etc)
    for(var key in urlObj1) {
        if (options.test) {
            alert(key + "\n1:" + urlObj1[key] + "\n2:" + urlObj2[key]);
        }
        var val1 = urlObj1[key];
        var val2 = urlObj2[key];
        
        switch(key) {
            case "args":
                //do nothing, they'll be treated below
                break;
            case "host":
            case "port":
            case "protocol":
                if ((val1 == "") || (val2 == "")) {
                    //these will be blank for relative urls, so no need to 
                    // compare them here -- call break. 
                    // 
                    break;
                } 
                // otherwise continue with default compare
                //
            default: 
                if ( (key != "args") && (urlObj1[key] != urlObj2[key]) ) {
                    return false;
                }
                break;
        }
        
    }

    // compare search args - irrespective of order
    for(var key in urlObj1.args) {
        if(urlObj1.args[key] != urlObj2.args[key]) {
            return false;
        }
        delete urlObj2.args[key];
    }
    // urlObj2 shouldn't have any args left
    for(var key in urlObj2.args) {
        return false;
    }
    
    return true;
};

/**
 * Function: createUrlObject
 * 
 * Parameters:
 * url - {String}
 * options - {Object} A hash of options.  Can be one of:
 *            ignoreCase: lowercase url,
 *            ignorePort80: don't include explicit port if port is 80,
 *            ignoreHash: Don't include part of url after the hash (#).
 * 
 * Return:
 * {Object} An object with separate url, a, port, host, and args parsed out 
 *          and ready for comparison
 */
OpenLayers.Util.createUrlObject = function(url, options) {
    options = options || {};

    var urlObject = {};
  
    if (options.ignoreCase) {
        url = url.toLowerCase(); 
    }

    var a = document.createElement('a');
    a.href = url;
    
  //host (without port)
    urlObject.host = a.host;
    var port = a.port;
    if (port.length <= 0) {
        var newHostLength = urlObject.host.length - (port.length);
        urlObject.host = urlObject.host.substring(0, newHostLength); 
    }

  //protocol
    urlObject.protocol = a.protocol;  

  //port
    urlObject.port = ((port == "80") && (options.ignorePort80)) ? "" : port;
                                                                     
  //hash
    urlObject.hash = (options.ignoreHash) ? "" : a.hash;  
    
  //args
    var queryString = a.search;
    if (!queryString) {
        var qMark = url.indexOf("?");
        queryString = (qMark != -1) ? url.substr(qMark) : "";
    }
    urlObject.args = OpenLayers.Util.getArgs(queryString);


  //pathname (this part allows for relative <-> absolute comparison)
    if ( ((urlObject.protocol == "file:") && (url.indexOf("file:") != -1)) || 
         ((urlObject.protocol != "file:") && (urlObject.host != "")) ) {

        urlObject.pathname = a.pathname;  

        //Test to see if the pathname includes the arguments (Opera)
        var qIndex = urlObject.pathname.indexOf("?");
        if (qIndex != -1) {
            urlObject.pathname = urlObject.pathname.substring(0, qIndex);
        }

    } else {
        var relStr = OpenLayers.Util.removeTail(url);

        var backs = 0;
        do {
            var index = relStr.indexOf("../");

            if (index == 0) {
                backs++
                relStr = relStr.substr(3);
            } else if (index >= 0) {
                var prevChunk = relStr.substr(0,index - 1);
                
                var slash = prevChunk.indexOf("/");
                prevChunk = (slash != -1) ? prevChunk.substr(0, slash +1)
                                          : "";
                
                var postChunk = relStr.substr(index + 3);                
                relStr = prevChunk + postChunk;
            }
        } while(index != -1)

        var windowAnchor = document.createElement("a");
        var windowUrl = window.location.href;
        if (options.ignoreCase) {
            windowUrl = windowUrl.toLowerCase();
        }
        windowAnchor.href = windowUrl;

      //set protocol of window
        urlObject.protocol = windowAnchor.protocol;

        var splitter = (windowAnchor.pathname.indexOf("/") != -1) ? "/" : "\\";
        var dirs = windowAnchor.pathname.split(splitter);
        dirs.pop(); //remove filename
        while ((backs > 0) && (dirs.length > 0)) {
            dirs.pop();
            backs--;
        }
        relStr = dirs.join("/") + "/"+ relStr;
        urlObject.pathname = relStr;
    }
    
    if ((urlObject.protocol == "file:") || (urlObject.protocol == "")) {
        urlObject.host = "localhost";
    }

    return urlObject; 
};
 
/**
 * Function: removeTail
 * Takes a url and removes everything after the ? and #
 * 
 * Parameters:
 * url - {String} The url to process
 * 
 * Return:
 * {String} The string with all queryString and Hash removed
 */
OpenLayers.Util.removeTail = function(url) {
    var head = null;
    
    var qMark = url.indexOf("?");
    var hashMark = url.indexOf("#");

    if (qMark == -1) {
        head = (hashMark != -1) ? url.substr(0,hashMark) : url;
    } else {
        head = (hashMark != -1) ? url.substr(0,Math.min(qMark, hashMark)) 
                                  : url.substr(0, qMark);
    }
    return head;
};


/**
 * Function: getBrowserName
 * 
 * Return:
 * {String} A string which specifies which is the current 
 *          browser in which we are running. 
 * 
 *          Currently-supported browser detection and codes:
 *           * 'opera' -- Opera
 *           * 'msie'  -- Internet Explorer
 *           * 'safari' -- Safari
 *           * 'firefox' -- FireFox
 *           * 'mozilla' -- Mozilla
 * 
 *          If we are unable to property identify the browser, we 
 *           return an empty string.
 */
OpenLayers.Util.getBrowserName = function() {
    var browserName = "";
    
    var ua = navigator.userAgent.toLowerCase();
    if ( ua.indexOf( "opera" ) != -1 ) {
        browserName = "opera";
    } else if ( ua.indexOf( "msie" ) != -1 ) {
        browserName = "msie";
    } else if ( ua.indexOf( "safari" ) != -1 ) {
        browserName = "safari";
    } else if ( ua.indexOf( "mozilla" ) != -1 ) {
        if ( ua.indexOf( "firefox" ) != -1 ) {
            browserName = "firefox";
        } else {
            browserName = "mozilla";
        }
    }
    
    return browserName;
};
/* ======================================================================
    OpenLayers/BaseTypes.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */

/**
 * Header: OpenLayers Base Types
 * Modifications to standard JavaScript types are described here.
 */

/*********************
 *                   *
 *      STRING       * 
 *                   * 
 *********************/


/**
 * APIMethod: String.startsWith
 * Whether or not a string starts with another string. 
 * 
 * Parameters:
 * sStart - {Sring} The string we're testing for.
 *  
 * Return:
 * {Boolean} Whether or not this string starts with the string passed in.
 */
String.prototype.startsWith = function(sStart) {
    return (this.substr(0,sStart.length) == sStart);
};

/**
 * APIMethod: String.contains
 * Whether or not a string contains another string.
 * 
 * Parameters:
 * str - {String} The string that we're testing for.
 * 
 * Return:
 * {Boolean} Whether or not this string contains with the string passed in.
 */
String.prototype.contains = function(str) {
    return (this.indexOf(str) != -1);
};

/**
 * APIMethod: String.trim
 * Removes leading and trailing whitespace characters from a string.
 * 
 * Return:
 * {String} A trimmed version of the string - all leading and 
 *          trailing spaces removed
 */
String.prototype.trim = function() {
    
    var b = 0;
    while(this.substr(b,1) == " ") {
        b++;
    }
    
    var e = this.length - 1;
    while(this.substr(e,1) == " ") {
        e--;
    }
    
    return this.substring(b, e+1);
};

/**
 * APIMethod: String.indexOf
 * Index of a character in a string.
 * 
 * Parameters:
 * object - {Object} Can be a string or a number
 * 
 * Return: 
 * {Integer} The index of the encountered object, or -1 if not found.
 */
String.indexOf = function(object) {
    var index = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i] == object) {
            index = i;
            break;
        }
    }
    return index;
};

/**
 * APIMethod: camelize
 * Camel-case a hyphenated string. 
 *     Ex. "chicken-head" becomes "chickenHead", and
 *     "-chicken-head" becomes "ChickenHead".
 * 
 * Return:
 * {String} The string, camelized
 */
String.prototype.camelize = function() {
    var oStringList = this.split('-');
    var camelizedString = oStringList[0];
    for (var i = 1; i < oStringList.length; i++) {
        var s = oStringList[i];
        camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
    }
    return camelizedString;
};


/*********************
 *                   *
 *      NUMBER       * 
 *                   * 
 *********************/

/**
 * APIMethod: Number.limitSigDigs
 * Limit the number of significant digits on an integer. Does *not* work 
 *     with floats!
 * 
 * Parameters:
 * sig - {Integer}
 * 
 * Return:
 * {Integer} The number, rounded to the specified number of significant digits.
 *           If null, 0, or negative value passed in, returns 0
 */
Number.prototype.limitSigDigs = function(sig) {
    var number = (sig > 0) ? this.toString() : 0;
    if (sig < number.length) {
        var exp = number.length - sig;
        number = Math.round( this / Math.pow(10, exp)) * Math.pow(10, exp);
    }
    return parseInt(number);
}


/*********************
 *                   *
 *      FUNCTION     * 
 *                   * 
 *********************/

/**
 * APIMethod: Function.bind
 * Bind a function to an object. 
 * Method to easily create closures with 'this' altered.
 * 
 * Parameters:
 * object - {Object} the this parameter
 * 
 * Return:
 * {Function} A closure with 'this' altered to the first
 *            argument.
 */
Function.prototype.bind = function() {
    var __method = this;
    var args = [];
    var object = arguments[0];
    
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    
    return function(moreargs) {
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return __method.apply(object, args);
    };
};

/**
 * APIMethod: Function.bindAsEventListener
 * Bind a function to an object, and configure it to receive the event object
 *     as first parameter when called. 
 * 
 * Parameters:
 * object - {Object} A reference to this.
 * 
 * Return:
 * {Function}
 */
Function.prototype.bindAsEventListener = function(object) {
    var __method = this;
    return function(event) {
        return __method.call(object, event || window.event);
    };
};
/* ======================================================================
    OpenLayers/BaseTypes/Class.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */

/**
 * Constructor: OpenLayers.Class
 * Base class used to construct all other classes. Includes support for 
 *     multiple inheritance. 
 *     
 * This constructor is new in OpenLayers 2.5.  At OpenLayers 3.0, the old 
 *     syntax for creating classes and dealing with inheritance 
 *     will be removed.
 * 
 * To create a new OpenLayers-style class, use the following syntax:
 * > var MyClass = OpenLayers.Class(prototype);
 *
 * To create a new OpenLayers-style class with multiple inheritance, use the
 *     following syntax:
 * > var MyClass = OpenLayers.Class(Class1, Class2, prototype);
 *
 */
OpenLayers.Class = function() {
    var Class = function() {
        /**
         * This following condition can be removed at 3.0 - this is only for
         * backwards compatibility while the Class.inherit method is still
         * in use.  So at 3.0, the following three lines would be replaced with
         * simply:
         * this.initialize.apply(this, arguments);
         */
        if (arguments && arguments[0] != OpenLayers.Class.isPrototype) {
            this.initialize.apply(this, arguments);
        }
    }
    var extended = {};
    var parent;
    for(var i=0; i<arguments.length; ++i) {
        if(typeof arguments[i] == "function") {
            // get the prototype of the superclass
            parent = arguments[i].prototype;
        } else {
            // in this case we're extending with the prototype
            parent = arguments[i];
        }
        OpenLayers.Util.extend(extended, parent);
    }
    Class.prototype = extended;
    return Class;
}

/**
 * Property: isPrototype
 * *Deprecated*.  This is no longer needed and will be removed at 3.0.
 */
OpenLayers.Class.isPrototype = function () {};

/**
 * APIFunction: OpenLayers.create
 * *Deprecated*.  Old method to create an OpenLayers style class.  Use the
 *     <OpenLayers.Class> constructor instead.
 *
 * Return:
 * An OpenLayers class
 */
OpenLayers.Class.create = function() {
    return function() {
        if (arguments && arguments[0] != OpenLayers.Class.isPrototype)
            this.initialize.apply(this, arguments);
    }
}


/**
 * APIFunction: inherit
 * *Deprecated*.  Old method to inherit from one or more OpenLayers style
 *     classes.  Use the <OpenLayers.Class> constructor instead.
 *
 * Parameters:
 * class - One or more classes can be provided as arguments
 *
 * Return:
 * An object prototype
 */
OpenLayers.Class.inherit = function () {
    var superClass = arguments[0];
    var proto = new superClass(OpenLayers.Class.isPrototype);
    for (var i = 1; i < arguments.length; i++) {
        if (typeof arguments[i] == "function") {
            var mixin = arguments[i];
            arguments[i] = new mixin(OpenLayers.Class.isPrototype);
        }
        OpenLayers.Util.extend(proto, arguments[i]);
    }
    return proto;
}
/* ======================================================================
    OpenLayers/BaseTypes/Size.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */

/**
 * Class: OpenLayers.Size
 * Instances of this class represent a width/height pair
 */
OpenLayers.Size = OpenLayers.Class({

    /**
     * APIProperty: w
     * {Number} width
     */
    w: 0.0,
    
    /**
     * APIProperty: h
     * {Number} height
     */
    h: 0.0,


    /**
     * Constructor: OpenLayers.Size
     * Create an instance of OpenLayers.Size
     *
     * Parameters:
     * w - {Number} width
     * h - {Number} height
     */
    initialize: function(w, h) {
        this.w = parseFloat(w);
        this.h = parseFloat(h);
    },

    /**
     * Method: toString
     * Return the string representation of a size object
     *
     * Return:
     * {String} The string representation of OpenLayers.Size object. 
     * (ex. <i>"w=55,h=66"</i>)
     */
    toString:function() {
        return ("w=" + this.w + ",h=" + this.h);
    },

    /**
     * APIMethod: clone
     * Create a clone of this size object
     *
     * Return:
     * {<OpenLayers.Size>} A new OpenLayers.Size object with the same w and h
     * values
     */
    clone:function() {
        return new OpenLayers.Size(this.w, this.h);
    },

    /**
     *
     * APIMethod: equals
     * Determine where this size is equal to another
     *
     * Parameters:
     * sz - {<OpenLayers.Size>}
     *
     * Return: 
     * {Boolean} The passed in size has the same h and w properties as this one.
     * Note that if sz passed in is null, returns false.
     *
     */
    equals:function(sz) {
        var equals = false;
        if (sz != null) {
            equals = ((this.w == sz.w && this.h == sz.h) ||
                      (isNaN(this.w) && isNaN(this.h) && isNaN(sz.w) && isNaN(sz.h)));
        }
        return equals;
    },

    CLASS_NAME: "OpenLayers.Size"
});
/* ======================================================================
    OpenLayers/BaseTypes/Bounds.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */

/**
 * Class: OpenLayers.Bounds
 * Instances of this class represent bounding boxes.  Data stored as left,
 * bottom, right, top floats
 */
OpenLayers.Bounds = OpenLayers.Class({

    /**
     * Property: left
     * {Number}
     */
    left: 0.0,

    /**
     * Property: bottom
     * {Number}
     */
    bottom: 0.0,

    /**
     * Property: right
     * {Number}
     */
    right: 0.0,

    /**
     * Property: top
     * {Number}
     */
    top: 0.0,    

    /**
     * Constructor: OpenLayers.Bounds
     * Construct a new bounds object.
     *
     * Parameters:
     * left - {Number} The left bounds of the box.  Note that for width
     *        calculations, this is assumed to be less than the right value.
     * bottom - {Number} The bottom bounds of the box.  Note that for height
     *          calculations, this is assumed to be more than the top value.
     * right - {Number} The right bounds.
     * top - {Number} The top bounds.
     */
    initialize: function(left, bottom, right, top) {
        this.left = parseFloat(left);
        this.bottom = parseFloat(bottom);
        this.right = parseFloat(right);
        this.top = parseFloat(top);
    },

    /**
     * Method: clone
     * Create a cloned instance of this bounds.
     *
     * Return:
     * {<OpenLayers.Bounds>} A fresh copy of the bounds
     */
    clone:function() {
        return new OpenLayers.Bounds(this.left, this.bottom, 
                                     this.right, this.top);
    },

    /**
     * Method: equals
     * Test a two bounds for equivalence
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     *
     * Return:
     * {Boolean} The passed-in OpenLayers.Bounds object has the same left,
     *           right, top, bottom components as this.  Note that if bounds 
     *           passed in is null, returns false.
     */
    equals:function(bounds) {
        var equals = false;
        if (bounds != null) {
            equals = ((this.left == bounds.left) && 
                      (this.right == bounds.right) &&
                      (this.top == bounds.top) && 
                      (this.bottom == bounds.bottom));
        }
        return equals;
    },

    /** 
     * APIMethod: toString
     * 
     * Return:
     * {String} String representation of OpenLayers.Bounds object. 
     *          (ex.<i>"left-bottom=(5,42) right-top=(10,45)"</i>)
     */
    toString:function() {
        return ( "left-bottom=(" + this.left + "," + this.bottom + ")"
                 + " right-top=(" + this.right + "," + this.top + ")" );
    },

    /** 
     * APIMethod: toBBOX
     * 
     * Parameters:
     * decimal - {Integer} How many significant digits in the bbox coords?
     *                     Default is 6
     * 
     * Return:
     * {String} Simple String representation of OpenLayers.Bounds object.
     *          (ex. <i>"5,42,10,45"</i>)
     */
    toBBOX:function(decimal) {
        if (decimal== null) {
            decimal = 6; 
        }
        var mult = Math.pow(10, decimal);
        var bbox = Math.round(this.left * mult) / mult + "," + 
                   Math.round(this.bottom * mult) / mult + "," + 
                   Math.round(this.right * mult) / mult + "," + 
                   Math.round(this.top * mult) / mult;

        return bbox;
    },
    
    /**
     * APIMethod: getWidth
     * 
     * Return:
     * {Float} The width of the bounds
     */
    getWidth:function() {
        return (this.right - this.left);
    },

    /**
     * APIMethod: getHeight
     * 
     * Return:
     * {Float} The height of the bounds
     */
    getHeight:function() {
        return (this.top - this.bottom);
    },

    /**
     * APIMethod: getSize
     * 
     * Return:
     * {<OpenLayers.Size>} An <OpenLayers.Size> which represents the size of the box
     */
    getSize:function() {
        return new OpenLayers.Size(this.getWidth(), this.getHeight());
    },

    /**
     * APIMethod: getCenterPixel
     * 
     * Return:
     * {<OpenLayers.Pixel>} An <OpenLayers.Pixel> which represents the center 
     *                      of the bounds
     */
    getCenterPixel:function() {
        return new OpenLayers.Pixel( (this.left + this.right) / 2,
                                     (this.bottom + this.top) / 2);
    },

    /**
     * APIMethod: getCenterLonLat
     * 
     * Return:
     * {<OpenLayers.LonLat>} An <OpenLayers.LonLat> which represents the center 
     *                      of the bounds
     */
    getCenterLonLat:function() {
        return new OpenLayers.LonLat( (this.left + this.right) / 2,
                                      (this.bottom + this.top) / 2);
    },

    /**
     * APIMethod: add
     * 
     * Parameters:
     * x - {Float}
     * y - {Float}
     * 
     * Return:
     * {<OpenLayers.Bounds>} A new <OpenLayers.Bounds> whose coordinates are 
     *                       the same as this, but shifted by the passed-in 
     *                       x and y values
     */
    add:function(x, y) {
        if ( (x == null) || (y == null) ) {
            var msg = "You must pass both x and y values to the add function.";
            OpenLayers.Console.error(msg);
            return null;
        }
        return new OpenLayers.Bounds(this.left + x, this.bottom + y,
                                     this.right + x, this.top + y);
    },
    
    /**
     * APIMethod: extend
     * Extend the bounds to include the point, lonlat, or bounds specified.
     * Note: This function assumes that left<right and bottom<top.
     * 
     * 
     * Parameters: 
     * object - {Object} Can be LonLat, Point, or Bounds
     */
    extend:function(object) {
        var bounds = null;
        if (object) {
            switch(object.CLASS_NAME) {
                case "OpenLayers.LonLat":    
                    bounds = new OpenLayers.Bounds(object.lon, object.lat,
                                                    object.lon, object.lat);
                    break;
                case "OpenLayers.Geometry.Point":
                    bounds = new OpenLayers.Bounds(object.x, object.y,
                                                    object.x, object.y);
                    break;
                    
                case "OpenLayers.Bounds":    
                    bounds = object;
                    break;
            }
    
            if (bounds) {
               this.left = (bounds.left < this.left) ? bounds.left 
                                                     : this.left;
               this.bottom = (bounds.bottom < this.bottom) ? bounds.bottom 
                                                           : this.bottom;
               this.right = (bounds.right > this.right) ? bounds.right 
                                                        : this.right;
               this.top = (bounds.top > this.top) ? bounds.top 
                                                  : this.top;
            }
        }
    },

    /**
     * APIMethod: containsLonLat
     * 
     * Parameters:
     * ll - {<OpenLayers.LonLat>}
     * inclusive - {Boolean} Whether or not to include the border. 
     *                       Default is true.
     *
     * Return:
     * {Boolean} Whether or not the passed-in lonlat is within this bounds.
     */
    containsLonLat:function(ll, inclusive) {
        return this.contains(ll.lon, ll.lat, inclusive);
    },

    /**
     * APIMethod: containsPixel
     * 
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     * inclusive - {Boolean} Whether or not to include the border. 
     *                       Default is true.
     *
     * Return:
     * {Boolean} Whether or not the passed-in pixel is within this bounds.
     */
    containsPixel:function(px, inclusive) {
        return this.contains(px.x, px.y, inclusive);
    },
    
    /**
     * APIMethod: contains
     * 
     * Parameters:
     * x - {Float}
     * y - {Float}
     * inclusive - {Boolean} Whether or not to include the border. 
     *                       Default is true.
     *
     * Return:
     * {Boolean} Whether or not the passed-in coordinates are within this
     *           bounds.
     */
    contains:function(x, y, inclusive) {
    
        //set default
        if (inclusive == null) {
            inclusive = true;
        }
        
        var contains = false;
        if (inclusive) {
            contains = ((x >= this.left) && (x <= this.right) && 
                        (y >= this.bottom) && (y <= this.top));
        } else {
            contains = ((x > this.left) && (x < this.right) && 
                        (y > this.bottom) && (y < this.top));
        }              
        return contains;
    },

    /**
     * APIMethod: intersectsBounds
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * inclusive - {<Boolean>} Whether or not to include the border. 
     *                         Default is true.
     *
     * Return:
     * {Boolean} Whether or not the passed-in OpenLayers.Bounds object 
     *           intersects this bounds. Simple math just check if either 
     *           contains the other, allowing for partial.
     */
    intersectsBounds:function(bounds, inclusive) {

        if (inclusive == null) {
            inclusive = true;
        }
        var inBottom = (bounds.bottom == this.bottom && bounds.top == this.top) ?
                    true : (((bounds.bottom > this.bottom) && (bounds.bottom < this.top)) || 
                           ((this.bottom > bounds.bottom) && (this.bottom < bounds.top))); 
        var inTop = (bounds.bottom == this.bottom && bounds.top == this.top) ?
                    true : (((bounds.top > this.bottom) && (bounds.top < this.top)) ||
                           ((this.top > bounds.bottom) && (this.top < bounds.top))); 
        var inRight = (bounds.right == this.right && bounds.left == this.left) ?
                    true : (((bounds.right > this.left) && (bounds.right < this.right)) ||
                           ((this.right > bounds.left) && (this.right < bounds.right))); 
        var inLeft = (bounds.right == this.right && bounds.left == this.left) ?
                    true : (((bounds.left > this.left) && (bounds.left < this.right)) || 
                           ((this.left > bounds.left) && (this.left < bounds.right))); 

        return (this.containsBounds(bounds, true, inclusive) ||
                bounds.containsBounds(this, true, inclusive) ||
                ((inTop || inBottom ) && (inLeft || inRight )));
    },
    
    /**
     * APIMethod: containsBounds
     * 
     * bounds - {<OpenLayers.Bounds>}
     * partial - {<Boolean>} If true, only part of passed-in 
     *                       <OpenLayers.Bounds> needs be within this bounds. 
     *                       If false, the entire passed-in bounds must be
     *                       within. Default is false
     * inclusive - {<Boolean>} Whether or not to include the border. 
     *                         Default is true.
     *
     * Return:
     * {Boolean} Whether or not the passed-in OpenLayers.Bounds object is 
     *           contained within this bounds. 
     */
    containsBounds:function(bounds, partial, inclusive) {

        //set defaults
        if (partial == null) {
            partial = false;
        }
        if (inclusive == null) {
            inclusive = true;
        }

        var inLeft;
        var inTop;
        var inRight;
        var inBottom;
        
        if (inclusive) {
            inLeft = (bounds.left >= this.left) && (bounds.left <= this.right);
            inTop = (bounds.top >= this.bottom) && (bounds.top <= this.top);
            inRight= (bounds.right >= this.left) && (bounds.right <= this.right);
            inBottom = (bounds.bottom >= this.bottom) && (bounds.bottom <= this.top);
        } else {
            inLeft = (bounds.left > this.left) && (bounds.left < this.right);
            inTop = (bounds.top > this.bottom) && (bounds.top < this.top);
            inRight= (bounds.right > this.left) && (bounds.right < this.right);
            inBottom = (bounds.bottom > this.bottom) && (bounds.bottom < this.top);
        }
        
        return (partial) ? (inTop || inBottom ) && (inLeft || inRight ) 
                         : (inTop && inLeft && inBottom && inRight);
    },

    /** 
     * APIMethod: determineQuadrant
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     * 
     * Return:
     * {String} The quadrant ("br" "tr" "tl" "bl") of the bounds in which 
     *          the coordinate lies.
     */
    determineQuadrant: function(lonlat) {
    
        var quadrant = "";
        var center = this.getCenterLonLat();
        
        quadrant += (lonlat.lat < center.lat) ? "b" : "t";
        quadrant += (lonlat.lon < center.lon) ? "l" : "r";
    
        return quadrant; 
    },

    /**
     * APIMethod: wrapDateLine
     *  
     * Parameters:
     * maxExtent - {<OpenLayers.Bounds>}
     * options - {Object} Some possible options are:
     *                    leftTolerance - {float} Allow for a margin of error 
     *                                            with the 'left' value of this 
     *                                            bound.
     *                                            Default is 0.
     *                    rightTolerance - {float} Allow for a margin of error 
     *                                             with the 'right' value of 
     *                                             this bound.
     *                                             Default is 0.
     * 
     * Return:
     * {<OpenLayers.Bounds>} A copy of this bounds, but wrapped around the 
     *                       "dateline" (as specified by the borders of 
     *                       maxExtent). Note that this function only returns 
     *                       a different bounds value if this bounds is 
     *                       *entirely* outside of the maxExtent. If this 
     *                       bounds straddles the dateline (is part in/part 
     *                       out of maxExtent), the returned bounds will be 
     *                       merely a copy of this one.
     */
    wrapDateLine: function(maxExtent, options) {    
        options = options || {};
        
        var leftTolerance = options.leftTolerance || 0;
        var rightTolerance = options.rightTolerance || 0;

        var newBounds = this.clone();
    
        if (maxExtent) {

           //shift right?
           while ( newBounds.left < maxExtent.left && 
                   (newBounds.right - rightTolerance) <= maxExtent.left ) { 
                newBounds = newBounds.add(maxExtent.getWidth(), 0);
           }

           //shift left?
           while ( (newBounds.left + leftTolerance) >= maxExtent.right && 
                   newBounds.right > maxExtent.right ) { 
                newBounds = newBounds.add(-maxExtent.getWidth(), 0);
           }
        }
                
        return newBounds;
    },

    CLASS_NAME: "OpenLayers.Bounds"
});

/** 
 * APIFunction: fromString
 * Alternative constructor that builds a new OpenLayers.Bounds from a 
 *     parameter string
 * 
 * Parameters: 
 * str - {String}Comma-separated bounds string. (ex. <i>"5,42,10,45"</i>)
 * 
 * Return:
 * {<OpenLayers.Bounds>} New <OpenLayers.Bounds> object built from the 
 *                       passed-in String.
 */
OpenLayers.Bounds.fromString = function(str) {
    var bounds = str.split(",");
    return OpenLayers.Bounds.fromArray(bounds);
};

/** 
 * APIFunction: fromArray
 * Alternative constructor that builds a new OpenLayers.Bounds
 *     from an array
 * 
 * Parameters:
 * bbox - {Array(Float)} Array of bounds values (ex. <i>[5,42,10,45]</i>)
 *
 * Return:
 * {<OpenLayers.Bounds>} New <OpenLayers.Bounds> object built from the 
 *                       passed-in Array.
 */
OpenLayers.Bounds.fromArray = function(bbox) {
    return new OpenLayers.Bounds(parseFloat(bbox[0]),
                                 parseFloat(bbox[1]),
                                 parseFloat(bbox[2]),
                                 parseFloat(bbox[3]));
};

/** 
 * APIFunction: fromSize
 * Alternative constructor that builds a new OpenLayers.Bounds
 *     from a size
 * 
 * Parameters:
 * size - {<OpenLayers.Size>} 
 *
 * Return:
 * {<OpenLayers.Bounds>} New <OpenLayers.Bounds> object built from the 
 *                       passed-in size.
 */
OpenLayers.Bounds.fromSize = function(size) {
    return new OpenLayers.Bounds(0,
                                 size.h,
                                 size.w,
                                 0);
};

/**
 * Function: oppositeQuadrant
 * Get the opposite quadrant for a given quadrant string.
 *
 * Parameters:
 * quadrant - {String} two character quadrant shortstring
 *
 * Return:
 * {String} The opposing quadrant ("br" "tr" "tl" "bl"). For Example, if 
 *          you pass in "bl" it returns "tr", if you pass in "br" it 
 *          returns "tl", etc.
 */
OpenLayers.Bounds.oppositeQuadrant = function(quadrant) {
    var opp = "";
    
    opp += (quadrant.charAt(0) == 't') ? 'b' : 't';
    opp += (quadrant.charAt(1) == 'l') ? 'r' : 'l';
    
    return opp;
};
/* ======================================================================
    OpenLayers/BaseTypes/Element.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */

/**
 * Namespace: OpenLayers.Element
 */
OpenLayers.Element = {

    /**
     * APIFunction: visible
     * 
     * Parameters: 
     * element - {DOMElement}
     * 
     * Return:
     * {Boolean} Is the element visible?
     */
    visible: function(element) {
        return OpenLayers.Util.getElement(element).style.display != 'none';
    },

    /**
     * APIFunction: toggle
     * Toggle the visibility of element(s) passed in
     * 
     * Parameters:
     * element - {DOMElement} Actually user can pass any number of elements
     */
    toggle: function() {
        for (var i = 0; i < arguments.length; i++) {
            var element = OpenLayers.Util.getElement(arguments[i]);
            var display = OpenLayers.Element.visible(element) ? 'hide' 
                                                              : 'show';
            OpenLayers.Element[display](element);
        }
    },


    /**
     * APIFunction: hide
     * Hide element(s) passed in
     * 
     * Parameters:
     * element - {DOMElement} Actually user can pass any number of elements
     */
    hide: function() {
        for (var i = 0; i < arguments.length; i++) {
            var element = OpenLayers.Util.getElement(arguments[i]);
            element.style.display = 'none';
        }
    },

    /**
     * APIFunction: show
     * Show element(s) passed in
     * 
     * Parameters:
     * element - {DOMElement} Actually user can pass any number of elements
     */
    show: function() {
        for (var i = 0; i < arguments.length; i++) {
            var element = OpenLayers.Util.getElement(arguments[i]);
            element.style.display = '';
        }
    },

    /**
     * APIFunction: remove
     * Remove the specified element from the DOM.
     * 
     * Parameters:
     * element - {DOMElement}
     */
    remove: function(element) {
        element = OpenLayers.Util.getElement(element);
        element.parentNode.removeChild(element);
    },

    /**
     * APIFunction: getHeight
     *  
     * Parameters:
     * element - {DOMElement}
     * 
     * Return:
     * {Integer} The offset height of the element passed in
     */
    getHeight: function(element) {
        element = OpenLayers.Util.getElement(element);
        return element.offsetHeight;
    },

    /**
     * APIFunction: getDimensions
     *  
     * Parameters:
     * element - {DOMElement}
     * 
     * Return:
     * {Object} Object with 'width' and 'height' properties which are the 
     *          dimensions of the element passed in.
     */
    getDimensions: function(element) {
        element = OpenLayers.Util.getElement(element);
        if (OpenLayers.Element.getStyle(element, 'display') != 'none') {
            return {width: element.offsetWidth, height: element.offsetHeight};
        }
    
        // All *Width and *Height properties give 0 on elements with display none,
        // so enable the element temporarily
        var els = element.style;
        var originalVisibility = els.visibility;
        var originalPosition = els.position;
        els.visibility = 'hidden';
        els.position = 'absolute';
        els.display = '';
        var originalWidth = element.clientWidth;
        var originalHeight = element.clientHeight;
        els.display = 'none';
        els.position = originalPosition;
        els.visibility = originalVisibility;
        return {width: originalWidth, height: originalHeight};
    },

    /**
     * APIFunction: getStyle
     * 
     * Parameters:
     * element - {DOMElement}
     * style - {?}
     * 
     * Return:
     * {?}
     */
    getStyle: function(element, style) {
        element = OpenLayers.Util.getElement(element);
        var value = element.style[style.camelize()];
        if (!value) {
            if (document.defaultView && 
                document.defaultView.getComputedStyle) {
                
                var css = document.defaultView.getComputedStyle(element, null);
                value = css ? css.getPropertyValue(style) : null;
            } else if (element.currentStyle) {
                value = element.currentStyle[style.camelize()];
            }
        }
    
        var positions = ['left', 'top', 'right', 'bottom'];
        if (window.opera &&
            (OpenLayers.Util.indexOf(positions,style) != -1) &&
            (OpenLayers.Element.getStyle(element, 'position') == 'static')) { 
            value = 'auto';
        }
    
        return value == 'auto' ? null : value;
    }

};
/* ======================================================================
    OpenLayers/BaseTypes/LonLat.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */

/**
 * Class: OpenLayers.LonLat
 * This class represents a longitude and latitude pair
 */
OpenLayers.LonLat = OpenLayers.Class({

    /** 
     * APIProperty: lon
     * {Float} The x-axis coodinate in map units
     */
    lon: 0.0,
    
    /** 
     * APIProperty: lat
     * {Float} The y-axis coordinate in map units
     */
    lat: 0.0,

    /**
     * Constructor: OpenLayers.LonLat
     * Create a new map location.
     *
     * Parameters:
     * lon - {Number} The x-axis coordinate in map units.  If your map is in
     *     a geographic projection, this will be the Longitude.  Otherwise,
     *     it will be the x coordinate of the map location in your map units.
     * lat - {Number} The y-axis coordinate in map units.  If your map is in
     *     a geographic projection, this will be the Latitude.  Otherwise,
     *     it will be the y coordinate of the map location in your map units.
     */
    initialize: function(lon, lat) {
        this.lon = parseFloat(lon);
        this.lat = parseFloat(lat);
    },
    
    /**
     * Method: toString
     * Return a readable string version of the lonlat
     *
     * Return:
     * {String} String representation of OpenLayers.LonLat object. 
     *           (ex. <i>"lon=5,lat=42"</i>)
     */
    toString:function() {
        return ("lon=" + this.lon + ",lat=" + this.lat);
    },

    /** 
     * APIMethod: toShortString
     * 
     * Return:
     * {String} Shortened String representation of OpenLayers.LonLat object. 
     *         (ex. <i>"5, 42"</i>)
     */
    toShortString:function() {
        return (this.lon + ", " + this.lat);
    },

    /** 
     * APIMethod: clone
     * 
     * Return:
     * {<OpenLayers.LonLat>} New OpenLayers.LonLat object with the same lon 
     *                       and lat values
     */
    clone:function() {
        return new OpenLayers.LonLat(this.lon, this.lat);
    },

    /** 
     * APIMethod: add
     * 
     * Parameters:
     * lon - {Float}
     * lat - {Float}
     * 
     * Return:
     * {<OpenLayers.LonLat>} A new OpenLayers.LonLat object with the lon and 
     *                       lat passed-in added to this's. 
     */
    add:function(lon, lat) {
        if ( (lon == null) || (lat == null) ) {
            var msg = "You must pass both lon and lat values " +
                      "to the add function.";
            OpenLayers.Console.error(msg);
            return null;
        }
        return new OpenLayers.LonLat(this.lon + lon, this.lat + lat);
    },

    /** 
     * APIMethod: equals
     * 
     * Parameters:
     * ll - {<OpenLayers.LonLat>}
     * 
     * Return:
     * {Boolean} Boolean value indicating whether the passed-in 
     *           <OpenLayers.LonLat> object has the same lon and lat 
     *           components as this.
     *           Note: if ll passed in is null, returns false
     */
    equals:function(ll) {
        var equals = false;
        if (ll != null) {
            equals = ((this.lon == ll.lon && this.lat == ll.lat) ||
                      (isNaN(this.lon) && isNaN(this.lat) && isNaN(ll.lon) && isNaN(ll.lat)));
        }
        return equals;
    },
    
    /**
     * APIMethod: wrapDateLine
     * 
     * Parameters:
     * maxExtent - {<OpenLayers.Bounds>}
     * 
     * Return:
     * {<OpenLayers.LonLat>} A copy of this lonlat, but wrapped around the 
     *                       "dateline" (as specified by the borders of 
     *                       maxExtent)
     */
    wrapDateLine: function(maxExtent) {    

        var newLonLat = this.clone();
    
        if (maxExtent) {
            //shift right?
            while (newLonLat.lon < maxExtent.left) {
                newLonLat.lon +=  maxExtent.getWidth();
            }    
           
            //shift left?
            while (newLonLat.lon > maxExtent.right) {
                newLonLat.lon -= maxExtent.getWidth();
            }    
        }
                
        return newLonLat;
    },

    CLASS_NAME: "OpenLayers.LonLat"
});

/** 
 * Function: fromString
 * Alternative constructor that builds a new <OpenLayers.LonLat> from a 
 *     parameter string
 * 
 * Parameters:
 * str - {String} Comma-separated Lon,Lat coordinate string. 
 *                 (ex. <i>"5,40"</i>)
 * 
 * Return:
 * {<OpenLayers.LonLat>} New <OpenLayers.LonLat> object built from the 
 *                       passed-in String.
 */
OpenLayers.LonLat.fromString = function(str) {
    var pair = str.split(",");
    return new OpenLayers.LonLat(parseFloat(pair[0]), 
                                 parseFloat(pair[1]));
};
/* ======================================================================
    OpenLayers/BaseTypes/Pixel.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */

/**
 * Class: OpenLayers.Pixel
 * This class represents a screen coordinate, in x and y coordinates
 */
OpenLayers.Pixel = OpenLayers.Class({
    
    /**
     * APIProperty: x
     * {Number} The x coordinate
     */
    x: 0.0,

    /**
     * APIProperty: y
     * {Number} The y coordinate
     */
    y: 0.0,
    
    /**
     * Constructor: OpenLayers.Pixel
     * Create a new OpenLayers.Pixel instance
     *
     * Parameters:
     * x - {Number} The x coordinate
     * y - {Number} The y coordinate
     *
     * Return:
     * An instance of OpenLayers.Pixel
     */
    initialize: function(x, y) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    },
    
    /**
     * Method: toString
     * Cast this object into a string
     *
     * Return:
     * {String} The string representation of Pixel. ex: "x=200.4,y=242.2"
     */
    toString:function() {
        return ("x=" + this.x + ",y=" + this.y);
    },

    /**
     * APIMethod: clone
     * Return a clone of this pixel object
     *
     * Return:
     * {<OpenLayers.Pixel>} A clone pixel
     */
    clone:function() {
        return new OpenLayers.Pixel(this.x, this.y); 
    },
    
    /**
     * APIMethod: equals
     * Determine whether one pixel is equivalent to another
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     *
     * Return:
     * {Boolean} The point passed in as parameter is equal to this. Note that
     * if px passed in is null, returns false.
     */
    equals:function(px) {
        var equals = false;
        if (px != null) {
            equals = ((this.x == px.x && this.y == px.y) ||
                      (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y)));
        }
        return equals;
    },

    /**
     * APIMethod: add
     *
     * Parameters:
     * x - {Integer}
     * y - {Integer}
     *
     * Return:
     * {<OpenLayers.Pixel>} A new Pixel with this pixel's x&y augmented by the 
     * values passed in.
     */
    add:function(x, y) {
        if ( (x == null) || (y == null) ) {
            var msg = "You must pass both x and y values to the add function.";
            OpenLayers.Console.error(msg);
            return null;
        }
        return new OpenLayers.Pixel(this.x + x, this.y + y);
    },

    /**
    * APIMethod: offset
    * 
    * Parameters
    * px - {<OpenLayers.Pixel>}
    * 
    * Return:
    * {<OpenLayers.Pixel>} A new Pixel with this pixel's x&y augmented by the 
    *                      x&y values of the pixel passed in.
    */
    offset:function(px) {
        var newPx = this.clone();
        if (px) {
            newPx = this.add(px.x, px.y);
        }
        return newPx;
    },

    CLASS_NAME: "OpenLayers.Pixel"
});
/* ======================================================================
    OpenLayers/Ajax.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */


OpenLayers.ProxyHost = "";
//OpenLayers.ProxyHost = "examples/proxy.cgi?url=";

/**
 * Ajax reader for OpenLayers
 *
 *  @uri url to do remote XML http get
 *  @param {String} 'get' format params (x=y&a=b...)
 *  @who object to handle callbacks for this request
 *  @complete  the function to be called on success 
 *  @failure  the function to be called on failure
 *  
 *   example usage from a caller:
 *  
 *     caps: function(request) {
 *      -blah-  
 *     },
 *  
 *     OpenLayers.loadURL(url,params,this,caps);
 *
 * Notice the above example does not provide an error handler; a default empty
 * handler is provided which merely logs the error if a failure handler is not 
 * supplied
 *
 */


/** 
* @param {} request
*/
OpenLayers.nullHandler = function(request) {
    alert("Unhandled request return " + request.statusText);
};

/** 
 * Function: loadURL
 * Background load a document.
 *
 * Parameters:
 * uri - {String} URI of source doc
 * params - {String} Params on get (doesnt seem to work)
 * caller - {Object} object which gets callbacks
 * onComplete - {Function} callback for success
 * onFailure - {Function} callback for failure
 *
 * Both callbacks optional (though silly)
 */
OpenLayers.loadURL = function(uri, params, caller,
                                  onComplete, onFailure) {

    if (OpenLayers.ProxyHost && uri.startsWith("http")) {
        uri = OpenLayers.ProxyHost + escape(uri);
    }

    var success = (onComplete) ? onComplete.bind(caller)
                                : OpenLayers.nullHandler;

    var failure = (onFailure) ? onFailure.bind(caller)
                           : OpenLayers.nullHandler;

    // from prototype.js
    new OpenLayers.Ajax.Request(uri, 
                     {   method: 'get', 
                         parameters: params,
                         onComplete: success, 
                         onFailure: failure
                      }
                     );
};

/** 
 * Function: parseXMLString
 * Parse XML into a doc structure
 * 
 * Parameters:
 * text - {String} 
 * 
 * Return:
 * {?} Parsed AJAX Responsev
 */
OpenLayers.parseXMLString = function(text) {

    //MS sucks, if the server is bad it dies
    var index = text.indexOf('<');
    if (index > 0) {
        text = text.substring(index);
    }

    var ajaxResponse = OpenLayers.Util.Try(
        function() {
            var xmldom = new ActiveXObject('Microsoft.XMLDOM');
            xmldom.loadXML(text);
            return xmldom;
        },
        function() {
            return new DOMParser().parseFromString(text, 'text/xml');
        },
        function() {
            var req = new XMLHttpRequest();
            req.open("GET", "data:" + "text/xml" +
                     ";charset=utf-8," + encodeURIComponent(text), false);
            if (req.overrideMimeType) {
                req.overrideMimeType("text/xml");
            }
            req.send(null);
            return req.responseXML;
        }
    );

    return ajaxResponse;
};


/**
 * Namespace: OpenLayers.Ajax
 */
OpenLayers.Ajax = {

    /**
     * Method: emptyFunction
     */
    emptyFunction: function () {},

    /**
     * Method: getTransport
     * 
     * Return: 
     * {Object} Transport mechanism for whichever browser we're in, or false if
     *          none available.
     */
    getTransport: function() {
        return OpenLayers.Util.Try(
            function() {return new ActiveXObject('Msxml2.XMLHTTP')},
            function() {return new ActiveXObject('Microsoft.XMLHTTP')},
            function() {return new XMLHttpRequest()}
        ) || false;
    },

    /**
     * Property: activeRequestCount
     * {Integer}
     */
    activeRequestCount: 0
};

/**
 * Namespace: OpenLayers.Ajax.Responders
 * {Object}
 */
OpenLayers.Ajax.Responders = {
  
    /**
     * Property: responders
     * {Array}
     */
    responders: [],

    /**
     * Method: register
     *  
     * Parameters:
     * responderToAdd - {?}
     */
    register: function(responderToAdd) {
      for (var i = 0; i < this.responders.length; i++)
          if (responderToAdd == this.responders[i])
              return;
      this.responders.push(responderToAdd);
    },

    /**
     * Method: dispatch
     * 
     * Parameters:
     * callback - {?}
     * request - {?}
     * transport - {?}
     * json - {?}
     */
    dispatch: function(callback, request, transport, json) {
        var responder;
        for (var i = 0; i < this.responders.length; i++) {
            responder = this.responders[i];
     
            if (responder[callback] && 
                typeof responder[callback] == 'function') {
                try {
                    responder[callback].apply(responder, 
                                              [request, transport, json]);
                } catch (e) {}
            }
        }
    }
};

OpenLayers.Ajax.Responders.register({
    /** 
     * Function: onCreate
     */
    onCreate: function() {
        OpenLayers.Ajax.activeRequestCount++;
    },

    /**
     * Function: onComplete
     */
     onComplete: function() {
         OpenLayers.Ajax.activeRequestCount--;
     }
});

/**
 * Namespace: OpenLayers.Ajax.Base
 * {Object}
 */
OpenLayers.Ajax.Base = function() {};
OpenLayers.Ajax.Base.prototype = {

    /**
     * Function: setOptions
     * 
     * Parameters:
     * options - {Object}
     */
    setOptions: function(options) {
        this.options = {
            'method': 'post',
            'asynchronous': true,
            'parameters': ''
        };
        OpenLayers.Util.extend(this.options, options || {});
    },

    /**
     * Function: responseIsSuccess
     * 
     * Return:
     * {Boolean}
     */
    responseIsSuccess: function() {
        return this.transport.status == undefined || 
               this.transport.status == 0 || 
               (this.transport.status >= 200 && this.transport.status < 300);
    },

    /**
     * Function: responseIsFailure
     * 
     * Return:
     * {Boolean}
     */
    responseIsFailure: function() {
        return !this.responseIsSuccess();
    }
};


/**
 * Class: OpenLayers.Ajax.Request
 *
 * Inherit:
 *  - <OpenLayers.Ajax.Base>
 */
OpenLayers.Ajax.Request = OpenLayers.Class(OpenLayers.Ajax.Base, {
      
      /**
       * Constructor: OpenLayers.Ajax.Request
       * 
       * Parameters: 
       * url - {String}
       * options - {Object}
       */
    initialize: function(url, options) {
        this.transport = OpenLayers.Ajax.getTransport();
        this.setOptions(options);
        this.request(url);
    },

    /**
     * Method: request
     * 
     * Parameters:
     * url - {String}
     */
    request: function(url) {
        var parameters = this.options.parameters || '';
        if (parameters.length > 0) parameters += '&_=';
    
        try {
            this.url = url;
            if (this.options.method == 'get' && parameters.length > 0) {
               this.url += (this.url.match(/\?/) ? '&' : '?') + parameters;
            }
            
            OpenLayers.Ajax.Responders.dispatch('onCreate', 
                                                this, 
                                                this.transport);
    
            this.transport.open(this.options.method, 
                                this.url,
                                this.options.asynchronous);
    
            if (this.options.asynchronous) {
                this.transport.onreadystatechange = 
                    this.onStateChange.bind(this);
                
                setTimeout((function() {
                    this.respondToReadyState(1)
                }).bind(this), 10);
            }
    
            this.setRequestHeaders();
    
            var body = this.options.postBody ? this.options.postBody 
                                             : parameters;
            this.transport.send(this.options.method == 'post' ? body : null);
    
            // Force Firefox to handle ready state 4 for synchronous requests
            if (!this.options.asynchronous && 
                this.transport.overrideMimeType) {
                
                this.onStateChange();
            }
    
        } catch (e) {
            this.dispatchException(e);
        }
    },
     
    /**
     * Method: setRequestHeaders
     */
    setRequestHeaders: function() {
        var requestHeaders = [
            'X-Requested-With',
            'XMLHttpRequest',
            'X-Prototype-Version',
            'OpenLayers'
        ];
    
        if (this.options.method == 'post' && !this.options.postBody) {
            requestHeaders.push('Content-type',
                                'application/x-www-form-urlencoded');
    
            // Force "Connection: close" for Mozilla browsers to work around
            // a bug where XMLHttpReqeuest sends an incorrect Content-length
            // header. See Mozilla Bugzilla #246651.
            if (this.transport.overrideMimeType) {
                requestHeaders.push('Connection', 'close');
            }
        }
    
        if (this.options.requestHeaders) {
            requestHeaders.push.apply(requestHeaders, 
                                      this.options.requestHeaders);
        }
          
        for (var i = 0; i < requestHeaders.length; i += 2) {
            this.transport.setRequestHeader(requestHeaders[i], 
                                            requestHeaders[i+1]);
        }
    },

    /**
     * Method: onStateChange
     */
    onStateChange: function() {
        var readyState = this.transport.readyState;
        if (readyState != 1) {
          this.respondToReadyState(this.transport.readyState);
        }
    },

    /** 
     * Method: header
     * 
     * Return:
     * {?}
     */
    header: function(name) {
        try {
            return this.transport.getResponseHeader(name);
        } catch (e) {}
    },

    /** 
     * Method: evalJSON
     * 
     * Return:
     * {?}
     */
    evalJSON: function() {
        try {
            return eval(this.header('X-JSON'));
        } catch (e) {}
    },

    /**
     * Method: evalResponse
     * 
     * Return: 
     * {?}
     */
    evalResponse: function() {
        try {
            return eval(this.transport.responseText);
        } catch (e) {
            this.dispatchException(e);
        }
    },

    /**
     * Method: respondToReadyState
     *
     * Parameters:
     * readyState - {?}
     */
    respondToReadyState: function(readyState) {
        var event = OpenLayers.Ajax.Request.Events[readyState];
        var transport = this.transport, json = this.evalJSON();
    
        if (event == 'Complete') {
            try {
                var responseSuccess = this.responseIsSuccess() ? 'Success'
                                                                : 'Failure';
                                                                 
                (this.options['on' + this.transport.status] ||
                 this.options['on' + responseSuccess] ||
                 OpenLayers.Ajax.emptyFunction)(transport, json);
            } catch (e) {
                this.dispatchException(e);
            }
    
            var contentType = this.header('Content-type') || '';
            if (contentType.match(/^text\/javascript/i)) {
                this.evalResponse();
            }
        }
    
        try {
            (this.options['on' + event] || 
             OpenLayers.Ajax.emptyFunction)(transport, json);
             OpenLayers.Ajax.Responders.dispatch('on' + event, 
                                                 this, 
                                                 transport, 
                                                 json);
        } catch (e) {
            this.dispatchException(e);
        }
    
        // Avoid memory leak in MSIE: clean up the oncomplete event handler
        if (event == 'Complete') {
            this.transport.onreadystatechange = OpenLayers.Ajax.emptyFunction;
        }
    },

    /**
     * Method: dispatchException
     * 
     * Parameters:
     * exception - {?}
     */
    dispatchException: function(exception) {
        if (this.options.onException) {
            this.options.onException(this, exception);
        } else {
            // if we get here, Responders.dispatch('onException') will never
            // be called. too bad. we should probably take out the Responders
            // stuff anyway.
            throw exception;
        }
        OpenLayers.Ajax.Responders.dispatch('onException', this, exception);
    }
    
});

/** 
 * Property: Events
 * {Array(String)}
 */
OpenLayers.Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

/**
 * Function: getElementsByTagNameNS
 * 
 * Parameters:
 * parentnode - {?}
 * nsuri - {?}
 * nsprefix - {?}
 * tagname - {?}
 * 
 * Return:
 * {?}
 */
OpenLayers.Ajax.getElementsByTagNameNS  = function(parentnode, nsuri, 
                                                   nsprefix, tagname) {
    var elem = null;
    if (parentnode.getElementsByTagNameNS) {
        elem = parentnode.getElementsByTagNameNS(nsuri, tagname);
    } else {
        elem = parentnode.getElementsByTagName(nsprefix + ':' + tagname);
    }
    return elem;
};


/**
 * Function: serializeXMLToString
 * Wrapper function around XMLSerializer, which doesn't exist/work in
 *     IE/Safari. We need to come up with a way to serialize in those browser:
 *     for now, these browsers will just fail. #535, #536
 *
 * Parameters: 
 * xmldom {XMLNode} xml dom to serialize
 * 
 * Return:
 * {?}
 */
OpenLayers.Ajax.serializeXMLToString = function(xmldom) {
    var serializer = new XMLSerializer();
    data = serializer.serializeToString(xmldom);
    return data;
}
/* ======================================================================
    OpenLayers/Events.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */


/**
 * @requires OpenLayers/Util.js
 *
 * Namespace: OpenLayers.Event
 * Utility functions for event handling.
 */
OpenLayers.Event = {

    /** 
     * Property: observers 
     * {Object} A hashtable cache of the event observers. Keyed by
     * element._eventCacheID 
     */
    observers: false,
    
    /** 
     * Constant: KEY_BACKSPACE 
     * {int} 
     */
    KEY_BACKSPACE: 8,

    /** 
     * Constant: KEY_TAB 
     * {int} 
     */
    KEY_TAB: 9,

    /** 
     * Constant: KEY_RETURN 
     * {int} 
     */
    KEY_RETURN: 13,

    /** 
     * Constant: KEY_ESC 
     * {int} 
     */
    KEY_ESC: 27,

    /** 
     * Constant: KEY_LEFT 
     * {int} 
     */
    KEY_LEFT: 37,

    /** 
     * Constant: KEY_UP 
     * {int} 
     */
    KEY_UP: 38,

    /** 
     * Constant: KEY_RIGHT 
     * {int} 
     */
    KEY_RIGHT: 39,

    /** 
     * Constant: KEY_DOWN 
     * {int} 
     */
    KEY_DOWN: 40,

    /** 
     * Constant: KEY_DELETE 
     * {int} 
     */
    KEY_DELETE: 46,


    /**
     * Method: element
     * Cross browser event element detection.
     * 
     * Parameters:
     * event - {Event} 
     * 
     * Returns:
     * {DOMElement} The element that caused the event 
     */
    element: function(event) {
        return event.target || event.srcElement;
    },

    /**
     * Method: isLeftClick
     * Determine whether event was caused by a left click. 
     *
     * Parameters:
     * event - {Event} 
     * 
     * Returns:
     * {Boolean}
     */
    isLeftClick: function(event) {
        return (((event.which) && (event.which == 1)) ||
                ((event.button) && (event.button == 1)));
    },

    /**
     * Method: stop
     * Stops an event from propagating. 
     *
     * Parameters: 
     * event - {Event} 
     * allowDefault - {Boolean} If true, we stop the event chain but 
     *                               still allow the default browser 
     *                               behaviour (text selection, radio-button 
     *                               clicking, etc)
     *                               Default false
     */
    stop: function(event, allowDefault) {
        
        if (!allowDefault) { 
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
                
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    /** 
     * Method: findElement
     * 
     * Parameters:
     * event - {Event} 
     * tagName - {String} 
     * 
     * Return:
     * {DOMElement} The first node with the given tagName, starting from the
     * node the event was triggered on and traversing the DOM upwards
     */
    findElement: function(event, tagName) {
        var element = OpenLayers.Event.element(event);
        while (element.parentNode && (!element.tagName ||
              (element.tagName.toUpperCase() != tagName.toUpperCase())))
            element = element.parentNode;
        return element;
    },

    /** 
     * Method: observe
     * 
     * Parameters:
     * elementParam - {DOMElement || String} 
     * name - {String} 
     * observer - {function} 
     * useCapture - {Boolean} 
     */
    observe: function(elementParam, name, observer, useCapture) {
        var element = OpenLayers.Util.getElement(elementParam);
        useCapture = useCapture || false;

        if (name == 'keypress' &&
           (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
           || element.attachEvent)) {
            name = 'keydown';
        }

        //if observers cache has not yet been created, create it
        if (!this.observers) {
            this.observers = {};
        }

        //if not already assigned, make a new unique cache ID
        if (!element._eventCacheID) {
            var idPrefix = "eventCacheID_";
            if (element.id) {
                idPrefix = element.id + "_" + idPrefix;
            }
            element._eventCacheID = OpenLayers.Util.createUniqueID(idPrefix);
        }

        var cacheID = element._eventCacheID;

        //if there is not yet a hash entry for this element, add one
        if (!this.observers[cacheID]) {
            this.observers[cacheID] = [];
        }

        //add a new observer to this element's list
        this.observers[cacheID].push({
            'element': element,
            'name': name,
            'observer': observer,
            'useCapture': useCapture
        });

        //add the actual browser event listener
        if (element.addEventListener) {
            element.addEventListener(name, observer, useCapture);
        } else if (element.attachEvent) {
            element.attachEvent('on' + name, observer);
        }
    },

    /** 
     * Method: stopObservingElement
     * Given the id of an element to stop observing, cycle through the 
     *   element's cached observers, calling stopObserving on each one, 
     *   skipping those entries which can no longer be removed.
     * 
     * parameters:
     * elementParam - {DOMElement || String} 
     */
    stopObservingElement: function(elementParam) {
        var element = OpenLayers.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;

        this._removeElementObservers(OpenLayers.Event.observers[cacheID]);
    },

    /**
     * Method: _removeElementObservers
     *
     * Parameters:
     * elementObservers - {Array(Object)} Array of (element, name, 
     *                                         observer, usecapture) objects, 
     *                                         taken directly from hashtable
     */
    _removeElementObservers: function(elementObservers) {
        if (elementObservers) {
            for(var i = elementObservers.length-1; i >= 0; i--) {
                var entry = elementObservers[i];
                var args = new Array(entry.element,
                                     entry.name,
                                     entry.observer,
                                     entry.useCapture);
                var removed = OpenLayers.Event.stopObserving.apply(this, args);
            }
        }
    },

    /**
     * Method: stopObserving
     * 
     * Parameters:
     * elementParam - {DOMElement || String} 
     * name - {String} 
     * observer - {function} 
     * useCapture - {Boolean} 
     *  
     * Return:
     * {Boolean} Whether or not the event observer was removed
     */
    stopObserving: function(elementParam, name, observer, useCapture) {
        useCapture = useCapture || false;
    
        var element = OpenLayers.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;

        if (name == 'keypress') {
            if ( navigator.appVersion.match(/Konqueror|Safari|KHTML/) || 
                 element.detachEvent) {
              name = 'keydown';
            }
        }

        // find element's entry in this.observers cache and remove it
        var foundEntry = false;
        var elementObservers = OpenLayers.Event.observers[cacheID];
        if (elementObservers) {
    
            // find the specific event type in the element's list
            var i=0;
            while(!foundEntry && i < elementObservers.length) {
                var cacheEntry = elementObservers[i];
    
                if ((cacheEntry.name == name) &&
                    (cacheEntry.observer == observer) &&
                    (cacheEntry.useCapture == useCapture)) {
    
                    elementObservers.splice(i, 1);
                    if (elementObservers.length == 0) {
                        delete OpenLayers.Event.observers[cacheID];
                    }
                    foundEntry = true;
                    break; 
                }
                i++;           
            }
        }
    
        //actually remove the event listener from browser
        if (element.removeEventListener) {
            element.removeEventListener(name, observer, useCapture);
        } else if (element && element.detachEvent) {
            element.detachEvent('on' + name, observer);
        }
        return foundEntry;
    },
    
    /** 
     * Method: unloadCache
     * Cycle through all the element entries in the events cache and call
     *   stopObservingElement on each. 
     */
    unloadCache: function() {
        if (OpenLayers.Event.observers) {
            for (var cacheID in OpenLayers.Event.observers) {
                var elementObservers = OpenLayers.Event.observers[cacheID];
                OpenLayers.Event._removeElementObservers.apply(this, 
                                                           [elementObservers]);
            }
            OpenLayers.Event.observers = false;
        }
    },

    CLASS_NAME: "OpenLayers.Event"
};

/* prevent memory leaks in IE */
OpenLayers.Event.observe(window, 'unload', OpenLayers.Event.unloadCache, false);

if (window.Event) {
  OpenLayers.Util.extend(window.Event, OpenLayers.Event);
} else {
  var Event = OpenLayers.Event;
}

/**
 * Class: OpenLayers.Events
 */
OpenLayers.Events = OpenLayers.Class({

    /** 
     * Constant: BROWSER_EVENTS
     * {Array(String)} supported events 
     */
    BROWSER_EVENTS: [
        "mouseover", "mouseout",
        "mousedown", "mouseup", "mousemove", 
        "click", "dblclick",
        "resize", "focus", "blur"
    ],

    /** 
     * Property: listeners 
     * {Object} Hashtable of Array(Function): events listener functions  
     */
    listeners: null,

    /** 
     * Property: object 
     * {Object}  the code object issuing application events 
     */
    object: null,

    /** 
     * Property: element 
     * {DOMElement}  the DOM element receiving browser events 
     */
    element: null,

    /** 
     * Property: eventTypes 
     * {Array(String)}  list of support application events 
     */
    eventTypes: null,

    /** 
     * Property: eventHandler 
     * {Function}  bound event handler attached to elements 
     */
    eventHandler: null,

    /** 
     * APIProperty: fallThrough 
     * {Boolean} 
     */
    fallThrough: null,

    /**
     * Constructor: OpenLayers.Events
     * Construct an OpenLayers.Events object.
     *
     * Parameters:
     * object - {Object} The js object to which this Events object  is being
     * added element - {DOMElement} A dom element to respond to browser events
     * eventTypes - {Array(String)} Array of custom application events 
     * fallThrough - {Boolean} Allow events to fall through after these have
     *                         been handled?
     */
    initialize: function (object, element, eventTypes, fallThrough) {
        this.object     = object;
        this.element    = element;
        this.eventTypes = eventTypes;
        this.fallThrough = fallThrough;
        this.listeners  = {};

        // keep a bound copy of handleBrowserEvent() so that we can
        // pass the same function to both Event.observe() and .stopObserving()
        this.eventHandler = this.handleBrowserEvent.bindAsEventListener(this);

        // if eventTypes is specified, create a listeners list for each 
        // custom application event.
        if (this.eventTypes != null) {
            for (var i = 0; i < this.eventTypes.length; i++) {
                this.addEventType(this.eventTypes[i]);
            }
        }
        
        // if a dom element is specified, add a listeners list 
        // for browser events on the element and register them
        if (this.element != null) {
            this.attachToElement(element);
        }
    },

    /**
     * APIMethod: destroy
     */
    destroy: function () {
        if (this.element) {
            OpenLayers.Event.stopObservingElement(this.element);
        }
        this.element = null;

        this.listeners = null;
        this.object = null;
        this.eventTypes = null;
        this.fallThrough = null;
        this.eventHandler = null;
    },

    /**
     * APIMethod: addEventType
     * Add a new event type to this events object.
     * If the event type has already been added, do nothing.
     * 
     * Parameters:
     * eventName - {String}
     */
    addEventType: function(eventName) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
    },

    /**
     * Method: attachToElement
     *
     * Parameters:
     * element - {HTMLDOMElement} a DOM element to attach browser events to
     */
    attachToElement: function (element) {
        for (var i = 0; i < this.BROWSER_EVENTS.length; i++) {
            var eventType = this.BROWSER_EVENTS[i];

            // every browser event has a corresponding application event 
            // (whether it's listened for or not).
            this.addEventType(eventType);
            
            // use Prototype to register the event cross-browser
            OpenLayers.Event.observe(element, eventType, this.eventHandler);
        }
        // disable dragstart in IE so that mousedown/move/up works normally
        OpenLayers.Event.observe(element, "dragstart", OpenLayers.Event.stop);
    },

    /**
     * APIMethod: register
     * Register an event on the events object.
     *
     * When the event is triggered, the 'func' function will be called, in the
     * context of 'obj'. Imagine we were to register an event, specifying an 
     * OpenLayers.Bounds Object as 'obj'. When the event is triggered, the 
     * context in the callback function will be our Bounds object. This means
     * that within our callback function, we can access the properties and 
     * methods of the Bounds object through the "this" variable. So our 
     * callback could execute something like: 
     * :    leftStr = "Left: " + this.left;
     *   
     *                   or
     *  
     * :    centerStr = "Center: " + this.getCenterLonLat();
     *
     * Parameters:
     * type - {String} Name of the event to register
     * obj - {Object} The object to bind the context to for the callback#.
     *                     If no object is specified, default is the Events's 
     *                     'object' property.
     * func - {Function} The callback function. If no callback is 
     *                        specified, this function does nothing.
     * 
     * 
     */
    register: function (type, obj, func) {

        if (func != null) {
            if (obj == null)  {
                obj = this.object;
            }
            var listeners = this.listeners[type];
            if (listeners != null) {
                listeners.push( {obj: obj, func: func} );
            }
        }
    },

    /**
     * APIMethod: registerPriority
     * Same as register() but adds the new listener to the *front* of the
     *     events queue instead of to the end.
     *    
     *     TODO: get rid of this in 3.0 - Decide whether listeners should be 
     *     called in the order they were registered or in reverse order.
     *
     *
     * Parameters:
     * type - {String} Name of the event to register
     * obj - {Object} The object to bind the context to for the callback#.
     *                If no object is specified, default is the Events's 
     *                'object' property.
     * func - {Function} The callback function. If no callback is 
     *                   specified, this function does nothing.
     */
    registerPriority: function (type, obj, func) {

        if (func != null) {
            if (obj == null)  {
                obj = this.object;
            }
            var listeners = this.listeners[type];
            if (listeners != null) {
                listeners.unshift( {obj: obj, func: func} );
            }
        }
    },
    
    /**
     * APIMethod: unregister
     *
     * Parameters:
     * type - {String} 
     * obj - {Object} If none specified, defaults to this.object
     * func - {Function} 
     */
    unregister: function (type, obj, func) {
        if (obj == null)  {
            obj = this.object;
        }
        var listeners = this.listeners[type];
        if (listeners != null) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i].obj == obj && listeners[i].func == func) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    },

    /** 
     * Method: remove
     * Remove all listeners for a given event type. If type is not registered,
     *     does nothing.
     *
     * Parameters:
     * type - {String} 
     */
    remove: function(type) {
        if (this.listeners[type] != null) {
            this.listeners[type] = [];
        }
    },

    /**
     * APIMethod: triggerEvent
     * Trigger a specified registered event
     * 
     * Parameters:
     * type - {String} 
     * evt - {Event} 
     */
    triggerEvent: function (type, evt) {

        // prep evt object with object & div references
        if (evt == null) {
            evt = {};
        }
        evt.object = this.object;
        evt.element = this.element;

        // execute all callbacks registered for specified type
        // get a clone of the listeners array to
        // allow for splicing during callbacks
        var listeners = (this.listeners[type]) ?
                            this.listeners[type].slice() : null;
        if ((listeners != null) && (listeners.length > 0)) {
            for (var i = 0; i < listeners.length; i++) {
                var callback = listeners[i];
                var continueChain;
                if (callback.obj != null) {
                    // use the 'call' method to bind the context to callback.obj
                    continueChain = callback.func.call(callback.obj, evt);
                } else {
                    continueChain = callback.func(evt);
                }
    
                if ((continueChain != null) && (continueChain == false)) {
                    // if callback returns false, execute no more callbacks.
                    break;
                }
            }
            // don't fall through to other DOM elements
            if (!this.fallThrough) {           
                OpenLayers.Event.stop(evt, true);
            }
        }
    },

    /**
     * Method: handleBrowserEvent
     * Basically just a wrapper to the triggerEvent() function, but takes 
     *     care to set a property 'xy' on the event with the current mouse 
     *     position.
     *
     * Parameters:
     * evt - {Event} 
     */
    handleBrowserEvent: function (evt) {
        evt.xy = this.getMousePosition(evt); 
        this.triggerEvent(evt.type, evt)
    },

    /**
     * Method: getMousePosition
     * 
     * Parameters:
     * evt - {Event} 
     * 
     * Returns 
     * {<OpenLayers.Pixel>} The current xy coordinate of the mouse, adjusted
     *                      for offsets
     */
    getMousePosition: function (evt) {
        if (!this.element.offsets) {
            this.element.offsets = OpenLayers.Util.pagePosition(this.element);
            this.element.offsets[0] += (document.documentElement.scrollLeft
                         || document.body.scrollLeft);
            this.element.offsets[1] += (document.documentElement.scrollTop
                         || document.body.scrollTop);
        }
        return new OpenLayers.Pixel(
            (evt.clientX + (document.documentElement.scrollLeft
                         || document.body.scrollLeft)) - this.element.offsets[0], 
            (evt.clientY + (document.documentElement.scrollTop
                         || document.body.scrollTop)) - this.element.offsets[1] 
        ); 
    },

    CLASS_NAME: "OpenLayers.Events"
});
/* ======================================================================
    OpenLayers/Tile.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */


/*
 * @requires OpenLayers/Util.js
 *
 * Class: OpenLayers.Tile 
 * This is a class designed to designate a single tile, however
 *     it is explicitly designed to do relatively little. Tiles store 
 *     information about themselves -- such as the URL that they are related
 *     to, and their size - but do not add themselves to the layer div 
 *     automatically, for example. Create a new tile with the 
 *     <OpenLayers.Tile> constructor, or a subclass. 
 * 
 * TBD 3.0 - remove reference to url in above paragraph
 * 
 */
OpenLayers.Tile = OpenLayers.Class({
    
    /** 
     * Constant: EVENT_TYPES
     * {Array(String)} Supported application event types
     */
    EVENT_TYPES: [ "loadstart", "loadend", "reload"],
    
    /**
     * APIProperty: events
     * {<OpenLayers.Events>} An events object that handles all 
     *                       events on the tile.
     */
    events: null,

    /**
     * Property: id 
     * {String} null
     */
    id: null,
    
    /** 
     * Property: layer 
     * {<OpenLayers.Layer>} layer the tile is attached to 
     */
    layer: null,
    
    /**
     * Property: url
     * {String} url of the request.
     *
     * TBD 3.0 
     * Deprecated. The base tile class does not need an url. This should be 
     * handled in subclasses. Does not belong here.
     */
    url: null,

    /** 
     * APIProperty: bounds 
     * {<OpenLayers.Bounds>} null
     */
    bounds: null,
    
    /** 
     * Property: size 
     * {<OpenLayers.Size>} null
     */
    size: null,
    
    /** 
     * Property: position 
     * {<OpenLayers.Pixel>} Top Left pixel of the tile
     */    
    position: null,

    /** 
     * Property: drawn 
     * {Boolean} false
     */
    drawn: false,

    /**
     * Property: isLoading
     * {Boolean} Is the tile loading?
     */
    isLoading: false,
    
    /** TBD 3.0 -- remove 'url' from the list of parameters to the constructor.
     *             there is no need for the base tile class to have a url.
     * 
     * Constructor: OpenLayers.Tile
     * Constructor for a new <OpenLayers.Tile> instance.
     * 
     * Parameters:
     * layer - {<OpenLayers.Layer>} layer that the tile will go in.
     * position - {<OpenLayers.Pixel>}
     * bounds - {<OpenLayers.Bounds>}
     * url - {<String>}
     * size - {<OpenLayers.Size>}
     */   
    initialize: function(layer, position, bounds, url, size) {
        this.layer = layer;
        this.position = position;
        this.bounds = bounds;
        this.url = url;
        this.size = size;

        //give the tile a unique id based on its BBOX.
        this.id = OpenLayers.Util.createUniqueID("Tile_");
        
        this.events = new OpenLayers.Events(this, null, this.EVENT_TYPES);
    },
    
    /** 
     * APIMethod: destroy
     * Nullify references to prevent circular references and memory leaks.
     */
    destroy:function() {
        this.layer  = null;
        this.bounds = null;
        this.size = null;
        this.position = null;
        
        this.events.destroy();
        this.events = null;
    },

    /**
     * Method: draw
     * Clear whatever is currently in the tile, then return whether or not 
     *     it should actually be re-drawn.
     * 
     * Return:
     * {Boolean} Whether or not the tile should actually be drawn. Note that 
     *     this is not really the best way of doing things, but such is 
     *     the way the code has been developed. Subclasses call this and
     *     depend on the return to know if they should draw or not.
     */
    draw: function() {
        
        //clear tile's contents and mark as not drawn
        this.clear();
        
        var maxExtent = this.layer.maxExtent;
        var withinMaxExtent = (maxExtent &&
                               this.bounds.intersectsBounds(maxExtent, false));
 
        var mapExtent = this.layer.map.getExtent();
        var withinMapExtent = (mapExtent &&
                               this.bounds.intersectsBounds(mapExtent, false));
         
        // There are two cases where we *wouldn't* want to draw the tile:
        //  
        // 1) If the tile is outside its layer's maxExtent
        // 2) When the layer's buffer is 0, if the tile is outside the map's 
        //    extent (out of view)
        //
        // ...what we return is the opposite of the above conditions :-)
        //
        return ( (withinMaxExtent || this.layer.displayOutsideMaxExtent) &&
                 (withinMapExtent || (this.layer.buffer != 0)) );
    },
    
    /** 
     * Method: moveTo
     * Reposition the tile.
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * position - {<OpenLayers.Pixel>}
     * redraw - {Boolean} Call draw method on tile after moving.
     *     Default is true
     */
    moveTo: function (bounds, position, redraw) {
        if (redraw == null) {
            redraw = true;
        }

        this.clear();
        this.bounds = bounds.clone();
        this.position = position.clone();
        if (redraw) {
            this.draw();
        }
    },

    /** 
     * Method: clear
     * Clear the tile of any bounds/position-related data so that it can 
     *     be reused in a new location.
     */
    clear: function() {
        this.drawn = false;
    },
    
    /**   
     * Method: getBoundsFromBaseLayer
     * Take the pixel locations of the corner of the tile, and pass them to 
     *     the base layer and ask for the location of those pixels, so that 
     *     displaying tiles over Google works fine.
     *
     * Parameters:
     * position - {<OpenLayers.Pixel>}
     *
     * Return:
     * bounds - {<OpenLayers.Bounds>} 
     */
    getBoundsFromBaseLayer: function(position) {
        var topLeft = this.layer.map.getLonLatFromLayerPx(position); 
        var bottomRightPx = position.clone();
        bottomRightPx.x += this.size.w;
        bottomRightPx.y += this.size.h;
        var bottomRight = this.layer.map.getLonLatFromLayerPx(bottomRightPx); 
        // Handle the case where the base layer wraps around the date line.
        // Google does this, and it breaks WMS servers to request bounds in 
        // that fashion.  
        if (topLeft.lon > bottomRight.lon) {
            if (topLeft.lon < 0) {
                topLeft.lon = -180 - (topLeft.lon+180);
            } else {
                bottomRight.lon = 180+bottomRight.lon+180;
            }        
        }
        bounds = new OpenLayers.Bounds(topLeft.lon, 
                                       bottomRight.lat, 
                                       bottomRight.lon, 
                                       topLeft.lat);  
        return bounds;
    },        

    CLASS_NAME: "OpenLayers.Tile"
});
/* ======================================================================
    OpenLayers/Map.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */


/**
 * @requires OpenLayers/Util.js
 * @requires OpenLayers/Events.js
 * 
 * Class: OpenLayers.Map
 * Instances of OpenLayers.Map are interactive maps embedded in a web page.
 * Create a new map with the <OpenLayers.Map> constructor.
 * 
 * On their own maps do not provide much functionality.  To extend a map
 * it's necessary to add controls (<OpenLayers.Control>) and 
 * layers (<OpenLayers.Layer>) to the map. 
 */
OpenLayers.Map = OpenLayers.Class({
    
    /**
     * Constant: Z_INDEX_BASE
     * {Object} Base z-indexes for different classes of thing 
     */
    Z_INDEX_BASE: { BaseLayer: 100, Overlay: 325, Popup: 750, Control: 1000 },

    /**
     * Constant: EVENT_TYPES
     * {Array(String)} supported application event types
     */
    EVENT_TYPES: [ 
        "addlayer", "removelayer", "changelayer", "movestart", "move", 
        "moveend", "zoomend", "popupopen", "popupclose",
        "addmarker", "removemarker", "clearmarkers", "mouseover",
        "mouseout", "mousemove", "dragstart", "drag", "dragend",
        "changebaselayer"],

    /**
     * Property: id
     * {String} Unique identifier for the map
     */
    id: null,
    
    /**
     * APIProperty: events
     * {<OpenLayers.Events>} An events object that handles all 
     *                       events on the map
     */
    events: null,

    /**
     * APIProperty: div
     * {DOMElement} The element that contains the map
     */
    div: null,

    /**
     * Property: size
     * {<OpenLayers.Size>} Size of the main div (this.div)
     */
    size: null,
    
    /**
     * Property: viewPortDiv
     * {HTMLDivElement} The element that represents the map viewport
     */
    viewPortDiv: null,

    /**
     * Property: layerContainerOrigin
     * {<OpenLayers.LonLat>} The lonlat at which the later container was
     *                       re-initialized (on-zoom)
     */
    layerContainerOrigin: null,

    /**
     * Property: layerContainerDiv
     * {HTMLDivElement} The element that contains the layers.
     */
    layerContainerDiv: null,

    /**
     * Property: layers
     * {Array(<OpenLayers.Layer>)} Ordered list of layers in the map
     */
    layers: null,

    /**
     * Property: controls
     * {Array(<OpenLayers.Control>)} List of controls associated with the map
     */
    controls: null,

    /**
     * Property: popups
     * {Array(<OpenLayers.Popup>)} List of popups associated with the map
     */
    popups: null,

    /**
     * APIProperty: baseLayer
     * {<OpenLayers.Layer>} The currently selected base layer.  This determines
     * min/max zoom level, projection, etc.
     */
    baseLayer: null,
    
    /**
     * Property: center
     * {<OpenLayers.LonLat>} The current center of the map
     */
    center: null,

    /**
     * Property: zoom
     * {Integer} The current zoom level of the map
     */
    zoom: 0,    

    /**
     * Property: viewRequestID
     * {String} Used to store a unique identifier that changes when the map 
     *          view changes. viewRequestID should be used when adding data 
     *          asynchronously to the map: viewRequestID is incremented when 
     *          you initiate your request (right now during changing of 
     *          baselayers and changing of zooms). It is stored here in the 
     *          map and also in the data that will be coming back 
     *          asynchronously. Before displaying this data on request 
     *          completion, we check that the viewRequestID of the data is 
     *          still the same as that of the map. Fix for #480
     */
    viewRequestID: 0,

  // Options

    /**
     * APIProperty: tileSize
     * {<OpenLayers.Size>} Set in the map options to override the default tile
     *                     size for this map.
     */
    tileSize: null,

    /**
     * APIProperty: projection
     * {String} Set in the map options to override the default projection 
     *          string this map - also set maxExtent, maxResolution, and 
     *          units if appropriate.
     */
    projection: "EPSG:4326",    
        
    /**
     * APIProperty: units
     * {String} The map units.  Defaults to 'degrees'.  Possible values are
     *          'degrees' (or 'dd'), 'm', 'ft', 'km', 'mi', 'inches'.
     */
    units: 'degrees',

    /**
     * APIProperty: resolutions
     * {Array(Float)} A list of map resolutions (map units per pixel) in 
     *     descending order.  If this is not set in the layer constructor, it 
     *     will be set based on other resolution related properties 
     *     (maxExtent, maxResolution, maxScale, etc.).
     */
    resolutions: null,

    /**
     * APIProperty: maxResolution
     * {Float} Default max is 360 deg / 256 px, which corresponds to
     *          zoom level 0 on gmaps.  Specify a different value in the map 
     *          options if you are not using a geographic projection and 
     *          displaying the whole world.
     */
    maxResolution: 1.40625,

    /**
     * APIProperty: minResolution
     * {Float}
     */
    minResolution: null,

    /**
     * APIProperty: maxScale
     * {Float}
     */
    maxScale: null,

    /**
     * APIProperty: minScale
     * {Float}
     */
    minScale: null,

    /**
     * APIProperty: maxExtent
     * {<OpenLayers.Bounds>} The maximum extent for the map.  Defaults to the
     *                       whole world in decimal degrees 
     *                       (-180, -90, 180, 90).  Specify a different
     *                        extent in the map options if you are not using a 
     *                        geographic projection and displaying the whole 
     *                        world.
     */
    maxExtent: null,
    
    /**
     * APIProperty: minExtent
     * {<OpenLayers.Bounds>}
     */
    minExtent: null,
    
    /**
     * APIProperty: numZoomLevels
     * {Integer} Number of zoom levels for the map.  Defaults to 16.  Set a
     *           different value in the map options if needed.
     */
    numZoomLevels: 16,

    /**
     * APIProperty: theme
     * {String} Relative path to a CSS file from which to load theme styles.
     *          Specify null in the map options (e.g. {theme: null}) if you 
     *          want to get cascading style declarations - by putting links to 
     *          stylesheets or style declarations directly in your page.
     */
    theme: null,

    /**
     * APIProperty: fallThrough
     * {Boolean} Should OpenLayers allow events on the map to fall through to
     *           other elements on the page, or should it swallow them? (#457)
     *           Default is to swallow them.
     */
    fallThrough: false,

    /**
     * Constructor: OpenLayers.Map
     * Constructor for a new OpenLayers.Map instance.
     *
     * Parameters:
     * div - {String} Id of an element in your page that will contain the map.
     * options - {Object} Optional object with properties to tag onto the map.
     *
     * Examples:
     * (code)
     * // create a map with default options in an element with the id "map1"
     * var map = new OpenLayers.Map("map1");
     *
     * // create a map with non-default options in an element with id "map2"
     * var options = {
     *     maxExtent: new OpenLayers.Bounds(-200000, -200000, 200000, 200000),
     *     maxResolution: 156543,
     *     units: 'meters',
     *     projection: "EPSG:41001"
     * };
     * var map = new OpenLayers.Map("map2", options);
     * (end)
     */    
    initialize: function (div, options) {
        
        //set the default options
        this.setOptions(options);

        this.id = OpenLayers.Util.createUniqueID("OpenLayers.Map_");

        this.div = OpenLayers.Util.getElement(div);

        // the viewPortDiv is the outermost div we modify
        var id = this.div.id + "_OpenLayers_ViewPort";
        this.viewPortDiv = OpenLayers.Util.createDiv(id, null, null, null,
                                                     "relative", null,
                                                     "hidden");
        this.viewPortDiv.style.width = "100%";
        this.viewPortDiv.style.height = "100%";
        this.viewPortDiv.className = "olMapViewport";
        this.div.appendChild(this.viewPortDiv);

        // the layerContainerDiv is the one that holds all the layers
        id = this.div.id + "_OpenLayers_Container";
        this.layerContainerDiv = OpenLayers.Util.createDiv(id);
        this.layerContainerDiv.style.zIndex=this.Z_INDEX_BASE['Popup']-1;
        
        this.viewPortDiv.appendChild(this.layerContainerDiv);

        this.events = new OpenLayers.Events(this, 
                                            this.div, 
                                            this.EVENT_TYPES, 
                                            this.fallThrough);
        this.updateSize();
 
        // update the map size and location before the map moves
        this.events.register("movestart", this, this.updateSize);

        // Because Mozilla does not support the "resize" event for elements 
        // other than "window", we need to put a hack here. 
        if (navigator.appName.contains("Microsoft")) {
            // If IE, register the resize on the div
            this.events.register("resize", this, this.updateSize);
        } else {
            // Else updateSize on catching the window's resize
            //  Note that this is ok, as updateSize() does nothing if the 
            //  map's size has not actually changed.
            OpenLayers.Event.observe(window, 'resize', 
                          this.updateSize.bind(this));
        }
        
        // only append link stylesheet if the theme property is set
        if(this.theme) {
            // check existing links for equivalent url
            var addNode = true;
            var nodes = document.getElementsByTagName('link');
            for(var i=0; i<nodes.length; ++i) {
                if(OpenLayers.Util.isEquivalentUrl(nodes.item(i).href,
                                                   this.theme)) {
                    addNode = false;
                    break;
                }
            }
            // only add a new node if one with an equivalent url hasn't already
            // been added
            if(addNode) {
                var cssNode = document.createElement('link');
                cssNode.setAttribute('rel', 'stylesheet');
                cssNode.setAttribute('type', 'text/css');
                cssNode.setAttribute('href', this.theme);
                document.getElementsByTagName('head')[0].appendChild(cssNode);
            }
        }

        this.layers = [];
        
        if (this.controls == null) {
            if (OpenLayers.Control != null) { // running full or lite?
                this.controls = [ new OpenLayers.Control.Navigation(),
                                  new OpenLayers.Control.PanZoom(),
                                  new OpenLayers.Control.ArgParser()
                                ];
            } else {
                this.controls = [];
            }
        }

        for(var i=0; i < this.controls.length; i++) {
            this.addControlToMap(this.controls[i]);
        }

        this.popups = [];

        this.unloadDestroy = this.destroy.bind(this);
        

        // always call map.destroy()
        OpenLayers.Event.observe(window, 'unload', this.unloadDestroy);

    },

    /**
     * Method: unloadDestroy
     * Function that is called to destroy the map on page unload. stored here
     *     so that if map is manually destroyed, we can unregister this.
     */
    unloadDestroy: null,

    /**
     * APIMethod: destroy
     * Destroy this map
     */
    destroy:function() {
        // if unloadDestroy is null, we've already been destroyed
        if (!this.unloadDestroy) {
            return false;
        }

        // map has been destroyed. dont do it again!
        OpenLayers.Event.stopObserving(window, 'unload', this.unloadDestroy);
        this.unloadDestroy = null;

        if (this.layers != null) {
            for (var i = this.layers.length - 1; i>=0; --i) {
                //pass 'false' to destroy so that map wont try to set a new 
                // baselayer after each baselayer is removed
                this.layers[i].destroy(false);
            } 
            this.layers = null;
        }
        if (this.controls != null) {
            for (var i = this.controls.length - 1; i>=0; --i) {
                this.controls[i].destroy();
            } 
            this.controls = null;
        }
        if (this.viewPortDiv) {
            this.div.removeChild(this.viewPortDiv);
        }
        this.viewPortDiv = null;

        this.events.destroy();
        this.events = null;

    },

    /**
     * APIMethod: setOptions
     * Change the map options
     *
     * Parameters:
     * options - {Object} Hashtable of options to tag to the map
     */
    setOptions: function(options) {

        // Simple-type defaults are set in class definition. 
        //  Now set complex-type defaults 
        this.tileSize = new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH,
                                            OpenLayers.Map.TILE_HEIGHT);
        
        this.maxExtent = new OpenLayers.Bounds(-180, -90, 180, 90);

        this.theme = OpenLayers._getScriptLocation() + 
                             'theme/default/style.css'; 

        // now add the options declared by the user
        //  (these will override defaults)
        OpenLayers.Util.extend(this, options);
    },

    /**
     * APIMethod: getTileSize
     * Get the tile size for the map
     *
     * Return:
     * {<OpenLayers.Size>}
     */
     getTileSize: function() {
         return this.tileSize;
     },

  /********************************************************/
  /*                                                      */
  /*                  Layer Functions                     */
  /*                                                      */
  /*     The following functions deal with adding and     */
  /*        removing Layers to and from the Map           */
  /*                                                      */
  /********************************************************/         

    /**
     * APIMethod: getLayer
     * Get a layer based on its id
     *
     * Parameter:
     * id - {String} A layer id
     *
     * Return:
     * {<OpenLayers.Layer>} The Layer with the corresponding id from the map's 
     *                      layer collection, or null if not found.
     */
    getLayer: function(id) {
        var foundLayer = null;
        for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            if (layer.id == id) {
                foundLayer = layer;
            }
        }
        return foundLayer;
    },

    /**
    * Method: setLayerZIndex
    * 
    * Parameters:
    * layer - {<OpenLayers.Layer>} 
    * zIdx - {int} 
    */    
    setLayerZIndex: function (layer, zIdx) {
        layer.setZIndex(
            this.Z_INDEX_BASE[layer.isBaseLayer ? 'BaseLayer' : 'Overlay']
            + zIdx * 5 );
    },

    /**
    * APIMethod: addLayer
    *
    * Parameters:
    * layer - {<OpenLayers.Layer>} 
    */    
    addLayer: function (layer) {
        for(var i=0; i < this.layers.length; i++) {
            if (this.layers[i] == layer) {
                var msg = "You tried to add the layer: " + layer.name + 
                          " to the map, but it has already been added";
                OpenLayers.Console.warn(msg);
                return false;
            }
        }    
        
        layer.div.style.overflow = "";
        this.setLayerZIndex(layer, this.layers.length);

        if (layer.isFixed) {
            this.viewPortDiv.appendChild(layer.div);
        } else {
            this.layerContainerDiv.appendChild(layer.div);
        }
        this.layers.push(layer);
        layer.setMap(this);

        if (layer.isBaseLayer)  {
            if (this.baseLayer == null) {
                // set the first baselaye we add as the baselayer
                this.setBaseLayer(layer);
            } else {
                layer.setVisibility(false);
            }
        } else {
            layer.redraw();
        }

        this.events.triggerEvent("addlayer");
    },

    /**
    * APIMethod: addLayers 
    *
    * Parameters:
    * layers - Array({<OpenLayers.Layer>}) 
    */    
    addLayers: function (layers) {
        for (var i = 0; i <  layers.length; i++) {
            this.addLayer(layers[i]);
        }
    },

    /** 
     * APIMethod: removeLayer
     * Removes a layer from the map by removing its visual element (the 
     *   layer.div property), then removing it from the map's internal list 
     *   of layers, setting the layer's map property to null. 
     * 
     *   a "removelayer" event is triggered.
     * 
     *   very worthy of mention is that simply removing a layer from a map
     *   will not cause the removal of any popups which may have been created
     *   by the layer. this is due to the fact that it was decided at some
     *   point that popups would not belong to layers. thus there is no way 
     *   for us to know here to which layer the popup belongs.
     *    
     *     A simple solution to this is simply to call destroy() on the layer.
     *     the default OpenLayers.Layer class's destroy() function
     *     automatically takes care to remove itself from whatever map it has
     *     been attached to. 
     * 
     *     The correct solution is for the layer itself to register an 
     *     event-handler on "removelayer" and when it is called, if it 
     *     recognizes itself as the layer being removed, then it cycles through
     *     its own personal list of popups, removing them from the map.
     * 
     * Parameters:
     * layer - {<OpenLayers.Layer>} 
     * setNewBaseLayer - {Boolean} Default is true
     */
    removeLayer: function(layer, setNewBaseLayer) {
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }

        if (layer.isFixed) {
            this.viewPortDiv.removeChild(layer.div);
        } else {
            this.layerContainerDiv.removeChild(layer.div);
        }
        layer.map = null;
        OpenLayers.Util.removeItem(this.layers, layer);

        // if we removed the base layer, need to set a new one
        if (setNewBaseLayer && (this.baseLayer == layer)) {
            this.baseLayer = null;
            for(i=0; i < this.layers.length; i++) {
                var iLayer = this.layers[i];
                if (iLayer.isBaseLayer) {
                    this.setBaseLayer(iLayer);
                    break;
                }
            }
        }
        this.events.triggerEvent("removelayer");
    },

    /**
     * APIMethod: getNumLayers
     * 
     * Return: {Int} The number of layers attached to the map.
     */
    getNumLayers: function () {
        return this.layers.length;
    },

    /** 
     * APIMethod: getLayerIndex
     *
     * Parameters:
     * layer - {<OpenLayers.Layer>}
     *
     * Return:
     * {Integer} The current (zero-based) index of the given layer in the map's
     *           layer stack. Returns -1 if the layer isn't on the map.
     */
    getLayerIndex: function (layer) {
        return OpenLayers.Util.indexOf(this.layers, layer);
    },
    
    /** 
     * APIMethod: setLayerIndex
     * Move the given layer to the specified (zero-based) index in the layer
     *     list, changing its z-index in the map display. Use
     *     map.getLayerIndex() to find out the current index of a layer. Note
     *     that this cannot (or at least should not) be effectively used to
     *     raise base layers above overlays.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer>} 
     * idx - {int} 
     */
    setLayerIndex: function (layer, idx) {
        var base = this.getLayerIndex(layer);
        if (idx < 0) 
            idx = 0;
        else if (idx > this.layers.length)
            idx = this.layers.length;
        if (base != idx) {
            this.layers.splice(base, 1);
            this.layers.splice(idx, 0, layer);
            for (var i = 0; i < this.layers.length; i++)
                this.setLayerZIndex(this.layers[i], i);
            this.events.triggerEvent("changelayer");
        }
    },

    /** 
     * APIMethod: raiseLayer
     * Change the index of the given layer by delta. If delta is positive, 
     *     the layer is moved up the map's layer stack; if delta is negative,
     *     the layer is moved down.  Again, note that this cannot (or at least
     *     should not) be effectively used to raise base layers above overlays.
     *
     * Paremeters:
     * layer - {<OpenLayers.Layer>} 
     * idx - {int} 
     */
    raiseLayer: function (layer, delta) {
        var idx = this.getLayerIndex(layer) + delta;
        this.setLayerIndex(layer, idx);
    },
    
    /** 
     * APIMethod: setBaseLayer
     * Allows user to specify one of the currently-loaded layers as the Map's
     *     new base layer.
     * 
     * Parameters:
     * newBaseLayer - {<OpenLayers.Layer>}
     * noEvent - {Boolean}
     */
    setBaseLayer: function(newBaseLayer, noEvent) {
        var oldExtent = null;
        if(this.baseLayer) {
            oldExtent = this.baseLayer.getExtent();
        }

        if (newBaseLayer != this.baseLayer) {
          
            // is newBaseLayer an already loaded layer?m
            if (OpenLayers.Util.indexOf(this.layers, newBaseLayer) != -1) {

                // make the old base layer invisible 
                if (this.baseLayer != null) {
                    this.baseLayer.setVisibility(false, noEvent);
                }

                // set new baselayer and make it visible
                this.baseLayer = newBaseLayer;
                
                // Increment viewRequestID since the baseLayer is 
                // changing. This is used by tiles to check if they should 
                // draw themselves.
                this.viewRequestID++;
                this.baseLayer.visibility = true;

                //redraw all layers
                var center = this.getCenter();
                if (center != null) {
                    if (oldExtent == null) {
                        // simply set center but force zoom change
                        this.setCenter(center, this.getZoom(), false, true);
                    } else {
                        // zoom to oldExtent *and* force zoom change
                        this.setCenter(oldExtent.getCenterLonLat(), 
                                       this.getZoomForExtent(oldExtent),
                                       false, true);
                    }
                }

                if ((noEvent == null) || (noEvent == false)) {
                    this.events.triggerEvent("changebaselayer");
                }
            }        
        }
    },


  /********************************************************/
  /*                                                      */
  /*                 Control Functions                    */
  /*                                                      */
  /*     The following functions deal with adding and     */
  /*        removing Controls to and from the Map         */
  /*                                                      */
  /********************************************************/         

    /**
     * APIMethod: addControl
     * 
     * Parameters:
     * control - {<OpenLayers.Control>}
     * px - {<OpenLayers.Pixel>}
     */    
    addControl: function (control, px) {
        this.controls.push(control);
        this.addControlToMap(control, px);
    },

    /**
     * Method: addControlToMap
     * 
     * Parameters:
     * 
     * control - {<OpenLayers.Control>}
     * px - {<OpenLayers.Pixel>}
     */    
    addControlToMap: function (control, px) {
        // If a control doesn't have a div at this point, it belongs in the
        // viewport.
        control.outsideViewport = (control.div != null);
        control.setMap(this);
        var div = control.draw(px);
        if (div) {
            if(!control.outsideViewport) {
                div.style.zIndex = this.Z_INDEX_BASE['Control'] +
                                    this.controls.length;
                this.viewPortDiv.appendChild( div );
            }
        }
    },
    
    /**
     * APIMethod: getControl
     * 
     * Parameters:
     * id - {String} ID of the control to return.
     * 
     * Return:
     * {<OpenLayers.Control>} The control from the map's list of controls 
     *                        which has a matching 'id'. If none found, 
     *                        returns null.
     */    
    getControl: function (id) {
        var returnControl = null;
        for(var i=0; i < this.controls.length; i++) {
            var control = this.controls[i];
            if (control.id == id) {
                returnControl = control;
                break;
            }
        }
        return returnControl;
    },
    
    /** 
     * APIMethod: removeControl
     * Remove a control from the map. Removes the control both from the map 
     *     object's internal array of controls, as well as from the map's 
     *     viewPort (assuming the control was not added outsideViewport)
     * 
     * Parameters:
     * control - {<OpenLayers.Control>} The control to remove.
     */    
    removeControl: function (control) {
        //make sure control is non-null and actually part of our map
        if ( (control) && (control == this.getControl(control.id)) ) {
            if (!control.outsideViewport) {
                this.viewPortDiv.removeChild(control.div)
            }
            OpenLayers.Util.removeItem(this.controls, control);
        }
    },

  /********************************************************/
  /*                                                      */
  /*                  Popup Functions                     */
  /*                                                      */
  /*     The following functions deal with adding and     */
  /*        removing Popups to and from the Map           */
  /*                                                      */
  /********************************************************/         

    /** 
     * APIMethod: addPopup
     * 
     * Parameters:
     * popup - {<OpenLayers.Popup>}
     * exclusive - {Boolean} If true, closes all other popups first
     */
    addPopup: function(popup, exclusive) {

        if (exclusive) {
            //remove all other popups from screen
            for(var i=0; i < this.popups.length; i++) {
                this.removePopup(this.popups[i]);
            }
        }

        popup.map = this;
        this.popups.push(popup);
        var popupDiv = popup.draw();
        if (popupDiv) {
            popupDiv.style.zIndex = this.Z_INDEX_BASE['Popup'] +
                                    this.popups.length;
            this.layerContainerDiv.appendChild(popupDiv);
        }
    },
    
    /** 
    * APIMethod: removePopup
    * 
    * Parameters:
    * popup - {<OpenLayers.Popup>}
    */
    removePopup: function(popup) {
        OpenLayers.Util.removeItem(this.popups, popup);
        if (popup.div) {
            try { this.layerContainerDiv.removeChild(popup.div); }
            catch (e) { } // Popups sometimes apparently get disconnected
                      // from the layerContainerDiv, and cause complaints.
        }
        popup.map = null;
    },

  /********************************************************/
  /*                                                      */
  /*              Container Div Functions                 */
  /*                                                      */
  /*   The following functions deal with the access to    */
  /*    and maintenance of the size of the container div  */
  /*                                                      */
  /********************************************************/     

    /**
     * APIMethod: getSize
     * 
     * Return:
     * {<OpenLayers.Size>} An <OpenLayers.Size> object that represents the 
     *                     size, in pixels, of the div into which OpenLayers 
     *                     has been loaded. 
     *                     Note - A clone() of this locally cached variable is
     *                     returned, so as not to allow users to modify it.
     */
    getSize: function () {
        var size = null;
        if (this.size != null) {
            size = this.size.clone();
        }
        return size;
    },

    /**
     * APIMethod: updateSize
     * This function should be called by any external code which dynamically
     *     changes the size of the map div (because mozilla wont let us catch 
     *     the "onresize" for an element)
     */
    updateSize: function() {
        // the div might have moved on the page, also
        this.events.element.offsets = null;
        var newSize = this.getCurrentSize();
        var oldSize = this.getSize();
        if (oldSize == null)
            this.size = oldSize = newSize;
        if (!newSize.equals(oldSize)) {
            
            // store the new size
            this.size = newSize;

            //notify layers of mapresize
            for(var i=0; i < this.layers.length; i++) {
                this.layers[i].onMapResize();                
            }

            if (this.baseLayer != null) {
                var center = new OpenLayers.Pixel(newSize.w /2, newSize.h / 2);
                var centerLL = this.getLonLatFromViewPortPx(center);
                var zoom = this.getZoom();
                this.zoom = null;
                this.setCenter(this.getCenter(), zoom);
            }

        }
    },
    
    /**
     * Method: getCurrentSize
     * 
     * Return:
     * {<OpenLayers.Size>} A new <OpenLayers.Size> object with the dimensions 
     *                     of the map div
     */
    getCurrentSize: function() {

        var size = new OpenLayers.Size(this.div.clientWidth, 
                                       this.div.clientHeight);

        // Workaround for the fact that hidden elements return 0 for size.
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            var dim = OpenLayers.Element.getDimensions(this.div);
            size.w = dim.width;
            size.h = dim.height;
        }
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            size.w = parseInt(this.div.style.width);
            size.h = parseInt(this.div.style.height);
        }
        return size;
    },

    /** 
     * Method: calculateBounds
     * 
     * Parameters:
     * center - {<OpenLayers.LonLat>} Default is this.getCenter()
     * resolution - {float} Default is this.getResolution() 
     * 
     * Return:
     * {<OpenLayers.Bounds>} A bounds based on resolution, center, and 
     *                       current mapsize.
     */
    calculateBounds: function(center, resolution) {

        var extent = null;
        
        if (center == null) {
            center = this.getCenter();
        }                
        if (resolution == null) {
            resolution = this.getResolution();
        }
    
        if ((center != null) && (resolution != null)) {

            var size = this.getSize();
            var w_deg = size.w * resolution;
            var h_deg = size.h * resolution;
        
            extent = new OpenLayers.Bounds(center.lon - w_deg / 2,
                                           center.lat - h_deg / 2,
                                           center.lon + w_deg / 2,
                                           center.lat + h_deg / 2);
        
        }

        return extent;
    },


  /********************************************************/
  /*                                                      */
  /*            Zoom, Center, Pan Functions               */
  /*                                                      */
  /*    The following functions handle the validation,    */
  /*   getting and setting of the Zoom Level and Center   */
  /*       as well as the panning of the Map              */
  /*                                                      */
  /********************************************************/
    /**
     * APIMethod: getCenter
     * 
     * Return:
     * {<OpenLayers.LonLat>}
     */
    getCenter: function () {
        return this.center;
    },


    /**
     * APIMethod: getZoom
     * 
     * Return:
     * {Integer}
     */
    getZoom: function () {
        return this.zoom;
    },
    
    /** 
     * APIMethod: pan
     * Allows user to pan by a value of screen pixels
     * 
     * Parameters:
     * dx - {Integer}
     * dy - {Integer}
     */
    pan: function(dx, dy) {

        // getCenter
        var centerPx = this.getViewPortPxFromLonLat(this.getCenter());

        // adjust
        var newCenterPx = centerPx.add(dx, dy);
        
        // only call setCenter if there has been a change
        if (!newCenterPx.equals(centerPx)) {
            var newCenterLonLat = this.getLonLatFromViewPortPx(newCenterPx);
            this.setCenter(newCenterLonLat);
        }

   },

    /**
     * APIMethod: setCenter
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     * zoom - {Integer}
     * dragging - {Boolean} Specifies whether or not to trigger 
     *                      movestart/end events
     * forceZoomChange - {Boolean} Specifies whether or not to trigger zoom 
     *                             change events (needed on baseLayer change)
     *
     * TBD: reconsider forceZoomChange in 3.0
     */
    setCenter: function (lonlat, zoom, dragging, forceZoomChange) {
        
        if (!this.center && !this.isValidLonLat(lonlat)) {
            lonlat = this.maxExtent.getCenterLonLat();
        }
        
        var zoomChanged = forceZoomChange || (
                            (this.isValidZoomLevel(zoom)) && 
                            (zoom != this.getZoom()) );

        var centerChanged = (this.isValidLonLat(lonlat)) && 
                            (!lonlat.equals(this.center));


        // if neither center nor zoom will change, no need to do anything
        if (zoomChanged || centerChanged || !dragging) {

            if (!dragging) { this.events.triggerEvent("movestart"); }

            if (centerChanged) {
                if ((!zoomChanged) && (this.center)) { 
                    // if zoom hasnt changed, just slide layerContainer
                    //  (must be done before setting this.center to new value)
                    this.centerLayerContainer(lonlat);
                }
                this.center = lonlat.clone();
            }

            // (re)set the layerContainerDiv's location
            if ((zoomChanged) || (this.layerContainerOrigin == null)) {
                this.layerContainerOrigin = this.center.clone();
                this.layerContainerDiv.style.left = "0px";
                this.layerContainerDiv.style.top  = "0px";
            }

            if (zoomChanged) {
                this.zoom = zoom;
                    
                //redraw popups
                for (var i = 0; i < this.popups.length; i++) {
                    this.popups[i].updatePosition();
                }

                // zoom level has changed, increment viewRequestID.
                this.viewRequestID++;
            }    
            
            var bounds = this.getExtent();
            
            //send the move call to the baselayer and all the overlays    
            this.baseLayer.moveTo(bounds, zoomChanged, dragging);
            for (var i = 0; i < this.layers.length; i++) {
                var layer = this.layers[i];
                if (!layer.isBaseLayer) {
                    
                    var moveLayer;
                    var inRange = layer.calculateInRange();
                    if (layer.inRange != inRange) {
                        // Layer property has changed. We are going 
                        // to call moveLayer so that the layer can be turned
                        // off or on.   
                        layer.inRange = inRange;
                        moveLayer = true;
                        this.events.triggerEvent("changelayer");
                    } else {
                        // If nothing has changed, then we only move the layer
                        // if it is visible and inrange.
                        moveLayer = (layer.visibility && layer.inRange);
                    }

                    if (moveLayer) {
                        layer.moveTo(bounds, zoomChanged, dragging);
                    }
                }                
            }
            
            this.events.triggerEvent("move");
    
            if (zoomChanged) { this.events.triggerEvent("zoomend"); }
        }

        // even if nothing was done, we want to notify of this
        if (!dragging) { this.events.triggerEvent("moveend"); }
    },

    /** 
     * Method: centerLayerContainer
     * This function takes care to recenter the layerContainerDiv.
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     */
    centerLayerContainer: function (lonlat) {

        var originPx = this.getViewPortPxFromLonLat(this.layerContainerOrigin);
        var newPx = this.getViewPortPxFromLonLat(lonlat);

        if ((originPx != null) && (newPx != null)) {
            this.layerContainerDiv.style.left = (originPx.x - newPx.x) + "px";
            this.layerContainerDiv.style.top  = (originPx.y - newPx.y) + "px";
        }
    },

    /**
     * Method: isValidZoomLevel
     * 
     * Parameters:
     * zoomLevel - {Integer}
     * 
     * Return:
     * {Boolean} Whether or not the zoom level passed in is non-null and 
     *           within the min/max range of zoom levels.
     */
    isValidZoomLevel: function(zoomLevel) {
       return ( (zoomLevel != null) &&
                (zoomLevel >= 0) && 
                (zoomLevel < this.getNumZoomLevels()) );
    },
    
    /**
     * Method: isValidLonLat
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     * 
     * Return:
     * {Boolean} Whether or not the lonlat passed in is non-null and within
     *           the maxExtent bounds
     */
    isValidLonLat: function(lonlat) {
        var valid = false;
        if (lonlat != null) {
            var maxExtent = this.getMaxExtent();
            valid = maxExtent.containsLonLat(lonlat);        
        }
        return valid;
    },

  /********************************************************/
  /*                                                      */
  /*                 Layer Options                        */
  /*                                                      */
  /*    Accessor functions to Layer Options parameters    */
  /*                                                      */
  /********************************************************/
    
    /**
     * APIMethod: getProjection
     * 
     * Return:
     * {String} The Projection of the base layer.
     */
    getProjection: function() {
        var projection = null;
        if (this.baseLayer != null) {
            projection = this.baseLayer.projection;
        }
        return projection;
    },
    
    /**
     * APIMethod: getMaxResolution
     * 
     * Return:
     * {String} The Map's Maximum Resolution
     */
    getMaxResolution: function() {
        var maxResolution = null;
        if (this.baseLayer != null) {
            maxResolution = this.baseLayer.maxResolution;
        }
        return maxResolution;
    },
        
    /**
     * APIMethod: getMaxExtent
     * 
     * Return:
     * {<OpenLayers.Bounds>}
     */
    getMaxExtent: function () {
        var maxExtent = null;
        if (this.baseLayer != null) {
            maxExtent = this.baseLayer.maxExtent;
        }        
        return maxExtent;
    },
    
    /**
     * APIMethod: getNumZoomLevels
     * 
     * Return:
     * {Integer} The total number of zoom levels that can be displayed by the 
     *           current baseLayer.
     */
    getNumZoomLevels: function() {
        var numZoomLevels = null;
        if (this.baseLayer != null) {
            numZoomLevels = this.baseLayer.numZoomLevels;
        }
        return numZoomLevels;
    },

  /********************************************************/
  /*                                                      */
  /*                 Baselayer Functions                  */
  /*                                                      */
  /*    The following functions, all publicly exposed     */
  /*       in the API?, are all merely wrappers to the    */
  /*       the same calls on whatever layer is set as     */
  /*                the current base layer                */
  /*                                                      */
  /********************************************************/

    /**
     * APIMethod: getExtent
     * 
     * Return:
     * {<OpenLayers.Bounds>} A Bounds object which represents the lon/lat 
     *                       bounds of the current viewPort. 
     *                       If no baselayer is set, returns null.
     */
    getExtent: function () {
        var extent = null;
        if (this.baseLayer != null) {
            extent = this.baseLayer.getExtent();
        }
        return extent;
    },

    /**
     * APIMethod: getResolution
     * 
     * Return:
     * {Float} The current resolution of the map. 
     *         If no baselayer is set, returns null.
     */
    getResolution: function () {
        var resolution = null;
        if (this.baseLayer != null) {
            resolution = this.baseLayer.getResolution();
        }
        return resolution;
    },

     /**
      * APIMethod: getScale
      * 
      * Return:
      * {Float} The current scale denominator of the map. 
      *         If no baselayer is set, returns null.
      */
    getScale: function () {
        var scale = null;
        if (this.baseLayer != null) {
            var res = this.getResolution();
            var units = this.baseLayer.units;
            scale = OpenLayers.Util.getScaleFromResolution(res, units);
        }
        return scale;
    },


    /**
     * APIMethod: getZoomForExteng
     * 
     * Parameters: 
     * bounds - {<OpenLayers.Bounds>}
     * 
     * Return:
     * {Integer} A suitable zoom level for the specified bounds.
     *           If no baselayer is set, returns null.
     */
    getZoomForExtent: function (bounds) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForExtent(bounds);
        }
        return zoom;
    },

    /**
     * APIMethod: getZoomForResolution
     * 
     * Parameter:
     * resolution - {Float}
     * 
     * Return:
     * {Integer} A suitable zoom level for the specified resolution.
     *           If no baselayer is set, returns null.
     */
    getZoomForResolution: function(resolution) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForResolution(resolution);
        }
        return zoom;
    },

  /********************************************************/
  /*                                                      */
  /*                  Zooming Functions                   */
  /*                                                      */
  /*    The following functions, all publicly exposed     */
  /*       in the API, are all merely wrappers to the     */
  /*               the setCenter() function               */
  /*                                                      */
  /********************************************************/
  
    /** 
     * APIMethod: zoomTo
     * Zoom to a specific zoom level
     * 
     * Parameters:
     * zoom - {Integer}
     */
    zoomTo: function(zoom) {
        if (this.isValidZoomLevel(zoom)) {
            this.setCenter(null, zoom);
        }
    },
    
    /**
     * APIMethod: zoomIn
     * 
     * Parameters:
     * zoom - {int}
     */
    zoomIn: function() {
        this.zoomTo(this.getZoom() + 1);
    },
    
    /**
     * APIMethod: zoomOut
     * 
     * Parameters:
     * zoom - {int}
     */
    zoomOut: function() {
        this.zoomTo(this.getZoom() - 1);
    },

    /**
     * APIMethod: zoomToExtent
     * Zoom to the passed in bounds, recenter
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     */
    zoomToExtent: function(bounds) {
        var center = bounds.getCenterLonLat();
        if (this.baseLayer.wrapDateLine) {
            var maxExtent = this.getMaxExtent();

            //fix straddling bounds (in the case of a bbox that straddles the 
            // dateline, it's left and right boundaries will appear backwards. 
            // we fix this by allowing a right value that is greater than the
            // max value at the dateline -- this allows us to pass a valid 
            // bounds to calculate zoom)
            //
            bounds = bounds.clone();
            while (bounds.right < bounds.left) {
                bounds.right += maxExtent.getWidth();
            }
            //if the bounds was straddling (see above), then the center point 
            // we got from it was wrong. So we take our new bounds and ask it
            // for the center. Because our new bounds is at least partially 
            // outside the bounds of maxExtent, the new calculated center 
            // might also be. We don't want to pass a bad center value to 
            // setCenter, so we have it wrap itself across the date line.
            //
            center = bounds.getCenterLonLat().wrapDateLine(maxExtent);
        }
        this.setCenter(center, this.getZoomForExtent(bounds));
    },

    /** 
     * APIMethod: zoomToMaxExtent
     * Zoom to the full extent and recenter.
     */
    zoomToMaxExtent: function() {
        this.zoomToExtent(this.getMaxExtent());
    },

    /** 
     * APIMethod: zoomToScale
     * Zoom to a specified scale 
     * 
     * Parameters:
     * scale - {float}
     */
    zoomToScale: function(scale) {
        var res = OpenLayers.Util.getResolutionFromScale(scale, 
                                                         this.baseLayer.units);
        var size = this.getSize();
        var w_deg = size.w * res;
        var h_deg = size.h * res;
        var center = this.getCenter();

        var extent = new OpenLayers.Bounds(center.lon - w_deg / 2,
                                           center.lat - h_deg / 2,
                                           center.lon + w_deg / 2,
                                           center.lat + h_deg / 2);
        this.zoomToExtent(extent);
    },
    
  /********************************************************/
  /*                                                      */
  /*             Translation Functions                    */
  /*                                                      */
  /*      The following functions translate between       */
  /*           LonLat, LayerPx, and ViewPortPx            */
  /*                                                      */
  /********************************************************/
      
  //
  // TRANSLATION: LonLat <-> ViewPortPx
  //

    /**
     * APIMethod: getLonLatFromViewPortPx
     * 
     * Parameters:
     * viewPortPx - {<OpenLayers.Pixel>}
     * 
     * Return:
     * {<OpenLayers.LonLat>} An OpenLayers.LonLat which is the passed-in view 
     *                       port <OpenLayers.Pixel>, translated into lon/lat
     *                       by the current base layer.
     */
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null; 
        if (this.baseLayer != null) {
            lonlat = this.baseLayer.getLonLatFromViewPortPx(viewPortPx);
        }
        return lonlat;
    },

    /**
     * APIMethod: getViewPortPxFromLonLat
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     * 
     * Return:
     * {<OpenLayers.Pixel>} An OpenLayers.Pixel which is the passed-in 
     *                      <OpenLayers.LonLat>, translated into view port 
     *                      pixels by the current base layer.
     */
    getViewPortPxFromLonLat: function (lonlat) {
        var px = null; 
        if (this.baseLayer != null) {
            px = this.baseLayer.getViewPortPxFromLonLat(lonlat);
        }
        return px;
    },

    
  //
  // CONVENIENCE TRANSLATION FUNCTIONS FOR API
  //

    /**
     * APIMethod: getLonLatFromPixel
     * 
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     *
     * Return:
     * {<OpenLayers.LonLat>} An OpenLayers.LonLat corresponding to the given
     *                       OpenLayers.Pixel, translated into lon/lat by the 
     *                       current base layer
     */
    getLonLatFromPixel: function (px) {
        return this.getLonLatFromViewPortPx(px);
    },

    /**
     * APIMethod: getPixelFromLonLat
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     * 
     * Return: 
     * {<OpenLayers.Pixel>} An OpenLayers.Pixel corresponding to the 
     *                      <OpenLayers.LonLat> translated into view port 
     *                      pixels by the current base layer.
     */
    getPixelFromLonLat: function (lonlat) {
        return this.getViewPortPxFromLonLat(lonlat);
    },



  //
  // TRANSLATION: ViewPortPx <-> LayerPx
  //

    /**
     * APIMethod: getViewPortPxFromLayerPx
     * 
     * Parameters:
     * layerPx - {<OpenLayers.Pixel>}
     * 
     * Return:
     * {<OpenLayers.Pixel>} Layer Pixel translated into ViewPort Pixel 
     *                      coordinates
     */
    getViewPortPxFromLayerPx:function(layerPx) {
        var viewPortPx = null;
        if (layerPx != null) {
            var dX = parseInt(this.layerContainerDiv.style.left);
            var dY = parseInt(this.layerContainerDiv.style.top);
            viewPortPx = layerPx.add(dX, dY);            
        }
        return viewPortPx;
    },
    
    /**
     * APIMethod: getLayerPxFromViewPortPx
     * 
     * Parameters:
     * viewPortPx - {<OpenLayers.Pixel>}
     * 
     * Return:
     * {<OpenLayers.Pixel>} ViewPort Pixel translated into Layer Pixel 
     *                      coordinates
     */
    getLayerPxFromViewPortPx:function(viewPortPx) {
        var layerPx = null;
        if (viewPortPx != null) {
            var dX = -parseInt(this.layerContainerDiv.style.left);
            var dY = -parseInt(this.layerContainerDiv.style.top);
            layerPx = viewPortPx.add(dX, dY);
            if (isNaN(layerPx.x) || isNaN(layerPx.y)) {
                layerPx = null;
            }
        }
        return layerPx;
    },
    
  //
  // TRANSLATION: LonLat <-> LayerPx
  //

    /**
     * APIMethod: getLonLatFromLayerPx
     * 
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     *
     * Return:
     * {<OpenLayers.LonLat>}
     */
    getLonLatFromLayerPx: function (px) {
       //adjust for displacement of layerContainerDiv
       px = this.getViewPortPxFromLayerPx(px);
       return this.getLonLatFromViewPortPx(px);         
    },
    
    /**
     * APIMethod: getLayerPxFromLonLat
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>} lonlat
     *
     * Return:
     * {<OpenLayers.Pixel>} An OpenLayers.Pixel which is the passed-in 
     *                      <OpenLayers.LonLat>, translated into layer pixels 
     *                      by the current base layer
     */
    getLayerPxFromLonLat: function (lonlat) {
       //adjust for displacement of layerContainerDiv
       var px = this.getViewPortPxFromLonLat(lonlat);
       return this.getLayerPxFromViewPortPx(px);         
    },


    /** @final @type String */
    CLASS_NAME: "OpenLayers.Map"
});

/**
 * Constant: TILE_WIDTH
 * {Integer} 256 Default tile width (unless otherwise specified)
 */
OpenLayers.Map.TILE_WIDTH = 256;
/**
 * Constant: TILE_HEIGHT
 * {Integer} 256 Default tile height (unless otherwise specified)
 */
OpenLayers.Map.TILE_HEIGHT = 256;
/* ======================================================================
    OpenLayers/Tile/Image.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */


/**
 * @requires OpenLayers/Tile.js
 * 
 * Class: OpenLayers.Tile.Image
 * Instances of OpenLayers.Tile.Image are used to manage the image tiles
 * used by various layers.  Create a new image tile with the
 * <OpenLayers.Tile.Image> constructor.
 *
 * Inherits from:
 *  - <OpenLayers.Tile>
 */
OpenLayers.Tile.Image = OpenLayers.Class(OpenLayers.Tile, {

    /** 
     * Property: url
     * {String} The URL of the image being requested. No default. Filled in by
     * layer.getURL() function. 
     */
    url: null,
    
    /** 
     * Property: imgDiv
     * {DOMElement} The div element which wraps the image.
     */
    imgDiv: null,

    /**
     * Property: frame
     * {DOMElement} The image element is appended to the frame.  Any gutter on
     * the image will be hidden behind the frame. 
     */ 
    frame: null, 

    /** TBD 3.0 - reorder the parameters to the init function to remove 
     *             URL. the getUrl() function on the layer gets called on 
     *             each draw() and moveTo(), so no need to specify it here.
     * 
     * Constructor: OpenLayers.Tile.Image
     * Constructor for a new <OpenLayers.Tile.Image> instance.
     * 
     * Parameters:
     * layer - {<OpenLayers.Layer>} layer that the tile will go in.
     * position - {<OpenLayers.Pixel>}
     * bounds - {<OpenLayers.Bounds>}
     * url - {<String>} Deprecated. Remove me in 3.0.
     * size - {<OpenLayers.Size>}
     */   
    initialize: function(layer, position, bounds, url, size) {
        OpenLayers.Tile.prototype.initialize.apply(this, arguments);

        this.url = url; //deprecated remove me
        
        this.frame = document.createElement('div'); 
        this.frame.style.overflow = 'hidden'; 
        this.frame.style.position = 'absolute'; 
    },

    /** 
     * APIMethod: destroy
     * nullify references to prevent circular references and memory leaks
     */
    destroy: function() {
        if (this.imgDiv != null)  {
            OpenLayers.Event.stopObservingElement(this.imgDiv.id);
            if (this.imgDiv.parentNode == this.frame) {
                this.frame.removeChild(this.imgDiv);
                this.imgDiv.map = null;
            }
        }
        this.imgDiv = null;
        if ((this.frame != null) && (this.frame.parentNode == this.layer.div)) { 
            this.layer.div.removeChild(this.frame); 
        }
        this.frame = null; 
        OpenLayers.Tile.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: draw
     * Check that a tile should be drawn, and draw it.
     * 
     * Return:
     * {Boolean} Always returns true.
     */
    draw:function() {
        if (this.layer != this.layer.map.baseLayer && this.layer.reproject) {
            this.bounds = this.getBoundsFromBaseLayer(this.position);
        }
        if (!OpenLayers.Tile.prototype.draw.apply(this, arguments)) {
            return false;    
        }
        
        if (this.isLoading) {
            //if we're already loading, send 'reload' instead of 'loadstart'.
            this.events.triggerEvent("reload"); 
        } else {
            this.isLoading = true;
            this.events.triggerEvent("loadstart");
        }
        
        if (this.imgDiv == null) {
            this.initImgDiv();
        }

        this.imgDiv.viewRequestID = this.layer.map.viewRequestID;
        
        this.url = this.layer.getURL(this.bounds);
        // position the frame 
        OpenLayers.Util.modifyDOMElement(this.frame, 
                                         null, this.position, this.size);   

        var imageSize = this.layer.getImageSize(); 
        if (this.layer.alpha) {
            OpenLayers.Util.modifyAlphaImageDiv(this.imgDiv,
                    null, null, imageSize, this.url);
        } else {
            this.imgDiv.src = this.url;
            OpenLayers.Util.modifyDOMElement(this.imgDiv,
                    null, null, imageSize) ;
        }
        this.drawn = true;
        return true;
    },

    /** 
     * Method: clear
     *  Clear the tile of any bounds/position-related data so that it can 
     *   be reused in a new location.
     */
    clear: function() {
        OpenLayers.Tile.prototype.clear.apply(this, arguments);
        if(this.imgDiv) {
            this.imgDiv.style.display = "none";
        }
    },

    /** 
     * Method: moveTo
     * Reposition the tile.
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * position - {<OpenLayers.Pixel>}
     * redraw - {Boolean} Call draw method on tile after moving? Default is true
     */
    moveTo: function (bounds, position, redraw) {
        if (this.layer != this.layer.map.baseLayer && this.layer.reproject) {
            bounds = this.getBoundsFromBaseLayer(position);
        }
        this.url = this.layer.getURL(bounds);
        OpenLayers.Tile.prototype.moveTo.apply(this, arguments);
    },

    /**
     * Method: initImgDiv
     * Creates the imgDiv property on the tile.
     */
    initImgDiv: function() {
        
        var offset = this.layer.imageOffset; 
        var size = this.layer.getImageSize(); 
     
        if (this.layer.alpha) {
            this.imgDiv = OpenLayers.Util.createAlphaImageDiv(null,
                                                           offset,
                                                           size,
                                                           null,
                                                           "relative",
                                                           null,
                                                           null,
                                                           null,
                                                           true);
        } else {
            this.imgDiv = OpenLayers.Util.createImage(null,
                                                      offset,
                                                      size,
                                                      null,
                                                      "relative",
                                                      null,
                                                      null,
                                                      true);
        }
        
        this.imgDiv.className = 'olTileImage';

        /* checkImgURL used to be used to called as a work around, but it
           ended up hiding problems instead of solving them and broke things
           like relative URLs. See discussion on the dev list:
           http://openlayers.org/pipermail/dev/2007-January/000205.html

        OpenLayers.Event.observe( this.imgDiv, "load",
                        this.checkImgURL.bind(this) );
        */
        this.frame.appendChild(this.imgDiv); 
        this.layer.div.appendChild(this.frame); 

        if(this.layer.opacity != null) {
            
            OpenLayers.Util.modifyDOMElement(this.imgDiv, null, null, null,
                                             null, null, null, 
                                             this.layer.opacity);
        }

        // we need this reference to check back the viewRequestID
        this.imgDiv.map = this.layer.map;

        //bind a listener to the onload of the image div so that we 
        // can register when a tile has finished loading.
        var onload = function() {
            
            //normally isLoading should always be true here but there are some 
            // right funky conditions where loading and then reloading a tile
            // with the same url *really*fast*. this check prevents sending 
            // a 'loadend' if the msg has already been sent
            //
            if (this.isLoading) { 
                this.isLoading = false; 
                this.events.triggerEvent("loadend"); 
            }
        }
        OpenLayers.Event.observe(this.imgDiv, 'load', onload.bind(this));

    },

    /**
     * Method: checkImgURL
     * Make sure that the image that just loaded is the one this tile is meant
     * to display, since panning/zooming might have changed the tile's URL in
     * the meantime. If the tile URL did change before the image loaded, set
     * the imgDiv display to 'none', as either (a) it will be reset to visible
     * when the new URL loads in the image, or (b) we don't want to display
     * this tile after all because its new bounds are outside our maxExtent.
     * 
     * This function should no longer  be neccesary with the improvements to
     * Grid.js in OpenLayers 2.3. The lack of a good isEquivilantURL function
     * caused problems in 2.2, but it's possible that with the improved 
     * isEquivilant URL function, this might be neccesary at some point.
     * 
     * See discussion in the thread at 
     * http://openlayers.org/pipermail/dev/2007-January/000205.html
     */
    checkImgURL: function () {
        // Sometimes our image will load after it has already been removed
        // from the map, in which case this check is not needed.  
        if (this.layer) {
            var loaded = this.layer.alpha ? this.imgDiv.firstChild.src : this.imgDiv.src;
            if (!OpenLayers.Util.isEquivalentUrl(loaded, this.url)) {
                this.imgDiv.style.display = "none";
            }
        }
    },

    /** @final @type String */
    CLASS_NAME: "OpenLayers.Tile.Image"
  }
);
/* ======================================================================
    OpenLayers/Layer.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */


/**
 * @requires OpenLayers/Map.js
 * 
 * Class: OpenLayers.Layer
 */
OpenLayers.Layer = OpenLayers.Class({

    /**
     * APIProperty: id
     * {String}
     */
    id: null,

    /** 
     * APIProperty: name
     * {String}
     */
    name: null,

    /** 
     * APIProperty: div
     * {DOMElement}
     */
    div: null,

    /** 
     * Constant: EVENT_TYPES
     * {Array(String)} Supported application event types
     */
    EVENT_TYPES: [ "loadstart", "loadend", "loadcancel"],
        
    /**
     * APIProperty: events``
     * {<OpenLayers.Events>}
     */
    events: null,

    /**
     * APIProperty: map
     * {<OpenLayers.Map>} This variable is set when the layer is added to 
     *     the map, via the accessor function setMap().
     */
    map: null,
    
    /**
     * APIProperty: isBaseLayer
     * {Boolean} Whether or not the layer is a base layer. This should be set 
     *     individually by all subclasses. Default is false
     */
    isBaseLayer: false,
 
    /**
     * Property: alpha
     * {Boolean} The layer's images have an alpha channel.  Default is false. 
     */
    alpha: false,

    /** 
     * APIProperty: displayInLayerSwitcher
     * {Boolean} Display the layer's name in the layer switcher.  Default is
     *     true.
     */
    displayInLayerSwitcher: true,

    /**
     * APIProperty: visibility
     * {Boolean} The layer should be displayed in the map.  Default is true.
     */
    visibility: true,

    /** 
     * Property: inRange
     * {Boolean} The current map resolution is within the layer's min/max range.
     *     This is set in <OpenLayers.Map.setCenter> whenever the zoom changes.
     */
    inRange: false,
    
    /**
     * Propery: imageSize
     * {<OpenLayers.Size>} For layers with a gutter, the image is larger than 
     *     the tile by twice the gutter in each dimension.
     */
    imageSize: null,
    
    /**
     * Property: imageOffset
     * {<OpenLayers.Pixel>} For layers with a gutter, the image offset 
     *     represents displacement due to the gutter.
     */
    imageOffset: null,

  // OPTIONS

    /** 
     * Property: options
     * {Object} An optional object whose properties will be set on the layer.
     *     Any of the layer properties can be set as a property of the options
     *     object and sent to the constructor when the layer is created.
     */
    options: null,

    /**
     * APIProperty: gutter
     * {Integer} Determines the width (in pixels) of the gutter around image
     *     tiles to ignore.  By setting this property to a non-zero value,
     *     images will be requested that are wider and taller than the tile
     *     size by a value of 2 x gutter.  This allows artifacts of rendering
     *     at tile edges to be ignored.  Set a gutter value that is equal to
     *     half the size of the widest symbol that needs to be displayed.
     *     Defaults to zero.  Non-tiled layers always have zero gutter.
     */ 
    gutter: 0, 

    /**
     * APIProperty: projection
     * {String} Set in the layer options to override the default projection
     *     string this layer - also set maxExtent, maxResolution, and units if
     *     appropriate.
     */
    projection: null,    
    
    /**
     * APIProperty: units
     * {String} The layer map units.  Defaults to 'degrees'.  Possible values
     *     are 'degrees' (or 'dd'), 'm', 'ft', 'km', 'mi', 'inches'.
     */
    units: null,

    /**
     * APIProperty: scales
     * {Array}  An array of map scales in descending order.  The values in the
     *     array correspond to the map scale denominator.  Note that these
     *     values only make sense if the display (monitor) resolution of the
     *     client is correctly guessed by whomever is configuring the
     *     application.  In addition, the units property must also be set.
     *     Use <resolutions> instead wherever possible.
     */
    scales: null,

    /**
     * APIProperty: resolutions
     * {Array} A list of map resolutions (map units per pixel) in descending
     *     order.  If this is not set in the layer constructor, it will be set
     *     based on other resolution related properties (maxExtent,
     *     maxResolution, maxScale, etc.).
     */
    resolutions: null,
    
    /**
     * APIProperty: maxExtent
     * {<OpenLayers.Bounds>}  The center of these bounds will not stray outside
     *     of the viewport extent during panning.  In addition, if
     *     <displayOutsideMaxExtent> is set to false, data will not be
     *     requested that falls completely outside of these bounds.
     */
    maxExtent: null,
    
    /**
     * APIProperty: minExtent
     * {<OpenLayers.Bounds>}
     */
    minExtent: null,
    
    /**
     * APIProperty: maxResolution
     * {Float} Default max is 360 deg / 256 px, which corresponds to
     *     zoom level 0 on gmaps.  Specify a different value in the layer 
     *     options if you are not using a geographic projection and 
     *     displaying the whole world.
     */
    maxResolution: null,

    /**
     * APIProperty: minResolution
     * {Float}
     */
    minResolution: null,

    /**
     * APIProperty: numZoomLevels
     * {Integer}
     */
    numZoomLevels: null,
   
    /**
     * APIProperty: minScale
     * {Float}
     */
    minScale: null,
    
    /**
     * APIProperty: maxScale
     * {Float}
     */
    maxScale: null,

    /**
     * APIProperty: displayOutsideMaxExtent
     * {Boolean} Request map tiles that are completely outside of the max extent
     *     for this layer.  Defaults to false.
     */
    displayOutsideMaxExtent: false,

    /**
     * APIProperty: wrapDateLine
     * {Boolean} #487 for more info.   
     */
    wrapDateLine: false,
    
    
    /**
     * Constructor: OpenLayers.Layer
     *
     * Parameters:
     * name - {String} The layer name
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, options) {

        this.addOptions(options);

        this.name = name;
        
        if (this.id == null) {

            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");

            this.div = OpenLayers.Util.createDiv();
            this.div.style.width = "100%";
            this.div.style.height = "100%";
            this.div.id = this.id;

            this.events = new OpenLayers.Events(this, this.div, 
                                                this.EVENT_TYPES);
        }

        if (this.wrapDateLine) {
            this.displayOutsideMaxExtent = true;
        }
    },
    
    /**
     * Method: destroy
     * Destroy is a destructor: this is to alleviate cyclic references which
     *     the Javascript garbage cleaner can not take care of on its own.
     *
     * Parameters:
     * setNewBaseLayer - {Boolean} Set a new base layer when this layer has
     *     been destroyed.  Default is true.
     */
    destroy: function(setNewBaseLayer) {
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }
        if (this.map != null) {
            this.map.removeLayer(this, setNewBaseLayer);
        }
        this.map = null;
        this.name = null;
        this.div = null;
        this.options = null;

        if (this.events) {
            this.events.destroy();
        }
        this.events = null;
    },
    
   /**
    * Method: clone
    *
    * Parameters:
    * obj - {<OpenLayers.Layer>} The layer to be cloned
    *
    * Return:
    * {<OpenLayers.Layer>} An exact clone of this <OpenLayers.Layer>
    */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new OpenLayers.Layer(this.name, this.options);
        } 
        
        // catch any randomly tagged-on properties
        OpenLayers.Util.applyDefaults(obj, this);
        
        // a cloned layer should never have its map property set
        //  because it has not been added to a map yet. 
        obj.map = null;
        
        return obj;
    },
    
    /** 
     * APIMethod: setName
     * Sets the new layer name for this layer.  Can trigger a changelayer event
     *     on the map.
     *
     * Parameters:
     * newName - {String} The new name.
     */
    setName: function(newName) {
        if (newName != this.name) {
            this.name = newName;
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer");
            }
        }
    },    
    
   /**
    * APIMethod: addOptions
    * 
    * Parameters:
    * newOptions - {Object}
    */
    addOptions: function (newOptions) {
        
        if (this.options == null) {
            this.options = {};
        }
        
        // update our copy for clone
        OpenLayers.Util.extend(this.options, newOptions);

        // add new options to this
        OpenLayers.Util.extend(this, newOptions);
    },
    
    /**
     * APIMethod: onMapResize
     * This function can be implemented by subclasses
     */
    onMapResize: function() {
        //this function can be implemented by subclasses  
    },

    /**
     * APIMethod: redraw
     * Redraws the layer.  Returns true if the layer was redrawn, false if not.
     *
     * Return:
     * {Boolean} The layer was redrawn.
     */
    redraw: function() {
        var redrawn = false;
        if (this.map) {

            // min/max Range may have changed
            this.inRange = this.calculateInRange();

            // map's center might not yet be set
            var extent = this.getExtent();

            if (extent && this.inRange && this.visibility) {
                this.moveTo(extent, true, false);
                redrawn = true;
            }
        }
        return redrawn;
    },

    /**
     * Method: moveTo
     * 
     * Parameters:
     * bound - {<OpenLayers.Bounds>}
     * zoomChanged - {Boolean} Tells when zoom has changed, as layers have to
     *     do some init work in that case.
     * dragging - {Boolean}
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        var display = this.visibility;
        if (!this.isBaseLayer) {
            display = display && this.inRange;
        }
        this.display(display);
    },

    /**
     * Method: setMap
     * Set the map property for the layer. This is done through an accessor
     *     so that subclasses can override this and take special action once 
     *     they have their map variable set. 
     * 
     *     Here we take care to bring over any of the necessary default properties
     *     from the map. 
     * 
     * Parameters:
     * map - {<OpenLayers.Map>}
     */
    setMap: function(map) {
        if (this.map == null) {
        
            this.map = map;
            
            // grab some essential layer data from the map if it hasn't already
            //  been set
            this.maxExtent = this.maxExtent || this.map.maxExtent;
            this.projection = this.projection || this.map.projection;
            this.units = this.units || this.map.units;
            
            this.initResolutions();
            
            if (!this.isBaseLayer) {
                this.inRange = this.calculateInRange();
                var show = ((this.visibility) && (this.inRange));
                this.div.style.display = show ? "" : "none";
            }
            
            // deal with gutters
            this.setTileSize();
        }
    },
    
    /**
     * APIMethod: getImageSize
     * 
     * Return:
     * {<OpenLayers.Size>} The size that the image should be, taking into 
     *     account gutters.
     */ 
    getImageSize: function() { 
        return (this.imageSize || this.tileSize); 
    },    
  
    /**
     * APIMethod: setTileSize
     * Set the tile size based on the map size.  This also sets layer.imageSize
     *     and layer.imageOffset for use by Tile.Image.
     * 
     * Parameters:
     * size - {<OpenLayers.Size>}
     */
    setTileSize: function(size) {
        var tileSize = (size) ? size :
                                ((this.tileSize) ? this.tileSize :
                                                   this.map.getTileSize());
        this.tileSize = tileSize;
        if(this.gutter) {
            // layers with gutters need non-null tile sizes
            //if(tileSize == null) {
            //    OpenLayers.console.error("Error in layer.setMap() for " +
            //                              this.name + ": layers with gutters " +
            //                              "need non-null tile sizes");
            //}
            this.imageOffset = new OpenLayers.Pixel(-this.gutter, -this.gutter); 
            this.imageSize = new OpenLayers.Size(tileSize.w + (2 * this.gutter), 
                                                 tileSize.h + (2 * this.gutter)); 
        }
    },

    /**
     * APIMethod: getVisibility
     * 
     * Return:
     * {Boolean} The layer should be displayed (if in range).
     */
    getVisibility: function() {
        return this.visibility;
    },

    /** 
     * APIMethod: setVisibility
     * Set the visibility flag for the layer and hide/show & redraw accordingly. 
     *     Fire event unless otherwise specified
     * 
     * Note that visibility is no longer simply whether or not the layer's
     *     style.display is set to "block". Now we store a 'visibility' state 
     *     property on the layer class, this allows us to remember whether or 
     *     not we *desire* for a layer to be visible. In the case where the 
     *     map's resolution is out of the layer's range, this desire may be 
     *     subverted.
     * 
     * Parameters:
     * visible - {Boolean} Whether or not to display the layer (if in range)
     * noEvent - {Boolean}
     */
    setVisibility: function(visibility, noEvent) {
        if (visibility != this.visibility) {
            this.visibility = visibility;
            this.display(visibility);
            this.redraw();
            if ((this.map != null) && 
                ((noEvent == null) || (noEvent == false))) {
                this.map.events.triggerEvent("changelayer");
            }
        }
    },

    /** 
     * APIMethod: display
     * Hide or show the Layer
     * 
     * Parameters:
     * display - {Boolean}
     */
    display: function(display) {
        if (display != (this.div.style.display != "none")) {
            this.div.style.display = (display) ? "block" : "none";
        }
    },

    /**
     * Method: calculateInRange
     * 
     * Return:
     * {Boolean} The layer is displayable at the current map's current
     *     resolution.
     */
    calculateInRange: function() {
        var inRange = false;
        if (this.map) {
            var resolution = this.map.getResolution();
            inRange = ( (resolution >= this.minResolution) &&
                        (resolution <= this.maxResolution) );
        }
        return inRange;
    },

    /** 
     * APIMethod: setIsBaseLayer
     * 
     * Parameters:
     * isBaseLayer - {Boolean}
     */
    setIsBaseLayer: function(isBaseLayer) {
        if (isBaseLayer != this.isBaseLayer) {
            this.isBaseLayer = isBaseLayer;
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer");
            }
        }
    },

  /********************************************************/
  /*                                                      */
  /*                 Baselayer Functions                  */
  /*                                                      */
  /********************************************************/
  
    /** 
     * Method: initResolutions
     * This method's responsibility is to set up the 'resolutions' array 
     *     for the layer -- this array is what the layer will use to interface
     *     between the zoom levels of the map and the resolution display 
     *     of the layer.
     * 
     * The user has several options that determine how the array is set up.
     *  
     * For a detailed explanation, see the following wiki from the 
     *     openlayers.org homepage:
     *     http://trac.openlayers.org/wiki/SettingZoomLevels
     */
    initResolutions: function() {

        // These are the relevant options which are used for calculating 
        //  resolutions information.
        //
        var props = new Array(
          'projection', 'units',
          'scales', 'resolutions',
          'maxScale', 'minScale', 
          'maxResolution', 'minResolution', 
          'minExtent', 'maxExtent',
          'numZoomLevels', 'maxZoomLevel'
        );

        // First we create a new object where we will store all of the 
        //  resolution-related properties that we find in either the layer's
        //  'options' array or from the map.
        //
        var confProps = {};        
        for(var i=0; i < props.length; i++) {
            var property = props[i];
            confProps[property] = this.options[property] || this.map[property];
        }

        // If numZoomLevels hasn't been set and the maxZoomLevel *has*, 
        //  then use maxZoomLevel to calculate numZoomLevels
        //
        if ( (!confProps.numZoomLevels) && (confProps.maxZoomLevel) ) {
            confProps.numZoomLevels = confProps.maxZoomLevel + 1;
        }

        // First off, we take whatever hodge-podge of values we have and 
        //  calculate/distill them down into a resolutions[] array
        //
        if ((confProps.scales != null) || (confProps.resolutions != null)) {
          //preset levels
            if (confProps.scales != null) {
                confProps.resolutions = [];
                for(var i = 0; i < confProps.scales.length; i++) {
                    var scale = confProps.scales[i];
                    confProps.resolutions[i] = 
                       OpenLayers.Util.getResolutionFromScale(scale, 
                                                              confProps.units);
                }
            }
            confProps.numZoomLevels = confProps.resolutions.length;

        } else {
          //maxResolution and numZoomLevels based calculation
            
            confProps.resolutions = [];
            
            // determine maxResolution
            if (confProps.minScale) {
                confProps.maxResolution = 
                    OpenLayers.Util.getResolutionFromScale(confProps.minScale, 
                                                           confProps.units);
            } else if (confProps.maxResolution == "auto") {
                var viewSize = this.map.getSize();
                var wRes = confProps.maxExtent.getWidth() / viewSize.w;
                var hRes = confProps.maxExtent.getHeight()/ viewSize.h;
                confProps.maxResolution = Math.max(wRes, hRes);
            } 

            // determine minResolution
            if (confProps.maxScale != null) {           
                confProps.minResolution = 
                    OpenLayers.Util.getResolutionFromScale(confProps.maxScale);
            } else if ( (confProps.minResolution == "auto") && 
                        (confProps.minExtent != null) ) {
                var viewSize = this.map.getSize();
                var wRes = confProps.minExtent.getWidth() / viewSize.w;
                var hRes = confProps.minExtent.getHeight()/ viewSize.h;
                confProps.minResolution = Math.max(wRes, hRes);
            } 

            // determine numZoomLevels
            if (confProps.minResolution != null) {
                var ratio = confProps.maxResolution / confProps.minResolution;
                confProps.numZoomLevels = 
                    Math.floor(Math.log(ratio) / Math.log(2)) + 1;
            }
            
            // now we have numZoomLevels and maxResolution, 
            //  we can populate the resolutions array
            for (var i=0; i < confProps.numZoomLevels; i++) {
                var res = confProps.maxResolution / Math.pow(2, i)
                confProps.resolutions.push(res);
            }    
        }
        
        //sort resolutions array ascendingly
        //
        confProps.resolutions.sort( function(a, b) { return(b-a); } );

        // now set our newly calculated values back to the layer 
        //  Note: We specifically do *not* set them to layer.options, which we 
        //        will preserve as it was when we added this layer to the map. 
        //        this way cloned layers reset themselves to new map div 
        //        dimensions)
        //

        this.resolutions = confProps.resolutions;
        this.maxResolution = confProps.resolutions[0];
        var lastIndex = confProps.resolutions.length - 1;
        this.minResolution = confProps.resolutions[lastIndex];
        
        this.scales = [];
        for(var i = 0; i < confProps.resolutions.length; i++) {
            this.scales[i] = 
               OpenLayers.Util.getScaleFromResolution(confProps.resolutions[i], 
                                                      confProps.units);
        }
        this.minScale = this.scales[0];
        this.maxScale = this.scales[this.scales.length - 1];
        
        this.numZoomLevels = confProps.numZoomLevels;
    },

    /**
     * APIMethod: getResolution
     * 
     * Return:
     * {Float} The currently selected resolution of the map, taken from the
     *     resolutions array, indexed by current zoom level.
     */
    getResolution: function() {
        var zoom = this.map.getZoom();
        return this.resolutions[zoom];
    },

    /** 
     * APIMethod: getExtent
     * 
     * Return:
     * {<OpenLayers.Bounds>} A Bounds object which represents the lon/lat 
     *     bounds of the current viewPort.
     */
    getExtent: function() {
        // just use stock map calculateBounds function -- passing no arguments
        //  means it will user map's current center & resolution
        //
        return this.map.calculateBounds();
    },

    /**
     * APIMethod: getZoomForExtent
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     *
     * Return:
     * {Integer} The index of the zoomLevel (entry in the resolutions array) 
     *     that still contains the passed-in extent. We do this by calculating
     *     the ideal resolution for the given exteng (based on the map size)
     *     and then find the smallest resolution that is greater than this
     *     ideal resolution.
     */
    getZoomForExtent: function(extent) {
        var viewSize = this.map.getSize();
        var idealResolution = Math.max( extent.getWidth()  / viewSize.w,
                                        extent.getHeight() / viewSize.h );

        return this.getZoomForResolution(idealResolution);
    },
    
    /**
     * APIMethod: getZoomForResolution
     * 
     * Parameters:
     * resolution - {Float}
     * 
     * Return:
     * {Integer} The index of the zoomLevel (entry in the resolutions array) 
     *     that is the smallest resolution that is greater than the passed-in
     *     resolution.
     */
    getZoomForResolution: function(resolution) {
        
        for(var i=1; i < this.resolutions.length; i++) {
            if ( this.resolutions[i] < resolution) {
                break;
            }
        }
        return (i - 1);
    },
    
    /**
     * APIMethod: getLonLatFromViewPortPx
     * 
     * Parameters:
     * viewPortPx - {<OpenLayers.Pixel>}
     *
     * Return:
     * {<OpenLayers.LonLat>} An OpenLayers.LonLat which is the passed-in 
     *     view port <OpenLayers.Pixel>, translated into lon/lat by the layer.
     */
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null;
        if (viewPortPx != null) {
            var size = this.map.getSize();
            var center = this.map.getCenter();
            if (center) {
                var res  = this.map.getResolution();
        
                var delta_x = viewPortPx.x - (size.w / 2);
                var delta_y = viewPortPx.y - (size.h / 2);
            
                lonlat = new OpenLayers.LonLat(center.lon + delta_x * res ,
                                             center.lat - delta_y * res); 

                if (this.wrapDateLine) {
                    lonlat = lonlat.wrapDateLine(this.maxExtent);
                }
            } // else { DEBUG STATEMENT }
        }
        return lonlat;
    },

    /**
     * APIMethod: getViewPortPxFromLonLat
     * 
     * Parameters:
     * lonlat - {<OpenLayers.LonLat>}
     *
     * Return: 
     * {<OpenLayers.Pixel>} An <OpenLayers.Pixel> which is the passed-in 
     *     <OpenLayers.LonLat>,translated into view port pixels.
     */
    getViewPortPxFromLonLat: function (lonlat) {
        var px = null; 
        if (lonlat != null) {
            var resolution = this.map.getResolution();
            var extent = this.map.getExtent();
            px = new OpenLayers.Pixel(
                           Math.round(1/resolution * (lonlat.lon - extent.left)),
                           Math.round(1/resolution * (extent.top - lonlat.lat))
                           );    
        }
        return px;
    },
    
    /**
     * APIMethod: setOpacity
     * Sets the opacity for the entire layer (all images)
     * 
     * Parameter:
     * opacity - {Float}
     */
    setOpacity: function(opacity) {
        if (opacity != this.opacity) {
            this.opacity = opacity;
            for(var i=0; i<this.div.childNodes.length; ++i) {
                var element = this.div.childNodes[i].firstChild;
                OpenLayers.Util.modifyDOMElement(element, null, null, null, 
                                                 null, null, null, opacity);
            }
        }
    },

    /**
     * Method: setZIndex
     * 
     * Parameters: 
     * zIndex - {Integer}
     */    
    setZIndex: function (zIndex) {
        this.div.style.zIndex = zIndex;
    },

    /**
     * Method: adjustBounds
     * This function will take a bounds, and if wrapDateLine option is set
     *     on the layer, it will return a bounds which is wrapped around the 
     *     world. We do not wrap for bounds which *cross* the 
     *     maxExtent.left/right, only bounds which are entirely to the left 
     *     or entirely to the right.
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     */
    adjustBounds: function (bounds) {

        if (this.gutter) {
            // Adjust the extent of a bounds in map units by the 
            // layer's gutter in pixels.
            var mapGutter = this.gutter * this.map.getResolution();
            bounds = new OpenLayers.Bounds(bounds.left - mapGutter,
                                           bounds.bottom - mapGutter,
                                           bounds.right + mapGutter,
                                           bounds.top + mapGutter);
        }

        if (this.wrapDateLine) {
            // wrap around the date line, within the limits of rounding error
            var wrappingOptions = { 
                'rightTolerance':this.getResolution()
            };    
            bounds = bounds.wrapDateLine(this.maxExtent, wrappingOptions);
                              
        }
        return bounds;
    },

    CLASS_NAME: "OpenLayers.Layer"
});
/* ======================================================================
    OpenLayers/Layer/HTTPRequest.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */


/**
 * @requires OpenLayers/Layer.js
 * 
 * Class: OpenLayers.Layer.HTTPRequest
 * 
 * Inherits: 
 *  - OpenLayers.Layer
 */
OpenLayers.Layer.HTTPRequest = OpenLayers.Class(OpenLayers.Layer, {

    /** 
     * Constant: URL_HASH_FACTOR
     * {Float} Used to hash URL param strings for multi-WMS server selection.
     *         Set to the Golden Ratio per Knuth's recommendation.
     */
    URL_HASH_FACTOR: (Math.sqrt(5) - 1) / 2,

    /** 
     * Property: url
     * {Array(String) or String} This is either an array of url strings or 
     *                           a single url string. 
     */
    url: null,

    /** 
     * Property: params
     * {Object} Hashtable of key/value parameters
     */
    params: null,
    
    /** 
     * APIProperty: reproject
     * {Boolean} Whether layer should reproject itself based on base layer 
     *           locations. This allows reprojection onto commercial layers. 
     *           Default is false: Most layers can't reproject, but layers 
     *           which can create non-square geographic pixels can, like WMS. 
     */
    reproject: false,

    /**
     * Constructor: OpenLayers.Layer.HTTPRequest
     * 
     * Parameters:
     * name - {String}
     * url - {Array(String) or String}
     * params - {Object}
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, url, params, options) {
        var newArguments = arguments;
        newArguments = [name, options];
        OpenLayers.Layer.prototype.initialize.apply(this, newArguments);
        this.url = url;
        this.params = OpenLayers.Util.extend( {}, params);
    },

    /**
     * APIMethod: destroy
     */
    destroy: function() {
        this.url = null;
        this.params = null;
        OpenLayers.Layer.prototype.destroy.apply(this, arguments); 
    },
    
    /**
     * APIMethod: clone
     * 
     * Parameters:
     * obj - {Object}
     * 
     * Return:
     * {<OpenLayers.Layer.HTTPRequest>} An exact clone of this 
     *                                  <OpenLayers.Layer.HTTPRequest>
     */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new OpenLayers.Layer.HTTPRequest(this.name,
                                                   this.url,
                                                   this.params,
                                                   this.options);
        }
        
        //get all additions from superclasses
        obj = OpenLayers.Layer.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        
        return obj;
    },

    /** 
     * APIMethod: setUrl
     * 
     * Parameters:
     * newUrl - {String}
     */
    setUrl: function(newUrl) {
        this.url = newUrl;
    },

    /**
     * APIMethod: mergeNewParams
     * 
     * Parameters:
     * newParams - {Object}
     */
    mergeNewParams:function(newParams) {
        this.params = OpenLayers.Util.extend(this.params, newParams);
        this.redraw();
    },
    
    /**
     * Method: selectUrl
     * selectUrl() implements the standard floating-point multiplicative
     *     hash function described by Knuth, and hashes the contents of the 
     *     given param string into a float between 0 and 1. This float is then
     *     scaled to the size of the provided urls array, and used to select
     *     a URL.
     *
     * Parameters:
     * paramString - {String}
     * urls - {Array(String)}
     * 
     * Return:
     * {String} An entry from the urls array, deterministically selected based
     *          on the paramString.
     */
    selectUrl: function(paramString, urls) {
        var product = 1;
        for (var i = 0; i < paramString.length; i++) { 
            product *= paramString.charCodeAt(i) * this.URL_HASH_FACTOR; 
            product -= Math.floor(product); 
        }
        return urls[Math.floor(product * urls.length)];
    },

    /** 
     * Method: getFullRequestString
     * Combine url with layer's params and these newParams. 
     *   
     *    does checking on the serverPath variable, allowing for cases when it 
     *     is supplied with trailing ? or &, as well as cases where not. 
     *
     *    return in formatted string like this:
     *        "server?key1=value1&key2=value2&key3=value3"
     * 
     * WARNING: The altUrl parameter is deprecated and will be removed in 3.0.
     *
     * Parameters:
     * newParams - {Object}
     * altUrl - {String} Use this as the url instead of the layer's url
     *   
     * Return: 
     * {String}
     */
    getFullRequestString:function(newParams, altUrl) {

        // if not altUrl passed in, use layer's url
        var url = altUrl || this.url;
        
        // create a new params hashtable with all the layer params and the 
        // new params together. then convert to string
        var allParams = OpenLayers.Util.extend({}, this.params);
        allParams = OpenLayers.Util.extend(allParams, newParams);
        var paramsString = OpenLayers.Util.getParameterString(allParams);
        
        // if url is not a string, it should be an array of strings, 
        // in which case we will deterministically select one of them in 
        // order to evenly distribute requests to different urls.
        //
        if (url instanceof Array) {
            url = this.selectUrl(paramsString, url);
        }   
 
        // ignore parameters that are already in the url search string
        var urlParams = 
            OpenLayers.Util.upperCaseObject(OpenLayers.Util.getArgs(url));
        for(var key in allParams) {
            if(key.toUpperCase() in urlParams) {
                delete allParams[key];
            }
        }
        paramsString = OpenLayers.Util.getParameterString(allParams);
        
        // requestString always starts with url
        var requestString = url;        
        
        if (paramsString != "") {
            var lastServerChar = url.charAt(url.length - 1);
            if ((lastServerChar == "&") || (lastServerChar == "?")) {
                requestString += paramsString;
            } else {
                if (url.indexOf('?') == -1) {
                    //serverPath has no ? -- add one
                    requestString += '?' + paramsString;
                } else {
                    //serverPath contains ?, so must already have 
                    // paramsString at the end
                    requestString += '&' + paramsString;
                }
            }
        }
        return requestString;
    },

    CLASS_NAME: "OpenLayers.Layer.HTTPRequest"
});
/* ======================================================================
    OpenLayers/Layer/Grid.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */


/**
 * @requires OpenLayers/Layer/HTTPRequest.js
 * 
 * Class: OpenLayers.Layer.Grid
 * Base class for layers that use a lattice of tiles.  Create a new grid
 * layer with the <OpenLayers.Layer.Grid> constructor.
 *
 * Inherits from:
 *  - <OpenLayers.Layer.HTTPRequest>
 */
OpenLayers.Layer.Grid = OpenLayers.Class(OpenLayers.Layer.HTTPRequest, {
    
    /**
     * APIProperty: tileSize
     * {<OpenLayers.Size>}
     */
    tileSize: null,
    
    /**
     * Property: grid
     * {Array(Array(<OpenLayers.Tile>))} This is an array of rows, each row is 
     *     an array of tiles.
     */
    grid: null,

    /** APIProperty: ratio
     *  {Float} Used only when in single-tile mode, this specifies the 
     *          ratio of the size of the single tile to the size of the map.
     */
    ratio: 1.5,

    /**
     * APIProperty: buffer
     * {Integer} Used only when in gridded mode, this specifies the number of 
     *           extra rows and colums of tiles which will surround the minimum
     *           grid tiles to cover the map.
     */
    buffer: 2,

    /**
     * APIProperty: numLoadingTiles
     * {Integer} How many tiles are still loading?
     */
    numLoadingTiles: 0,

    /**
     * Constructor: OpenLayers.Layer.Grid
     * Create a new grid layer
     *
     * Parameters:
     * name - {String}
     * url - {String}
     * params - {Object}
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, url, params, options) {
        OpenLayers.Layer.HTTPRequest.prototype.initialize.apply(this, 
                                                                arguments);
        
        //grid layers will trigger 'tileloaded' when each new tile is 
        // loaded, as a means of progress update to listeners.
        // listeners can access 'numLoadingTiles' if they wish to keep track
        // of the loading progress
        //
        this.events.addEventType("tileloaded");

        this.grid = [];
    },

    /**
     * APIMethod: destroy
     * Deconstruct the layer and clear the grid.
     */
    destroy: function() {
        this.clearGrid();
        this.grid = null;
        this.tileSize = null;
        OpenLayers.Layer.HTTPRequest.prototype.destroy.apply(this, arguments); 
    },

    /**
     * Method: clearGrid
     * Go through and remove all tiles from the grid, calling
     *    destroy() on each of them to kill circular references
     */
    clearGrid:function() {
        if (this.grid) {
            for(var iRow=0; iRow < this.grid.length; iRow++) {
                var row = this.grid[iRow];
                for(var iCol=0; iCol < row.length; iCol++) {
                    var tile = row[iCol];
                    this.removeTileMonitoringHooks(tile);
                    tile.destroy();
                }
            }
            this.grid = [];
        }
    },

    /**
     * APIMethod: clone
     * Create a clone of this layer
     *
     * Parameters:
     * obj - {Object} Is this ever used?
     * 
     * Return:
     * {<OpenLayers.Layer.Grid>} An exact clone of this OpenLayers.Layer.Grid
     */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new OpenLayers.Layer.Grid(this.name,
                                            this.url,
                                            this.params,
                                            this.options);
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.HTTPRequest.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        if (this.tileSize != null) {
            obj.tileSize = this.tileSize.clone();
        }
        
        // we do not want to copy reference to grid, so we make a new array
        obj.grid = [];

        return obj;
    },    

    /**
     * Method: moveTo
     * This function is called whenever the map is moved. All the moving
     * of actual 'tiles' is done by the map, but moveTo's role is to accept
     * a bounds and make sure the data that that bounds requires is pre-loaded.
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * zoomChanged - {Boolean}
     * dragging - {Boolean}
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this, arguments);
        
        bounds = bounds || this.map.getExtent();

        if (bounds != null) {
             
            // if grid is empty or zoom has changed, we *must* re-tile
            var forceReTile = !this.grid.length || zoomChanged;

            // total bounds of the tiles
            var tilesBounds = this.getTilesBounds();            
      
            if (this.singleTile) {
                
                // We want to redraw whenever even the slightest part of the 
                //  current bounds is not contained by our tile.
                //  (thus, we do not specify partial -- its default is false)
                if ( forceReTile || 
                     (!dragging && !tilesBounds.containsBounds(bounds))) {
                    this.initSingleTile(bounds);
                }
            } else {
             
                // if the bounds have changed such that they are not even 
                //  *partially* contained by our tiles (IE user has 
                //  programmatically panned to the other side of the earth) 
                //  then we want to reTile (thus, partial true).  
                //
                if (forceReTile || !tilesBounds.containsBounds(bounds, true)) {
                    this.initGriddedTiles(bounds);
                } else {
                    //we might have to shift our buffer tiles
                    this.moveGriddedTiles(bounds);
                }
            }
        }
    },
    
    /**
     * APIMethod: setTileSize
     * Check if we are in singleTile mode and if so, set the size as a ratio
     *     of the map size (as specified by the layer's 'ratio' property).
     * 
     * Parameters:
     * size - {<OpenLayers.Size>}
     */
    setTileSize: function(size) { 
        if (this.singleTile) {
            var size = this.map.getSize().clone();
            size.h = parseInt(size.h * this.ratio);
            size.w = parseInt(size.w * this.ratio);
        } 
        OpenLayers.Layer.HTTPRequest.prototype.setTileSize.apply(this, [size]);
    },
        
    /**
     * Method: getGridBounds
     * Deprecated. This function will be removed in 3.0. Please use 
     *     getTilesBounds() instead.
     * 
     * Return:
     * {<OpenLayers.Bounds>} A Bounds object representing the bounds of all the
     * currently loaded tiles (including those partially or not at all seen 
     * onscreen)
     */
    getGridBounds: function() {
        var msg = "The getGridBounds() function is deprecated. It will be " +
                  "removed in 3.0. Please use getTilesBounds() instead.";
        OpenLayers.Console.warn(msg);
        return this.getTilesBounds();
    },

    /**
     * Method: getTilesBounds
     * Get the bounds of the grid
     * 
     * Return:
     * {<OpenLayers.Bounds>} A Bounds object representing the bounds of all the
     * currently loaded tiles (including those partially or not at all seen 
     * onscreen)
     */
    getTilesBounds: function() {    
        var bounds = null; 
        
        if (this.grid.length) {
            var bottom = this.grid.length - 1;
            var bottomLeftTile = this.grid[bottom][0];
    
            var right = this.grid[0].length - 1; 
            var topRightTile = this.grid[0][right];
    
            bounds = new OpenLayers.Bounds(bottomLeftTile.bounds.left, 
                                           bottomLeftTile.bounds.bottom,
                                           topRightTile.bounds.right, 
                                           topRightTile.bounds.top);
            
        }   
        return bounds;
    },

    /**
     * Method: initSingleTile
     * 
     * Parameters: 
     * bounds - {<OpenLayers.Bounds>}
     */
    initSingleTile: function(bounds) {

        //determine new tile bounds
        var center = bounds.getCenterLonLat();
        var tileWidth = bounds.getWidth() * this.ratio;
        var tileHeight = bounds.getHeight() * this.ratio;
                                       
        var tileBounds = 
            new OpenLayers.Bounds(center.lon - (tileWidth/2),
                                  center.lat - (tileHeight/2),
                                  center.lon + (tileWidth/2),
                                  center.lat + (tileHeight/2));
  
        var ul = new OpenLayers.LonLat(tileBounds.left, tileBounds.top);
        var px = this.map.getLayerPxFromLonLat(ul);

        if (!this.grid.length) {
            this.grid[0] = [];
        }

        var tile = this.grid[0][0];
        if (!tile) {
            tile = this.addTile(tileBounds, px);
            
            this.addTileMonitoringHooks(tile);
            tile.draw();
            this.grid[0][0] = tile;
        } else {
            tile.moveTo(tileBounds, px);
        }           
        
        //remove all but our single tile
        this.removeExcessTiles(1,1);
    },

    /**
     * Method: initGriddedTiles
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     */
    initGriddedTiles:function(bounds) {
       
        // work out mininum number of rows and columns; this is the number of
        // tiles required to cover the viewport plus one for panning
        var viewSize = this.map.getSize();
        var minRows = Math.ceil(viewSize.h/this.tileSize.h) + 1;
        var minCols = Math.ceil(viewSize.w/this.tileSize.w) + 1;
        
        var extent = this.map.getMaxExtent();
        var resolution = this.map.getResolution();
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        
        var offsetlon = bounds.left - extent.left;
        var tilecol = Math.floor(offsetlon/tilelon) - this.buffer;
        var tilecolremain = offsetlon/tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = extent.left + tilecol * tilelon;
        
        var offsetlat = bounds.top - (extent.bottom + tilelat);  
        var tilerow = Math.ceil(offsetlat/tilelat) + this.buffer;
        var tilerowremain = tilerow - offsetlat/tilelat;
        var tileoffsety = -tilerowremain * this.tileSize.h;
        var tileoffsetlat = extent.bottom + tilerow * tilelat;
        
        tileoffsetx = Math.round(tileoffsetx); // heaven help us
        tileoffsety = Math.round(tileoffsety);

        this.origin = new OpenLayers.Pixel(tileoffsetx, tileoffsety);

        var startX = tileoffsetx; 
        var startLon = tileoffsetlon;

        var rowidx = 0;
    
        do {
            var row = this.grid[rowidx++];
            if (!row) {
                row = [];
                this.grid.push(row);
            }

            tileoffsetlon = startLon;
            tileoffsetx = startX;
            var colidx = 0;
 
            do {
                var tileBounds = 
                    new OpenLayers.Bounds(tileoffsetlon, 
                                          tileoffsetlat, 
                                          tileoffsetlon + tilelon,
                                          tileoffsetlat + tilelat);

                var x = tileoffsetx;
                x -= parseInt(this.map.layerContainerDiv.style.left);

                var y = tileoffsety;
                y -= parseInt(this.map.layerContainerDiv.style.top);

                var px = new OpenLayers.Pixel(x, y);
                var tile = row[colidx++];
                if (!tile) {
                    tile = this.addTile(tileBounds, px);
                    this.addTileMonitoringHooks(tile);
                    row.push(tile);
                } else {
                    tile.moveTo(tileBounds, px, false);
                }
     
                tileoffsetlon += tilelon;       
                tileoffsetx += this.tileSize.w;
            } while ((tileoffsetlon <= bounds.right + tilelon * this.buffer)
                     || colidx < minCols)  
             
            tileoffsetlat -= tilelat;
            tileoffsety += this.tileSize.h;
        } while((tileoffsetlat >= bounds.bottom - tilelat * this.buffer)
                || rowidx < minRows)
        
        //shave off exceess rows and colums
        this.removeExcessTiles(rowidx, colidx);

        //now actually draw the tiles
        this.spiralTileLoad();
    },
    
    /**
     * Method: spiralTileLoad
     *   Starts at the top right corner of the grid and proceeds in a spiral 
     *    towards the center, adding tiles one at a time to the beginning of a 
     *    queue. 
     * 
     *   Once all the grid's tiles have been added to the queue, we go back 
     *    and iterate through the queue (thus reversing the spiral order from 
     *    outside-in to inside-out), calling draw() on each tile. 
     */
    spiralTileLoad: function() {
        var tileQueue = [];
 
        var directions = ["right", "down", "left", "up"];

        var iRow = 0;
        var iCell = -1;
        var direction = OpenLayers.Util.indexOf(directions, "right");
        var directionsTried = 0;
        
        while( directionsTried < directions.length) {

            var testRow = iRow;
            var testCell = iCell;

            switch (directions[direction]) {
                case "right":
                    testCell++;
                    break;
                case "down":
                    testRow++;
                    break;
                case "left":
                    testCell--;
                    break;
                case "up":
                    testRow--;
                    break;
            } 
    
            // if the test grid coordinates are within the bounds of the 
            //  grid, get a reference to the tile.
            var tile = null;
            if ((testRow < this.grid.length) && (testRow >= 0) &&
                (testCell < this.grid[0].length) && (testCell >= 0)) {
                tile = this.grid[testRow][testCell];
            }
            
            if ((tile != null) && (!tile.queued)) {
                //add tile to beginning of queue, mark it as queued.
                tileQueue.unshift(tile);
                tile.queued = true;
                
                //restart the directions counter and take on the new coords
                directionsTried = 0;
                iRow = testRow;
                iCell = testCell;
            } else {
                //need to try to load a tile in a different direction
                direction = (direction + 1) % 4;
                directionsTried++;
            }
        } 
        
        // now we go through and draw the tiles in forward order
        for(var i=0; i < tileQueue.length; i++) {
            var tile = tileQueue[i]
            tile.draw();
            //mark tile as unqueued for the next time (since tiles are reused)
            tile.queued = false;       
        }
    },

    /**
     * APIMethod: addTile
     * Gives subclasses of Grid the opportunity to create an 
     * OpenLayer.Tile of their choosing. The implementer should initialize 
     * the new tile and take whatever steps necessary to display it.
     *
     * Parameters
     * bounds - {<OpenLayers.Bounds>}
     *
     * Return:
     * {<OpenLayers.Tile>} The added OpenLayers.Tile
     */
    addTile:function(bounds, position) {
        // Should be implemented by subclasses
    },
    
    /** 
     * Method: addTileMonitoringHooks
     * This function takes a tile as input and adds the appropriate hooks to 
     *     the tile so that the layer can keep track of the loading tiles.
     * 
     * Parameters: 
     * tile - {<OpenLayers.Tile>}
     */
    addTileMonitoringHooks: function(tile) {
        
        tile.onLoadStart = function() {
            //if that was first tile then trigger a 'loadstart' on the layer
            if (this.numLoadingTiles == 0) {
                this.events.triggerEvent("loadstart");
            }
            this.numLoadingTiles++;
        };
        tile.events.register("loadstart", this, tile.onLoadStart);
      
        tile.onLoadEnd = function() {
            this.numLoadingTiles--;
            this.events.triggerEvent("tileloaded");
            //if that was the last tile, then trigger a 'loadend' on the layer
            if (this.numLoadingTiles == 0) {
                this.events.triggerEvent("loadend");
            }
        };
        tile.events.register("loadend", this, tile.onLoadEnd);
    },

    /** 
     * Method: removeTileMonitoringHooks
     * This function takes a tile as input and removes the tile hooks 
     *     that were added in addTileMonitoringHooks()
     * 
     * Parameters: 
     * tile - {<OpenLayers.Tile>}
     */
    removeTileMonitoringHooks: function(tile) {
        tile.events.unregister("loadstart", this, tile.onLoadStart);
        tile.events.unregister("loadend", this, tile.onLoadEnd);
    },
    
    /**
     * Method: moveGriddedTiles
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     */
    moveGriddedTiles: function(bounds) {
        var buffer = (this.buffer) ? this.buffer*1.5 : 1;
        while (true) {
            var tlLayer = this.grid[0][0].position;
            var tlViewPort = 
                this.map.getViewPortPxFromLayerPx(tlLayer);
            if (tlViewPort.x > -this.tileSize.w * (buffer - 1)) {
                this.shiftColumn(true);
            } else if (tlViewPort.x < -this.tileSize.w * buffer) {
                this.shiftColumn(false);
            } else if (tlViewPort.y > -this.tileSize.h * (buffer - 1)) {
                this.shiftRow(true);
            } else if (tlViewPort.y < -this.tileSize.h * buffer) {
                this.shiftRow(false);
            } else {
                break;
            }
        };
        if (this.buffer == 0) {
            for (var r=0, rl=this.grid.length; r<rl; r++) {
                var row = this.grid[r];
                for (var c=0, cl=row.length; c<cl; c++) {
                    var tile = row[c];
                    if (!tile.drawn && 
                         tile.bounds.intersectsBounds(bounds, false)) {
                        tile.draw();
                    }
                }
            }
        }
    },

    /**
     * Method: shiftRow
     * Shifty grid work
     *
     * Parameters:
     * prepend - {Boolean} if true, prepend to beginning.
     *                          if false, then append to end
     */
    shiftRow:function(prepend) {
        var modelRowIndex = (prepend) ? 0 : (this.grid.length - 1);
        var modelRow = this.grid[modelRowIndex];

        var resolution = this.map.getResolution();
        var deltaY = (prepend) ? -this.tileSize.h : this.tileSize.h;
        var deltaLat = resolution * -deltaY;

        var row = (prepend) ? this.grid.pop() : this.grid.shift();

        for (var i=0; i < modelRow.length; i++) {
            var modelTile = modelRow[i];
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.bottom = bounds.bottom + deltaLat;
            bounds.top = bounds.top + deltaLat;
            position.y = position.y + deltaY;
            row[i].moveTo(bounds, position);
        }

        if (prepend) {
            this.grid.unshift(row);
        } else {
            this.grid.push(row);
        }
    },

    /**
     * Method: shiftColumn
     * Shift grid work in the other dimension
     *
     * Parameters:
     * prepend - {Boolean} if true, prepend to beginning.
     *                          if false, then append to end
     */
    shiftColumn: function(prepend) {
        var deltaX = (prepend) ? -this.tileSize.w : this.tileSize.w;
        var resolution = this.map.getResolution();
        var deltaLon = resolution * deltaX;

        for (var i=0; i<this.grid.length; i++) {
            var row = this.grid[i];
            var modelTileIndex = (prepend) ? 0 : (row.length - 1);
            var modelTile = row[modelTileIndex];
            
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.left = bounds.left + deltaLon;
            bounds.right = bounds.right + deltaLon;
            position.x = position.x + deltaX;

            var tile = prepend ? this.grid[i].pop() : this.grid[i].shift()
            tile.moveTo(bounds, position);
            if (prepend) {
                this.grid[i].unshift(tile);
            } else {
                this.grid[i].push(tile);
            }
        }
    },
    
    /**
     * Method: removeExcessTiles
     * When the size of the map or the buffer changes, we may need to
     *     remove some excess rows and columns.
     * 
     * Parameters:
     * rows - {Integer} Maximum number of rows we want our grid to have.
     * colums - {Integer} Maximum number of columns we want our grid to have.
     */
    removeExcessTiles: function(rows, columns) {
        
        // remove extra rows
        while (this.grid.length > rows) {
            var row = this.grid.pop();
            for (var i=0, l=row.length; i<l; i++) {
                var tile = row[i];
                this.removeTileMonitoringHooks(tile)
                tile.destroy();
            }
        }
        
        // remove extra columns
        while (this.grid[0].length > columns) {
            for (var i=0, l=this.grid.length; i<l; i++) {
                var row = this.grid[i];
                var tile = row.pop();
                this.removeTileMonitoringHooks(tile);
                tile.destroy();
            }
        }
    },

    /**
     * Method: onMapResize
     * For singleTile layers, this will replace the tile with the
     * a new one with updated tileSize and extent.
     */
    onMapResize: function() {
      if (this.singleTile) {
        this.clearGrid();
        this.setTileSize();
        this.initSingleTile(this.map.getExtent());
      }
    },
    
    CLASS_NAME: "OpenLayers.Layer.Grid"
});
/* ======================================================================
    OpenLayers/Layer/MapGuide.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */

/**
 * @requires OpenLayers/Ajax.js
 * @requires OpenLayers/Layer/Grid.js
 *
 * Class: OpenLayers.Layer.MapGuide
 * Instances of OpenLayers.Layer.MapGuide are used to display
 * data from a MapGuide OS instance.
 *
 * Inherits from:
 *  - <OpenLayers.Layer.Grid>
 */
OpenLayers.Layer.MapGuide = OpenLayers.Class(OpenLayers.Layer.Grid, {

    /** 
     * APIProperty: reproject
     * {Boolean} Try to reproject this layer if it is used as an overlay.
     *     Default is false.
     **/
    reproject: false,
    
    /** 
     * APIProperty: isBaseLayer
     * {Boolean} Treat this layer as a base layer.  Default is true.
     **/
    isBaseLayer: true,
    
    /**
     * Constant: DEFAULT_PARAMS
     * {Object} Hashtable of default parameter key/value pairs 
     */
    TILE_PARAMS: {
                      operation: 'GETTILEIMAGE',
                      version: '1.2.0'
                     },

    SINGLE_TILE_PARAMS: {
                      operation: 'GETDYNAMICMAPOVERLAYIMAGE',
                      format: 'PNG',
                      version: '1.0.0'
                     },

    session: null,
    mapName: null,
    groupName: null,

    /**
    * @constructor
    *
    * @param {str} name
    * @param {str} url
    * @param {hash} params
    * @param {Object} options
    */
    initialize: function(name, url, params, options) {
        
        var newArguments = new Array();
        newArguments.push(name, url, params, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);

        if (arguments.length > 0) {
          if (this.options.singleTile) {
            this.session = params.session;
            this.mapName = params.mapname;
            OpenLayers.Util.applyDefaults(
                           this.params,
                           this.SINGLE_TILE_PARAMS
                           );
          } else {
            this.groupName = params.groupname;
            OpenLayers.Util.applyDefaults(
                           this.params,
                           this.TILE_PARAMS
                           );
            this.setTileSize(new OpenLayers.Size(300,300)); //TBD: set this by options?
          }
        }

        // unless explicitly set in options, if the layer is transparent, 
        // it will be an overlay
        if (options == null || options.isBaseLayer == null) {
            this.isBaseLayer = ((this.params.transparent != "true") && 
                                (this.params.transparent != true));
        }

        //create a session if not created
        
    },

    _getExtentSuccess: function(transport) {
      this.extent = transport.responseXML;
    },
	/**
    * @param {Object} obj
    *
    * @returns A clone of this OpenLayers.Layer.MapGuide
    * @type OpenLayers.Layer.MapGuide
    */
    clone: function (obj) {
      if (obj == null) {
            obj = new OpenLayers.Layer.MapGuide(this.name,
                                           this.url,
                                           this.params,
                                           this.options);
        }
      //get all additions from superclasses
      obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

      // copy/set any non-init, non-simple values here

      return obj;
    },

    /**
    * addTile creates a tile, initializes it (via 'draw' in this case), and
    * adds it to the layer div.
    *
    * @param {OpenLayers.Bounds} bounds
    *
    * @returns The added OpenLayers.Tile.Image
    * @type OpenLayers.Tile.Image
    */
    addTile:function(bounds,position) {
        return new OpenLayers.Tile.Image(this, position, bounds, url, this.tileSize);
    },

     /**
     * @param {OpenLayers.Bounds} bounds
     * 
     * @returns A string with the layer's url and parameters and also the 
     *           passed-in bounds and appropriate tile size specified as 
     *           parameters
     * @type String
     */
    getURL: function (bounds) {
        
        var center = bounds.getCenterLonLat();
        var mapSize = this.map.getCurrentSize();

        if (this.options.singleTile) {
          //set up the call for GetVisibleMapExtent
          var sParams = "operation=GETVISIBLEMAPEXTENT&version=1.0.0";
          sParams += "&session="+this.session;
          sParams += "&mapname="+this.mapName;
          sParams += "&locale=en";
          sParams += "&setdisplaydpi="+OpenLayers.DOTS_PER_INCH;   
          sParams += "&setdisplayheight="+mapSize.h*this.ratio;
          sParams += "&setdisplaywidth="+mapSize.w*this.ratio;
          sParams += "&setviewcenterx="+center.lon;
          sParams += "&setviewcentery="+center.lat;
          sParams += "&setviewscale="+this.map.getScale();
          if (this.options.showLayers) sParams += "&showlayers="+this.options.showLayers;
          if (this.options.hideLayers) sParams += "&hidelayers="+this.options.hideLayers;
          if (this.options.showGroups) sParams += "&showgroups="+this.options.showGroups;
          if (this.options.hideGroups) sParams += "&hidegroups="+this.options.hideGroups;
          if (this.options.refreshLayers) sParams += "&refreshlayers="+this.options.refreshLayers;
          sParams += "&ts="+(new Date()).getTime();
          // add in hidden/visible layers here?

          new OpenLayers.Ajax.Request(this.url, 
                 {   parameters: sParams,
                     onSuccess: this._requestMapImage, 
                     onFailure: this._requestFailure,
                     method: 'get',
                     asynchronous: false,         //must be synchronous call to return control here
                     requestHeaders: ['Authorization', 'Basic QW5vbnltb3VzOg==']  //TBD anon user base64 encoded
                  });

          var url = this.getFullRequestString(
                       {
                           session: this.session,
                           mapname: this.mapName,
                           ts : (new Date()).getTime()
                        });
        } else {

          //tiled version
          var currentRes = this.map.getResolution();
          var colidx = Math.floor((bounds.left-this.maxExtent.left)/currentRes);
          colidx = Math.round(colidx/this.tileSize.w);
          var rowidx = Math.floor((this.maxExtent.top-bounds.top)/currentRes);
          rowidx = Math.round(rowidx/this.tileSize.h);

          var url = this.getFullRequestString(
                       {
                           tilecol: colidx,
                           tilerow: rowidx,
                           scaleindex: this.resolutions.length-this.map.zoom-1
                        });
         }
        
        return url;
    },

    _requestMapImage: function(r) {
      //no-op
    },
    
    /** 
     * getFullRequestString on MapGuide layers is special, because we 
     * do a regular expression replace on ',' in parameters to '+'.
     * This is why it is subclassed here.
     *
     * @param {Object} newParams Parameters to add to the default parameters
     *                           for the layer.
     * @param {String} altUrl    Alternative base URL to use.
     */
    getFullRequestString:function(newParams, altUrl) {
        
    
        // use layer's url unless altUrl passed in
        var url = (altUrl == null) ? this.url : altUrl;
        
        // if url is not a string, it should be an array of strings, 
        //  in which case we will randomly select one of them in order
        //  to evenly distribute requests to different urls.
        if (typeof url == "object") {
            url = url[Math.floor(Math.random()*url.length)];
        }   
        // requestString always starts with url
        var requestString = url;        

        // create a new params hashtable with all the layer params and the 
        // new params together. then convert to string
        var allParams = OpenLayers.Util.extend({}, this.params);
        allParams = OpenLayers.Util.extend(allParams, newParams);
        // ignore parameters that are already in the url search string
        var urlParams = OpenLayers.Util.upperCaseObject(
                            OpenLayers.Util.getArgs(url));
        for(var key in allParams) {
            if(key.toUpperCase() in urlParams) {
                delete allParams[key];
            }
        }
        var paramsString = OpenLayers.Util.getParameterString(allParams);
        
        /* MapGuide needs '+' seperating things like bounds/height/width.
           Since typically this is URL encoded, we use a slight hack: we
           depend on the list-like functionality of getParameterString to
           leave ',' only in the case of list items (since otherwise it is
           encoded) then do a regular expression replace on the , characters
           to '+' */
        paramsString = paramsString.replace(/,/g, "+");
        
        if (paramsString != "") {
            var lastServerChar = url.charAt(url.length - 1);
            if ((lastServerChar == "&") || (lastServerChar == "?")) {
                requestString += paramsString;
            } else {
                if (url.indexOf('?') == -1) {
                    //serverPath has no ? -- add one
                    requestString += '?' + paramsString;
                } else {
                    //serverPath contains ?, so must already have paramsString at the end
                    requestString += '&' + paramsString;
                }
            }
        }
        return requestString;
    },

    /**
     * Method: initGriddedTiles
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     */
    initGriddedTiles:function(bounds) {
       
        // work out mininum number of rows and columns; this is the number of
        // tiles required to cover the viewport plus one for panning
        var viewSize = this.map.getSize();
        var minRows = Math.ceil(viewSize.h/this.tileSize.h) + 1;
        var minCols = Math.ceil(viewSize.w/this.tileSize.w) + 1;
        
        var extent = this.map.getMaxExtent();
        var resolution = this.map.getResolution();
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        
        var offsetlon = bounds.left - extent.left;
        var tilecol = Math.floor(offsetlon/tilelon) - this.buffer;
        var tilecolremain = offsetlon/tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = extent.left + tilecol * tilelon;
        
        //var offsetlat = bounds.top - (extent.bottom + tilelat);  
        //var tilerow = Math.ceil(offsetlat/tilelat) + this.buffer;
        //var tilerowremain = tilerow - offsetlat/tilelat;
        //var tileoffsety = -tilerowremain * this.tileSize.h;
        //var tileoffsetlat = extent.bottom + tilerow * tilelat;

/* this works!
        var offsetlat = extent.top - bounds.top; 
        var tilerow = Math.floor(offsetlat/tilelat) - this.buffer;
        var tilerowremain = tilerow-offsetlat/tilelat;
        var tileoffsety = ((tilerowremain-1)) * this.tileSize.h;
        var tileoffsetlat = extent.top - tilelat*tilerow;
        */
        var offsetlat = extent.top - bounds.top + tilelat; 
        var tilerow = Math.floor(offsetlat/tilelat) - this.buffer;
        var tilerowremain = tilerow - offsetlat/tilelat;
        var tileoffsety = tilerowremain * this.tileSize.h;
        var tileoffsetlat = extent.top - tilelat*tilerow;
        

        tileoffsetx = Math.round(tileoffsetx); // heaven help us
        tileoffsety = Math.round(tileoffsety);

        this.origin = new OpenLayers.Pixel(tileoffsetx, tileoffsety);

        var startX = tileoffsetx; 
        var startLon = tileoffsetlon;

        var rowidx = 0;
    
        do {
            var row = this.grid[rowidx++];
            if (!row) {
                row = [];
                this.grid.push(row);
            }

            tileoffsetlon = startLon;
            tileoffsetx = startX;
            var colidx = 0;
 
            do {
                var tileBounds = 
                    new OpenLayers.Bounds(tileoffsetlon, 
                                          tileoffsetlat, 
                                          tileoffsetlon + tilelon,
                                          tileoffsetlat + tilelat);

                var x = tileoffsetx;
                x -= parseInt(this.map.layerContainerDiv.style.left);

                var y = tileoffsety;
                //y -= parseInt(this.map.layerContainerDiv.style.top);

                var px = new OpenLayers.Pixel(x, y);
                var tile = row[colidx++];
                if (!tile) {
                    tile = this.addTile(tileBounds, px);
                    this.addTileMonitoringHooks(tile);
                    row.push(tile);
                } else {
                    tile.moveTo(tileBounds, px, false);
                }
     
                tileoffsetlon += tilelon;       
                tileoffsetx += this.tileSize.w;
            } while ((tileoffsetlon <= bounds.right + tilelon * this.buffer)
                     || colidx < minCols)  
             
            tileoffsetlat -= tilelat;
            tileoffsety += this.tileSize.h;
        } while((tileoffsetlat >= bounds.bottom - tilelat * this.buffer)
                || rowidx < minRows)
        
        //shave off exceess rows and colums
        this.removeExcessTiles(rowidx, colidx);

        //now actually draw the tiles
        this.spiralTileLoad();
    },
    

    /** @final @type String */
    CLASS_NAME: "OpenLayers.Layer.MapGuide"
});
/* ======================================================================
    OpenLayers/Layer/MapServer.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */

/**
 * @requires OpenLayers/Layer/Grid.js
 *
 * Class: OpenLayers.Layer.MapServer
 * Instances of OpenLayers.Layer.MapServer are used to display
 * data from a MapServer CGI instance.
 *
 * Inherits from:
 *  - <OpenLayers.Layer.Grid>
 */
OpenLayers.Layer.MapServer = OpenLayers.Class(OpenLayers.Layer.Grid, {

    /**
     * Constant: DEFAULT_PARAMS
     * {Object} Hashtable of default parameter key/value pairs 
     */
    DEFAULT_PARAMS: {
        mode: "map",
        map_imagetype: "png"
    },

    /**
     * Constructor: OpenLayers.Layer.MapServer
     * Create a new MapServer layer object
     *
     * Parameters:
     * name - {String} A name for the layer
     * url - {String} Base url for the MapServer CGI
     *       (e.g. http://www2.dmsolutions.ca/cgi-bin/mapserv)
     * params - {Object} An object with key/value pairs representing the
     *          GetMap query string parameters and parameter values.
     * options - {Ojbect} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, url, params, options) {
        var newArguments = [];
        newArguments.push(name, url, params, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);

        if (arguments.length > 0) {
            OpenLayers.Util.applyDefaults(
                           this.params,
                           this.DEFAULT_PARAMS
                           );
        }

        // unless explicitly set in options, if the layer is transparent, 
        // it will be an overlay
        if (options == null || options.isBaseLayer == null) {
            this.isBaseLayer = ((this.params.transparent != "true") && 
                                (this.params.transparent != true));
        }
    },

    /**
     * Method: clone
     * Create a clone of this layer
     *
     * Return:
     * {<OpenLayers.Layer.MapServer>} An exact clone of this layer
     */
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.MapServer(this.name,
                                           this.url,
                                           this.params,
                                           this.options);
        }
        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here

        return obj;
    },

    /**
     * Method: addTile
     * Creates a tile, initializes it, and adds it to the layer div. 
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * 
     * Return:
     * {<OpenLayers.Tile.Image>} The added OpenLayers.Tile.Image
     */
    addTile:function(bounds,position) {
        return new OpenLayers.Tile.Image(this, position, bounds, 
                                         null, this.tileSize);
    },
    
    /**
     * Method: getURL
     * Return a query string for this layer
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>} A bounds representing the bbox 
     *                                for the request
     *
     * Return:
     * {String} A string with the layer's url and parameters and also 
     *          the passed-in bounds and appropriate tile size specified 
     *          as parameters.
     */
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        // Make a list, so that getFullRequestString uses literal "," 
        var extent = [bounds.left, bounds. bottom, bounds.right, bounds.top];

        var imageSize = this.getImageSize(); 
        
        // make lists, so that literal ','s are used 
        var url = this.getFullRequestString(
                     {mapext:   extent,
                      imgext:   extent,
                      map_size: [imageSize.w, imageSize.h],
                      imgx:     imageSize.w / 2,
                      imgy:     imageSize.h / 2,
                      imgxy:    [imageSize.w, imageSize.h]
                      });
        
        return url;
    },
    
    /** 
     * Method: getFullRequestString
     * combine the layer's url with its params and these newParams. 
     *   
     * Parameter:
     * newParams - {Object} New parameters that should be added to the 
     *                      request string.
     * altUrl - {String} (optional) Replace the URL in the full request  
     *                              string with the provided URL.
     * 
     * Return: 
     * {String} A string with the layer's url and parameters embedded in it.
     */
    getFullRequestString:function(newParams, altUrl) {
        // use layer's url unless altUrl passed in
        var url = (altUrl == null) ? this.url : altUrl;
        
        // if url is not a string, it should be an array of strings, 
        //  in which case we will randomly select one of them in order
        //  to evenly distribute requests to different urls.
        if (typeof url == "object") {
            url = url[Math.floor(Math.random()*url.length)];
        }   
        // requestString always starts with url
        var requestString = url;        

        // create a new params hashtable with all the layer params and the 
        // new params together. then convert to string
        var allParams = OpenLayers.Util.extend({}, this.params);
        allParams = OpenLayers.Util.extend(allParams, newParams);
        // ignore parameters that are already in the url search string
        var urlParams = OpenLayers.Util.upperCaseObject(
                            OpenLayers.Util.getArgs(url));
        for(var key in allParams) {
            if(key.toUpperCase() in urlParams) {
                delete allParams[key];
            }
        }
        var paramsString = OpenLayers.Util.getParameterString(allParams);
        
        // MapServer needs '+' seperating things like bounds/height/width.
        //   Since typically this is URL encoded, we use a slight hack: we
        //  depend on the list-like functionality of getParameterString to
        //  leave ',' only in the case of list items (since otherwise it is
        //  encoded) then do a regular expression replace on the , characters
        //  to '+'
        //
        paramsString = paramsString.replace(/,/g, "+");
        
        if (paramsString != "") {
            var lastServerChar = url.charAt(url.length - 1);
            if ((lastServerChar == "&") || (lastServerChar == "?")) {
                requestString += paramsString;
            } else {
                if (url.indexOf('?') == -1) {
                    //serverPath has no ? -- add one
                    requestString += '?' + paramsString;
                } else {
                    //serverPath contains ?, so must already have paramsString at the end
                    requestString += '&' + paramsString;
                }
            }
        }
        return requestString;
    },

    CLASS_NAME: "OpenLayers.Layer.MapServer"
});
/* ======================================================================
    OpenLayers/Layer/WMS.js
   ====================================================================== */

/* Copyright (c) 2006 MetaCarta, Inc., published under a modified BSD license.
 * See http://svn.openlayers.org/trunk/openlayers/repository-license.txt 
 * for the full text of the license. */


/**
 * @requires OpenLayers/Layer/Grid.js
 * @requires OpenLayers/Tile/Image.js
 * 
 * Class: OpenLayers.Layer.WMS
 * Instances of OpenLayers.Layer.WMS are used to display data from OGC Web
 *     Mapping Services. Create a new WMS layer with the <OpenLayers.Layer.WMS>
 *     constructor.
 * 
 * Inherits from:
 *  - <OpenLayers.Layer.Grid>
 */
OpenLayers.Layer.WMS = OpenLayers.Class(OpenLayers.Layer.Grid, {

    /**
     * Constant: DEFAULT_PARAMS
     * {Object} Hashtable of default parameter key/value pairs 
     */
    DEFAULT_PARAMS: { service: "WMS",
                      version: "1.1.1",
                      request: "GetMap",
                      styles: "",
                      exceptions: "application/vnd.ogc.se_inimage",
                      format: "image/jpeg"
                     },
    
    /**
     * Property: reproject
     * {Boolean} Try to reproject this layer if its coordinate reference system
     *           is different than that of the base layer.  Default is true.  
     *           Set this in the layer options.  Should be set to false in 
     *           most cases.
     */
    reproject: true,
 
    /**
     * APIProperty: isBaseLayer
     * {Boolean} Default is true for WMS layer
     */
    isBaseLayer: true,
 
    /**
     * Constructor: OpenLayers.Layer.WMS
     * Create a new WMS layer object
     *
     * Example:
     * (code)
     * var wms = new OpenLayers.Layer.WMS("NASA Global Mosaic",
     *                                    "http://wms.jpl.nasa.gov/wms.cgi", 
     *                                    {layers: "modis,global_mosaic"});
     * (end)
     *
     * Parameters:
     * name - {String} A name for the layer
     * url - {String} Base url for the WMS
     *                (e.g. http://wms.jpl.nasa.gov/wms.cgi)
     * params - {Object} An object with key/value pairs representing the
     *                   GetMap query string parameters and parameter values.
     * options - {Ojbect} Hashtable of extra options to tag onto the layer
     */
    initialize: function(name, url, params, options) {
        var newArguments = [];
        //uppercase params
        params = OpenLayers.Util.upperCaseObject(params);
        newArguments.push(name, url, params, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
        OpenLayers.Util.applyDefaults(
                       this.params, 
                       OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS)
                       );


        //layer is transparent        
        if (this.params.TRANSPARENT && 
            this.params.TRANSPARENT.toString().toLowerCase() == "true") {
            
            // unless explicitly set in options, make layer an overlay
            if ( (options == null) || (!options.isBaseLayer) ) {
                this.isBaseLayer = false;
            } 
            
            // jpegs can never be transparent, so intelligently switch the 
            //  format, depending on teh browser's capabilities
            if (this.params.FORMAT == "image/jpeg") {
                this.params.FORMAT = OpenLayers.Util.alphaHack() ? "image/gif"
                                                                 : "image/png";
            }
        }

    },    

    /**
     * Method: destroy
     * Destroy this layer
     */
    destroy: function() {
        // for now, nothing special to do here. 
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);  
    },

    
    /**
     * Method: clone
     * Create a clone of this layer
     *
     * Return:
     * {<OpenLayers.Layer.WMS>} An exact clone of this layer
     */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new OpenLayers.Layer.WMS(this.name,
                                           this.url,
                                           this.params,
                                           this.options);
        }

        //get all additions from superclasses
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here

        return obj;
    },    
    
    /**
     * Method: getURL
     * Return a GetMap query string for this layer
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>} A bounds representing the bbox for the
     *                                request.
     *
     * Return:
     * {String} A string with the layer's url and parameters and also the
     *          passed-in bounds and appropriate tile size specified as 
     *          parameters.
     */
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        
        var imageSize = this.getImageSize(); 
        return this.getFullRequestString(
                     {BBOX:bounds.toBBOX(),
                      WIDTH:imageSize.w,
                      HEIGHT:imageSize.h});
    },

    /**
     * Method: addTile
     * addTile creates a tile, initializes it, and adds it to the layer div. 
     *
     * Parameters:
     * bounds - {<OpenLayers.Bounds>}
     * 
     * Return:
     * {<OpenLayers.Tile.Image>} The added OpenLayers.Tile.Image
     */
    addTile:function(bounds,position) {
        return new OpenLayers.Tile.Image(this, position, bounds, 
                                         null, this.tileSize);
    },

    /**
     * APIMethod: mergeNewParams
     * Catch changeParams and uppercase the new params to be merged in
     *     before calling changeParams on the super class.
     * 
     *     Once params have been changed, we will need to re-init our tiles.
     * 
     * Parameters:
     * newParams - {Object} Hashtable of new params to use
     */
    mergeNewParams:function(newParams) {
        var upperParams = OpenLayers.Util.upperCaseObject(newParams);
        var newArguments = [upperParams];
        OpenLayers.Layer.Grid.prototype.mergeNewParams.apply(this, 
                                                             newArguments);
    },

    /** 
     * Method: getFullRequestString
     * Combine the layer's url with its params and these newParams. 
     *   
     *     Add the SRS parameter from projection -- this is probably
     *     more eloquently done via a setProjection() method, but this 
     *     works for now and always.
     *
     * Parameters:
     * newParams - {Object}
     * 
     * Return:
     * {String} 
     */
    getFullRequestString:function(newParams) {
        var projection = this.map.getProjection();
        this.params.SRS = (projection == "none") ? null : projection;

        return OpenLayers.Layer.Grid.prototype.getFullRequestString.apply(
                                                    this, arguments);
    },

    CLASS_NAME: "OpenLayers.Layer.WMS"
});