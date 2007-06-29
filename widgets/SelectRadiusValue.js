/********************************************************************** * 
 * @project Fusion
 * @revision $Id$
 * @purpose Manually enter a radius for the SelectRadius
 * @author pspencer@dmsolutions.ca
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
 * The user can manually enter a radius for the SelectRadius widget.
 *
 * **********************************************************************/

var SelectRadiusValue = Class.create();
SelectRadiusValue.prototype =  {
    radiusWidgetName: null,
    label: '',
    className: '',
    
    initialize : function(oCommand) {
        Object.inheritFrom(this, Fusion.Widget.prototype, ['SelectRadiusValue', false, oCommand]);
        this.setMap(oCommand.getMap());
        
        /* parse widget properties */
        var json = oCommand.jsonNode;
        
        this.radiusWidgetName = json.RadiusName ? json.RadiusName[0] : null;
        this.label = json.Label ? json.Label[0] : '';
        this.className = json.ClassName ? json.ClassName[0] : '';
        
        /* a container for the widget */
        //this.domObj = document.createElement('div');
        //this.domObj.className = this.className;
        
        /* put in the label */
        this.domObj = document.createElement('label');
        this.domObj.className = this.className;
        this.domObj.innerHTML = this.label;
        //this.domObj.appendChild(label);
        
        /* put in the input */
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.domObj.appendChild(this.input);
        
        /* put into page */
        if (oCommand.getName() != '') {
            $(oCommand.getName()).appendChild(this.domObj);
        }
        Event.observe(this.input, 'blur', this.onBlur.bind(this));
        this.getMap().registerForEvent(MAP_LOADED, this.mapLoaded.bind(this));
        this.getMap().registerForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, this.mapExtentsChanged.bind(this));
        
    },
    
    mapLoaded: function() {
        var widgets = Fusion.getWidgetsByType('SelectRadius');
        for (var i=0; i<widgets.length; i++) {
            if (widgets[i].sName == this.radiusWidgetName) {
                this.widget = widgets[i];
            }
        }
        this.updateFromWidgetValue();
    },
    
    mapExtentsChanged: function() {
        this.updateWidgetValue();
    },
    
    onBlur: function() {
        this.updateWidgetValue();
    },
    
    updateWidgetValue: function() {
        if (this.widget) {
            var radius = this.getMap().geoToPixMeasure(this.input.getValue());
            this.widget.setRadius(radius);
        }
    },
    
    updateFromWidgetValue: function() {
        if (this.widget) {
            this.input.value = this.getMap().pixToGeoMeasure(this.widget.getRadius());
        }
    }
};