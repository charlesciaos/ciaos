<?php

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
        while($entry = $dirHandler->read())
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

    echo showJSONList(".");
?>