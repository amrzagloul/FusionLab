/********************************************************************** * 
 * @project Fusion
 * @revision $Id$
 * @purpose core search widget architecture
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
 * The Fusion search mechanism defines a common capability for searches that
 * link individual searches to a common search set maintained for all
 * search-based widgets.  The common search set can be statically and/or
 * dynamically created.  Static definition is done in the WebLayout.  Dynamic
 * creation is done by individual widgets and creating instances of
 * GxSearchDefinition(s) - or rather a MGSearchDefinition.
 *
 * Widgets that want to take advantage of this behaviour can sub-class this
 * widget.  Just make sure to initialize properly!
 * 
 * **********************************************************************/

var GxSearch = Class.create();

GxSearch.prototype = {
    lastSearch: null,
    lastResult: null,
    resultOffset: 0,
    initialize : function() {
        //console.log('GxSearch.initialize');
    },
    getProperties: function() {
        var properties = null;
        if (this.lastResult && this.lastResult.properties) {
            properties = this.lastResult.properties;
        }
        return properties;
    },
    getNumberOfProperties: function() {
        var n = 0;
        if (this.lastResult && this.lastResult.properties) {
            n = this.lastResult.properties.length;
        }
        return n;
    },
    getProperty: function(n) {
        var property = '';
        if (this.lastResult && this.lastResult.properties) {
            property = this.lastResult.properties[n];
        }
        return property;
    },
    getNumberOfResults: function() {
        result = 0;
        if (this.lastResult && this.lastResult.values) {
            result = this.lastResult.values.length;
        }
        return result;
    },
    getFirstResult: function() {
        this.resultOffset = 0;
        return this.getResult(this.resultOffset);
    },
    getNextResult: function() {
        this.resultOffset++;
        return this.getResult(this.resultOffset);
    },
    getResult: function(idx) {
        result = null;
        if (this.lastResult && this.lastResult.values) {
            result = this.lastResult.values[idx];
        }
        return result;
    },
    zoomToResult: function(filter) {
        //console.log('zoomTo ' + filter);
        var filter = '&filter='+filter;
        
        var s = 'server/' + Fusion.getScriptLanguage() + "/MGQuery." + Fusion.getScriptLanguage() ;
        var params = {};
        params.parameters = 'session='+Fusion.getSessionID()+'&mapname='+ this.getMap().getMapName()+
                         '&layers='+this.layerName+filter, 
        params.onComplete = this.selectComplete.bind(this);
        Fusion.ajaxRequest(s, params);
    },
    selectComplete: function(r) {
        var node = new DomNode(r.responseXML);
        var success = node.getNodeText('Selection');
        if (success == 'true') {
            this.getMap().newSelection();
            this.getMap().getSelection(this.zoomToSelection.bind(this));
        }    
    },
    /**
     * set the extents of the map based on the pixel coordinates
     * passed
     * 
     * @param selection the active selection, or null if there is none
     */
    zoomToSelection : function(selection) {
        var ll = selection.getLowerLeftCoord();
        var ur = selection.getUpperRightCoord();
        //buffer extents (zoom out by factor of two)
        var dX = ur.x - ll.x;
        var dY = ur.y - ll.y;
        ll.x = ll.x - dX;
        ur.x = ur.x + dX;
        ll.y = ll.y - dY;
        ur.y = ur.y + dY;
        this.getMap().setExtents([ll.x,ll.y,ur.x,ur.y]);
    }
};
