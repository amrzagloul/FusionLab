/********************************************************************** * 
 * @project Fusion
 * @revision $Id$
 * @purpose Manually enter a scale or choose from some previous scales
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
 * The user can manually type in a new scale or can select a previous
 * scale from a drop-down list.
 *
 * **********************************************************************/
var ScaleEntry = Class.create();
ScaleEntry.prototype = {
    precision: 4,
    historyLength: 10,
    history: null,
    
    initialize : function(oCommand) {
        Object.inheritFrom(this, GxWidget.prototype, ['ScaleEntry', false, oCommand]);
        this.setMap(oCommand.getMap());
        
        var json = oCommand.jsonNode;
        
        var c = json['Class'] ? json['Class'][0] : '';
        
        var d = document.createElement('div');
        if (c != '') {
            Element.addClassName(d, c);
        }
        
        this.picker = new JxPicker(d, true);
        this.picker.addSelectionListener(this);
        
        $(oCommand.getName()).appendChild(d);
        
        this.precision = json.Precision ? parseInt(json.Precision[0]) : this.precision;
        
        this.historyLength = json.HistoryLength ? parseInt(json.HistoryLength[0]): this.historyLength;
        
        this.history = [];
        
        this.getMap().registerForEvent(MAP_EXTENTS_CHANGED, this.scaleChanged.bind(this));
        
    },
    
    scaleChanged: function() {
        this.picker.setValue(this.scaleToString(this.getMap().getCurrentScale()));
    },
    
    selectionChanged: function(obj) {
        var v = obj.getValue();
        bInHistory = false;
        for (var i=0; i<this.history.length; i++) {
            if (this.history[i] == v) {
                bInHistory = true;
                break;
            }
        }
        var rx = /[0-9]+(\.[0-9]*)?/;
        if (rx.test(v)) {
            v = parseFloat(this.scaleToString(v));
            if (this.getMap().getScale() != v) {
                this.getMap().zoomScale(v);
                if (!bInHistory) {
                    this.addToHistory(v);
                }
            }
        }
    },
    
    addToHistory: function(scale) {
        for (var i=0; i<this.history.length; i++) {
            if (scale > this.history[i]) {
                break;
            }
        }
        this.history.splice(i, 0, scale);
        this.picker.add(this.scaleToString(scale), i);
        if (this.historyLength && this.history.length > this.historyLength) {
            this.history.pop();
            this.picker.remove(this.historyLength);
        }
    },
    
    scaleToString: function(scale) {
        scale = Math.abs(parseFloat(scale));
        return "" + Math.round(scale * Math.pow(10,this.precision))/Math.pow(10,this.precision);
    }
};