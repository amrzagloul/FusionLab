function Init() {

    var widget = getParent().Fusion.getWidgetsByType("StreetView")[0]; 
    
    var dest = new OpenLayers.Projection("EPSG:4326");

    var mapCenter = new OpenLayers.LonLat(widget.getMap().getCurrentCenter().x, widget.getMap().getCurrentCenter().y);
    var mapCenterLL = mapCenter.transform(widget.getMap().projection, dest);
    var mapCenterGG = new google.maps.LatLng(mapCenterLL.lat, mapCenterLL.lon);


    var panoramaOptions = {
      position: mapCenterGG,
      pov: {
        heading: 0,
        pitch: 0,
        zoom: 1
      }
    };
    widget.panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"), panoramaOptions);

    
    // Add the 2D navigation tool in the map
    widget.panorama.navigationToolLayer = new OpenLayers.Layer.Vector("2DNavigationTool", {
        displayInLayerSwitcher: false,
        styleMap: new OpenLayers.StyleMap({
            "default": {
                externalGraphic: getParent().Fusion.getFusionURL()+ "widgets/StreetView/navigator.png",
                graphicHeight: 48,
                graphicWidth: 32,
                graphicOpacity: 1,
                rotation: widget.panorama.pov.heading
            },
            "select": {
                cursor: "pointer"
            }
        })
    });

    var olMap = widget.getMap().oMapOL;
    olMap.addLayer(widget.panorama.navigationToolLayer);
    
    widget.dragControl = new OpenLayers.Control.DragFeature(widget.panorama.navigationToolLayer, {
        doneDragging: function(pixel) {
            var position = olMap.getLonLatFromPixel(pixel);
            
            position.transform(olMap.getProjectionObject(), new OpenLayers.Projection("EPSG:4326"));
            
            var featurePosition = new google.maps.LatLng(position.lat, position.lon);

            var webService = new google.maps.StreetViewService();  
            webService.getPanoramaByLocation(featurePosition, 50 ,OpenLayers.Function.bind(widget.checkNearestStreetView, widget));
        },
        moveFeature: function(pixel) {
            var position = olMap.getLonLatFromPixel(pixel);
            widget.DragNavigationTool(position);
        }
    });
    
    widget.addControl(widget.dragControl);
    widget.dragControl.activate();
          
    widget.drawNavigationTool();
    
    google.maps.event.addListener(widget.panorama, 'position_changed', this.positionChanged);
    
    google.maps.event.addListener(widget.panorama, 'pov_changed', this.povChanged);
}


function positionChanged() {
    var widget = getParent().Fusion.getWidgetsByType("StreetView")[0]; 
    widget.setPosition(widget.panorama.position.lng(), widget.panorama.position.lat());   
}

function povChanged() {
    var widget = getParent().Fusion.getWidgetsByType("StreetView")[0]; 
    widget.setPOV(widget.panorama.pov.heading, widget.panorama.pov.pitch, widget.panorama.pov.zoom);
}
    


