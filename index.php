<?php

/**
 * Created by PhpStorm.
 * User: APSy
 * Date: 02/06/14
 * Time: 07:50
 */

require_once 'class.DebugBar.php';
session_start();
use \Debug\DebugBar;
DebugBar::start();
?>

<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>




<?php

//set_error_handler('showSite404');
//datefmt_set_timezone('Europe/Zurich');
//spl_autoload_register('','');

//require_once 'test.php';
/*function showSite404() {

}*/


//$bla = new test();
//$auto = new Auto();

$_GET['blalal'] = 'test';
$_GET['awd'] = 'get';
$_POST['blalal'] = 'post';



$_GET['blalal'] = 'test';
$_GET['awd'] = 'get';
$_POST['blalal'] = 'post';



for($i = 0; $i <10000000; $i++) {
    $bla = 0;
}





?>

</body>
</html>

<?php
DebugBar::stop(array('#131313', '12', 'true'));
?>