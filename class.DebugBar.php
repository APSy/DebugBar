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
    private static $watched = array();
    private static $path = "";

    /**
     * @param $path path to the DebugBar Folder
     */
    public static function start ($path) {
        if(is_string($path) && !empty($path)) {
            self::$path = $path;
        }
        else {
            die("No path specified, i need the path to the DebugBar folder in order to work");
        }
        self::$timeStart = microtime(true);
        self::$stack = debug_backtrace();
    }

    /**
     * @param array $options can be set by user these are just standard values
     * Call this function to stop measuring time
     */
    public static function stop ($options = array('#121212', '12', 'false')) {
        self::$options = $options;
        self::$timeEnd = microtime(true);
        self::$totalTime = number_format((self::$timeEnd - self::$timeStart), 2);
        self::$mem = round(($mem_usage=memory_get_usage(true))/1048576,2);
        self::printJS();
    }

    /**
     * This function will print all the JS needed to show the debugbar and its values
     */
    private static function printJS () {
        echo '<script type="text/javascript" src="DebugBar.js"></script>';
        // create JSON String out of watched variables
        $JSONString = self::toJSONString(self::$watched);
        echo '<script type="text/javascript">init(' . self::$totalTime . ','. self::$mem .', {get:'.json_encode($_GET).',length:'.count($_GET).'}, {post:'.json_encode($_POST).', length:'.count($_POST).'} , {session:'.json_encode($_SESSION).', length:'.count($_SESSION).' }, \''.$JSONString.'\' , '.json_encode(self::$options).', "'.self::$path.'" )</script>';
    }

    private static function toJSONString ($arr) {
//        die(json_encode($arr));
        return json_encode($arr);
    }

    public static function watch ($variable, $key) {
        if(is_array($variable)) {
            $tmp = array($key => $variable);
            array_push(self::$watched, $tmp);
        }
        else {
            $text = array($key => $variable);
            array_push(self::$watched, $text);
        }
    }
}

?>