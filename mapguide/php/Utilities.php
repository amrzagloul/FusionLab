<?php
//------------------------------------------------------------------------------
//deprecated
function CreateFeatureSource($map, $dataSourceId, $featureName, $featureService, $geomType) {
    //create feature source
    $classDef = new MgClassDefinition();

    $classDef->SetName($featureName);
    $classDef->SetDescription($featureName . " feature layer");
    $classDef->SetDefaultGeometryPropertyName("GEOM");

    //Set KEY property
    $prop = new MgDataPropertyDefinition("KEY");
    $prop->SetDataType(MgPropertyType::Int32);
    $prop->SetAutoGeneration(true);
    $prop->SetReadOnly(true);
    $classDef->GetIdentityProperties()->Add($prop);
    $classDef->GetProperties()->Add($prop);

    $prop = new MgGeometricPropertyDefinition("GEOM");
    $prop->SetGeometryTypes($geomType);
    $classDef->GetProperties()->Add($prop);

    //Create the schema
    $schema = new MgFeatureSchema("DrawToolSchema", "Temporary draw layer schema");
    $schema->GetClasses()->Add($classDef);

    //finally, creation of the feature source
    $params = new MgCreateSdfParams("LatLong", GetMapSRS($map), $schema);
    $featureService->CreateFeatureSource($dataSourceId, $params);
}

//------------------------------------------------------------------------------
//copy a featuresource to the session for editing. The data file on the server
//may also be duplicated when copying in either direction unless a feature list is provided
function CopyFeatureSource($map, $resourceService, $featureService, $sourceFeatureId, $featureList = NULL) {
    //create the session MgResourceIdentifier
    $destinationFeatureId = ToggleRepository($sourceFeatureId);

    //get feature source parameters from original
    $schemaCollection = $featureService->DescribeSchema($sourceFeatureId, '');
    $schema = $schemaCollection->GetItem(0);

    $activeOnly = true;
    $activeSpatialContextReader = $featureService->GetSpatialContexts($sourceFeatureId, $activeOnly);
    $activeSpatialContextReader->ReadNext();
    $spatialContextName = $activeSpatialContextReader->GetName();
    $coordSysWkt = $activeSpatialContextReader->GetCoordinateSystemWkt();
    $createSdfParams = new MgCreateSdfParams($spatialContextName, $coordSysWkt, $schema);

    //instantiate the new featureSource from its MgResourceIdentifier
    $featureService->CreateFeatureSource($destinationFeatureId, $createSdfParams);

    //if there is a featureList, we copy the set of features as an update to the target.
    //N.B. For a featureList array with a single 'magic' value of -1, all features are copied but
    //this uses a direct file copy so only works with identical flat file formats such as
    //SDF<->SDF
    if (isset($featureList)) {
        echo "here";
        //copy data from the original featureSource into the new one
        //1. get data name
        //2. copy contents
        $byteReader = $resourceService->EnumerateResourceData($sourceFeatureId);
        $sourceFeatureXML = $byteReader->ToString();
        if (preg_match("/<Name>(.+)<\/Name>/", $sourceFeatureXML, $matches)) {
            $copiedFeatureName = $matches[1];
        } else {
            header('content-type: image/xml');
            echo '<result>Target Layer has no data file.</result>';
            exit;
        }


        if ($featureList[0] == -1) {
            //copy file directly
            $featureSourceData = $resourceService->GetResourceData($sourceFeatureId,
                                                                   $copiedFeatureName);
            $resourceService->SetResourceData($destinationFeatureId,
                                              $copiedFeatureName,
                                              'File',
                                              $featureSourceData);
        } else {
            //copy features individually

        }
    }
}
//---------------------------------------------------------------------------------
//function ShadowSelection
//
//@param MgResourceService resourceService
//@param MgFeatureService featureService
//@param MgResourceIdentifier sourceFeatureId - the features source to shadow
//@param String selectionString - the filter text
//@param String layerClassName - the feature class from the original layer
//@return the shadow FeatureSource Id.
//
//Creates a backup of selected features in the shadow feature store for a layer
//within the repository library.
//---------------------------------------------------------------------------------
function ShadowSelection($resourceService, $featureService,
                         $sourceFeatureId, $selectionString, $layerClassName) {
    //Find or create shadow resource
    $shadowResourceId = CreateShadowFeatureSource($resourceService, $featureService, $sourceFeatureId);
    
    //create command to copy selected features to the shadow
    $queryOptions = new MgFeatureQueryOptions();
    $queryOptions->SetFilter($selectionString);
    try{
        $featureReader = $featureService->SelectFeatures($sourceFeatureId,
                                                         $layerClassName,
                                                         $queryOptions);
    }catch (MgException $e)
    {
        echo "ERROR: " . $e->GetMessage() . "\n";
        echo $e->GetStackTrace() . "\n";
    }
    
    //clone the selected feature properties in a batch property collection and add
    //it to the command collection
    $batchPropCollection = BatchPropertyCollectionFromFeatureReader($featureReader);
    $featureReader->Close();
    $shadowCommands = new MgFeatureCommandCollection();
    $shadowCommands->Add(new MgInsertFeatures($layerClassName, $batchPropCollection));

    //store the features to be deleted in the shadow feature source
    try{
        $featureService->UpdateFeatures($shadowResourceId, $shadowCommands, false);
    }catch (MgException $e)
    {
        echo "ERROR: " . $e->GetMessage() . "\n";
        echo $e->GetStackTrace() . "\n";
    }
    
    return $shadowResourceId;
}


