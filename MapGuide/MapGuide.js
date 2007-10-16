/**
 * Fusion.Maps.MapGuide
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

/***************************************************************************
* Class: Fusion.Maps.MapGuide
*
* Implements the map widget for MapGuide Open Source services.
*/

Fusion.Maps.MapGuide = Class.create();
Fusion.Maps.MapGuide.prototype = {
    arch: 'MapGuide',
    session: [null],
    bSingleTile: null,
    aShowLayers: null,
    aHideLayers: null,
    aShowGroups: null,
    aHideGroups: null,
    aRefreshLayers: null,
    sActiveLayer: null,
    selectionType: 'INTERSECTS',
    bSelectionOn: false,
    oSelection: null,
    bDisplayInLegend: true,   //TODO: set this in AppDef?
    bExpandInLegend: true,   //TODO: set this in AppDef?
    bMapLoaded : false,
    bIsMapWidgetLayer : true,  //Setthis to false for overview map layers

    //the resource id of the current MapDefinition
    _sResourceId: null,
    
    initialize : function(map, mapTag, isMapWidgetLayer) {
        // console.log('MapGuide.initialize');
        Object.inheritFrom(this, Fusion.Lib.EventMgr, []);
                
        this.registerEventID(Fusion.Event.MAP_SESSION_CREATED);
        this.registerEventID(Fusion.Event.MAP_SELECTION_ON);
        this.registerEventID(Fusion.Event.MAP_SELECTION_OFF);
        this.registerEventID(Fusion.Event.MAP_LOADED);

        this.mapWidget = map;
        this.oSelection = null;
        if (isMapWidgetLayer != null) {
            this.bIsMapWidgetLayer = isMapWidgetLayer;
        }
        
        var extension = mapTag.extension; //TBD: this belongs in layer tag?
        this.selectionType = extension.SelectionType ? extension.SelectionType[0] : 'INTERSECTS';
        
        this.sMapResourceId = mapTag.resourceId ? mapTag.resourceId : '';
        
        rootOpts = {
          displayInLegend: this.bDisplayInLegend,
          expandInLegend: this.bExpandInLegend,
          legendLabel: this._sMapname
          //TODO: set other opts for group initialization as required
        };
        this.layerRoot = new Fusion.Maps.MapGuide.Group(rootOpts,this);
        
        this.bSingleTile = mapTag.singleTile; //this is set in thhe AppDef.Map class ? (mapTag.singleTile[0] == 'false' ? false : true) : true;

        this.keepAliveInterval = parseInt(extension.KeepAliveInterval ? extension.KeepAliveInterval[0] : 300);
        
        var sid = Fusion.getQueryParam("session");
        if (sid) {
            this.session[0] = sid;
            this.mapSessionCreated();
        } else {
            this.createSession();
        }
        
        
    },

    createSession: function() {
        if (!this.session[0]) {
            this.session[0] = this;
            var sl = Fusion.getScriptLanguage();
            var scriptURL = this.arch + '/' + sl + '/CreateSession.' + sl;
            var options = {onComplete: this.createSessionCB.bind(this)};
            Fusion.ajaxRequest(scriptURL,options);  
        }
        if (this.session[0] instanceof Fusion.Maps.MapGuide) {
            // console.log('register for event');
            this.session[0].registerForEvent(Fusion.Event.MAP_SESSION_CREATED, this.mapSessionCreated.bind(this));
        } else {
            this.mapSessionCreated();
        }
    },
    
    createSessionCB : function(r, json) {
        if (r.status == 200 && json) {
            var o;
            eval('o='+r.responseText);
            this.session[0] = o.sessionId;
            this.triggerEvent(Fusion.Event.MAP_SESSION_CREATED);
        }
    },

    mapSessionCreated: function() {
        if (this.sMapResourceId != '') {
            this.loadMap(this.sMapResourceId);
        }
        window.setInterval(this.pingServer.bind(this), this.keepAliveInterval * 1000);
    },

    sessionReady: function() {
        return (typeof this.session[0] == 'string');
    },

    getSessionID: function() {
        return this.session[0];
    },
    
    getMapName: function() {
        return this._sMapname;
    },
    
    loadMap: function(resourceId, options) {
        this.bMapLoaded = false;

        /* don't do anything if the map is already loaded? */
        if (this._sResourceId == resourceId) {
            return;
        }

        if (!this.sessionReady()) {
            this.sMapResourceId = resourceId;
            return;
        }
        
        this.mapWidget.triggerEvent(Fusion.Event.MAP_LOADING);
        this.mapWidget._addWorker();
        
        this._fScale = -1;
        this._nDpi = 96;
        
        options = options || {};
        
        this._oMaxExtent = null;
        this.aShowLayers = options.showlayers || [];
        this.aHideLayers = options.hidelayers || [];
        this.aShowGroups = options.showgroups || [];
        this.aHideGroups = options.hidegroups || [];
        this.aRefreshLayers = options.refreshlayers || [];
        this.aLayers = [];

        this.oSelection = null;
        this.aSelectionCallbacks = [];
        this._bSelectionIsLoading = false;

        var sl = Fusion.getScriptLanguage();
        var loadmapScript = this.arch + '/' + sl  + '/LoadMap.' + sl;
        
        var sessionid = this.getSessionID();
        
        var params = 'mapid='+resourceId+"&session="+sessionid;
        var options = {onSuccess: this.mapLoaded.bind(this), parameters:params};
        Fusion.ajaxRequest(loadmapScript, options);
    },
    
    mapLoaded: function(r, json) {
        if (json) {
            var o;
            eval('o='+r.responseText);
            this._sResourceId = o.mapId;
            this._sMapname = o.mapName;
            this._fMetersperunit = o.metersPerUnit;
            this.mapWidget._fMetersperunit = this._fMetersperunit;

            this._oMaxExtent = OpenLayers.Bounds.fromArray(o.extent); 

            this.layerRoot.clear();
            this.layerRoot.legendLabel = this._sMapname;
            
            this.parseMapLayersAndGroups(o);
            
            for (var i=0; i<this.aShowLayers.length; i++) {
                var layer =  this.layerRoot.findLayerByAttribute('layerName', this.aShowLayers[i]);
                if (layer) {
                    this.aShowLayers[i] = layer.uniqueId;
                } else {
                    this.aShowLayers[i] = '';
                }
            }
            for (var i=0; i<this.aHideLayers.length; i++) {
                var layer =  this.layerRoot.findLayerByAttribute('layerName', this.aHideLayers[i]);
                if (layer) {
                    this.aHideLayers[i] = layer.uniqueId;
                } else {
                    this.aHideLayers[i] = '';
                }
            }
            
            for (var i=0; i<this.aShowGroups.length; i++) {
                var group =  this.layerRoot.findGroupByAttribute('groupName', this.aShowGroups[i]);
                if (group) {
                    this.aShowGroups[i] = group.uniqueId;
                } else {
                    this.aShowGroups[i] = '';
                }
            }
            
            for (var i=0; i<this.aHideGroups.length; i++) {
                var group =  this.layerRoot.findGroupByAttribute('groupName', this.aHideGroups[i]);
                if (group) {
                    this.aHideGroups[i] = group.uniqueId;
                } else {
                    this.aHideGroups[i] = '';
                }
            }
            
            //TODO: get this from the layerTag.extension
            //this.oMapInfo = Fusion.oConfigMgr.getMapInfo(this._sResourceId);

            var layerOptions = {};
            layerOptions.maxExtent = this._oMaxExtent;
            layerOptions.maxResolution = 'auto';

            //set projection units and code if supplied
            if (o.metersPerUnit == 1) {
              layerOptions.units = 'm';
              //layerOptions.projection = 'EPSG:42304';  //TBD not necessary, but can this be supplied by LoadMap?
            } else {
              //TBD need to do anything here? OL defaults to degrees
            }

            //add in scales array if supplied
            if (o.FiniteDisplayScales && o.FiniteDisplayScales.length>0) {
              layerOptions.scales = o.FiniteDisplayScales;
            } else {
              //layerOptions.maxScale = 1;     //TODO: Get these values form the Map info
            }
            //this.mapWidget.setMapOptions(layerOptions);  //TODO: only do this for BaseLayers?

            if (!this.bSingleTile) {
              if (o.groups.length >0) {
                this.bSingleTile = false;
              } else {
                this.bSingleTile = true;
              }
            }

            //create the OL layer for this Map layer
            var params = {};
            if ( this.bSingleTile ) {
              params = {        //single tile params
                session : this.getSessionID(),
                mapname : this._sMapname
              };
              layerOptions.singleTile = true;   
              layerOptions.showLayers = this.aShowLayers.length > 0 ? this.aShowLayers.toString() : null;
              layerOptions.hideLayers = this.aHideLayers.length > 0 ? this.aHideLayers.toString() : null;
              layerOptions.showGroups = this.aShowGroups.length > 0 ? this.aShowGroups.toString() : null;
              layerOptions.hideGroups = this.aHideGroups.length > 0 ? this.aHideGroups.toString() : null;
              layerOptions.refreshLayers = this.aRefreshLayers.length > 0 ? this.aRefreshLayers.toString() : null;

            } else {
              params = {      //tiled version
                mapdefinition: this._sResourceId,
                basemaplayergroupname: o.groups[0].groupName  //assumes only one group for now
              };
              layerOptions.singleTile = false;
            }

            //remove this layer if it was already created
            if (this.oLayerOL) {
                this.oLayerOL.events.unregister("loadstart", this, this.loadStart);
                this.oLayerOL.events.unregister("loadend", this, this.loadEnd);
                this.oLayerOL.destroy();
            }

            var url = Fusion.getConfigurationItem('mapguide', 'mapAgentUrl');
            this.oLayerOL = new OpenLayers.Layer.MapGuide( "MapGuide OS layer", url, params, layerOptions );
            this.oLayerOL.events.register("loadstart", this, this.loadStart);
            this.oLayerOL.events.register("loadend", this, this.loadEnd);

            //this is to distinguish between a regular map and an overview map
            if (this.bIsMapWidgetLayer) {
              this.mapWidget.addMap(this);
              this.mapWidget.oMapOL.setBaseLayer(this.oLayerOL);
              this.mapWidget._oInitialExtents = null;
              this.mapWidget.fullExtents();
              this.mapWidget.triggerEvent(Fusion.Event.MAP_LOADED);
            } else {
              this.triggerEvent(Fusion.Event.MAP_LOADED);
            }

            this.bMapLoaded = true;
        } else {
            //TBD: something funky going on with Fusion.Error object
            //Fusion.reportError( new Fusion.Error(Fusion.Error.FATAL, 'Failed to load requested map:\n'+r.responseText));
            alert( 'Failed to load requested map:\n'+r.responseText );
        }
        this.mapWidget._removeWorker();
    },

//TBD: this function not yet converted for OL    
    reloadMap: function() {
        
        this.mapWidget._addWorker();
        //console.log('loadMap: ' + resourceId);
        this.aShowLayers = [];
        this.aHideLayers = [];
        this.aShowGroups = [];
        this.aHideGroups = [];
        this.aRefreshLayers = [];
        this.layerRoot.clear();
        this.aLayers = [];
        
        var sl = Fusion.getScriptLanguage();
        var loadmapScript = this.arch + '/' + sl  + '/LoadMap.' + sl;
        
        var sessionid = this.getSessionID();
        
        var params = 'mapname='+this._sMapname+"&session="+sessionid;
        var options = {onSuccess: this.mapReloaded.bind(this), onException: this.reloadFailed.bind(this),
                                     parameters: params};
        Fusion.ajaxRequest(loadmapScript, options);
    },

    reloadFailed: function(r,json) {
      alert(r.transport.responseText);
    },

//TBD: this function not yet converted for OL    
    mapReloaded: function(r,json) {
        if (json) {
            var o;
            eval('o='+r.responseText);
            this.parseMapLayersAndGroups(o);
            this.mapWidget.triggerEvent(Fusion.Event.MAP_RELOADED);
            this.drawMap();
        } else {
            Fusion.reportError( new Fusion.Error(Fusion.Error.FATAL, 'Failed to load requested map:\n'+r.responseText));
        }
        this.mapWidget._removeWorker();
    },
    
    parseMapLayersAndGroups: function(o) {
        for (var i=0; i<o.groups.length; i++) {
            var group = new Fusion.Maps.MapGuide.Group(o.groups[i], this);
            var parent;
            if (group.parentUniqueId != '') {
                parent = this.layerRoot.findGroupByAttribute('uniqueId', group.parentUniqueId);
            } else {
                parent = this.layerRoot;
            }
            parent.addGroup(group);
        }

        for (var i=0; i<o.layers.length; i++) {
            var layer = new Fusion.Maps.MapGuide.Layer(o.layers[i], this);
            var parent;
            if (layer.parentGroup != '') {
                parent = this.layerRoot.findGroupByAttribute('uniqueId', layer.parentGroup);
            } else {
                parent = this.layerRoot;
            }
            parent.addLayer(layer);
            this.aLayers.push(layer);
        }
    },
    
    drawMap: function() {
        if (!this.bMapLoaded) {
            return;
        }
        
        var options = {
          showLayers : this.aShowLayers.length > 0 ? this.aShowLayers.toString() : null,
          hideLayers : this.aHideLayers.length > 0 ? this.aHideLayers.toString() : null,
          showGroups : this.aShowGroups.length > 0 ? this.aShowGroups.toString() : null,
          hideGroups : this.aHideGroups.length > 0 ? this.aHideGroups.toString() : null,
          refreshLayers : this.aRefreshLayers.length > 0 ? this.aRefreshLayers.toString() : null
        };
        this.aShowLayers = [];
        this.aHideLayers = [];
        this.aShowGroups = [];
        this.aHideGroups = [];
        this.aRefreshLayers = [];

        this.oLayerOL.addOptions(options);
        this.oLayerOL.mergeNewParams({ts : (new Date()).getTime()});
        this.oLayerOL.redraw();
    },

    /**
     * Function: isMapLoaded
     * 
     * Returns true if the Map has been laoded succesfully form the server
     */
    isMapLoaded: function() {
        return this.bMapLoaded;
    },

    hasSelection: function() { return this.bSelectionOn; },
    
    getSelectionCB : function(userFunc, layers, startend, r, json) {
      if (json) 
      {
          var o;
          eval("o="+r.responseText);

          var oSelection = new GxSelectionObject(o);
          userFunc(oSelection);
      }
      
    },
    
    /**
     * advertise a new selection is available and redraw the map
     */
    newSelection: function() {
        if (this.oSelection) {
            this.oSelection = null;
        }
        this.bSelectionOn = true;
        this.drawMap();
        this.triggerEvent(Fusion.Event.MAP_SELECTION_ON);
    },

    /**
     * Returns the number of features selected for this map layer
     */
    getSelectedFeatureCount : function() {
      var total = 0;
      for (var j=0; j<this.aLayers.length; ++j) {
        total += this.aLayers[j].selectedFeatureCount;
      }
      return total;
    },

    /**
     * Returns the number of features selected for this map layer
     */
    getSelectedLayers : function() {
      var layers = [];
      for (var j=0; j<this.aLayers.length; ++j) {
        if (this.aLayers[j].selectedFeatureCount>0) {
          layers.push(this.aLayers[j]);
        }
      }
      return layers;
    },

    /**
     * Returns the number of features selected for this map layer
     */
    getSelectableLayers : function() {
      var layers = [];
      for (var j=0; j<this.aLayers.length; ++j) {
        if (this.aLayers[j].selectable) {
          layers.push(this.aLayers[j]);
        }
      }
      return layers;
    },

     /**
      * Function: zoomToSelection
      *
      * sets a Selection XML back to the server
      */
    zoomToSelection: function(r) {
      var xmlDoc = r.responseXML.documentElement;
      var x = xmlDoc.getElementsByTagName('X');
      var y = xmlDoc.getElementsByTagName('Y');
      //double the veiwport
      var extent = new OpenLayers.Bounds(x[0].firstChild.nodeValue,y[0].firstChild.nodeValue,x[1].firstChild.nodeValue,y[1].firstChild.nodeValue);
      var center = extent.getCenterPixel();
      var size = extent.getSize();
      extent.left = center.x - 2*size.w;
      extent.right = center.x + 2*size.w;
      extent.bottom = center.y - 2*size.h;
      extent.top = center.y + 2*size.h;
      this.mapWidget.setExtents(extent);
    },  

    processSelection: function(sel, requery, zoomTo, json) {
      if (requery) {
        //xmlDoc = (new DOMParser()).parseFromString(r.responseXML, "text/xml");
        //this.processFeatureInfo(xmlDoc.documentElement, false, 1);
        //this.processFeatureInfo(xmlOut, false, 2);
      }
      if (zoomTo) {
        var mgRequest = new Fusion.Lib.MGRequest.MGGetFeatureSetEnvelope(this.getSessionID(), this.getMapName(), sel );
        Fusion.oBroker.dispatchRequest(mgRequest, this.zoomToSelection.bind(this));
      } else {
        this.mapWidget.redraw();
      }
    },

    setSelection: function (selText, requery, zoomTo) {
      var sl = Fusion.getScriptLanguage();
      var setSelectionScript = this.arch + '/' + sl  + '/SetSelection.' + sl;
      var params = 'mapname='+this.getMapName()+"&session="+this.getSessionID();
      params += '&selection=' + encodeURIComponent(selText);
      params += '&queryinfo=' + (requery? "1": "0");
      params += '&seq=' + Math.random();
      var options = {onSuccess: this.processSelection.bind(this, selText, requery, zoomTo), parameters:params, asynchronous:false};
      Fusion.ajaxRequest(setSelectionScript, options);
    },

    //TODO: the following method is copied from ajaxmappane.templ and can probably be reworked for fusion
    processFeatureInfo: function(xmlIn, append, which) {
      if (which & 1) {
        var selectionChanged = false;
        var prevCount = selection.count;
        if(!append) {
            selection = new Selection();
        }
        try
        {
            var layers = xmlIn.getElementsByTagName("Layer");
            for(var i=0; i < layers.length; i++)
            {
                var layerId = layers[i].getAttribute("id");

                var classElt = layers[i].getElementsByTagName("Class")[0];
                var className = classElt.getAttribute("id");

                var layer = null, newLayer = null;
                if(append)
                {
                    if((layer = selection.layers.getItem(layerId)) == null) {
                        newLayer = layer = new SelLayer(className);
                    }
                }
                else
                {
                    newLayer = layer = new SelLayer(className);
                    selectionChanged = true;
                }
                if(newLayer) {
                    selection.layers.setItem(layerId, layer);
                }

                var features = classElt.getElementsByTagName("ID");
                for(var j=0; j < features.length; j++)
                {
                    var id = features[j].childNodes[0].nodeValue;
                    if(append && newLayer == null)
                    {
                        if(layer.featIds.hasItem(id))
                        {
                            layer.featIds.removeItem(id);
                            selection.count --;
                        }
                        else
                        {
                            layer.featIds.setItem(id, layer);
                            selection.count ++;
                        }
                        selectionChanged = true;
                    }
                    else
                    {
                        layer.featIds.setItem(id, layer);
                        selection.count ++;
                    }
                }
            }
        }
        catch(e) {}

        if(selectionChanged || prevCount != selection.count)
        {
            xmlSelection = null;
            if(appending)
            {
                fi = SetSelection(selectionToXml(), selection.count == 1);
                if(selection.count == 1)
                {
                    ProcessFeatureInfo(fi, false, 2);
                    which &= ~2;
                }
            }
            parent.OnSelectionChanged();
            RequestMapImage(++ mapId);
        }
      }
      if(which & 2) {
        properties = new Array();
        if(selection.count == 1)
        {
            try
            {
                var props = xmlIn.getElementsByTagName("Property");
                if(props != null)
                {
                    for(var i=0; i < props.length; i++)
                    {
                        var name = props[i].getAttribute("name");
                        var value = props[i].getAttribute("value");
                        properties.push(new Property(name, value));
                    }
                }
            }
            catch(e) {}
        }
        properties.sort(CompareProperties);
        GetPropertyCtrl().SetProperties(selection.count, properties);
      }
      if(which & 4) {
        try {
            var hlinkElt = xmlIn.getElementsByTagName("Hyperlink")[0];
            if(hlinkElt != null) {
                hlData.url = hlinkElt.childNodes[0].nodeValue;
            }
        } catch(e) {
            hlData.url = "";
        }
        try {
            var ttipElt = xmlIn.getElementsByTagName("Tooltip")[0];
            if(ttipElt != null) {
                hlData.ttip = ttipElt.childNodes[0].nodeValue;
            }
        }
        catch(e) {}
      }
    },


     /**
     * asynchronously load the current selection.  When the current
     * selection changes, the selection is not loaded because it
     * could be a lengthy process.  The user-supplied function will
     * be called when the selection is available.
     *
     * @param userFunc {Function} a function to call when the
     *        selection has loaded
     *
     * @param layers {string} Optional parameter.  A comma separated
     *        list of layer names (Roads,Parcels). If it is not
     *        given, all the layers that have a selection will be used  
     *
     * @param startcount {string} Optional parameter.  A comma separated
     *        list of a statinh index and the number of features to be retured for
     *        each layer given in the layers parameter. Index starts at 0
     *        (eg: 0:4,2:6 : return 4 elements for the first layers starting at index 0 and
     *         six elements for layer 2 starting at index 6). If it is not
     *        given, all the elemsnts will be returned.  
     */
    getSelection : function(userFunc, layers, startcount) {

      /*for now always go back to server to fetch selection */
       
      if (userFunc) 
      {
          //this.aSelectionCallbacks.push(userFunc);
      
      
          //this.mapWidget._addWorker();
          // this._bSelectionIsLoading = true;
          var s = this.arch + '/' + Fusion.getScriptLanguage() + "/Selection." + Fusion.getScriptLanguage() ;
          var params = {parameters:'session='+this.getSessionID()+'&mapname='+ this._sMapname +'&layers='+layers+'&startcount='+startcount, 
                        onComplete: this.getSelectionCB.bind(this, userFunc, layers, startcount)};
          Fusion.ajaxRequest(s, params);
      }
    },

    /**
       Call back function when selection is cleared
    */
    selectionCleared : function()
    {
        //clear the selection count for the layers
        for (var j=0; j<this.aLayers.length; ++j) {
          this.aLayers[j].selectedFeatureCount = 0;
        }

        this.bSelectionOn = true;
        this.triggerEvent(Fusion.Event.MAP_SELECTION_OFF);
        this.drawMap();
        this.oSelection = null;
    },

    /**
       Utility function to clear current selection
    */
    clearSelection : function() {
        var s = this.arch + '/' + Fusion.getScriptLanguage() + "/ClearSelection." + Fusion.getScriptLanguage() ;
        var params = {parameters:'session='+this.getSessionID()+'&mapname='+ this._sMapname, onComplete: this.selectionCleared.bind(this)};
        Fusion.ajaxRequest(s, params);
    },


    /**
       Call back function when slect functions are called (eg queryRect)
    */
    processQueryResults : function(r) {
        this.mapWidget._removeWorker();
        if (r.responseText) {   //TODO: make the equivalent change to MapServer.js
            var oNode;
            eval('oNode='+r.responseText);
            
            if (oNode.hasSelection) {

              // set the feature count on each layer making up this map
              for (var i=0; i<oNode.layers.length; ++i) {
                var layerName = oNode.layers[i];
                for (var j=0; j<this.aLayers.length; ++j) {
                  if (layerName == this.aLayers[j].layerName) {
                    this.aLayers[j].selectedFeatureCount = oNode[layerName].featureCount;
                  }
                }
              }
              this.newSelection();
            } else {
              this.drawMap();
              return;
            }
        }
    },

    /**
       Do a query on the map
    */
    query : function(options) {
        this.mapWidget._addWorker();
        
        //clear the selection count for the layers
        for (var j=0; j<this.aLayers.length; ++j) {
          this.aLayers[j].selectedFeatureCount = 0;
        }

        var geometry = options.geometry || '';
        var maxFeatures = options.maxFeatures || -1;
        var bPersistant = options.persistent || true;
        var selectionType = options.selectionType || this.selectionType;
        var filter = options.filter ? '&filter='+options.filter : '';
        var layers = options.layers || '';
        var extend = options.extendSelection ? '&extendselection=true' : '';

        var sl = Fusion.getScriptLanguage();
        var loadmapScript = this.arch + '/' + sl  + '/Query.' + sl;

        var sessionid = this.getSessionID();

        var params = 'mapname='+this._sMapname+"&session="+sessionid+'&spatialfilter='+geometry+'&maxfeatures='+maxFeatures+filter+'&layers='+layers+'&variant='+selectionType+extend;
        var options = {onSuccess: this.processQueryResults.bind(this), 
                                     parameters: params};
        Fusion.ajaxRequest(loadmapScript, options);
    },
    showLayer: function( layer ) {
        if (this.oMapInfo && this.oMapInfo.layerEvents[layer.layerName]) {
            var layerEvent = this.oMapInfo.layerEvents[layer.layerName];
            for (var i=0; i<layerEvent.onEnable.length; i++) {
                var l = this.layerRoot.findLayer(layerEvent.onEnable[i].name);
                if (l) {
                    if (layerEvent.onEnable[i].enable) {
                        l.show();
                    } else {
                        l.hide();
                    }
                }
            }
        }
        this.aShowLayers.push(layer.uniqueId);
        this.drawMap();
    },
    hideLayer: function( layer ) {
        if (this.oMapInfo && this.oMapInfo.layerEvents[layer.layerName]) {
            var layerEvent = this.oMapInfo.layerEvents[layer.layerName];
            for (var i=0; i<layerEvent.onDisable.length; i++) {
                var l = this.layerRoot.findLayer(layerEvent.onDisable[i].name);
                if (l) {
                    if (layerEvent.onDisable[i].enable) {
                        l.show();
                    } else {
                        l.hide();
                    }
                }
            }
        }        
        this.aHideLayers.push(layer.uniqueId);
        this.drawMap();
    },
    showGroup: function( group ) {
        this.aShowGroups.push(group.uniqueId);
        this.drawMap();
    },
    hideGroup: function( group ) {
        this.aHideGroups.push(group.uniqueId);
        this.drawMap();
    },
    refreshLayer: function( layer ) {
        this.aRefreshLayers.push(layer.uniqueId);        
        this.drawMap();
    },
    setParameter : function(param, value) {
        if (param == 'SelectionType') {
            this.selectionType = value;
        }
    },

    loadStart: function() {
        this.mapWidget._addWorker();
    },

    loadEnd: function() {
        this.mapWidget._removeWorker();
    },
    
    pingServer: function() {
        var s = this.arch + '/' + Fusion.getScriptLanguage() + "/Common." + Fusion.getScriptLanguage() ;
        var params = {};
        params.parameters = 'session='+this.getSessionID();
        Fusion.ajaxRequest(s, params);
    }
};
    
