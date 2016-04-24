<?php
	require_once (".include/classHeader.php");
    require_once (".include/init.php");

    function removeBOM($str = '')
    {
        if (substr($str, 0,3) == pack("CCC",0xef,0xbb,0xbf))
        {
            $str = substr($str, 3);
        }
        return $str;
    }

    function isUTF8($string)
    {
        return (utf8_encode(utf8_decode($string)) == $string);
    }
    
    function showJSONList($strFolderPath)
    {
        $dirHandler = dir($strFolderPath);

        $jsonManifest = "{";
        while(false !== ($entry = $dirHandler->read()))
        {
            if('.' == $entry || '..' == $entry)
            {
                continue;
            }

            if(FALSE == is_dir($dirHandler->path."/".$entry))
            {
                continue;
            }

            if(TRUE == file_exists($dirHandler->path."/".$entry."/manifest.json"))
            {    
                $jsonManifest = $jsonManifest."\"". $entry ."\":";
                //echo $dirHandler->path."/".$entry."/manifest.json"."\n";
                
                $jsonSubManifest = file_get_contents($dirHandler->path."/".$entry."/manifest.json");
                $jsonSubManifest = removeBOM($jsonSubManifest);

                $jsonManifest = $jsonManifest. $jsonSubManifest. ",";
                //$jsonManifest = preg_replace("/([a-zA-Z0-9_]+?):/" , "\"$1\":", $jsonManifest); // fix variable names 
            }
        }
        $jsonManifest = substr($jsonManifest, 0, -1);
        $jsonManifest = $jsonManifest . "}";
        $dirHandler->close();

        //$data = json_decode($jsonManifest, TRUE);
        //echo "data error: ".json_last_error() . "<br>";
        //print_r($data);
        
        return $jsonManifest;
    }

    // Clear the output
    if(ob_get_length()) ob_clean();

    // Headers are sent to prevent browsers from caching
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); 
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . 'GMT'); 
    header('Cache-Control: no-cache, must-revalidate');
    header('Pragma: no-cache');
    if (true == $GLOBALS["require_Access_Control_Allow_all"])
    {
        header("Access-Control-Allow-Origin: *");
    }
    //header('Content-Type: text/xml');    

    //echo showJSONList("../../Ge-apps/");
    echo showJSONList("/volume1/web/Ge-apps");
?>