//---------------------------------------------------------------------------------
//function CreateShadowFeatureSource
//
//@param MgResourceService resourceService
//@param MgFeatureService featureService
//@param MgResourceIdentifier sourceFeatureId - the features source to shadow
//
//@return MgResourceIdentifier created or checked
//
//duplicates a feature source in the repository to store edited and deleted features
//before changes are committed. The source is designed to allow undo or data restore
//operations in the event of a server disconnection. This function checks if the
//feature source already exists before creating it.
//---------------------------------------------------------------------------------
function CreateShadowFeatureSource($resourceService, $featureService, $sourceFeatureId) {
    $shadowResourceId = new MgResourceIdentifier($sourceFeatureId->GetRepositoryType()."://".
                                           $sourceFeatureId->GetPath().'/'.
                                           $sourceFeatureId->GetName().'-shadow.'.
                                           $sourceFeatureId->GetResourceType());

    if (!DataSourceExists($resourceService, $shadowResourceId)) {
        //get feature source parameters from original
        $schemaCollection = $featureService->DescribeSchema($sourceFeatureId, '');
        $schema = $schemaCollection->GetItem(0);

        $activeOnly = true;
        $activeSpatialContextReader = $featureService->GetSpatialContexts($sourceFeatureId, $activeOnly);
        $activeSpatialContextReader->ReadNext();
        $spatialContextName = $activeSpatialContextReader->GetName();
        $coordSysWkt = $activeSpatialContextReader->GetCoordinateSystemWkt();
        $createSdfParams = new MgCreateSdfParams($spatialContextName, $coordSysWkt, $schema);

        //instantiate the new featureSource from its MgResourceIdentifier
        $featureService->CreateFeatureSource($shadowResourceId, $createSdfParams);
    }

    return $shadowResourceId;
}

//---------------------------------------------------------------------------------
//function DeleteShadowFeatureSource
//
//@param MgResourceService resourceService
//@param MgFeatureService featureService
//@param MgResourceIdentifier sourceFeatureId - the original feature source
//
//@return nothing
//
//removes the shadow feature source and it's associated data. Useful after user
//has committed the changes to the original feature source.
//---------------------------------------------------------------------------------
function DeleteShadowFeatureSource($resourceService, $featureService, $sourceFeatureId) {
    $shadowResourceId = new MgResourceIdentifier($sourceFeatureId->GetRepositoryType().
                                           $sourceFeatureId->GetPath().
                                           $sourceFeatureId->GetName().'-shadow.'.
                                           $sourceFeatureId->GetResourceType);

    if (DataSourceExists($resourceService, $shadowResourceId)) {
        $resourceService->DeleteResource($shadowResourceId);
    }

    return;
}

