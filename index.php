<?php

/**
 * Created by PhpStorm.
 * User: APSy
 * Date: 02/06/14
 * Time: 07:50
 */
// Include the needed File and set Namespace
require_once 'class.DebugBar.php';
use \Debug\DebugBar;
// Call the start function
// TODO: fix path problem maybe with you need to provide path to the DebugBar class
DebugBar::start(__DIR__);
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<?php
// Do your stuff
$_GET['blalal'] = 'test';
$_GET['awd'] = 'get';
$_POST['blalal'] = 'post';
$sql = "SELECT * FROM bla";
$sql2 = "SELECT * FROM 2";

$sql3 = "SELECT * FROM 3";
$sql4 = array(array("test" => array("bla", "blubl")));

DebugBar::watch($sql, "SQL Statement");
DebugBar::watch($sql2, "SQL Statement");
DebugBar::watch($sql3, "SQL Statement");
DebugBar::watch($sql4, "SQL Statement as array");
DebugBar::watch($sql4, "SQL Statement as array");


$_GET['blalal'] = 'test';
$_GET['awd'] = 'get';
$_POST['blalal'] = 'post';

for($i = 0; $i <10000000; $i++) {
    $bla = $i;
}
?>

</body>
</html>
<?php
// Call the stop function if you want to stop the time
// Here you can provide some CSS values and a future feature which lets you set the debugbar to auto-hide
// Parameters:  Color -> hex value
//              Fontsize -> 10-20
//              Autohide -> true/false
DebugBar::stop(array('#131313', '12', 'true'));
?>