<?php

    //?X?X?X?X?X?X?X?X?V
    // author: Louai Munajim
    // website: http://www.elouai.com
    //
    // Note:
    // Unix timestamp limitations 
    // Date range is from 
    // the year 1970 to 2038
    //?X?X?X?X?X?X?X?X?V
    function countdown($year, $month, $day, $hour, $minute)
    {
        // make a unix timestamp for the given date
        $the_countdown_date = mktime($hour, $minute, 0, $month, $day, $year, -1);

        // get current unix timestamp
        $today = time();

        $difference = $the_countdown_date - $today;
        if ($difference < 0) $difference = 0;

        $days_left = floor($difference/60/60/24);
        $hours_left = floor(($difference - $days_left*60*60*24)/60/60);
        $minutes_left = floor(($difference - $days_left*60*60*24 - $hours_left*60*60)/60);
        // OUTPUT
        echo "今天是: ".date("F j, Y, g:i a")."<br/>";
        echo "預訂日: ".date("F j, Y, g:i a", $the_countdown_date)."<br/>";
        echo "還有剩: ".$days_left." 天 ".$hours_left." 時 ".$minutes_left." 分 ";
    }

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf8" />
<title>Charles' Server</title>
</head>
<body>
<noscript>
   Your browser does not support JavaScript!!
</noscript>

<div id="divCountdown">
<?php countdown(2015, 8, 10, 0, 0); ?>
</div>

</body>
</html>