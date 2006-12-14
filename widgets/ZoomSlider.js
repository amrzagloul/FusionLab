/********************************************************************** * 
 * @project Fusion
 * @revision $Id$
 * @purpose Continuous zoom between two scales using a graphical interface
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
 * Continuous zoom between two scales using a graphical interface
 *
 * This uses the Scriptaculous Control.Slider control.  You need two <div>
 * elements in the page, one that is the 'track' and the other that is the
 * 'handle' of the slider.
 * 
 * **********************************************************************/

var ZoomSlider = Class.create();
ZoomSlider.prototype = 
{
    nFactor: null,
    initialize : function(oCommand)
    {
        Object.inheritFrom(this, GxWidget.prototype, ['ZoomSlider', false, oCommand]);
        this.setMap(oCommand.getMap());
        
        var json = oCommand.jsonNode;

        this.layerName = json.LayerName ? json.LayerName[0] : '';
        
        this._oTrack = json.Track ? json.Track[0] : '';
        this._oHandle = json.Handle ? json.Handle[0] : '';
        var direction = json.Direction ? json.Direction[0] : 'horizontal';
        
        this.fMinScale = json.MinScale ? parseFloat(json.MinScale[0]) : '';
        this.fMaxScale = json.MaxScale ? parseFloat(json.MaxScale[0]) : '';
        
        var options = {};
        options.axis = direction;
        options.range = $R(this.fMinScale, this.fMaxScale);
        options.sliderValue = this.clipScale(this.getMap().getScale());
        options.onChange = this.scaleChanged.bind(this);
        this._oSlider = new Control.Slider(this._oHandle, this._oTrack, options);
        
        this.getMap().registerForEvent(MAP_EXTENTS_CHANGED, this.mapExtentsChanged.bind(this));
        this.getMap().registerForEvent(MAP_LOADED, this.mapLoaded.bind(this));
        
    },
    
    mapLoaded: function() {
        /* rough scale approximation -  */
        var scale = this.getMap()._fScale;
        //TODO I tried to expand the range by 20% but it causes problems
        this.fMaxScale = scale;
        this._oSlider.range = $R(this.fMinScale, this.fMaxScale);
        this._oSlider.setValue(scale);
    },
    
    clipScale: function(scale) {
        return Math.min(this.fMaxScale, Math.max(this.fMinScale, scale));
    },
    
    scaleChanged: function(value) {
        if (this.getMap().getScale() != value) {
            this.getMap().zoomScale(value);
        }
    },
    
    mapExtentsChanged: function() {
        var scale = this.clipScale(this.getMap().getScale());
        if (scale != this._oSlider.value) {
            this._oSlider.setValue(scale);
        }
    }
};