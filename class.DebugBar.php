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
        echo '<script type="text/javascript" src="'.__DIR__.'/DebugBar.js"></script>';
        echo '<script type="text/javascript">init(' . self::$totalTime . ','. self::$mem .', {get:'.json_encode($_GET).',length:'.count($_GET).'}, {post:'.json_encode($_POST).', length:'.count($_POST).'} , {session:'.json_encode($_SESSION).', length:'.count($_SESSION).' }, {stack:'.json_encode(self::$stack).', length:'.count(self::$stack).'}, '.json_encode(self::$options).' )</script>';
    }

}

?>