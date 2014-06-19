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

    // PHP ARRAY TO STRING JAVASCRIPT NICE
    this.arrayToString = function(arr) {
        var string = "";
        for(var i in arr) {
            console.log(i);
            string += i;
        }
        return string;
    };

    this.init = function(get, post, session, stack) {
        // create and add the Elements
        this.createEleAndAdd('div', 'debugBar');
        this.createEleAndAdd('div', 'debugBar_time', 'debugBar');
        this.createEleAndAdd('div', 'debugBar_memory', 'debugBar');
        var timeText = document.createTextNode(this.phpValues.time.toString()+ ' s');
        var memText = document.createTextNode(this.phpValues.memory.toString()+ ' MB');
        var tmp = document.getElementById('debugBar_time');
        tmp.appendChild(timeText);
        tmp = document.getElementById('debugBar_memory');
        tmp.appendChild(memText);
        if (get.length != 0) {
            this.createEleAndAdd('div', 'debugBar_get', 'debugBar');
            this.createAndAttachTextNode('$_GET', 'debugBar_get');
            this.createEleAndAdd('div', 'debugBar_get_content', 'debugBar_get');
            console.log(get);
            var getContent = this.arrayToString(get);
            this.createAndAttachTextNode(getContent, 'debugBar_get_content');
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

    this.createAndAttachTextNode = function(text, parentID) {
        var textNode = document.createTextNode(text);
        this.addToHTML(textNode, parentID);
    };

    this.bindEvent = function(id) {
        document.getElementById(id).onclick = function(event) {
            togglePopUp(event);
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

function togglePopUp(event) {
    var eventId = event.toElement.id;
    switch(eventId) {
        case 'debugBar_get':
            alert('get');
            break;
        case 'debugBar_post':
            alert('post');
            break;
        case 'debugBar_session':
            alert("session");
            break;
        case 'debugBar_stack':
            alert("stack");
            break;
        default:
            break;
    }
}

function init(totalTime, memory, get, post, session, stack, optionalOptions) {
    var DBar = new DebugBar();
    DBar.setOptions(optionalOptions);
    DBar.setTimeAndMemory(totalTime, memory);
    DBar.init(get, post, session, stack);
}