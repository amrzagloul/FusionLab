/**
 * Fusion.Widget.Zoom
 *
 * $Id$
 *
 * Copyright (c) 2007, DM Solutions Group Inc.
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

 /********************************************************************
 * Class: Fusion.Widget.Zoom
 *
 * A widget that will zoom the map in or out.
 * 
 * **********************************************************************/

Fusion.Widget.Zoom = OpenLayers.Class(Fusion.Widget, {
    isExclusive: true,
    tolerance : 5,
    factor : 2,
    zoomIn: true,
    uiClass: Jx.Button,
    
    initializeWidget: function(widgetTag){
        var index = window.location.href.indexOf("?");
        var mainpath = window.location.href.substring(0,index);
        index = mainpath.lastIndexOf("/");
        mainpath = mainpath.substring(0,index+1);
        var asCursorString= "url(" + mainpath + "images/zoomin.cur" + "), auto";
        var zoomOutCursorString = "url(" + mainpath + "images/zoomout.cur" + "), auto";
        this.asCursor = [asCursorString,'-moz-zoom-in', 'auto'];
        this.zoomInCursor = [asCursorString,'-moz-zoom-in', 'auto'];
        this.zoomOutCursor = [zoomOutCursorString,'-moz-zoom-out', 'auto'];
        
        var json = widgetTag.extension;
        this.tolerance = json.Tolerance ? json.Tolerance[0] : this.tolerance;
        this.factor = json.Factor ? json.Factor[0] : this.factor;
        this.zoomIn = (json.Direction && json.Direction[0] == 'out') ? false : true;
        
        
        this.keypressWatcher = OpenLayers.Function.bind(this.keypressHandler, this);
        
        var mapWidget = this.getMap();
        this.map = mapWidget.oMapOL;
        this.handler = new OpenLayers.Handler.Box(this, {done: this.execute}, {keyMask:0});
        this.shiftHandler = new OpenLayers.Handler.Box(this, {done: this.altZoom}, 
                                        {keyMask:OpenLayers.Handler.MOD_SHIFT});
        mapWidget.handlers.push(this.handler);
        mapWidget.handlers.push(this.shiftHandler);
    },
    
    shouldActivateWith: function(widget) {
        return (widget instanceof Fusion.Widget.Zoom &&
                widget.zoomIn == this.zoomIn &&
                widget.factor == this.factor &&
                widget.tolerance == this.tolerance);
    },
    
   /**
     * activate the widget (listen to mouse events and change cursor)
     * This function should be defined for all functions that register
     * as a widget in the map
     */
    activate : function() {
        //console.log('Zoom.activate');
        this.handler.activate();
        this.shiftHandler.activate();
        /*cursor*/
        if (this.zoomIn) {
            this.getMap().setCursor(this.zoomInCursor);
        } else {
            this.getMap().setCursor(this.zoomOutCursor);
        }
        OpenLayers.Event.observe(document, 'keypress', this.keypressWatcher);
    },

    /**
     * deactivate the widget (listen to mouse events and change cursor)
     * This function should be defined for all functions that register
     * as a widget in the map
     **/
    deactivate : function() {
        //console.log('Zoom.deactivate');
        this.handler.deactivate();
        this.shiftHandler.deactivate();
        this.getMap().setCursor('auto');
        OpenLayers.Event.stopObserving(document, 'keypress', this.keypressWatcher);
    },

    /**
     * Method: zoomBox
     *
     * Parameters:
     * position - {<OpenLayers.Bounds>} or {<OpenLayers.Pixel>}
     */
    execute: function (position, altZoom) {
        /* if the last event had a shift modifier, swap the sense of this
                tool - zoom in becomes out and zoom out becomes in */
        var zoomIn = this.zoomIn;
        if (altZoom) {
            zoomIn = !zoomIn;
        }
        if (position instanceof OpenLayers.Bounds) {
            var minXY = this.map.getLonLatFromPixel(
                            new OpenLayers.Pixel(position.left, position.bottom));
            var maxXY = this.map.getLonLatFromPixel(
                            new OpenLayers.Pixel(position.right, position.top));
            var bounds = new OpenLayers.Bounds(minXY.lon, minXY.lat,
                                            maxXY.lon, maxXY.lat);
            if (zoomIn) {
                this.getMap().setExtents(bounds);
            } else {
                var newWidth = bounds.getWidth();
                var newHeight = bounds.getHeight();
                var currentExtents = this.getMap().getCurrentExtents();
                var currentWidth = currentExtents.getWidth();
                var currentHeight = currentExtents.getHeight();
                var factor = Math.min(newWidth/currentWidth, newHeight/currentHeight);
                var center = bounds.getCenterLonLat();
                this.getMap().zoom(center.lon, center.lat, factor);
            }
        } else { // it's a pixel
            var center = this.map.getLonLatFromPixel(position);
            var factor;
            if(!zoomIn && this.factor > 1) {
                factor = 1/this.factor;
            } else {
                factor = this.factor;
            }
            this.getMap().zoom(center.lon, center.lat, factor);
        }
    },

    /**
     * handler for zooming when the shift key is pressed.  This changes it
     * from in to out or vice versa
     *
     * Parameters:
     * position - {<OpenLayers.Bounds>} or {<OpenLayers.Pixel>}
     */
    altZoom: function(position) {
        this.execute(position, true);
    },
    
    /**
     * allows run-time setting of widget parameters 
     *
     * Parameters:
     * param - the widget parameter name to set; for the Zoom widget these may be:
     *               'Factor'
     * value - the value to use for the parameter
     */
    setParameter : function(param, value) {
        if (param == "Factor" && value > 0) {
            this.factor = value;
        }
    },
    
    keypressHandler: function(e) {
        var charCode=(e.charCode)?e.charCode:e.keyCode;
        if (charCode == Event.KEY_ESC) {
            this.handler.deactivate();
            this.handler.activate();
        }
    }
});
