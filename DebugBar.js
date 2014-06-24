/**
 * Created by APSy on 17/06/14.
 */


var DebugBar = function() {

    this.defaultConfig = {
        'color': '',
        'fontsize': '',
        'autohide': ''
    };

    this.phpValues = {
        'time': 0.0,
        'memory': 0.0
    };

    this.get = [];
    this.post = [];
    this.stack = [];
    this.session = [];


    // PHP ARRAY TO STRING JAVASCRIPT NICE
    /*this.arrayToString = function(arr) {
        var string = "";
        console.log(arr);
        for(var key in arr) {
            console.log(arr[key]);
            console.log(key);
            string += key;
        }
        return string;
    };
*/
    this.init = function(get, post, session, stack) {
        // create and add the Elements
        this.post = post;
        this.get = get;
        this.session = session;
        this.stack = stack;
        this.createEleAndAdd('div', 'debugBar');
        this.createEleAndAdd('div', 'debugBar_time', 'debugBar');
        this.createEleAndAdd('div', 'debugBar_memory', 'debugBar');
        var timeText = document.createTextNode(this.phpValues.time.toString()+ ' s');
        var memText = document.createTextNode(this.phpValues.memory.toString()+ ' MB');
        var tmp = document.getElementById('debugBar_time');
        tmp.appendChild(timeText);
        tmp = document.getElementById('debugBar_memory');
        tmp.appendChild(memText);

        this.addInfoBox();


        if (get.length != 0) {
            this.createEleAndAdd('div', 'debugBar_get', 'debugBar');
            this.createAndAttachTextNode('$_GET', 'debugBar_get');
            this.bindEvent('debugBar_get');
        }
        if (post.length != 0) {
            this.createEleAndAdd('div', 'debugBar_post', 'debugBar');
            this.createAndAttachTextNode('$_POST', 'debugBar_post');
            this.bindEvent('debugBar_post');
        }
        if (session.length != 0) {
            this.createEleAndAdd('div', 'debugBar_session', 'debugBar');
            this.createAndAttachTextNode('$_SESSION', 'debugBar_session');
            this.bindEvent('debugBar_session');
        }
        if (stack.length != 0) {
            this.createEleAndAdd('div', 'debugBar_stack', 'debugBar');
            this.createAndAttachTextNode('Backtrace', 'debugBar_stack');
            this.bindEvent('debugBar_stack');
        }

    };

    this.addInfoBox = function() {
        var id = 'infoBox';
        this.createEleAndAdd('div', id);
        var infoBox = document.getElementById(id);
    };

    this.createAndAttachTextNode = function(text, parentID) {
        var textNode = document.createTextNode(text);
        this.addToHTML(textNode, parentID);
    };

    this.bindEvent = function(id) {
        var get = this.get;
        var post = this.post;
        var session = this.session;
        var stack = this.stack;
        document.getElementById(id).onclick = function(event) {
            togglePopUp(event, get, post, session, stack );
        };
    };

    this.setTimeAndMemory = function(time, mem) {
        this.phpValues.time = time;
        this.phpValues.memory = mem;
    };

    this.addToHTML = function(ele, parentID) {
        if(parentID == undefined) {
            document.body.appendChild(ele);
        }
        else {
            var tmp = document.getElementById(parentID);
            tmp.appendChild(ele);
        }
    };

    this.createEleAndAdd = function(ele, id, parentEle) {
        var newEle = document.createElement(ele);
        newEle.setAttribute('id', id);
        this.addToHTML(newEle, parentEle);
    };

    this.setOptions = function(options) {
        this.defaultConfig.color = options[0];
        this.defaultConfig.fontsize = options[1];
        this.defaultConfig.autohide = options[2];
        this.printStyleOptions();
    };

    this.printStyleOptions = function() {
        var style = document.createElement("style");
        var linkCss = document.createElement("link");
        linkCss.setAttribute('rel', 'stylesheet');
        linkCss.setAttribute('href', 'css/debugBar.css');
        var css = document.createTextNode('#debugBar { color:'+this.defaultConfig.color+'; font-size:'+this.defaultConfig.fontsize+'px; }');
        style.appendChild(css);
        document.body.appendChild(linkCss);
        document.body.appendChild(style);
    };

};

var lastAction = '';

function togglePopUp(event, get, post, session, stack) {
    var eventId = event.toElement.id;
    var infoBox = document.getElementById('infoBox');
    // delete infobox content
    infoBox.innerHTML = "";

    switch(eventId) {
        case 'debugBar_get':
            infoBox.innerHTML = print_r(get.get);
//            var tmp = document.createTextNode(print_r(get.get));
//            infoBox.appendChild(tmp);
            break;
        case 'debugBar_post':
            infoBox.innerHTML = print_r(post.post);
            break;
        case 'debugBar_session':
            infoBox.innerHTML = print_r(session.session);
            break;
        case 'debugBar_stack':
            infoBox.innerHTML = print_r(stack.stack);
            break;
        default:
            break;
    }
    // save action so we can check if the same is clicked
    if(lastAction == '') {
        lastAction = eventId;
//        alert("test");
        // nothing clicked so show
        infoBox.className = 'show';
    }
    else if(lastAction == eventId && infoBox.className == 'show') {
        // hide
        infoBox.className = 'hide';
    }
    else {
        lastAction = eventId;
        //show
        infoBox.className = 'show';
    }
    lastAction = eventId;
}

function init(totalTime, memory, get, post, session, stack, optionalOptions) {
    var DBar = new DebugBar();
    DBar.setOptions(optionalOptions);
    DBar.setTimeAndMemory(totalTime, memory);
    DBar.init(get, post, session, stack);
}

/**
 * PHP. Javascript. Print_r. Nice. Object. Dumper.
 * Original. Code: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 * Modified. By. Claude. Hohl. Namics.
 * Modified. By. Kenan Regez to output HTML indentation
 */
function print_r(arr, level) {

    var dumped_text = "";
    if (!level) level = 0;

    //The padding given at the beginning of the line.
    var level_padding = "";
    var bracket_level_padding = "";

    for (var j = 0; j < level + 1; j++) level_padding += "&nbsp;&nbsp;&nbsp;&nbsp;";
    for (var b = 0; b < level; b++) bracket_level_padding += "&nbsp;&nbsp;&nbsp;&nbsp;";

    if (typeof(arr) == 'object') { //Array/Hashes/Objects
        dumped_text += "Array<br />";
        dumped_text += bracket_level_padding + "(<br />";
        for (var item in arr) {

            var value = arr[item];

            if (typeof(value) == 'object') { //If it is an array,
                dumped_text += level_padding + "[" + item + "] => ";
                dumped_text += print_r(value, level + 2);
            } else {
                dumped_text += level_padding + "[" + item + "] => " + value + "<br />";
            }

        }
        dumped_text += bracket_level_padding + ")<br /><br />";
    } else { //Stings/Chars/Numbers etc.
        dumped_text = "===>" + arr + "<===(" + typeof(arr) + ")";
    }

    return dumped_text;

}