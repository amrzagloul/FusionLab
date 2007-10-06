<?php

//
//  Copyright (C) 2004-2007 by Autodesk, Inc.
//
//  This library is free software; you can redistribute it and/or
//  modify it under the terms of version 2.1 of the GNU Lesser
//  General Public License as published by the Free Software Foundation.
//
//  This library is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  Lesser General Public License for more details.
//
//  You should have received a copy of the GNU Lesser General Public
//  License along with this library; if not, write to the Free Software
//  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
//

    // Start output buffering
    ob_start();

    $fusionMGpath = '../../MapGuide/php/';
    include $fusionMGpath . 'Common.php';

    //$logHandle = fopen("debug.log","at");

    class SearchError extends Exception
    {
        public function __construct($message, $title) {
            parent::__construct($message, 0);
            $this->title = $title;
        }
        public $title;
    }

    $locale = "";
    $userInput = "";
    $target = "";
    $popup = 0;
    $layerName = "";
    $mapName = "";
    $sessionId = "";
    $filter = "";
    $resNames = array();
    $resProps = array();
    $matchLimit = "";

    GetRequestParameters();
    SetLocalizedFilesPath(GetLocalizationPath());
    $searchError = GetLocalizedString("SEARCHERROR", $locale);

    try
    {
        $featureSrvc = $siteConnection->CreateService(MgServiceType::FeatureService);

        //Create a temporary map runtime object, locate the layer
        $map = new MgMap();
        $map->Open($resourceService, $mapName);
        $layers = $map->GetLayers();
        $layer = null;
        //fwrite($logHandle,"found layers:".$layers->GetCount()."\n");
        for($i = 0; $i < $layers->GetCount(); $i++)
        {
            $layer = $layers->GetItem($i);
            //fwrite($logHandle,"found layer:".$layer->GetName()."\n");
            if($layer->GetName() == $layerName)
                break;
        }

        if($layer == null)
        {
            trigger_error(FormatMessage("SEARCHLAYERNOTFOUND", $locale, $locale, array($layerName)));
        }

        //unescape strings
        //
        if(ini_get("magic_quotes_sybase") == "1")
        {
            $matchLabel = str_replace("''", "'", $matchLabel);
            $filter = str_replace("''", "'", $filter);
        }
        else if(get_magic_quotes_gpc() == "1")
        {
            //Unescape single quotes
            $filter = str_replace("\\'", "'", $filter);
            //Unescape double quotes
            $filter = str_replace('\\"', '"', $filter);

            //remove additional backslash
            $filter = str_replace("\\", "", $filter);
        }

        //fwrite($logHandle,"filter before:".$filter."\n");

        //substitute the input tag with the actual user input to make up the filter
        $filter = str_replace('$USER_VARIABLE', $userInput, $filter);
        //fwrite($logHandle,"filter after:".$filter."\n");

        //parse the match label string, which defines what columns to be displayed
        $displayAll = (count($resProps) == 0);

        //query the features
        $opts = new MgFeatureQueryOptions();
        $opts->SetFilter($filter);
        $featureClassName = $layer->GetFeatureClassName();
        $srcId = new MgResourceIdentifier($layer->GetFeatureSourceId());
        $features = $featureSrvc->SelectFeatures($srcId, $featureClassName, $opts);
        $hasResult = $features->ReadNext();

        if($hasResult)
        {
          //fwrite($logHandle,"has result\n");
            $colCount = $displayAll? $features->GetPropertyCount(): count($resProps);

            //output the beginning of the document (head section and beginning of body section)
            $templ = file_get_contents("./Search.templ");
            $templ = Localize($templ, $locale, GetClientOS());
            print sprintf($templ, $colCount, $target, $popup, $mapName);

            $classDef = $features->GetClassDefinition();
            $idProps = $classDef->GetIdentityProperties();
            $multiIds = $idProps->GetCount() > 1;
            $idPropNames = array();
            $idPropTypes = array();
            for($j = 0, $count = count($idProps); $j < $count; $j++)
            {
                $idProp = $idProps->GetItem($j);
                if($multiIds)
                    array_push($idPropNames, $idProp->GetName());
                else
                    $idPropName = $idProp->GetName();
            }

            //table headings
            echo "<tr class=\"SearchHeading\">";
            if($displayAll)
            {
                for($i = 0; $i < $colCount; $i++)
                {
                    $resProps[$i] = $features->GetPropertyName($i);
                    echo "<td class=\"SearchHeading\">&nbsp;" . $resProps[$i] . "</td>";
                }
            }
            else
            {
                for($i = 0; $i < $colCount; $i++)
                    echo "<td class=\"SearchHeading\">&nbsp;" . $resNames[$i] . "</td>";
            }
            echo "</tr>";

            //output the results
            $row = 0;
            do
            {
                echo "<tr>";
                for($i = 0; $i < $colCount; $i++)
                {
                    $propName = $resProps[$i];
                    $propType = $features->GetPropertyType($resProps[$i]);
                    $val = "";
                    switch($propType)
                    {
                        case MgPropertyType::Boolean:
                            $val = $features->GetBoolean($propName)? "true": "false";
                            break;
                        case MgPropertyType::Single:
                            $val = $features->GetSingle($propName);
                            break;
                        case MgPropertyType::Double:
                            $val = $features->GetDouble($propName);
                            break;
                        case MgPropertyType::Int16:
                            $val = $features->GetInt16($propName);
                            break;
                        case MgPropertyType::Int32:
                            $val = $features->GetInt32($propName);
                            break;
                        case MgPropertyType::Int64:
                            $val = $features->GetInt64($propName);
                            break;
                        case MgPropertyType::String:
                            $val = $features->GetString($propName);
                            break;
                    }

                    // Generate XML to selection this feature
                    //
                    $sel = new MgSelection($map);
                    if($multiIds)
                        throw new SearchError(GetLocalizedString("SEARCHNOMULTIPROP", $locale), $searchError);
                    else
                    {
                        if($i == 0)
                            $idPropType = $features->GetPropertyType($idPropName);
                        switch($idPropType)
                        {
                            case MgPropertyType::Int32:
                                $sel->AddFeatureIdInt32($layer, $featureClassName, $features->GetInt32($idPropName));
                                break;
                            case MgPropertyType::String:
                                $sel->AddFeatureIdString($layer, $featureClassName, $features->GetString($idPropName));
                                break;
                            default:
                                throw new SearchError(FormatMessage("SEARCHTYYPENOTSUP", $locale, array($idPropType)), $searchError);
                        }
                    }
                    $selText = EscapeForHtml($sel->ToXml(), true);

                    echo sprintf("<td class=\"%s\" id=\"%d:%d\" onmousemove=\"SelectRow(%d)\" onclick=\"CellClicked('%s')\">&nbsp;%s</td>\n", !($row%2)? "Search" : "Search2", $row, $i, $row, $selText, $val);
                }
                echo "</tr>";
                if (++ $row == $matchLimit)
                    break;
            } while($features->ReadNext());
        }
        else
        {
            throw new SearchError(GetLocalizedString("SEARCHNOMATCHES", $locale), GetLocalizedString("SEARCHREPORT", $locale));
        }
    }
    catch(MgException $ae)
    {
        OnError($searchError, $ae->GetDetails());
    }
    catch(SearchError $e)
    {
        OnError($e->title, $e->getMessage());
    }


    //terminate the html document
    echo "</table></body></html>";

    // Set content length header
    header("Content-Length:".ob_get_length());

    // Flush output buffer
    ob_end_flush();

function OnError($title, $msg)
{
    global $target, $popup;
    $templ = file_get_contents("./ErrorPage.templ");
    print sprintf($templ, $popup, $title, $msg);
}

function GetParameters($params)
{
    global $userInput, $target, $layerName, $popup, $locale;
    global $mapName, $sessionId, $filter, $resNames, $resProps, $matchLimit;

    if(isset($params['locale']))
        $locale = $params['locale'];
    $userInput = $params['userinput'];
    $target = $params['target'];
    $popup = $params['popup'];
    $layerName = $params['layer'];
    $mapName = $params['mapname'];
    $sessionId = $params['session'];
    $filter = $params['filter'];
    $matchLimit = $params['limit'];
    $colCount = $params['cols'];
    if($colCount > 0)
    {
        for($i = 0; $i < $colCount; $i++)
        {
            array_push($resNames, $params['CN' . $i]);
            array_push($resProps, $params['CP' . $i]);
        }
    }
}

function GetRequestParameters()
{
    if($_SERVER['REQUEST_METHOD'] == "POST")
        GetParameters($_POST);
    else
        GetParameters($_GET);
}

?>