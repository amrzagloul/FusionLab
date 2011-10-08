
Fusion.require("widgets/StreetView/StreetViewPane.js");

Fusion.Widget.StreetView = OpenLayers.Class(Fusion.Widget, {
    isExclusive: true,
    uiClass: Jx.Button,
    sFeatures : 'menubar=no,location=no,resizable=no,status=no',
    options : {},
    panorama : null,
    dragControl : null,
    
    initializeWidget: function(widgetTag) 
    {
        var json = widgetTag.extension;
        
        this.sTarget  = json.Target ? json.Target[0] : "StreetViewPanelWindow";
        this.sBaseUrl = Fusion.getFusionURL() + 'widgets/StreetView/StreetView.php';
        
        this.additionalParameters = [];
        if (json.AdditionalParameter) 
        {
            for (var i=0; i<json.AdditionalParameter.length; i++) 
            {
                var p = json.AdditionalParameter[i];
                var k = p.Key[0];
                var v = p.Value[0];
                this.additionalParameters.push(k+'='+encodeURIComponent(v));
            }
        }
        
        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.drawNavigationTool, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, OpenLayers.Function.bind(this.drawNavigationTool, this));
    },

    activate: function() 
    {            
        var url = this.sBaseUrl;
        var widgetLayer    = this.getMapLayer();
        var taskPaneTarget = Fusion.getWidgetById(this.sTarget);
        var pageElement    = $(this.sTarget);

        var params = [];
        params.push('locale='+Fusion.locale);
        params.push('session='+widgetLayer.getSessionID());
        params.push('mapname='+widgetLayer.getMapName());
        
        if (taskPaneTarget || pageElement) 
        {
          params.push('popup=false');
        } 
        else 
        {
          params.push('popup=true');
        }

        params = params.concat(this.additionalParameters);

        if (url.indexOf('?') < 0) 
        {
            url += '?';
        } 
        else if (url.slice(-1) != '&') 
        {
            url += '&';
        }
        
        url += params.join('&');
        
        if (taskPaneTarget) 
        {
            taskPaneTarget.setContent(url);
        } 
        else 
        {
            if (pageElement) 
            {
                pageElement.src = url;
            } 
            else 
            {
                window.open(url, this.sTarget, this.sWinFeatures);
            }
        }
        
        // Expand taskpane automatically if it is the target window
        if (typeof (panelman) != "undefined")
        {
            var panel = null;
            for (var i = 0; i < panelman.panels.length; ++i)
            {
                panel = panelman.panels[i];
                if (panel.options.contentId == this.sTarget)
                {
                    panelman.maximizePanel(panel);
                    return;
                }
            }
        }
        
        
    },
    
    setPosition : function(lon, lat) {
        //var map  = this.getMap();
        //var centerLL = new OpenLayers.LonLat(lon, lat);
        
        //var source = new OpenLayers.Projection("EPSG:4326");
        
        //var newMapCenter = centerLL.transform(source,this.getMap().projection);
        //var currentMapCenter = map.getCurrentCenter();
        
        //if(newMapCenter.lon != currentMapCenter.x || newMapCenter.lat != currentMapCenter.y) {
        //    var extent = map.getExtentFromPoint(newMapCenter.lon, newMapCenter.lat, map.getScale());
        //    map.setExtents(extent);
        //}
        this.drawNavigationTool();
    },
    
    setPOV : function(heading, pitch, zoom) {
        this.drawNavigationTool();
    },
    
    onMapExtentsChanged : function() {
        if(this.panorama) {
            var dest = new OpenLayers.Projection("EPSG:4326");

            var mapCenter = new OpenLayers.LonLat(this.getMap().getCurrentCenter().x, this.getMap().getCurrentCenter().y);
            var mapCenterLL = mapCenter.transform(this.getMap().projection, dest);
            var mapCenterGG = new google.maps.LatLng(mapCenterLL.lat, mapCenterLL.lon);

            var webService = new google.maps.StreetViewService();  
            webService.getPanoramaByLocation(mapCenterGG, 50 ,OpenLayers.Function.bind(this.checkNearestStreetView, this));
            
        }  
    },
    
    checkNearestStreetView : function(panoData, status){
        if(panoData && (status == google.maps.StreetViewStatus.OK || status == google.maps.StreetViewStatus.ZERO_RESULTS)){
            if(this.panorama.pano != panoData.location.pano)
                this.panorama.setPano(panoData.location.pano);
        }
        else if(status == google.maps.StreetViewStatus.UNKNOWN_ERROR) {
            alert("No Streetview Nearby!!!");
        }
        
        /** Else do something... **/
    },
    
    drawNavigationTool : function() {
        if(this.panorama) {
            // Destroy the existing features
            this.panorama.navigationToolLayer.destroyFeatures();
            
            // Update the navigator's rotation. 
            // TODO: There should be an easier way
            this.panorama.navigationToolLayer.styleMap.styles.default.defaultStyle.rotation = this.panorama.pov.heading;
            
            // Compute the new position
            var circlePosition = new OpenLayers.Geometry.Point(this.panorama.position.lng(), this.panorama.position.lat());
            circlePosition.transform(new OpenLayers.Projection("EPSG:4326"), this.getMap().oMapOL.getProjectionObject());
            
            // Add a vector feature in navigation layer
            this.panorama.navigationTool = new OpenLayers.Feature.Vector(circlePosition, {yaw: this.panorama.pov.heading});
            this.panorama.navigationToolLayer.addFeatures([this.panorama.navigationTool]);
        }
    },
    
    DragNavigationTool : function(lonlat) {
        // Destroy the existing features
        this.panorama.navigationToolLayer.destroyFeatures();
        
        // Update the navigator's rotation. 
        // TODO: There should be an easier way
        this.panorama.navigationToolLayer.styleMap.styles.default.defaultStyle.rotation = this.panorama.pov.heading;
        
        // Compute the new position
        var circlePosition = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
        
        // Add a vector feature in navigation layer
        this.panorama.navigationTool = new OpenLayers.Feature.Vector(circlePosition, {yaw: this.panorama.pov.heading});
        this.panorama.navigationToolLayer.addFeatures([this.panorama.navigationTool]);
    }
});