//------------------------------------------------------------------------------
//duplicate a layer in the session so that it can refer to a session feature source
//the session id and the feature source are assumed to have the same path as their
//repository counterparts
function CopyLayerToSession($map, $resourceService, $libraryLayerId) {
    //create the session MgResourceIdentifier
    $destinationLayerId = ToggleRepository($libraryLayerId);
    $destinationLayerId->SetName($destinationLayerId->GetName().'-edit');

    //copy content from library layer
    $contentReader = $resourceService->GetResourceContent($libraryLayerId);
    $layerContent = $contentReader->ToString();

    //set the feature source this layer references -- must be in the session
    //the feature source need not exist before calling this function
    $libraryLayer = new MgLayer($libraryLayerId, $resourceService);
    $libraryFeatureSourceId = new MgResourceIdentifier($libraryLayer->GetFeatureSourceId());
    $destinationFeatureSourceId = ToggleRepository($libraryFeatureSourceId);


    //replace the featuresourceid and write xml to the session copy
    $layerContent = str_replace($libraryFeatureSourceId->ToString(),
                                $destinationFeatureSourceId->ToString(),
                                $layerContent);
    $byteSource = new MgByteSource($layerContent, strlen($layerContent));
    $resourceService->SetResource($destinationLayerId, $byteSource->GetReader(), null);

    //instantiate the new layer from its MgResourceIdentifier
    $layer = new MgLayer($destinationLayerId, $resourceService);

	//add the edit layer to the session map and set it to redraw but not be visible in the legend
	$layerCollection=$map->GetLayers();
	$originalLayer = FindLayer($layerCollection,$libraryLayer->GetLayerDefinition()->ToString());
    $nPosition = $layerCollection->IndexOf($originalLayer);
    $layerCollection->Insert($nPosition,$layer);
	$layer->SetDisplayInLegend(false);
	$layer->SetSelectable(true);
    $layer->ForceRefresh();

	//OR
	//remove the library layer from the session map and replace it with the
    //session copy
    //ReplaceLayer($map, $libraryLayer, $layer);

    //save the session map
    try{
	    $map->Save($resourceService);
    }
     catch (MgException $e)
    {
        echo "ERROR: " . $e->GetMessage() . "n";
        echo $e->GetDetails() . "n";
        echo $e->GetStackTrace() . "n";
    }


    return $layer;
}

//------------------------------------------------------------------------------
//duplicate a layer from the session in the repository and make it point to a
//repository feature source. This makes a layer change persist across sessions.
function CopyLayerFromSession($map, $resourceService, $sessionLayerId) {
    $destinationLayerId = ToggleRepository($sessionLayerId);

    //copy content from session layer
    $contentReader = $resourceService->GetResourceContent($sessionLayerId);
    $layerContent = $contentReader->ToString();
    $byteSource = new MgByteSource($layerContent, strlen($layerContent));
    $resourceService->SetResource($destinationLayerId, $byteSource->GetReader(), null);

    //instantiate the new layer from its MgResourceIdentifier
    $layer = new MgLayer($destinationLayerId, $resourceService);

    //set the feature source this layer references -- must be in the session
    $sessionLayer = new MgLayer($sessionLayerId, $resourceService);
    $destinationFeatureSourceId = ToggleRepository($sessionLayer->GetFeatureSourceId());
    $layer->SetFeatureSourceId($destinationFeatureSourceId);

    $layer->ForceRefresh();

    //remove the session layer from the session map and replace it with the
    //library copy
    ReplaceLayer($map,  $sessionLayer, $layer);

    //save the session map
    $map->Save($resourceService);

    return $layer;
}

//------------------------------------------------------------------------------
//remove a session layer and point the session map file back to the repository's
//original layer. Useful for discarding edit changes.
function DiscardSessionLayer($map, $resourceService, $sessionLayerId) {
    $originalLayerId = ToggleRepository($sessionLayerId);

    //instantiate the original and session layers from their MgResourceIdentifier
    //and swap them
    $layer = new MgLayer($originalLayerId, $resourceService);
    $sessionLayer = new MgLayer($sessionLayerId, $resourceService);
    ReplaceLayer($map, $layer, $sessionLayer);

    $layer->ForceRefresh();

    //save the session map
    $map->Save($resourceService);

}

//------------------------------------------------------------------------------
//replace one layer with another in the session map
function ReplaceLayer($map, &$old, &$new) {
    $layerCollection=$map->GetLayers();
    $originalLayer = FindLayer($layerCollection, $old->GetLayerDefinition()->ToString());
    $nPosition = $layerCollection->IndexOf($originalLayer);
    $layerCollection->Remove($originalLayer);
    $layerCollection->Insert($nPosition,$new);

    return $nPosition;
}

//------------------------------------------------------------------------------
function GetMapSrs($map)
{
    $srs = $map->GetMapSRS();
    if($srs != "")
       return $srs;

    //SRS is currently optional. Waiting for this to change, set the default SRS to ArbitrayXY meters
    //
    return "LOCALCS[\"*XY-MT*\",LOCAL_DATUM[\"*X-Y*\",10000],UNIT[\"Meter\", 1],AXIS[\"X\",EAST],AXIS[\"Y\",NORTH]]";
}

