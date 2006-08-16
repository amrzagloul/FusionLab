/********************************************************************** * 
 * @project MapGuide Open Source : Chameleon
 * @revision $Id$
 * @purpose ZoomToSelection widget
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
 * Zoom to the current selection, if any
 *
 * To put a ZoomToSelection control in your application, you first need to add
 * a widget to your WebLayout as follows:
 *
 * <Command xsi:type="ChameleonCommandType">
 *   <Name>MyZoomToSelection</Name>
 *   <Label>Zoom to Selection</Label>
 *   <TargetViewer>All</TargetViewer>
 *   <Action>ZoomToSelection</Action>
 *   <ImageURL>images/icon_zoom_selected.png</ImageURL>
 *   <DisabledImageURL>images/icon_zoom_selected_x.png</DisabledImageURL>
 *   <Width>24</Width>
 *   <Height>24</Height>
 * </Command>
 *
 * The important parts of this Command are:
 *
 * Name (string, mandatory) 
 * 
 * an element with an id that is the same as this name must be in
 * the application.  For instance:
 *
 * <div id="MyZoomToSelection"></div>
 *
 * A button that activates this widget will appear inside the
 * element you provide.
 * **********************************************************************/

require('widgets/GxButtonBase.js');

var ZoomToSelection = Class.create();
ZoomToSelection.prototype = {
    initialize : function(oCommand) {
        console.log('ZoomToSelection.initialize');
        Object.inheritFrom(this, GxWidget.prototype, ['ZoomToSelection', false]);
        this.setMap(oCommand.getMap());
        Object.inheritFrom(this, GxButtonBase.prototype, [oCommand]);

        this.getMap().registerForEvent(MGMAP_SELECTION_ON, this, this.selectionOn.bind(this));
        this.getMap().registerForEvent(MGMAP_SELECTION_OFF, this, this.selectionOff.bind(this));
    },

    selectionOn : function() {
        this._oButton.activateTool();
     },

    selectionOff : function() {
        this._oButton.deactivateTool();
     },


    /**
     * get the selection from the map (which may not be loaded yet).
     * zoomToSelection is called when the selection is ready.
     */
    activateTool : function() {
        this.getMap().getSelection(this.zoomToSelection.bind(this));
    },

    /**
     * called when the button is clicked by the GxButtonBase widget
     */

    clickCB : function() {
        if (this._oButton.isEnabled())
        {
            this.activateTool();
        }
    },

    /**
     * set the extents of the map based on the pixel coordinates
     * passed
     * 
     * @param selection the active selection, or null if there is none
     */
    zoomToSelection : function(selection) {
        var llc = selection.getLowerLeftCoord();
        var urc = selection.getUpperRightCoord();
        this.getMap().setExtents([llc.x,llc.y,urc.x,urc.y]);
    }
};