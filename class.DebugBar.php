<?php
/**
 * Created by PhpStorm.
 * User: APSy
 * Date: 02/06/14
 * Time: 07:24
 */

namespace Debug;

/**
 * Class DebugBar
 * @package Debug
 */
class DebugBar {
    private static $mem = 0;
    private static $timeStart = 0;
    private static $timeEnd = 0;
    private static $totalTime = 0;
    private static $stack = array();
    private static $options = array();

    public static function start () {
        self::$timeStart = microtime(true);
        self::$stack = debug_backtrace();
    }

    public static function stop ($options = array('#121212', '12', 'false')) {
        self::$options = $options;
        self::$timeEnd = microtime(true);
        self::$totalTime = number_format((self::$timeEnd - self::$timeStart), 2);
        self::$mem = round(($mem_usage=memory_get_usage(true))/1048576,2);
        self::printJS(null);
    }

//    private static function getNamespace () {
//        echo '<pre>Debug: ';
//        echo print_r(self::$stack, true);
//        echo '</pre>';
//    }

    private static function printJS ($params) {
        echo '<script type="text/javascript" src="DebugBar.js"></script>';
        echo '<script type="text/javascript">init(' . self::$totalTime . ','. self::$mem .', {get:'.json_encode($_GET).',length:'.count($_GET).'}, {post:'.json_encode($_POST).', length:'.count($_POST).'} , {session:'.json_encode($_SESSION).', length:'.count($_SESSION).' }, {stack:'.json_encode(self::$stack).', length:'.count(self::$stack).'}, '.json_encode(self::$options).' )</script>';
    }

    /*private static function printBar () {
        echo '<link rel="stylesheet" href="css/debugBar.css"/>';
        echo '<script type="text/javascript" src="js/javascript.js"></script>';
        echo '<div id="debugBar">';
        echo '<div id="debugBar_memory">';
        echo '<p>'.self::$mem.' MB</p>';
        echo '</div>';
        echo '<div id="debugBar_time">';
        echo '<p>', self::$totalTime, ' s</p>';
        echo '</div>';
        // Print all Arrays
        if(isset($_GET)) {
            echo '<span id="toggle_get">$_GET</span><div id="get" class="hidden">$_GET: ';
            echo (isset($_GET))? print_r($_GET, true): 'empty';
            echo '</div>';
        }
        if(isset($_POST)) {
            echo '<span id="toggle_post">$_POST</span><div id="post" class="hidden">$_POST: ';
            echo (isset($_POST)) ? print_r($_POST, true): 'empty';
            echo '</div>';
        }
        if(isset($_SESSION)) {
            echo '<span id="toggle_session">$_SESSION</span><div id="session" class="hidden">$_SESSION: ';
            echo (isset($_SESSION))? print_r($_SESSION, true): 'empty';
            echo '</div>';
        }
       //self::getNamespace();

        echo '</div>';
        echo "<script type='text/javascript'>loaded();</script>";
    }*/
}