//------------------------------------------------------------------------------
function BuildLayerDefinitionContent($dataSource, $featureName, $tip)
{
    $xmlLineTemplate = '<?xml version="1.0" encoding="UTF-8"?>
      <LayerDefinition version="1.0.0">
        <FeatureLayerDefinition>
          <Metadata />
          <LegendBitmap/>
          <ResourceId>%s</ResourceId>
          <FeatureClass>%s</FeatureClass>
          <Key/>
          <Geometry>%s</Geometry>
          <MapTip>%s</MapTip>
          <Filter></Filter>
          <FeatureScaleRange>
            <MinScale>0</MinScale>
            <MaxScale>1000000000000</MaxScale>
            <LineTypeStyle>
              <FeatureClassName>Line</FeatureClassName>
              <LineRule>
                <LineSymbolization>
                  <Stroke>
                    <LineStyle>Solid</LineStyle>
                    <Thickness>%s</Thickness>
                    <Color>%s</Color>
                    <Unit>Points</Unit>
                  </Stroke>
                </LineSymbolization>
                <LegendLabel/>
                <LegendBitmap/>
                <Filter/>
                <Label/>
              </LineRule>
            </LineTypeStyle>
          </FeatureScaleRange>
        </FeatureLayerDefinition>
      </LayerDefinition>
    ';

    $layerTempl = $xmlLineTemplate;
    $xmlStr = sprintf($layerTempl,
                      $dataSource,
                      $featureName,
                      "GEOM",
                      $tip,
                      1,
                      "ff0000");
    $src = new MgByteSource($xmlStr, strlen($xmlStr));
    return $src->GetReader();
}

//------------------------------------------------------------------------------
function DataSourceExists($resourceSrvc, $dataSourceId)
{
    try
    {
        $cnt = $resourceSrvc->GetResourceContent($dataSourceId);
        return true;
    }
    catch(MgResourceNotFoundException $rnfe)
    {
        return false;
    }
}
//------------------------------------------------------------------------------
//create a new MgResourceIdentifier for the session from a Library MgResourceIdentifier
//or vice versa
function ToggleRepository($originalResourceId)
{
    $newResourceID = new MgResourceIdentifier('Library://');
    if ($originalResourceId->GetRepositoryType() == "Library") {
        $newResourceID->SetRepositoryType("Session");
        //$newResourceID->SetRepositoryName($_GET['session']);
        $newResourceID->SetRepositoryName($GLOBALS['sessionID']);
    } else {
        $newResourceID->SetRepositoryType("Library");
    }
    $newResourceID->SetPath($originalResourceId->GetPath());
    $newResourceID->SetName($originalResourceId->GetName());
    $newResourceID->SetResourceType($originalResourceId->GetResourceType());

    //TODO: trap errors
    $newResourceID->Validate();
    return $newResourceID;
}

