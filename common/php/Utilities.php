<?php
function xml2json($domElement) {
    $result = '';
    if ($domElement->nodeType == XML_COMMENT_NODE) {
        return '';
    }
    if ($domElement->nodeType == XML_TEXT_NODE) {
        /* text node, just return content */
        $text = trim($domElement->textContent);
        if ($text != '') {
            $result = '"'.$text.'"';
        } else {
            $text = '""';
        }
    } else {
        /* some other kind of node, needs to be processed */
        
        $aChildren = array();
        $aValues = array();
        
        /* attributes are considered child nodes with a special key name
           starting with @ */
        if ($domElement->hasAttributes()) {
            foreach($domElement->attributes as $key => $attr) {
                $len = array_push($aValues, array('"'.$attr->value.'"'));
                $aChildren['@'.$key] = $len-1;
            }
        }
        
        if ($domElement->hasChildNodes()) {
            //has children
            foreach($domElement->childNodes as $child) {
                if ($child->nodeType == XML_COMMENT_NODE) {
                    continue;
                }
                if ($child->nodeType == XML_TEXT_NODE) {
                    $text = trim($child->textContent);
                    if ($text == '') {
                        continue;
                    }
                    array_push($aValues, array('"'.$text.'"'));
                } else {
                    $childTag = $child->tagName;
                    $json = xml2json($child);
                    if ($json == '') {
                        continue;
                    }
                    if (array_key_exists($childTag, $aChildren)) {
                        array_push($aValues[$aChildren[$childTag]], $json);
                    } else {
                        $len = array_push($aValues, array($json));
                        $aChildren[$childTag] = $len - 1;
                    }
                }
            }
        }
        
        $nChildren = count($aChildren);
        $nValues = count($aValues);
        
        if ($nChildren == 0 && $nValues == 0) {
            return '';
        }
        
        if ($nValues == 1 && $nChildren == 0) {
            $result .= $aValues[0][0];
        } else {
            $bIsObject = true;
            if ($nChildren != $nValues) {
                $bIsObject = false;
            }
            $result .= $bIsObject ? '{' : '[';
        
            $sep = '';
            $aChildren = array_flip($aChildren);
            for ($i=0; $i<$nValues; $i++) {
                $aValue = $aValues[$i];
                $result .= $sep;
            
                if (isset($aChildren[$i])) {
                    if (!$bIsObject) {
                        $result .= '{';
                    }
                    $result .= '"'.$aChildren[$i].'":';
                }
                //if (count($aValue) > 1) {
                    $result .= '[';
                    $result .= implode(',', $aValue);
                    $result .= ']';
                //} else {
                //    $result .= $aValue[0];
                //}
                if (isset($aChildren[$i]) && !$bIsObject) {
                    $result .= '}';
                }
                $sep = ',';
            }
            $result .= $bIsObject ? '}' : ']';
        }
        
    }
    return $result;
}

/**
 * this function determines if a path represents an absolute path and returns
 * true if it is, and false if it is not
 * @param szPath string the path to test
 * @result boolean true if the path is absolute, false otherwise
 */
function isAbsolutePath( $szPath ) {
    if ($szPath == "") { return false; }
    if ($szPath[0] == "/" || preg_match('/^(\w:)/', $szPath)) {
        return true;
    } else {
        return false;
    }
}


/**
 * This function translate $szDestPath (relative or absolute)
 * to a absolute path based on $szOrigPath.
 *
 * @param $szDestPath string Destination path to translate
 * @param $szOrigPath string Reference path
 */
function resolvePath2 ($szDestPath, $szOrigPath) {
    // If one or other path is missing or absolute, return it.
    if ($szDestPath == "") { return $szOrigPath; }
    if ($szOrigPath == "") { return $szDestPath; }
    if ($szDestPath[0] == "/" || preg_match('/^(\w:)/', $szDestPath)) {
        //echo "absolute: $szDestPath<BR>";
        return $szDestPath;
    }

    // If windows prefix (eg: c:) get it
    $szPrefix = "";
    if ($szOrigPath[0] != "/") {
        if (preg_match('/^(\w:)(.*)/i', $szOrigPath, $aMatch)) {
            $szPrefix = $aMatch[1];
            $szOrigPath = $aMatch[2];
        } else {
            $szOrigPath = "/".$szOrigPath;
        }
    }

    // Make sure path finishing with "/"
    if ($szOrigPath[strlen($szOrigPath)-1] != "/" &&
        !is_dir($szOrigPath)) {
        $szOrigPath = dirname($szOrigPath)."/";
    }
    if ($szOrigPath[strlen($szOrigPath)-1] != "/") {
        $szOrigPath = $szOrigPath."/";
    }
    $szPath = $szOrigPath.$szDestPath;

    // Remove repetitive "/"
    $szPath = ereg_replace ("/+", "/", $szPath);

    $szPath = iterate_ereg_replace ("/\./", "/", $szPath);
    $szPath = iterate_ereg_replace ("/[^(/|\.)]+/\.\./", "/", $szPath);

    //Rest of the function
    return $szPrefix.$szPath;
}

/**
 * Recursive ereg_replace
 *
 * @param $szPattern string Regular expression to process
 * @param $szReplacement string Value to replace all matching result with
 * @param $szString string Haystack to process on
 *
 * @return string szString with the matching result replaced.
 */
function iterate_ereg_replace ( $szPattern, $szReplacement, $szString) {
    $szResult = $szString;
    do {
        $szString = $szResult;
        $szResult = ereg_replace ($szPattern, $szReplacement, $szString);
    } while ($szResult != $szString);

    return $szResult;
}
?>