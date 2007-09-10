/********************************************************************** * 
 * $Id: $
 *
 * Display the size of the current view in user-definable units
 *
 * Copyright (c) 2007 DM Solutions Group Inc.
 *****************************************************************************
 * This code shall not be copied or used without the expressed written consent
 * of DM Solutions Group Inc.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 ********************************************************************
 *
 * 
 *
 * **********************************************************************/

Fusion.Widget.ViewSize = Class.create();
Fusion.Widget.ViewSize.prototype = {
    defaultTemplate: 'x: {x}, y: {y}',
    domSpan: null,
    
    /* the units to display distances in */
    units: Fusion.UNKNOWN,

    initialize : function(widgetTag) {
        Object.inheritFrom(this, Fusion.Widget.prototype, [widgetTag, true]);
                
        this.emptyText = this.domObj.innerHTML;
        
        var json = widgetTag.extension;
        
        this.template = json.Template ? json.Template[0] : this.defaultTemplate;
        this.precision = json.Precision ? parseInt(json.Precision[0]) : -1;
        this.units = json.Units ? Fusion.unitFromName(json.Units[0]) : Fusion.UNKOWN;

        this.domSpan = document.createElement('span');
        this.domSpan.className = 'spanViewSize';
        this.domSpan.innerHTML = this.emptyText;
        this.domObj.innerHTML = '';
        this.domObj.appendChild(this.domSpan);
        
        this.getMap().registerForEvent(Fusion.Event.MAP_RESIZED, this.updateViewSize.bind(this));
        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, this.updateViewSize.bind(this));
        this.getMap().registerForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, this.updateViewSize.bind(this));
    },
    
    updateViewSize: function(e) {
        var map = this.getMap();
        var p = map.getSize();
        if (this.units != Fusion.PIXELS) {
            var gw = map.pixToGeoMeasure(p.w);
            var gh = map.pixToGeoMeasure(p.h);
            if (this.units != Fusion.UNKNOWN) {
                gw = Fusion.fromMeter(this.units, gw * map._fMetersperunit);
                gh = Fusion.fromMeter(this.units, gh * map._fMetersperunit);
            }
            if (this.precision >= 0) {
                var factor = Math.pow(10,this.precision);
                gw = Math.round(gw * factor)/factor;
                gh = Math.round(gh * factor)/factor;
            }
        }
        var unitAbbr = Fusion.unitAbbr(this.units);
        this.domSpan.innerHTML = this.template.replace('{w}',gw).replace('{h}',gh).replace('{units}', unitAbbr).replace('{units}', unitAbbr);
    },

    setParameter: function(param, value) {
        if (param == 'Units') {
            this.units = Fusion.unitFromName(value);
        }
    }
};