//------------------------------------------------------------------------------
function FindLayer($layers, $layerDef)
{
    $layer = null;
    for($i = 0; $i < $layers->GetCount(); $i++)
    {
        $layer1 = $layers->GetItem($i);
        if($layer1->GetLayerDefinition()->ToString() == $layerDef)
        {
            $layer = $layer1;
            break;
        }
    }
    return $layer;
}
//------------------------------------------------------------------------------
//get the attributes that correspond to a layer definition
//returns associative array of attributes.
function GetFeatureSourceAttributes($map, $layerResourceId, $featureService) {
    $aAttributes = array();
    $layerDef = $layerResourceId->ToString();
    $layers = $map->GetLayers();
    $layer = FindLayer($layers, $layerDef);
    if ($layer == NULL) {
        return $aAttributes;
    }
    $dataSourceId = new MgResourceIdentifier($layer->GetFeatureSourceId());
    $agf = new MgAgfReaderWriter();

    //get class definition from the featureSource
    $class = $layer->GetFeatureClassName();
    $schema = $featureService->GetSchemas($dataSourceId)->GetItem(0);
    $classDefinition = $featureService->GetClassDefinition($dataSourceId, $schema, $class);
    //MgPropertyDefinition classProps
    $classProps = $classDefinition->GetProperties();
    $featureGeometryName = $layer->GetFeatureGeometryName();
    $drawProps = new MgPropertyCollection();
    for ($i=0; $i< $classProps->GetCount(); $i++)
    {
        $prop = $classProps->GetItem($i);
        if ($prop->GetPropertyType() == MgFeaturePropertyType::GeometricProperty)
        {
            //get the type of class to determine geometry
            //TODO: use bitwise comparison?
            $featureClass = $prop->GetGeometryTypes();
            if ($featureClass == MgFeatureGeometricType::Surface) {
                $aAttributes[$i] = 'surface';
            } elseif ($featureClass == MgFeatureGeometricType::Curve) {
                $aAttributes[$i] = 'curve';
            } elseif ($featureClass == MgFeatureGeometricType::Point) {
                $aAttributes[$i] = 'point';
            }

        } elseif ($prop->GetPropertyType() == MgFeaturePropertyType::DataProperty) {
            //therefore this is an MgDataPropertyDefinition subclassed object
            $aAttributes[$i] = array('name' => substr($prop->GetQualifiedName(),
                                               stripos($prop->GetQualifiedName(),'.') + 1),
                                     'description' => $prop->GetDescription(),
                                     'datatype' => $prop->GetDataType(),
                                     'readonly' => $prop->GetReadOnly(),
                                     'length' => $prop->GetLength(),
                                     'default' => $prop->GetDefaultValue(),
                                     'precision' => $prop->GetPrecision(),
                                     'scale' => $prop->GetScale(),
                                     'nullable' => $prop->GetNullable()
                                    );
        } else {
            echo 'Found Other Property:';
            echo $prop->GetQualifiedName();
            echo '<BR>';
        }
    }

    return $aAttributes;
}
//------------------------------------------------------------------------------
function add_layer_resource_to_map($layerResourceID,
     $resourceService,
     $layerDef,
     $layerLegendLabel,
     &$map)
     //Addsalayerdefition(whichcanbestoredeitherinthe
         //Libraryorasessionrepository)tothemap.
         //Returnsthelayer.
{
    $newLayer = new MgLayer($layerResourceID, $resourceService);
    //Add the new layer to the map's layer collection
    $newLayer->SetName($layerLegendLabel);
    $newLayer->SetVisible(true);
    $newLayer->SetLegendLabel($layerLegendLabel);
    $newLayer->SetDisplayInLegend(true);
    $layerCollection=$map->GetLayers();
    if(!FindLayer($layerCollection,$layerDef))
    {
        //Insertthenewlayeratposition0soitisat
        //thetopofthedrawingorder
        $layerCollection->Insert(0,$newLayer);
    }
    return $newLayer;
}

function CreateDataPropertyForType($property) {
    switch ($property->GetDataType())
    {
       case MgPropertyType::Null :
         return null;
         break;
       case MgPropertyType::Boolean :
         return new MgBooleanProperty($property->GetName(), false);
         break;
       case MgPropertyType::Byte :
         return new MgByteProperty($property->GetName(), 0);
         break;
       case MgPropertyType::DateTime :
         return new MgDateTimeProperty($property->GetName(), new MgDateTime());
         break;
       case MgPropertyType::Single :
         return new MgSingleProperty($property->GetName(), 0);
         break;
       case MgPropertyType::Double :
         return new MgDoubleProperty($property->GetName(), 0);
         break;
       case MgPropertyType::Int16 :
         return new MgInt16Property($property->GetName(), 0);
         break;
       case MgPropertyType::Int32 :
         return new MgInt32Property($property->GetName(), 0);
         break;
       case MgPropertyType::Int64 :
         return new MgInt64Property($property->GetName(), 0);
         break;
       case MgPropertyType::String :
         return new MgStringProperty($property->GetName(), '');
         break;
       case MgPropertyType::Blob :
         $byteSource = new MgByteSource("",0);
         return new MgBlobProperty($property->GetName(), $byteSource->GetReader());
         break;
       case MgPropertyType::Clob :
         $byteSource = new MgByteSource("",0);
         return new MgClobProperty($property->GetName(), $byteSource->GetReader());
         break;

       default :
         return null;
    }
}

function BatchPropertyCollectionFromFeatureReader($reader) {
    $batch = new MgBatchPropertyCollection();
    while($reader->ReadNext()) {
        $batch->Add(PropertyCollectionFromFeatureReader($reader));
    }
    return $batch;
}

function PropertyCollectionFromFeatureReader($reader) {
    $propCollection = new MgPropertyCollection();
    $propCount = $reader->GetPropertyCount();
    for($j=0; $j<$propCount; $j++) {
        $property = CreatePropertyFromFeatureReader($reader, $j);
        if ($property != null) {
            //add to collection
            $propCollection->Add($property);
        }
    }
    return $propCollection;
}

