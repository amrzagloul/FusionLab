/********************************************************************** * 
 * @project MapGuide Open Source : Chameleon
 * @revision $Id$
 * @purpose Maptip presents floating info on layers when the mouse hovers
 * @author pspencer@dmsolutions.ca
 * @copyright (c) 2006 DM Solutions Group Inc.
 * @license MIT
 * ********************************************************************
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 ********************************************************************
 *
 * Displays tooltips over the map when the mouse is hovered for some 
 * time.  You must configure tooltips for each layer using Studio
 * or Web Studio by editing the LayerDefinition Settings and
 * specifying an expression for the tooltip.
 *
 * Place a Maptip widget in your application by first adding a
 * Maptip widget to your WebLayout as follows:
 *
 * <Command xsi:type="MaptipCommandType">
 *  <Name>MyMaptip</Name>
 *  <Label>Map Tips</Label>
 *  <TargetViewer>All</TargetViewer>
 *  <Action>Maptip</Action>
 *  <Delay>350</Delay>
 *  <Layer>Parks</Layer>
 * </Command>
 *
 * The important parts of this Command are:
 *
 * Name (mandatory) 
 * 
 * an element with an id that is the same as this name must be in
 * the application.  For instance:
 *
 * <div id="MyMaptip"></div>
 *
 * It can appear anywhere inside the <body>.  You can style this div using
 * css, for instance:
 *
 * #Maptip {
 *    display: none;
 *    background-color: yellow;
 *    border: 1px solid black;
 *    padding: 2px;
 *    font-family: Arial;
 *    font-size: 12px;
 *    text-align: left;
 * }
 *
 * Delay (optional)
 *
 * This is the delay, in milliseconds, that the user must keep the mouse
 * in the same position in order for the maptip to appear.  The default,
 * if not specified, is 350 milliseconds.
 *
 * Layer (optional, multiple)
 *
 * This is the name of a layer from the MapDefinition to get the tooltip
 * from.  If no Layer elements are specified, then all layers will be
 * queried and the top-most one will be displayed.  Multiple Layer tags
 * can be added, allowing tooltips to come from different layers.
 *
 * **********************************************************************/

var Maptip = Class.create();
Maptip.prototype = 
{
    oCurrentPosition: null,
    nTimer: null,
    delay: null,
    aLayers: null,
    
    initialize : function(oCommand)
    {
        console.log('Maptip.initialize');
        Object.inheritFrom(this, GxWidget.prototype, ['Maptip', true]);
        this.setMap(oCommand.getMap());
        
        this.delay = oCommand.oxmlNode.getNodeText('Delay');
        this.delay = this.delay == '' ? 350 : parseInt(this.delay);
        
        this.aLayers = [];
        var layer = oCommand.oxmlNode.findFirstNode('Layer');
        while(layer) {
            this.aLayers.push(layer.textContent);
            layer = oCommand.oxmlNode.findNextNode('Layer');
        }
        
        this._oCommand = oCommand;
        this.domObj = $(oCommand.getName());
        this.domObj.parentNode.removeChild(this.domObj);
        this.domObj.style.position = 'absolute';
        this.domObj.style.display = 'none';
        this.domObj.style.top = '0px';
        this.domObj.style.left = '0px';
        this.domObj.style.zIndex = 98;
        
        var oDomElem =  this.getMap().getDomObj();
        oDomElem.appendChild(this.domObj);
        
        this.getMap().observeEvent('mousemove', this.mouseMove.bind(this));
        this.getMap().observeEvent('mouseout', this.mouseOut.bind(this));
        
    },
    
    mouseOut: function(e) {
        if (this.nTimer) {
            window.clearTimeout(this.nTimer);
            this.hideMaptip();
        }
    },
    
    mouseMove: function(e) {
        var p = this.getMap().getEventPosition(e);
        if (!this.oCurrentPosition) {
            this.oCurrentPosition = p;
        } else {
            window.clearTimeout(this.nTimer);
            this.nTimer = null;
            if (this.bIsVisible) {
                this.hideMaptip();
            }
            this.oCurrentPosition = p;
        }
        this.nTimer = window.setTimeout(this.showMaptip.bind(this), this.delay);
        Event.stop(e);
    },
    
    showMaptip: function(r) {
        var map = this.getMap();
        var cellSize = map._nCellSize;
        var oBroker = map._oConfigObj.oApp.getBroker();
        var x = this.oCurrentPosition.x;
        var y = this.oCurrentPosition.y;
        var min = map.pixToGeo(x, y);
        min.x -= cellSize;
        min.y -= cellSize;
    	var max = map.pixToGeo(x, y);
    	max.x -= cellSize;
    	max.y -= cellSize;
        var sGeometry = 'POLYGON(('+ min.x + ' ' +  min.y + ', ' +  min.x + ' ' +  max.y + ', ' + max.x + ' ' +  max.y + ', ' + max.x + ' ' +  min.y + ', ' + min.x + ' ' +  min.y + '))';

         var maxFeatures = 1;
         var persist = 0;
         var selection = 'INTERSECTS';
         //TODO: possibly make the layer names configurable?
         var layerNames = this.aLayers.toString();
         var r = new MGQueryMapFeatures(map._oConfigObj.getSessionId(),
                                        map._sMapname,
                                        sGeometry,
                                        maxFeatures, persist, selection, layerNames);
        oBroker.dispatchRequest(r, 
        this._display.bind(this));
        this.bIsVisible = true;         
        this.domObj.style.top = this.oCurrentPosition.y + 'px';
        this.domObj.style.left = this.oCurrentPosition.x + 'px';
    },
    _display: function(r) {
        if (r.responseXML) {
            var d = new DomNode(r.responseXML);
            var t = d.getNodeText('Tooltip');
            if (t != '') {
                this.domObj.innerHTML = t;
                this.domObj.style.display = 'block';
            }
        }
    },
    
    hideMaptip: function() {
        console.log('hideMapTip');
        this.bIsVisible = false;
        this.domObj.style.display = 'none';
        this.domObj.innerHTML = '&nbsp;';
    }
    
};