/**
 * Fusion.Widget.Redline
 *
 * $Id: Redline.js 1736 2009-01-14 15:42:24Z madair $
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

/* ********************************************************************
* Class: Fusion.Widget.Redline
*
* Allows the user to create a temporary OpenLayers Vector layer and
* draw POINT, LINE and POLYGON features on that layer.
*
**********************************************************************/


// This event could be emitted by the Redline widget
Fusion.Event.REDLINE_FEATURE_ADDED = Fusion.Event.lastEventId++;

Fusion.Widget.Redline = OpenLayers.Class(Fusion.Widget, {
    isExclusive: true,
    uiClass: Jx.Button,

    // Fusion map widget
    mapWidget: null,

    // a reference to a redline taskPane
    taskPane: null,

    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        this.mapWidget = Fusion.getWidgetById('Map');

        // register Redline specific events
        this.registerEventID(Fusion.Event.REDLINE_FEATURE_ADDED);

        this.sTarget = json.Target ? json.Target[0] : "";
        if (this.sTarget)
            this.taskPane = new Fusion.Widget.Redline.DefaultTaskPane(this, widgetTag.location);
    },
    
    getSessionID: function() {
        return this.getMapLayer().getSessionID();
    },
    
    getMapName: function() {
        var maps = this.mapWidget.getAllMaps();
        //Last one is top-most
        return maps[maps.length - 1].getMapName();
    },
    
    // activate the redline widget
    activate: function() {
        if (this.taskPane) {
            this.taskPane.loadDisplayPanel();
        }
    },

    // desactivate the redline widget
    deactivate: function() {
    }
});


Fusion.Widget.Redline.DefaultTaskPane = OpenLayers.Class(
{
    // a reference to the redline widget
    widget: null,

    // the the task pane windows
    taskPaneWin: null,

    // the panel url
    panelUrl:  'widgets/Redline/markupmain.php',

    initialize: function(widget,widgetLocation) {
        this.widget = widget;
        this.widget.registerForEvent(Fusion.Event.REDLINE_FEATURE_ADDED, OpenLayers.Function.bind(this.featureAdded, this));
    },

    loadDisplayPanel: function() {
        var url = Fusion.getFusionURL() + this.panelUrl;
        var params = [];

        // Add any additional params here
        params.push('LOCALE='+Fusion.locale);
        params.push('MAPNAME='+this.widget.getMapName());
        params.push('SESSION='+this.widget.getSessionID());

        if (url.indexOf('?') < 0) {
            url += '?';
        } else if (url.slice(-1) != '&') {
            url += '&';
        }
        url += params.join('&');

        var taskPaneTarget = Fusion.getWidgetById(this.widget.sTarget);
        var outputWin = window;

        if ( taskPaneTarget ) {
            taskPaneTarget.setContent(url);
            outputWin = taskPaneTarget.iframe.contentWindow;
        } else {
            outputWin = window.open(url, this.widget.sTarget, this.widget.sWinFeatures);
        }
        //outputWin.parent = window;
        this.taskPaneWin = outputWin;
    }
});