/***************************************************************************
* Class: Fusion.Maps.MapGuide.Group
*
* Implements the map layer groups for MapGuide services
*/

Fusion.Maps.MapGuide.Group = Class.create();
Fusion.Maps.MapGuide.Group.prototype = {
    oMap: null,
    initialize: function(o, oMap) {
        this.uniqueId = o.uniqueId;
        Object.inheritFrom(this, Fusion.Widget.Map.Group.prototype, [o.groupName]);
        this.oMap = oMap;
        this.groupName = o.groupName;
        this.legendLabel = o.legendLabel;
        this.parentUniqueId = o.parentUniqueId;
        this.groupType = o.groupType;
        this.displayInLegend = o.displayInLegend;
        this.expandInLegend = o.expandInLegend;
        this.visible = o.visible;
        this.actuallyVisible = o.actuallyVisible;
    },
    
    show: function() {
        if (this.visible) {
            return;
        }
        this.oMap.showGroup(this);
        this.visible = true;
        if (this.legend && this.legend.checkBox) {
            this.legend.checkBox.checked = true;
        }
    },
    
    hide: function() {
        if (!this.visible) {
            return;
        }
        this.oMap.hideGroup(this);
        this.visible = false;
        if (this.legend && this.legend.checkBox) {
            this.legend.checkBox.checked = false;
        }
    },
    
    isVisible: function() {
        return this.visible;
    }
};

