/********************************************************************** * 
 * @project MapGuide Open Source : Chameleon
 * @revision $Id$
 * @purpose pan the map a fixed amount in a particular direction
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
 * pan the map a fixed amount in a particular direction
 * 
 * **********************************************************************/

require('widgets/GxButtonBase.js');

var PanOnClick = Class.create();
PanOnClick.prototype = 
{
    fPercent: null,
    nDeltaX: null,
    nDeltaY: null,
    initialize : function(oCommand)
    {
        //console.log('FitToWindow.initialize');
        Object.inheritFrom(this, GxWidget.prototype, ['PanOnClick', false]);
        this.setMap(oCommand.getMap());
        
        Object.inheritFrom(this, GxButtonBase.prototype, [oCommand]);
        var percent = oCommand.oxmlNode.getNodeText('Percentage');
        if (percent == '') {
            percent = 75;
        }
        this.fPercent = parseFloat(percent)/100;
        
        var direction = oCommand.oxmlNode.getNodeText('Direction');
        switch (direction) {
            case 'north':
                this.nDeltaX = 0;
                this.nDeltaY = 1;
                break;
            case 'south':
                this.nDeltaX = 0;
                this.nDeltaY = -1;
                break;
            case 'east':
                this.nDeltaX = 1;
                this.nDeltaY = 0;
                break;
            case 'west':
                this.nDeltaX = -1;
                this.nDeltaY = 0;
                break;
            default:
                this.nDeltaX = 0;
                this.nDeltaY = 0;
        }
        
    },

    /**
     * called when the button is clicked by the GxButtonBase widget
     */
    activateTool : function()
    {
        var extents = this.getMap().getCurrentExtents();
        var center = this.getMap().getCurrentCenter();
        var fX, fY;
        fX = center.x + this.nDeltaX * (extents[2] - extents[0]) * this.fPercent;
        fY = center.y + this.nDeltaY * (extents[3] - extents[1]) * this.fPercent;
        this.getMap().zoom(fX, fY, 1);
    }
};