function CreatePropertyFromFeatureReader($reader, $idx) {
    $name = $reader->GetPropertyName($idx);
    $boolVal = $reader->IsNull($name);
    if ($boolVal) {
        return null;
    }
    switch ($reader->GetPropertyType($name))
    {
       case MgPropertyType::Null :
         return null;
         break;
       case MgPropertyType::Boolean :
         return new MgBooleanProperty($name, $reader->GetBoolean($name));
         break;
       case MgPropertyType::Byte :
         return new MgByteProperty($name, $reader->GetByte($name));
         break;
       case MgPropertyType::DateTime :
         return new MgDateTimeProperty($name, $reader->GetDateTime($name));
         break;
       case MgPropertyType::Single :
         return new MgSingleProperty($name, $reader->GetSingle($name));
         break;
       case MgPropertyType::Double :
         return new MgDoubleProperty($name, $reader->GetDouble($name));
         break;
       case MgPropertyType::Int16 :
         return new MgInt16Property($name, $reader->GetInt16($name));
         break;
       case MgPropertyType::Int32 :
         return new MgInt32Property($name, $reader->GetInt32($name));
         break;
       case MgPropertyType::Int64 :
         return new MgInt64Property($name, $reader->GetInt64($name));
         break;
       case MgPropertyType::String :
         return new MgStringProperty($name, $reader->GetString($name));
         break;
       case MgPropertyType::Blob :
         return new MgBlobProperty($name, $reader->GetBLOB($name));
         break;
       case MgPropertyType::Clob :
         return new MgClobProperty($name, $reader->GetCLOB($name));
         break;
       case MgPropertyType::Geometry:
         return new MgGeometryProperty($name, $reader->GetGeometry($name));
         break;
       case MgPropertyType::Raster:
         return new MgRasterProperty($name, $reader->GetRaster($name));
         break;
       default :
         return null;
    }
}

function GetPropertyValueFromFeatReader($featureReader, $propertyName) 
{
    $val = "";
    $propertyType = $featureReader->GetPropertyType($propertyName);
    switch ($propertyType) 
    {
       case MgPropertyType::Null :
         //fwrite($logFileHandle, "$propertyName is a null propertyn");
         $val= "";
         break;
       case MgPropertyType::Boolean :
         $val = $featureReader->GetBoolean($propertyName);
         //$valStr = printBoolean($val);
         break;
       case MgPropertyType::Byte :
         $val = $featureReader->GetByte($propertyName);
         break;
       case MgPropertyType::DateTime :
         $val = $featureReader->GetDateTime($propertyName);
         //$valStr = printDateTime($val);
         break;
       case MgPropertyType::Single :
         $val = $featureReader->GetSingle($propertyName);
         break;
       case MgPropertyType::Double :
         $val = $featureReader->GetDouble($propertyName);
         break;
       case MgPropertyType::Int16 :
         $val = $featureReader->GetInt16($propertyName);
         break;
       case MgPropertyType::Int32 :
         $val = $featureReader->GetInt32($propertyName);
         break;
       case MgPropertyType::Int64 :
         $val = $featureReader->GetInt64($propertyName);
         break;
       case MgPropertyType::String :
         $val = $featureReader->GetString($propertyName);
         break;
       case MgPropertyType::Blob :
         //fwrite($logFileHandle, "$propertyName is blobn");
         break;
       case MgPropertyType::Clob :
         //fwrite($logFileHandle, "$propertyName is clobn");
              break;
       case MgPropertyType::Feature :
         /*
              $val = $featureReader->GetFeatureObject($propertyName);
             if ($val != NULL) {
                  fwrite($logFileHandle, "$propertyName is a featuren");
                  printFeatureReader($val);
             }
         */
         break;
       case MgPropertyType::Geometry :  
         /*
              fwrite($logFileHandle, "$propertyName is a geometryn");
              $val = $featureReader->GetGeometry($propertyName);
              if ($val != NULL) {
                 $aGeometry = $agfReaderWriter->Read($val);
                 //$aGeometry->Envelope();
                 $wktRepresentation = $wktReaderWriter->Write($aGeometry);
                 fwrite($logFileHandle, "WKT Representation: "$wktRepresentation"n");
              } else {
                 fwrite($logFileHandle, "This geometry property is nulln");
              }
         */
         break;
       case MgPropertyType::Raster :
         /*
              $val = $featureReader->GetRaster($propertyName);
             fwrite($logFileHandle, "$propertyName is a rastern");
         */
         break;
       default : 
         $val = "";
    }
    
    return $val;
 }

?>