/***************************************************************************
* Class: Fusion.Maps.MapGuide
*
* Implements individual map legend layers for MapGuide services
*/

Fusion.Maps.MapGuide.Layer = Class.create();
Fusion.Maps.MapGuide.Layer.prototype = {
    
    scaleRanges: null,
    
    oMap: null,
    
    initialize: function(o, oMap) {
        this.uniqueId = o.uniqueId;
        Object.inheritFrom(this, Fusion.Widget.Map.Layer.prototype, [o.layerName]);
        this.oMap = oMap;
        this.layerName = o.layerName;
        this.uniqueId = o.uniqueId;
        this.resourceId = o.resourceId;
        this.legendLabel = o.legendLabel;
        this.selectable = o.selectable;
        this.selectedFeatureCount = 0;
        this.layerTypes = [].concat(o.layerTypes);
        this.displayInLegend = o.displayInLegend;
        this.expandInLegend = o.expandInLegend;
        this.visible = o.visible;
        this.actuallyVisible = o.actuallyVisible;
        this.editable = o.editable;
        //TODO: make this configurable
        this.themeIcon = 'images/legend-theme.png';
        this.disabledLayerIcon = 'images/legend-layer.png';
        
        this.parentGroup = o.parentGroup;
        this.scaleRanges = [];
        for (var i=0; i<o.scaleRanges.length; i++) {
            var scaleRange = new Fusion.Maps.MapGuide.ScaleRange(o.scaleRanges[i]);
            this.scaleRanges.push(scaleRange);
        }
    },
    
    supportsType: function(type) {
        for (var i=0; i<this.layerTypes.length; i++) {
            if (this.layerTypes[i] == type) {
                return true;
            }
        }
        return false;
    },
    
    getScaleRange: function(fScale) {
        for (var i=0; i<this.scaleRanges.length; i++) {
            if (this.scaleRanges[i].contains(fScale)) {
                return this.scaleRanges[i];
            }
        }
        return null;
    },

    show: function() {
        if (this.visible) {
            return;
        }
        this.oMap.showLayer(this);
        this.set('visible', true);
        if (this.legend && this.legend.checkBox) {
            this.legend.checkBox.checked = true;
        }
    },

    hide: function() {
        if (!this.visible) {
            return;
        }
        this.oMap.hideLayer(this);
        this.set('visible',false);
        if (this.legend && this.legend.checkBox) {
            this.legend.checkBox.checked = false;
        }
    },

    isVisible: function() {
        return this.visible;
    }
};

/***************************************************************************
* Class: Fusion.Maps.MapGuide
*
* Implements a scale range object for MapGuide services
*/

Fusion.Maps.MapGuide.ScaleRange = Class.create();
Fusion.Maps.MapGuide.ScaleRange.prototype = {
    styles: null,
    initialize: function(o) {
        this.minScale = o.minScale;
        this.maxScale = o.maxScale;
        this.styles = [];
        if (!o.styles) {
            return;
        }
        for (var i=0; i<o.styles.length; i++) {
            var styleItem = new Fusion.Maps.MapGuide.StyleItem(o.styles[i]);
            this.styles.push(styleItem);
        }
    },
    contains: function(fScale) {
        return fScale >= this.minScale && fScale <= this.maxScale;
    }
};

/***************************************************************************
* Class: Fusion.Maps.MapGuide
*
* Implements the legend style items to get a legend icon from the server
*/

Fusion.Maps.MapGuide.StyleItem = Class.create();
Fusion.Maps.MapGuide.StyleItem.prototype = {
    initialize: function(o) {
        this.legendLabel = o.legendLabel;
        this.filter = o.filter;
        this.geometryType = o.geometryType;
        if (this.geometryType == '') {
            this.geometryType = -1;
        }
        this.categoryIndex = o.categoryIndex;
        if (this.categoryindex == '') {
            this.categoryindex = -1;
        }
    },
    getLegendImageURL: function(fScale, layer) {
        var url = Fusion.getConfigurationItem('mapguide', 'mapAgentUrl');
        return url + "OPERATION=GETLEGENDIMAGE&SESSION=" + layer.oMap.getSessionID() + "&VERSION=1.0.0&SCALE=" + fScale + "&LAYERDEFINITION=" + encodeURIComponent(layer.resourceId) + "&THEMECATEGORY=" + this.categoryIndex + "&TYPE=" + this.geometryType;
    }
};
