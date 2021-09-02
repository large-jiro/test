/**
 * This is an auto-generated code by Monaca JS/CSS Components.
 * Please do not edit by hand.
 */

/*** <GENERATED> ***/


/*** <Start:monaca-cordova-loader> ***/
/*** <Start:monaca-cordova-loader LoadJs:"components/monaca-cordova-loader/cordova-loader.js"> ***/
(function(){
  function getDeviceObjectForPreview() {
    var raw_values = window.location.search.substring(1).split('&');
    var values = {};
    var device = { platform: "" };

    if (raw_values) {
      for (var key in raw_values) {
        var tmp = raw_values[key].split('=');
        values[tmp[0]] = decodeURIComponent(tmp[1]);
      }
      device.platform = values.platform;
    }

    return device;
  }

  if (location && typeof location.href === "string" && /^https:\/\/preview-.+monaca\.(local||mobi)/.test(location.href)) {
    window.device = getDeviceObjectForPreview();
  }

  if (
      (navigator.userAgent.match(/Android/i))
      || (navigator.userAgent.match(/iPhone|iPad|iPod/i))
      || (navigator.userAgent.match(/Macintosh; Intel Mac OS X/i) && location.protocol.match(/^https?:/) === null)
  ) {

    if (typeof location.href === "string") {
      var cordovaJsUrl = location.protocol + "//" + location.hostname + "/";
      var relativePath = "";
      if (location.href.indexOf('/www') !== -1) {
        relativePath = location.href.split("/www")[1];
        var paths = relativePath.split("/");
        cordovaJsUrl = "";
        for (var i = 0; i < paths.length - 2; i++) {
          cordovaJsUrl += "../";
        }
      }
      document.write("<script src=\"" + cordovaJsUrl+ "cordova.js" + "\"></script>");
    }
  } else if ( (navigator.userAgent.match(/MSIE\s10.0/) && navigator.userAgent.match(/Windows\sNT\s6.2/)) || navigator.userAgent.match(/MSAppHost/)) {
    var elm = document.createElement('script');
    elm.setAttribute("src", "cordova.js");
    document.getElementsByTagName("head")[0].appendChild(elm);
  };
})();

;
/*** <End:monaca-cordova-loader LoadJs:"components/monaca-cordova-loader/cordova-loader.js"> ***/
/*** <End:monaca-cordova-loader> ***/

/*** <Start:monaca-core-utils> ***/
/*** <Start:monaca-core-utils LoadJs:"components/monaca-core-utils/monaca-core-utils.js"> ***/
/**
 * Monaca Core Utility Library
 * This library requires cordova.js
 *
 * @version 2.1.0
 * @author  Asial Corporation
 */
window.monaca = window.monaca || {};

(function() {
    /*
     * monaca api queue.
     */
    monaca.apiQueue = monaca.apiQueue || {};
    monaca.apiQueue.paramsArray = [];
    monaca.apiQueue.exec = function(a,b,c,d,e){
        if (!monaca.isDeviceReady) {
            monaca.apiQueue.paramsArray.push([a,b,c,d,e]);
        } else {
            window.cordova.exec(a,b,c,d,e);
        }
    };
    monaca.apiQueue.next = function(){
        var params = monaca.apiQueue.paramsArray.shift();
        if (params) {
            window.cordova.exec(
                function(r) {
                  if (typeof params[0] === 'function') params[0](r);
                  monaca.apiQueue.next();
                },
                function(r) {
                  if (typeof params[1] === 'function') params[1](r);
                  monaca.apiQueue.next();
                },
                params[2],
                params[3],
                params[4]
            );
        }
    };

    monaca.isDeviceReady = monaca.isDeviceReady || false;
    document.addEventListener('deviceready', function(){
        window.monaca.isDeviceReady = true;
        monaca.apiQueue.next();
    }, false);

    /**
     * Check User-Agent
     */
    var isAndroid = !!(navigator.userAgent.match(/Android/i));
    var isIOS     = !!(
        (navigator.userAgent.match(/iPhone|iPad|iPod/i))
        || (navigator.userAgent.match(/Macintosh; Intel Mac OS X/i) && location.protocol.match(/^https?:/) === null) // iOS 13.0 iPad 9.7 inch
    );
    monaca.isAndroid = isAndroid;
    monaca.isIOS     = isIOS;

    /**
     * Obtain style property
     */
    monaca.retrieveUIStyle = function() {
        var argsArray = [].slice.apply(arguments);
        monaca.apiQueue.exec(arguments[arguments.length-1], null, "mobi.monaca.nativecomponent", "retrieve", argsArray);
    };

    /**
     * Update style property
     */
    monaca.updateUIStyle = function(id, name, value) {
        if (typeof id == "string") {
            var argsArray = [].slice.apply(arguments);
            monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", "update", argsArray);
        } else {
            for (var i = 0; i < id.length; i++) {
                monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", "update", [id[i], name, value]);
            }
        }
    };

    if (isAndroid) {
        monaca.retrieveUIStyle = function(id, name, success, failure) {
            monaca.apiQueue.exec(
                function(style) { success(style[name]); } || function() { },
                failure || function() { },
                "mobi.monaca.nativecomponent",
                "retrieve",
                [id]
            );
        };

        monaca.updateUIStyle = function(id, name, value, success, failure) {
            var style = {};
            style[name] = value;

            monaca.apiQueue.exec(
                success || function() { },
                failure || function() { },
                "mobi.monaca.nativecomponent",
                "update",
                [id, style]
            );
        };
    }

    /**
     * Spinner handling
     */
    monaca.showSpinner = function (options) {
        options = options || {};
        var src = options.src ? options.src : null;
        var frames = options.frames != null ? options.frames : null;
        var interval = options.interval != null ? options.interval : null;
        var backgroundColor = options.backgroundColor ? options.backgroundColor : null;
        var backgroundOpacity = options.backgroundOpacity != null ? options.backgroundOpacity : null;
        var title = options.title ? options.title : null;
        var titleColor = options.titleColor ? options.titleColor : null;
        var titleFontScale = options.titleFontScale != null ? options.titleFontScale : null;
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'showSpinner', [ src, frames, interval, backgroundColor, backgroundOpacity, title, titleColor, titleFontScale, null ]);
    };

    monaca.hideSpinner = function(){
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'hideSpinner', []);
    };

    monaca.updateSpinnerTitle = function(newTitle){
        if (!newTitle) newTitle = "";
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'updateSpinnerTitle', [ newTitle ]);
    };

    var transitionPluginName = "Transit";

    /**
     * Open new page.
     */
    monaca.pushPage = function(path, options, param) {
        options = options || {};
        var animation = null;
        switch (options.animation) {
        case "lift":
          animation = "modal"; break;
        case "slide":
        case "slideLeft":
          animation = "push"; break;
        case "slideRight":
          animation = "slideRight"; break;
        default:
          animation = "push";
        }
        monaca.apiQueue.exec(null, null, transitionPluginName, animation, [path, options, param]);
    };
    /**
     * Close current page.
     */
    monaca.popPage = function(options) {
        options = options || {};
        var name = options.animation == 'lift' ? 'dismiss' : 'pop';
        monaca.apiQueue.exec(null, null, transitionPluginName, name, [options]);
    };

    /**
     * Open in browser.
     */
    monaca.invokeBrowser = function(url) {
        monaca.apiQueue.exec(null, null, transitionPluginName, "browse", [url]);
    };

    /**
     * Load in current page.
     */
    monaca.load = function(path, options, param) {
        monaca.apiQueue.exec(null, null, transitionPluginName, "link", [path, options, param]);
    };

    /**
     * return to top page.
     */
    monaca.home = function(options) {
        options = options || {};
        monaca.apiQueue.exec(null, null, transitionPluginName, "home", [options]);
    };

    /**
     * Clear stack
     */
    monaca.clearPageStack = function(clearAll) {
        clearAll = clearAll || false;
        monaca.apiQueue.exec(null, null, transitionPluginName, "clearPageStack", [clearAll]);
    };

    window.monaca.splashScreen = window.monaca.splashScreen || {};
    var splashScreenPluginName = "MonacaSplashScreen";

    /**
     * hide SplashScreen.
     */
    monaca.splashScreen.hide = function() {
        if (isAndroid) {
            monaca.apiQueue.exec(null, null, splashScreenPluginName, "hide", []);
        } else {
            navigator.splashscreen.hide();
        }
    };

    // Set monaca.baseUrl
    if (typeof location.href !== "string") {
        console.warn("Cannot find base url");
        monaca.baseUrl = null;
    } else {
        monaca.baseUrl = location.href.split("/www/")[0] + "/www/";
    }

    /**
     * Get device ID
     */
    monaca.getDeviceId = function(callback) {
        monaca.apiQueue.exec(function(result) { callback(result.deviceId); }, null, "Monaca", "getRuntimeConfiguration", []);
    };

    monaca.getRuntimeConfiguration = function(success,failure) {
        monaca.apiQueue.exec( success , failure , "Monaca" , "getRuntimeConfiguration" , []);
    };

    monaca.isMonacaDebuggerChecked = false;
    monaca.isMonacaDebugger = null;

    monaca.getRuntimeConfiguration( function(result) {
        monaca.isMonacaDebuggerChecked = true;
        monaca.isMonacaDebugger = !! result.isMonacaDebugger;
    });


})();

/**
 * iOS Status Bar Plugin
 *
 * @author Asial Corporation
 * @date   2014/1/15
 */
window.StatusBar = window.StatusBar || {};

(function() {

  /*
    hideStatusBar
    support : iOS6,iOS7
  */
  StatusBar.hideStatusBar = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'hideStatusBar', []);
  }

  /*
    showStatusBar
    support : iOS6,iOS7
  */
  StatusBar.showStatusBar = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'showStatusBar', []);
  }

  /*
    statusBarStyleDefault
    support : iOS6,iOS7
  */
  StatusBar.statusBarStyleDefault = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleDefault', []);
  }

  /*
    statusBarStyleLightContent
    support : iOS7
  */
  StatusBar.statusBarStyleLightContent = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleLightContent', []);
  }

  /*
    statusBarStyleBlackOpaque
    support : iOS6
  */
  StatusBar.statusBarStyleBlackOpaque = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleBlackOpaque', []);
  }

  /*
    statusBarStyleBlackTranslucent
    support : iOS6
  */
  StatusBar.statusBarStyleBlackTranslucent = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleBlackTranslucent', []);
  }

})();

/**
 * Monaca Cloud Functions
 *  Version 1.5.0
 *
 * @author Masahiro TANAKA <info@monaca.mobi>
 * @date   2013/03/17
 */
window.monaca = window.monaca || {};
window.monaca.cloud = window.monaca.cloud || {};

(function() {
    /**
     * Push Notification
     */
    monaca.cloud.Push = {};
    monaca.cloud.Push.callback = null;
    monaca.cloud.Push.callbackData = null;

    monaca.cloud.Push.send = function(data) {
        if (typeof monaca.cloud.Push.callback === "function") {
            monaca.cloud.Push.callback(data);
        } else {
            monaca.cloud.Push.callbackData = data;
        }
    };
    monaca.cloud.Push.setHandler = function(fn) {
        if (typeof fn !== "function") {
            console.warn("Push callback must be a function");
        } else {
            monaca.cloud.Push.callback = fn;
            if (monaca.cloud.Push.callbackData) {
                monaca.cloud.Push.callback(monaca.cloud.Push.callbackData);
                monaca.cloud.Push.callbackData = null;
            }
        }
    };

})();


/*
 * cloud
 */
(function(root) {
  var original$ = root.$;
  var originalZepto = root.Zepto;

  /* Zepto 1.1.3 - zepto event ajax deferred callbacks - zeptojs.com/license */
  var Zepto=function(){function k(t){return null==t?String(t):j[T.call(t)]||"object"}function $(t){return"function"==k(t)}function L(t){return null!=t&&t==t.window}function D(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function F(t){return"object"==k(t)}function Z(t){return F(t)&&!L(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function R(t){return s.call(t,function(t){return null!=t})}function _(t){return t.length>0?n.fn.concat.apply([],t):t}function q(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function W(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function z(t,e){return"number"!=typeof e||c[q(t)]?e:e+"px"}function H(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function I(n,i,r){for(e in i)r&&(Z(i[e])||A(i[e]))?(Z(i[e])&&!Z(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),I(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function B(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return $(e)?e.call(t,n,i):e}function U(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function X(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n in t.childNodes)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},T=j.toString,S={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return S.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~S.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},S.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),Z(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},S.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},S.isZ=function(t){return t instanceof S.Z},S.init=function(e,i){var r;if(!e)return S.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=S.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}else{if($(e))return n(a).ready(e);if(S.isZ(e))return e;if(A(e))r=R(e);else if(F(e))r=[e],e=null;else if(l.test(e))r=S.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}}return S.Z(r,e)},n=function(t,e){return S.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){I(t,n,e)}),t},S.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return D(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=function(t,e){return t!==e&&t.contains(e)},n.type=k,n.isFunction=$,n.isWindow=L,n.isArray=A,n.isPlainObject=Z,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return _(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return $(t)?this.not(this.not(t)):n(s.call(this,function(e){return S.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&S.matches(this[0],t)},not:function(e){var i=[];if($(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&$(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return F(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!F(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!F(t)?t:n(t)},find:function(t){var e,i=this;return e="object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(S.qsa(this[0],t)):this.map(function(){return S.qsa(this,t)})},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:S.matches(i,t));)i=i!==e&&!D(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!D(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return B(e,t)},parent:function(t){return B(N(this.pluck("parentNode")),t)},children:function(t){return B(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return B(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=H(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=$(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=$(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))})},text:function(e){return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=e===t?"":""+e})},attr:function(n,i){var r;return"string"==typeof n&&i===t?0==this.length||1!==this[0].nodeType?t:"value"==n&&"INPUT"==this[0].nodeName?this.val():!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:this.each(function(t){if(1===this.nodeType)if(F(n))for(e in n)U(this,e,n[e]);else U(this,n,J(this,i,t,this.getAttribute(n)))})},removeAttr:function(t){return this.each(function(){1===this.nodeType&&U(this,t)})},prop:function(e,n){return e=P[e]||e,n===t?this[0]&&this[0][e]:this.each(function(t){this[e]=J(this,n,t,this[e])})},data:function(e,n){var i=this.attr("data-"+e.replace(m,"-$1").toLowerCase(),n);return null!==i?Y(i):t},val:function(t){return 0===arguments.length?this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(e){this.value=J(this,t,e,this.value)})},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(0==this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==k(t))i||0===i?a=q(t)+":"+z(t,i):this.each(function(){this.style.removeProperty(q(t))});else for(e in t)t[e]||0===t[e]?a+=q(e)+":"+z(e,t[e])+";":this.each(function(){this.style.removeProperty(q(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(X(t))},W(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=X(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&X(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?X(this,""):(i=X(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(W(t)," ")}),void X(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,X(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?L(s)?s["inner"+i]:D(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=k(e),"object"==t||"array"==t||null==e?e:S.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null,r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();G(o.insertBefore(t,a),function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),S.Z.prototype=n.fn,S.uniq=N,S.deserializeValue=Y,n.zepto=S,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function T(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){if(r(e)){var i=function(){return e.apply(n,arguments)};return i._zid=l(e),i}if(o(n))return t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(T(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=T(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function S(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?S(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n),n.cache===!1&&(n.url=w(n.url,"_="+Date.now()));var s=n.dataType,a=/\?.+=\?/.test(n.url);if("jsonp"==s||a)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var T="async"in n?n.async:!0;d.open(n.type,n.url,T,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var T=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(T(t)+"="+T(e))},S(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto);

  root.$ = original$;
  root.Zepto = originalZepto;
  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};

  monaca.cloud.timeout = 30000;
  monaca.cloud.url = '%%%CLOUD_HOST%%%';
  monaca.cloud.backendId = '%%%BACKEND_ID%%%';
  monaca.cloud.apiKey = '%%%BACKEND_API_KEY%%%';
  monaca.cloud.deviceId = null;
  monaca.cloud.postQueue = [];

  /**
   * @property {jQuery} .
   */
  monaca.cloud.$ = Zepto;

  var MonacaCloudError = (function() {
    function MonacaCloudError(code, message, data) {
      if (typeof data === "undefined") {
        data = {};
      }
      this.code = code;
      this.message = message;
      this.data = data;
    }
    return MonacaCloudError;
  })();

  /**
   * @class
   */
  monaca.cloud.Error = function(code, message, data) {
    return new MonacaCloudError(code, message, data);
  };

  /**
   * @param {Number} msec .
   */
  monaca.cloud.setTimeout = function(msec) {
    this.timeout = msec;
  };

  // Get device id
  document.addEventListener("deviceready", function() {

    cordova.exec(function(result) {
        monaca.cloud.deviceId = new String(result.deviceId);
        monaca.cloud.url = new String(result.url);
        monaca.cloud.backendId = new String(result.backendId);
        monaca.cloud.apiKey = new String(result.apiKey);

        // execute and clear postQueue
        for (var i = 0; i < monaca.cloud.postQueue.length; i++) {
          monaca.cloud._doPost.apply(monaca.cloud, monaca.cloud.postQueue[i]);
        }
        monaca.cloud.postQueue = [];
      }, function(error) {
        console.error(error);
      },

      "Monaca",
      "getRuntimeConfiguration", []
    );

  }, false);

  // Others
  monaca.cloud._post = function(method, params, dfd, ajaxOptions, beforeSuccess) {
    if (monaca.cloud.deviceId == null) {
      monaca.cloud.postQueue.push([method, params, dfd, ajaxOptions, beforeSuccess]);
    } else {
      monaca.cloud._doPost(method, params, dfd, ajaxOptions, beforeSuccess);
    }
  };

  monaca.cloud._doPost = function(method, params, dfd, ajaxOptions, beforeSuccess) {
    var $ = monaca.cloud.$;

    if (typeof(ajaxOptions) === 'undefined') ajaxOptions = {};
    if ((typeof(method) === 'undefined') && (typeof(params) === 'undefined')) {
      throw new Error('Invalid arguments');
    }

    params['__api_key'] = monaca.cloud.apiKey;
    params['__device'] = monaca.cloud.deviceId;
    var sid = monaca.cloud._getSessionId();
    if (sid.length > 0) {
      params['__session'] = sid;
    }
    var data = JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: '1'
    });

    var o = $.extend(true, {
      url: this.url + this.backendId,
      data: data,
      dataType: 'json',
      type: 'POST',
      timeout: this.timeout,
      success: function(jsonResponse, status, xhr) {
        var sessionHeader = xhr.getResponseHeader('X-Set-Monaca-Cloud-Session');
        if (sessionHeader) {
          monaca.cloud._setSessionId(sessionHeader);
        }

        if (typeof(jsonResponse.error) !== 'undefined') {
          // has error code
          dfd.reject(jsonResponse.error);
        } else {
          // success
          if (typeof(jsonResponse.result.loginToken) !== 'undefined') {
            localStorage.monacaCloudLoginToken = jsonResponse.result.loginToken;
          }
          if (typeof(beforeSuccess) !== 'undefined') {
            beforeSuccess(jsonResponse, status, xhr, dfd);
          }
          dfd.resolve(jsonResponse.result);
        }
      },
      error: function(xhr, status) {
        switch (status) {
          case 'timeout':
            var err = monaca.cloud.Error(-11, 'Connection timeout');
            break;
          case 'parsererror':
            var err = monaca.cloud.Error(-12, 'Invalid response');
            break;
          default:
            var err = monaca.cloud.Error(-13, 'Invalid status code');
        }
        dfd.reject(err);
      }
    }, ajaxOptions);

    $.ajax(o);
  };

  var _sessionId = '';

  monaca.cloud._getSessionId = function() {
    return _sessionId;
  };

  monaca.cloud._setSessionId = function(id) {
    if (typeof id != 'string') {
      id = '';
    }
    _sessionId = id;
  };

})(window);
/*
 * CollectionItem
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCollectionItem = (function() {

    function MonacaCloudCollectionItem(item, collection) {

      /**
       * @property {String} .
       */
      this._id = item._id;

      /**
       * @property {String} .
       */
      this._ownerUserOid = item._ownerUserOid;

      /**
       * @property {Date} .
       */
      this._createdAt = new Date(item._createdAt);

      /**
       * @property {Date} .
       */
      this._updatedAt = new Date(item._updatedAt);

      /**
       * @property {MonacaCloudCollection} .
       */
      this._collection = collection;


      for (var key in item) {
        if (key.substr(0, 1) != '_') {
          this[key] = item[key];
        }
      }
    }

    MonacaCloudCollectionItem.prototype = {

      /**
       * @return {$.Promise} .
       */
      update: function() {
        var dfd = new $.Deferred();
        var col = this._collection;
        var data = {};

        for (var key in this) {
          if (key.indexOf('_') !== 0) {
            data[key] = this[key];
          }
        }

        monaca.cloud._post('Collection.update', {
          collectionName: col.name,
          itemOid: this._id,
          data: data,
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      getPermission: function() {
        var dfd = new $.Deferred();
        var col = this._collection;

        monaca.cloud._post('Collection.getPermission', {
          collectionName: col.name,
          itemOid: this._id
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @param {Object} permission .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      updatePermission: function(permission, options) {
        var dfd = new $.Deferred();
        var col = this._collection;

        if (typeof(options) === 'undefined') {
          options = {};
        }

        monaca.cloud._post('Collection.updatePermission', {
          collectionName: col.name,
          criteria: '_id == ?',
          bindParams: [this._id],
          permission: permission,
          options: options
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      remove: function() {
        var dfd = new $.Deferred();
        var col = this._collection;

        monaca.cloud._post('Collection.delete', {
          collectionName: col.name,
          itemOid: this._id,
        }, dfd, {});

        return dfd.promise();
      },

      'delete': function() {
        return this.remove();
      }

    };


    return MonacaCloudCollectionItem;
  })();

  monaca.cloud.CollectionItem = function(item, collection) {
    return new MonacaCloudCollectionItem(item, collection);
  };

})(window);
/*
 * Collection
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCollection = (function() {

    function MonacaCloudCollection(name) {
      this.name = name;
    }

    MonacaCloudCollection.prototype = {

      /**
       * @param {Object|Array} items .
       * @return {Array} result .
       */
      _makeCollectionItem: function(items) {
        var result = [];

        if (items instanceof Array) {
          for (var i = 0; i < items.length; i++) {
            result[i] = monaca.cloud.CollectionItem(items[i], this);
          }
        } else {
          result = monaca.cloud.CollectionItem(items, this);
        }

        return result;
      },

      /**
       * @param {Criteria|Array} criteria .
       */
      _validateCriteria: function(criteria) {
        if ((typeof(criteria) === 'undefined') || (typeof(criteria) === 'null')) {
          criteria = monaca.cloud.Criteria('');
        } else if (typeof(criteria) === 'string') {
          criteria = monaca.cloud.Criteria(criteria);
        }

        return criteria;
      },

      /**
       * @param {Object|Array} orderBy .
       * @param {Object} options .
       */
      _validateOptions: function(orderBy, options) {
        //if orderBy is hash, consider it as "options"
        if ((typeof(orderBy) === 'object') && (typeof(orderBy.length) === 'undefined')) {
          options = orderBy;
          if (typeof(options.orderBy) !== 'undefined') {
            orderBy = orderBy.orderBy;
          } else {
            orderBy = null;
          }
        }

        if (orderBy === '') {
          orderBy = null;
        }

        return {
          orderBy: orderBy,
          options: options
        };
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      find: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            e.result.items = self._makeCollectionItem(e.result.items);
            dfd.resolve(e.result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findMine: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        var userOid = monaca.cloud.User._oid;

        if (criteria.query != '') {
          criteria.query = '(' + criteria.query + ') && ';
        }
        if (userOid != null) {
          criteria.query += '(_ownerUserOid == ?)';
          criteria.bindParams.push(userOid);
        } else {
          criteria.query += '(_ownerDeviceOid == ?)';
          criteria.bindParams.push(monaca.cloud.deviceId);
        }

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            e.result.items = self._makeCollectionItem(e.result.items);
            dfd.resolve(e.result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findOne: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var result = (e.result.totalItems > 0) ? self._makeCollectionItem(e.result.items[0]) : null;
            dfd.resolve(result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findOneMine: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        var userOid = monaca.cloud.User._oid;

        if (criteria.query != '') {
          criteria.query = '(' + criteria.query + ') && ';
        }
        if (userOid != null) {
          criteria.query += '(_ownerUserOid == ?)';
          criteria.bindParams.push(userOid);
        } else {
          criteria.query += '(_ownerDeviceOid == ?)';
          criteria.bindParams.push(monaca.cloud.deviceId);
        }

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var result = (e.result.totalItems > 0) ? self._makeCollectionItem(e.result.items[0]) : null;
            dfd.resolve(result);
          });

        return dfd.promise();
      },

      /**
       * @param {Object} item .
       * @param {Object} [permission] .
       * @return {$.Promise} .
       */
      insert: function(item, permission) {
        var self = this;
        var dfd = new $.Deferred();

        if (typeof(permission) === 'undefined') {
          permission = {};
        }

        monaca.cloud._post('Collection.insert', {
            collectionName: this.name,
            item: item,
            permission: permission
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var item = self._makeCollectionItem(e.result.item);
            dfd.resolve(item);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {Object} permission .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      updatePermission: function(criteria, permission, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);

        monaca.cloud._post('Collection.updatePermission', {
          collectionName: this.name,
          criteria: criteria.query,
          bindParams: criteria.bindParams,
          permission: permission,
          options: options
        }, dfd, {});

        return dfd.promise();
      }
    };

    return MonacaCloudCollection;
  })();


  monaca.cloud.Collection = function(name) {
    return new MonacaCloudCollection(name);
  };

})(window);
/*
 * Criteria
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCriteria = (function() {

    function MonacaCloudCriteria(query, bindParams) {
      this.query = query;
      this.bindParams = (typeof(bindParams) !== 'undefined') ? bindParams : [];
    }

    return MonacaCloudCriteria;
  })();


  monaca.cloud.Criteria = function(query, bindParams) {
    return new MonacaCloudCriteria(query, bindParams);
  };

})(window);
/*
 * Device
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.Device = {

    /**
     * @param {String} name .
     * @return {$.Promise} .
     */
    getProperty: function(name) {
      var dfd = new $.Deferred();

      monaca.cloud._post('Device.getProperties', {
          names: [name]
        }, dfd, {},
        function(e, status, xhr, dfd) {
          dfd.resolve(e.result.properties[name]);
        }
      );

      return dfd.promise();
    },

    /**
     * @param {Array} names .
     * @return {$.Promise} .
     */
    getProperties: function(names) {
      var dfd = new $.Deferred();

      monaca.cloud._post('Device.getProperties', {
          names: names
        }, dfd, {},
        function(e, status, xhr, dfd) {
          dfd.resolve(e.result.properties);
        }
      );

      return dfd.promise();
    },

    /**
     * @param {String} name .
     * @param {String} value .
     * @return {$.Promise} .
     */
    saveProperty: function(name, value) {
      var dfd = new $.Deferred();
      var param = {};

      if ((typeof(name) !== 'undefined') && (typeof(value) !== 'undefined')) {
        param = {
          properties: {}
        };
        param.properties[name] = value;
      }

      monaca.cloud._post('Device.saveProperties', param, dfd);

      return dfd.promise();
    },

    /**
     * @param {Object} properties .
     * @return {$.Promise} .
     */
    saveProperties: function(properties) {
      var dfd = new $.Deferred();
      var param = {};

      if (typeof(properties) !== 'undefined') param.properties = properties;
      monaca.cloud._post('Device.saveProperties', param, dfd);

      return dfd.promise();
    }

  };

})(window);
/*
 * Mailer
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.Mailer = {

    /**
     * @param {String} userOid .
     * @param {String} templateName .
     * @param {Object} substituteParams .
     * @param {Object} [options] .
     * @return {$.Promise} .
     */
    sendMail: function(userOid, templateName, substituteParams, options) {
      var dfd = new $.Deferred();

      if (typeof(options) === 'undefined') {
        options = {};
      }

      monaca.cloud._post('Mailer.sendMail', {
        userOid: userOid,
        templateName: templateName,
        substituteParams: substituteParams,
        options: options
      }, dfd);

      return dfd.promise();
    }
  };

})(window);
/*
 * User
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.User = (function() {


    return {

      _oid: null,

      /**
       * @return {Boolean} .
       */
      isAuthenticated: function() {
        return (this._oid === null) ? false : true;
      },


      /**
       * @param {String} username .
       * @param {String} password .
       * @param {Object} [properties] .
       * @return {$.Promise} .
       */
      register: function(username, password, properties) {
        var dfd = new $.Deferred();
        var self = this;

        if (typeof(properties) === 'undefined') properties = {};

        monaca.cloud._post('User.register', {
            username: username,
            password: password,
            properties: properties
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );


        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {Object} properties .
       * @return {$.Promise} .
       */
      validate: function(username, properties) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.validate', {
          username: username,
          properties: properties
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} password .
       * @return {$.Promise} .
       */
      unregister: function(password) {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.unregister', {
            password: password
          }, dfd, {},
          function() {
            self._oid = null;
            monaca.cloud._setSessionId('');
            localStorage.removeItem('monacaCloudLoginToken');
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {String} password .
       * @return {$.Promise} .
       */
      login: function(username, password) {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.login', {
            username: username,
            password: password
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      autoLogin: function() {
        var dfd = new $.Deferred();
        var token = localStorage.monacaCloudLoginToken || '';
        var self = this;

        monaca.cloud._post('User.autoLogin', {
            loginToken: token
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      logout: function() {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.logout', {}, dfd, {},
          function() {
            self._oid = null;
            monaca.cloud._setSessionId('');
            localStorage.removeItem('monacaCloudLoginToken');
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} oldPassword .
       * @param {String} newPassword .
       * @return {$.Promise} .
       */
      updatePassword: function(oldPassword, newPassword) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.updatePassword', {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {Object} options .
       * @return {$.Promise} .
       */
      sendPasswordResetToken: function(username, options) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.sendPasswordResetToken', {
          username: username,
          options: options
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {String} newPassword .
       * @param {String} token .
       * @return {$.Promise} .
       */
      resetPasswordAndLogin: function(username, newPassword, token) {
        var dfd = new $.Deferred();
        var self = this;

        monaca.cloud._post('User.resetPasswordAndLogin', {
            username: username,
            newPassword: newPassword,
            token: token
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} name .
       * @return {$.Promise} .
       */
      getProperty: function(name) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.getProperties', {
            names: [name]
          }, dfd, {},
          function(e, status, xhr, dfd) {
            dfd.resolve(e.result.properties[name]);
          }
        );

        return dfd.promise();
      },

      /**
       * @param {Array} names .
       * @return {$.Promise} .
       */
      getProperties: function(names) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.getProperties', {
            names: names
          }, dfd, {},
          function(e, status, xhr, dfd) {
            dfd.resolve(e.result.properties);
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} name .
       * @param {String} value .
       * @return {$.Promise} .
       */
      saveProperty: function(name, value) {
        var dfd = new $.Deferred();
        var param = {};

        if (typeof(name) !== 'undefined') {
          param = {
            properties: {}
          };
          param.properties[name] = value;
        }

        monaca.cloud._post('User.saveProperties', param, dfd);

        return dfd.promise();
      },

      /**
       * @param {Object} properties .
       * @return {$.Promise} .
       */
      saveProperties: function(properties) {
        var dfd = new $.Deferred();
        var param = {};

        if (typeof(properties) !== 'undefined') param.properties = properties;
        monaca.cloud._post('User.saveProperties', param, dfd);

        return dfd.promise();
      }

    };
  })();

})(window);

;
/*** <End:monaca-core-utils LoadJs:"components/monaca-core-utils/monaca-core-utils.js"> ***/
/*** <End:monaca-core-utils> ***/

/*** <Start:imgcache.js> ***/
/*** <Start:imgcache.js LoadJs:"components/imgcache.js/lib/imgcache.js"> ***/
/*! imgcache.js
  Copyright 2012-2019 Christophe BENOIT

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/*jslint browser:true*/
/*global console,LocalFileSystem,device,FileTransfer,define,module,cordova,phonegap*/

var ImgCache = {
  version: '2.1.1',
  // options to override before using the library (but after loading this script!)
  options: {
    debug: false,                           /* call the log method ? */
    localCacheFolder: 'imgcache',           /* name of the cache folder */
    useDataURI: false,                      /* use src="data:.."? otherwise will use src="filesystem:.." */
    chromeQuota: 10 * 1024 * 1024,          /* allocated cache space : here 10MB */
    usePersistentCache: true,               /* false = use temporary cache storage */
    cacheClearSize: 0,                      /* size in MB that triggers cache clear on init, 0 to disable */
    headers: {},                            /* HTTP headers for the download requests -- e.g: headers: { 'Accept': 'application/jpg' } */
    withCredentials: false,                 /* indicates whether or not cross-site Access-Control requests should be made using credentials */
    skipURIencoding: false,                 /* enable if URIs are already encoded (skips call to sanitizeURI) */
    cordovaFilesystemRoot: null,            /* if specified, use one of the Cordova File plugin's app directories for storage */
    timeout: 0                              /* timeout delay in ms for xhr request */
  },
  overridables: {
    hash: function (s) {
      /* tiny-sha1 r4 (11/2011) - MIT License - http://code.google.com/p/tiny-sha1/ */
      /* jshint ignore:start */
      function U(a,b,c){while(0<c--)a.push(b)}function L(a,b){return(a<<b)|(a>>>(32-b))}function P(a,b,c){return a^b^c}function A(a,b){var c=(b&0xFFFF)+(a&0xFFFF),d=(b>>>16)+(a>>>16)+(c>>>16);return((d&0xFFFF)<<16)|(c&0xFFFF)}var B="0123456789abcdef";return(function(a){var c=[],d=a.length*4,e;for(var i=0;i<d;i++){e=a[i>>2]>>((3-(i%4))*8);c.push(B.charAt((e>>4)&0xF)+B.charAt(e&0xF))}return c.join('')}((function(a,b){var c,d,e,f,g,h=a.length,v=0x67452301,w=0xefcdab89,x=0x98badcfe,y=0x10325476,z=0xc3d2e1f0,M=[];U(M,0x5a827999,20);U(M,0x6ed9eba1,20);U(M,0x8f1bbcdc,20);U(M,0xca62c1d6,20);a[b>>5]|=0x80<<(24-(b%32));a[(((b+65)>>9)<<4)+15]=b;for(var i=0;i<h;i+=16){c=v;d=w;e=x;f=y;g=z;for(var j=0,O=[];j<80;j++){O[j]=j<16?a[j+i]:L(O[j-3]^O[j-8]^O[j-14]^O[j-16],1);var k=(function(a,b,c,d,e){var f=(e&0xFFFF)+(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF),g=(e>>>16)+(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(f>>>16);return((g&0xFFFF)<<16)|(f&0xFFFF)})(j<20?(function(t,a,b){return(t&a)^(~t&b)}(d,e,f)):j<40?P(d,e,f):j<60?(function(t,a,b){return(t&a)^(t&b)^(a&b)}(d,e,f)):P(d,e,f),g,M[j],O[j],L(c,5));g=f;f=e;e=L(d,30);d=c;c=k}v=A(v,c);w=A(w,d);x=A(x,e);y=A(y,f);z=A(z,g)}return[v,w,x,y,z]}((function(t){var a=[],b=255,c=t.length*8;for(var i=0;i<c;i+=8){a[i>>5]|=(t.charCodeAt(i/8)&b)<<(24-(i%32))}return a}(s)).slice(),s.length*8))));
      /* jshint ignore:end */
    },
    log: function (str, level) {
      'use strict';
      if (ImgCache.options.debug) {
        if (level === LOG_LEVEL_INFO) { str = 'INFO: ' + str; }
        if (level === LOG_LEVEL_WARNING) { str = 'WARN: ' + str; }
        if (level === LOG_LEVEL_ERROR) { str = 'ERROR: ' + str; }
        console.log(str);
      }
    }
  },
  ready: false,
  attributes: {}
},
LOG_LEVEL_INFO = 1,
LOG_LEVEL_WARNING = 2,
LOG_LEVEL_ERROR = 3;

(function ($) {
  'use strict';

  /** Helpers *****************************************************************/
  var Helpers = {};

  // make sure the url does not contain funny characters like spaces that might make the download fail
  Helpers.sanitizeURI = function (uri) {
    if (ImgCache.options.skipURIencoding) {
      return uri;
    } else {
      if (uri.length >= 2 && uri[0] === '"' && uri[uri.length - 1] === '"') {
        uri = uri.substr(1, uri.length - 2);
      }
      var encodedURI = encodeURI(uri);
      /*
      TODO: The following bit of code will have to be checked first (#30)
      if (Helpers.isCordova()) {
          return encodedURI.replace(/%/g, '%25');
      }
      */
      return encodedURI;
    }
  };

  // with a little help from http://code.google.com/p/js-uri/
  Helpers.URI = function (str) {
    if (!str) { str = ''; }
    // Based on the regex in RFC2396 Appendix B.
    var parser = /^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/,
        result = str.match(parser);
    this.scheme    = result[1] || null;
    this.authority = result[2] || null;
    this.path      = result[3] || null;
    this.query     = result[4] || null;
    this.fragment  = result[5] || null;
  };
  // returns lower cased filename from full URI
  Helpers.URIGetFileName = function (fullpath) {
    if (!fullpath) {
      return;
    }
    //TODO: there must be a better way here.. (url encoded strings fail)
    var idx = fullpath.lastIndexOf('/');
    if (!idx) {
      return;
    }
    return fullpath.substr(idx + 1).toLowerCase();
  };

  // returns lower cased path from full URI
  Helpers.URIGetPath = function (str) {
    if (!str) {
      return;
    }
    var uri = Helpers.URI(str);
    return uri.path.toLowerCase();
  };

  // returns extension from filename (without leading '.')
  Helpers.fileGetExtension = function (filename) {
    if (!filename) {
      return '';
    }
    filename = filename.split('?')[0];
    var ext = filename.split('.').pop();
    // make sure it's a realistic file extension - for images no more than 4 characters long (.jpeg)
    if (!ext || ext.length > 4) {
      return '';
    }
    return ext;
  };

  Helpers.appendPaths = function (path1, path2) {
    if (!path2) {
      path2 = '';
    }
    if (!path1 || path1 === '') {
      return (path2.length > 0 && path2[0] == '/' ? '' : '/') + path2;
    }
    return path1 + ( ((path1[path1.length - 1] == '/') || (path2.length > 0 && path2[0] == '/')) ? '' : '/' ) + path2;
  };

  Helpers.hasJqueryOrJqueryLite = function () {
    return (ImgCache.jQuery || ImgCache.jQueryLite);
  };

  Helpers.isCordova = function () {
    return (typeof cordova !== 'undefined' || typeof phonegap !== 'undefined') && (cordova||phonegap).platformId !== 'browser';
  };

  Helpers.isCordovaAndroid = function () {
    return (Helpers.isCordova() && device && device.platform && device.platform.toLowerCase().indexOf('android') >= 0);
  };

  Helpers.isCordovaWindowsPhone = function () {
    return (Helpers.isCordova() && device && device.platform && ((device.platform.toLowerCase().indexOf('win32nt') >= 0) || (device.platform.toLowerCase().indexOf('windows') >= 0)));
  };

  Helpers.isCordovaIOS = function () {
    return (Helpers.isCordova() && device && device.platform && device.platform.toLowerCase() === 'ios');
  };

  // special case for #93
  Helpers.isCordovaAndroidOlderThan3_3 = function () {
    return (Helpers.isCordovaAndroid() && device.version && (
      device.version.indexOf('2.') === 0 ||
      device.version.indexOf('3.0') === 0 ||
      device.version.indexOf('3.1') === 0 ||
      device.version.indexOf('3.2') === 0
    ));
  };

  // special case for #47
  Helpers.isCordovaAndroidOlderThan4 = function () {
    return (Helpers.isCordovaAndroid() && device.version && (device.version.indexOf('2.') === 0 || device.version.indexOf('3.') === 0));
  };

  // Fix for #42 (Cordova versions < 4.0)
  Helpers.EntryToURL = function (entry) {
    if (Helpers.isCordovaAndroidOlderThan4() && typeof entry.toNativeURL === 'function') {
      return entry.toNativeURL();
    } else if (typeof entry.toInternalURL === 'function') {
      // Fix for #97
      return entry.toInternalURL();
    } else {
      return entry.toURL();
    }
  };

  // Returns a URL that can be used to locate a file
  Helpers.EntryGetURL = function (entry) {
    // toURL for html5, toURI for cordova 1.x
    return (typeof entry.toURL === 'function' ? Helpers.EntryToURL(entry) : entry.toURI());
  };

  // Returns the full absolute path from the root to the FileEntry
  Helpers.EntryGetPath = function (entry) {
    if (Helpers.isCordova()) {
      // #93
      if (Helpers.isCordovaIOS()) {
        if (Helpers.isCordovaAndroidOlderThan3_3()) {
          return entry.fullPath;
        } else {
          return entry.nativeURL;
        }
      }
      // From Cordova 3.3 onward toURL() seems to be required instead of fullPath (#38)
      return (typeof entry.toURL === 'function' ? Helpers.EntryToURL(entry) : entry.fullPath);
    } else {
      return entry.fullPath;
    }
  };

  Helpers.getCordovaStorageType = function (isPersistent) {
    // From Cordova 3.1 onward those constants have moved to the window object (#38)
    if (typeof LocalFileSystem !== 'undefined') {
      if (isPersistent && LocalFileSystem.hasOwnProperty('PERSISTENT')) {
        return LocalFileSystem.PERSISTENT;
      }
      if (!isPersistent && LocalFileSystem.hasOwnProperty('TEMPORARY')) {
        return LocalFileSystem.TEMPORARY;
      }
    }
    return (isPersistent ? window.PERSISTENT : window.TEMPORARY);
  };

  /****************************************************************************/

  /** DomHelpers **************************************************************/
  var DomHelpers = {};

  DomHelpers.trigger = function (DomElement, eventName) {
    if (ImgCache.jQuery) {
      $(DomElement).trigger(eventName);
    } else {
      /* CustomEvent polyfill */
      if (Helpers.isCordovaWindowsPhone() || !window.CustomEvent) {
        // CustomEvent for browsers which don't natively support the Constructor method
        window.CustomEvent = function CustomEvent(type, params) {
          var event;
          params = params || {bubbles: false, cancelable: false, detail: undefined};
          try {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
          } catch (error) {
            // for browsers that don't support CustomEvent at all, we use a regular event instead
            event = document.createEvent('Event');
            event.initEvent(type, params.bubbles, params.cancelable);
            event.detail = params.detail;
          }
          return event;
        };
      }
      DomElement.dispatchEvent(new CustomEvent(eventName));
    }
  };

  DomHelpers.removeAttribute = function (element, attrName) {
    if (Helpers.hasJqueryOrJqueryLite()) {
      element.removeAttr(attrName);
    } else {
      element.removeAttribute(attrName);
    }
  };
  DomHelpers.setAttribute = function (element, attrName, value) {
    if (Helpers.hasJqueryOrJqueryLite()) {
      element.attr(attrName, value);
    } else {
      element.setAttribute(attrName, value);
    }
  };
  DomHelpers.getAttribute = function (element, attrName) {
    if (Helpers.hasJqueryOrJqueryLite()) {
      return element.attr(attrName);
    } else {
      return element.getAttribute(attrName);
    }
  };
  DomHelpers.getBackgroundImage = function (element) {
    if (Helpers.hasJqueryOrJqueryLite()) {
      return element.attr('data-old-background') ? "url(" + element.attr('data-old-background') + ")" : element.css('background-image');
    } else {
      var style = window.getComputedStyle(element, null);
      if (!style) {
        return;
      }
      return element.getAttribute("data-old-background") ? "url(" + element.getAttribute("data-old-background") + ")" : style.backgroundImage;
    }
  };
  DomHelpers.setBackgroundImage = function (element, styleValue) {
    if (Helpers.hasJqueryOrJqueryLite()) {
      element.css('background-image', styleValue);
    } else {
      element.style.backgroundImage = styleValue;
    }
  };

  /****************************************************************************/

  /** Private *****************************************************************/
  var Private = { attributes: {} };

  Private.isImgCacheLoaded = function () {
    if (!ImgCache.attributes.filesystem || !ImgCache.attributes.dirEntry) {
      ImgCache.overridables.log('ImgCache not loaded yet! - Have you called ImgCache.init() first?', LOG_LEVEL_WARNING);
      return false;
    }
    return true;
  };

  Private.attributes.hasLocalStorage = false;
  Private.hasLocalStorage = function () {
    // if already tested, avoid doing the check again
    if (Private.attributes.hasLocalStorage) {
      return Private.attributes.hasLocalStorage;
    }
    try {
      var mod = ImgCache.overridables.hash('imgcache_test');
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      Private.attributes.hasLocalStorage = true;
      return true;
    } catch (e) {
      // this is an info, not an error
      ImgCache.overridables.log('Could not write to local storage: ' + e.message, LOG_LEVEL_INFO);
      return false;
    }
  };

  Private.setCurrentSize = function (curSize) {
    ImgCache.overridables.log('current size: ' + curSize, LOG_LEVEL_INFO);
    if (Private.hasLocalStorage()) {
      localStorage.setItem('imgcache:' + ImgCache.options.localCacheFolder, curSize);
    }
  };

  Private.getCachedFilePath = function (img_src) {
    return Helpers.appendPaths(ImgCache.options.localCacheFolder, Private.getCachedFileName(img_src));
  };

  // used for FileTransfer.download only
  Private.getCachedFileFullPath = function (img_src) {
    var local_root = Helpers.EntryGetPath(ImgCache.attributes.dirEntry);
    return Helpers.appendPaths(local_root, Private.getCachedFileName(img_src));
  };

  Private.getCachedFileName = function (img_src) {
    if (!img_src) {
      ImgCache.overridables.log('No source given to getCachedFileName', LOG_LEVEL_WARNING);
      return;
    }
    var hash = ImgCache.overridables.hash(img_src);
    var ext = Helpers.fileGetExtension(Helpers.URIGetFileName(img_src));
    return hash + (ext ? ('.' + ext) : '');
  };

  Private.setNewImgPath = function ($img, new_src, old_src) {
    DomHelpers.setAttribute($img, 'src', new_src);
    // store previous url in case we need to reload it
    DomHelpers.setAttribute($img, OLD_SRC_ATTR, old_src);
  };

  Private.createCacheDir = function (success_callback, error_callback) {
    if (!ImgCache.attributes.filesystem) {
      ImgCache.overridables.log('Filesystem instance was not initialised', LOG_LEVEL_ERROR);
      if (error_callback) { error_callback(); }
      return;
    }
    var _fail = function (error) {
      ImgCache.overridables.log('Failed to get/create local cache directory: ' + error.code, LOG_LEVEL_ERROR);
      if (error_callback) { error_callback(); }
    };
    var _getDirSuccess = function (dirEntry) {
      ImgCache.attributes.dirEntry = dirEntry;
      ImgCache.overridables.log('Local cache folder opened: ' + Helpers.EntryGetPath(dirEntry), LOG_LEVEL_INFO);

      //Put .nomedia file in cache directory so Android doesn't index it.
      if (Helpers.isCordovaAndroid()) {
        var _androidNoMediaFileCreated = function () {
          ImgCache.overridables.log('.nomedia file created.', LOG_LEVEL_INFO);
          if (success_callback) { success_callback(); }
        };

        dirEntry.getFile('.nomedia', {create: true, exclusive: false}, _androidNoMediaFileCreated, _fail);
      } else if (!Helpers.isCordovaWindowsPhone()) {
        // #73 - iOS: the directory should not be backed up in iCloud
        if (Helpers.isCordovaIOS() && dirEntry.setMetadata) {
          dirEntry.setMetadata(function () {
            /* success*/
            ImgCache.overridables.log('com.apple.MobileBackup metadata set', LOG_LEVEL_INFO);
          }, function () {
            /* failure */
            ImgCache.overridables.log('com.apple.MobileBackup metadata could not be set', LOG_LEVEL_WARNING);
          },
          {
            // 1=NO backup oddly enough..
            'com.apple.MobileBackup': 1
          });
        }

        if (success_callback) { success_callback(); }
      } else {
        if (success_callback) { success_callback(); }
      }

      ImgCache.ready = true;
      DomHelpers.trigger(document, IMGCACHE_READY_TRIGGERED_EVENT);
    };
    ImgCache.attributes.filesystem.root.getDirectory(ImgCache.options.localCacheFolder, {create: true, exclusive: false}, _getDirSuccess, _fail);
  };

  // This is a wrapper for phonegap's FileTransfer object in order to implement the same feature
  // in Chrome (and possibly extra browsers in the future)
  Private.FileTransferWrapper = function (filesystem) {
    if (Helpers.isCordova()) {
      // PHONEGAP
      this.fileTransfer = new FileTransfer();
    }
    this.filesystem = filesystem;    // only useful for CHROME
  };
  Private.FileTransferWrapper.prototype.download = function (uri, localPath, success_callback, error_callback, on_progress) {
    var headers = ImgCache.options.headers || {};
    var isOnProgressAvailable = (typeof on_progress === 'function');

    if (this.fileTransfer) {
      if (isOnProgressAvailable) {
        this.fileTransfer.onprogress = on_progress;
      }
      return this.fileTransfer.download(uri, localPath, success_callback, error_callback, false, { 'headers': headers });
    }

    var filesystem = this.filesystem;

    // CHROME - browsers
    var _fail = function (str, level, error_callback) {
      ImgCache.overridables.log(str, level);
      // mock up FileTransferError, so at least caller knows there was a problem.
      // Normally, the error.code in the callback is a FileWriter error, we return 0 if the error was an XHR error
      if (error_callback) {
        error_callback({code: 0, source: uri, target: localPath});
      }
    };
    var xhr = new XMLHttpRequest();
    xhr.open('GET', uri, true);
    if (isOnProgressAvailable) {
      xhr.onprogress = on_progress;
    }
    if (ImgCache.options.withCredentials) {
      xhr.withCredentials = true;
    }
    xhr.timeout = ImgCache.options.timeout;
    xhr.responseType = 'blob';
    for (var key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
    xhr.onload = function () {
      if (xhr.response && (xhr.status === 200 || xhr.status === 0)) {
        filesystem.root.getFile(localPath, { create:true }, function (fileEntry) {
          fileEntry.createWriter(function (writer) {
            writer.onerror = error_callback;
            writer.onwriteend = function () { success_callback(fileEntry);  };
            writer.write(xhr.response, error_callback);
          }, error_callback);
        }, error_callback);
      } else {
        _fail('Image ' + uri + ' could not be downloaded - status: ' + xhr.status, 3, error_callback);
      }
    };
    xhr.onerror = function () {
      _fail('XHR error - Image ' + uri + ' could not be downloaded - status: ' + xhr.status, 3, error_callback);
    };
    xhr.ontimeout = function () {
      _fail('XHR error - Image ' + uri + ' timed out - status: ' + xhr.status, 3, error_callback);
    };
    xhr.send();
  };

  Private.getBackgroundImageURL = function ($div) {
    var backgroundImageProperty = DomHelpers.getBackgroundImage($div);
    if (!backgroundImageProperty) {
      return;
    }
    var regexp = /url\s?\((.+)\)/;
    var img_src = regexp.exec(backgroundImageProperty)[1];
    return img_src.replace(/(['"])/g, '');
  };

  Private.getBase64DataFromEntry = function (entry, filename, success_callback, error_callback) {
    var _success = function (file) {
      var reader = new FileReader();
      reader.onloadend = function (e) {
        var base64content = e.target.result;
        if (base64content) {
          ImgCache.overridables.log('File ' + filename + ' loaded from cache', LOG_LEVEL_INFO);
          if (success_callback) { success_callback(base64content); }
        } else {
          ImgCache.overridables.log('File in cache ' + filename + ' is empty', LOG_LEVEL_WARNING);
          if (error_callback) { error_callback(filename); }
        }
      };
      reader.readAsDataURL(file);
    };
    var _failure = function (error) {
      ImgCache.overridables.log('Failed to read file ' + error.code, LOG_LEVEL_ERROR);
      if (error_callback) { error_callback(filename); }
    };

    entry.file(_success, _failure);
  };

  Private.loadCachedFile = function ($element, img_src, set_path_callback, success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    if (!$element) {
      ImgCache.overridables.log('First parameter of loadCachedFile is empty, should be a DOM element', LOG_LEVEL_ERROR);
      return;
    }

    var filename = Helpers.URIGetFileName(img_src);

    var _gotFileEntry = function (entry) {
      if (ImgCache.options.useDataURI) {
        Private.getBase64DataFromEntry(entry, filename, function (base64content) {
          set_path_callback($element, base64content, img_src);
          if (success_callback) { success_callback($element); }
        }, function () {
          if (error_callback) { error_callback($element); }
        });
      } else {
        // using src="filesystem:" kind of url
        var new_url = Helpers.EntryGetURL(entry);
        set_path_callback($element, new_url, img_src);
        ImgCache.overridables.log('File ' + filename + ' loaded from cache', LOG_LEVEL_INFO);
        if (success_callback) { success_callback($element); }
      }
    };
    // if file does not exist in cache, cache it now!
    var _fail = function () {
      ImgCache.overridables.log('File ' + filename + ' not in cache', LOG_LEVEL_INFO);
      if (error_callback) { error_callback($element); }
    };
    ImgCache.attributes.filesystem.root.getFile(Private.getCachedFilePath(img_src), {create: false}, _gotFileEntry, _fail);
  };

  Private.setBackgroundImagePath = function ($element, new_src, old_src) {
    DomHelpers.setBackgroundImage($element, 'url("' + new_src + '")');
    // store previous url in case we need to reload it
    DomHelpers.setAttribute($element, OLD_BACKGROUND_ATTR, old_src);
  };

  /****************************************************************************/


  var OLD_SRC_ATTR = 'data-old-src',
      OLD_BACKGROUND_ATTR = 'data-old-background',
      IMGCACHE_READY_TRIGGERED_EVENT = 'ImgCacheReady';

  ImgCache.init = function (success_callback, error_callback) {
    ImgCache.jQuery = (window.jQuery || window.Zepto) ? true : false;        /* using jQuery if it's available otherwise the DOM API */
    ImgCache.jQueryLite = (typeof window.angular !== 'undefined' && window.angular.element) ? true : false;    /* is AngularJS jQueryLite available */

    ImgCache.attributes.init_callback = success_callback;

    ImgCache.overridables.log('ImgCache initialising', LOG_LEVEL_INFO);

    var _checkSize = function (callback) {
      if (ImgCache.options.cacheClearSize > 0) {
        var curSize = ImgCache.getCurrentSize();
        if (curSize > (ImgCache.options.cacheClearSize * 1024 * 1024)) {
          ImgCache.clearCache(callback, callback);
        } else {
          if (callback) { callback(); }
        }
      } else {
        if (callback) { callback(); }
      }
    };
    var _gotFS = function (filesystem) {
      ImgCache.overridables.log('LocalFileSystem opened', LOG_LEVEL_INFO);

      // store filesystem handle
      ImgCache.attributes.filesystem = filesystem;

      Private.createCacheDir(function () {
        _checkSize(ImgCache.attributes.init_callback);
      }, error_callback);
    };
    var _fail = function (error) {
      ImgCache.overridables.log('Failed to initialise LocalFileSystem ' + error.code, LOG_LEVEL_ERROR);
      if (error_callback) { error_callback(); }
    };
    if (Helpers.isCordova() && window.requestFileSystem) {
      // PHONEGAP
      if (ImgCache.options.cordovaFilesystemRoot) {
        try {
          window.resolveLocalFileSystemURL(
            ImgCache.options.cordovaFilesystemRoot,
            function (dirEntry) {
                _gotFS({ root: dirEntry });
            },
            _fail
          );
        } catch (e) {
          _fail({ code: e.message })
        }
      } else {
        window.requestFileSystem(Helpers.getCordovaStorageType(ImgCache.options.usePersistentCache), 0, _gotFS, _fail);
      }
    } else {
      //CHROME
      var savedFS = window.requestFileSystem || window.webkitRequestFileSystem;
      window.storageInfo = window.storageInfo || (ImgCache.options.usePersistentCache ? navigator.webkitPersistentStorage : navigator.webkitTemporaryStorage);
      if (!window.storageInfo) {
        ImgCache.overridables.log('Your browser does not support the html5 File API', LOG_LEVEL_WARNING);
        if (error_callback) { error_callback(); }
        return;
      }
      // request space for storage
      var quota_size = ImgCache.options.chromeQuota;
      window.storageInfo.requestQuota(
        quota_size,
        function () {
          /* success*/
          var persistence = (ImgCache.options.usePersistentCache ? window.PERSISTENT : window.TEMPORARY);
          savedFS(persistence, quota_size, _gotFS, _fail);
        },
        function (error) {
          /* error*/
          ImgCache.overridables.log('Failed to request quota: ' + error.message, LOG_LEVEL_ERROR);
          if (error_callback) { error_callback(); }
        }
      );
    }
  };

  ImgCache.getCurrentSize = function () {
    if (Private.hasLocalStorage()) {
      var curSize = localStorage.getItem('imgcache:' + ImgCache.options.localCacheFolder);
      if (curSize === null) {
        return 0;
      }
      return parseInt(curSize, 10);
    } else {
      return 0;
    }
  };

  // this function will not check if the image is already cached or not => it will overwrite existing data
  // on_progress callback follows this spec: http://www.w3.org/TR/2014/REC-progress-events-20140211/ -- see #54
  ImgCache.cacheFile = function (img_src, success_callback, error_callback, on_progress) {
    if (!Private.isImgCacheLoaded() || !img_src) {
      return;
    }

    img_src = Helpers.sanitizeURI(img_src);

    var filePath = Private.getCachedFileFullPath(img_src);

    var fileTransfer = new Private.FileTransferWrapper(ImgCache.attributes.filesystem);
    fileTransfer.download(
      img_src,
      filePath,
      function (entry) {
        entry.getMetadata(function (metadata) {
          if (metadata && ('size' in metadata)) {
            ImgCache.overridables.log('Cached file size: ' + metadata.size, LOG_LEVEL_INFO);
            Private.setCurrentSize(ImgCache.getCurrentSize() + parseInt(metadata.size, 10));
          } else {
            ImgCache.overridables.log('No metadata size property available', LOG_LEVEL_INFO);
          }
        });
        ImgCache.overridables.log('Download complete: ' + Helpers.EntryGetPath(entry), LOG_LEVEL_INFO);

        // iOS: the file should not be backed up in iCloud
        // new from cordova 1.8 only
        if (entry.setMetadata) {
          entry.setMetadata(
            function () {
              /* success*/
              ImgCache.overridables.log('com.apple.MobileBackup metadata set', LOG_LEVEL_INFO);
            },
            function () {
              /* failure */
              ImgCache.overridables.log('com.apple.MobileBackup metadata could not be set', LOG_LEVEL_WARNING);
            },
            {
              // 1=NO backup oddly enough..
              'com.apple.MobileBackup': 1
            }
          );
        }

        if (success_callback) {
          success_callback(entry.toURL());
        }
      },
      function (error) {
        if (error.source) { ImgCache.overridables.log('Download error source: ' + error.source, LOG_LEVEL_ERROR); }
        if (error.target) { ImgCache.overridables.log('Download error target: ' + error.target, LOG_LEVEL_ERROR); }
        ImgCache.overridables.log('Download error code: ' + error.code, LOG_LEVEL_ERROR);
        if (error_callback) { error_callback(); }
      },
      on_progress
    );
  };

  // Returns the file already available in the cached
  // Reminder: this is an asynchronous method!
  // Answer to the question comes in response_callback as the second argument (first being the path)
  ImgCache.getCachedFile = function (img_src, response_callback) {
    // sanity check
    if (!Private.isImgCacheLoaded() || !response_callback) {
      return;
    }

    var original_img_src = img_src;
    img_src = Helpers.sanitizeURI(img_src);

    var path = Private.getCachedFilePath(img_src);
    if (Helpers.isCordovaAndroid()) {
      // This hack is probably only used for older versions of Cordova
      if (path.indexOf('file://') === 0) {
        // issue #4 -- android cordova specific
        path = path.substr(7);
      }
    }

    // try to get the file entry: if it fails, there's no such file in the cache
    ImgCache.attributes.filesystem.root.getFile(
      path,
      { create: false },
      function (file_entry) { response_callback(img_src, file_entry); },
      function () { response_callback(original_img_src, null); }
    );
  };

  // Returns the local url of a file already available in the cache
  ImgCache.getCachedFileURL = function (img_src, success_callback, error_callback) {
    var _getURL = function (img_src, entry) {
      if (entry) {
        success_callback(img_src, Helpers.EntryGetURL(entry));
      } else {
        if (error_callback) { error_callback(img_src); }
      }
    };

    ImgCache.getCachedFile(img_src, _getURL);
  };

  ImgCache.getCachedFileBase64Data = function (img_src, success_callback, error_callback) {
    var _getData = function(img_src, entry) {
      if (entry) {
        Private.getBase64DataFromEntry(entry, img_src, function (base64content) {
          success_callback(img_src, base64content);
        }, error_callback);
      } else {
        if (error_callback) { error_callback(img_src); }
      }
    };

    ImgCache.getCachedFile(img_src, _getData);
  };

  // checks if a copy of the file has already been cached
  // Reminder: this is an asynchronous method!
  // Answer to the question comes in response_callback as the second argument (first being the path)
  ImgCache.isCached = function (img_src, response_callback) {
    ImgCache.getCachedFile(img_src, function (src, file_entry) {
      response_callback(src, file_entry !== null);
    });
  };

  // $img: jQuery object of an <img/> element
  // Synchronous method
  ImgCache.useOnlineFile = function ($img) {
    if (!Private.isImgCacheLoaded() || !$img) {
      return;
    }

    var prev_src = DomHelpers.getAttribute($img, OLD_SRC_ATTR);
    if (prev_src) {
      DomHelpers.setAttribute($img, 'src', prev_src);
    }
    DomHelpers.removeAttribute($img, OLD_SRC_ATTR);
  };


  // $img: jQuery object of an <img/> element
  ImgCache.useCachedFile = function ($img, success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    var img_url = Helpers.sanitizeURI(DomHelpers.getAttribute($img, 'src'));

    Private.loadCachedFile($img, img_url, Private.setNewImgPath, success_callback, error_callback);
  };

  // When the source url is not the 'src' attribute of the given img element
  ImgCache.useCachedFileWithSource = function ($img, image_url, success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    var img_url = Helpers.sanitizeURI(image_url);

    Private.loadCachedFile($img, img_url, Private.setNewImgPath, success_callback, error_callback);
  };

  // clears the cache
  ImgCache.clearCache = function (success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    // delete cache dir completely
    ImgCache.attributes.dirEntry.removeRecursively(
      function () {
        ImgCache.overridables.log('Local cache cleared', LOG_LEVEL_INFO);
        Private.setCurrentSize(0);
        // recreate the cache dir now
        Private.createCacheDir(success_callback, error_callback);
      },
      function (error) {
        ImgCache.overridables.log('Failed to remove directory or its contents: ' + error.code, LOG_LEVEL_ERROR);
        if (error_callback) { error_callback(); }
      }
    );
  };

  ImgCache.removeFile = function (img_src, success_callback, error_callback) {
    img_src = Helpers.sanitizeURI(img_src);

    var filePath = Private.getCachedFilePath(img_src);
    var _fail = function (error) {
      ImgCache.overridables.log('Failed to remove file due to ' + error.code, LOG_LEVEL_ERROR);
      if (error_callback) { error_callback(); }
    };
    ImgCache.attributes.filesystem.root.getFile(filePath, { create: false }, function (fileEntry) {
      fileEntry.remove(
        function () {
          if (success_callback) { success_callback(); }
        },
        _fail
      );
    }, _fail);
  };

  ImgCache.isBackgroundCached = function ($div, response_callback) {
    var img_src = Private.getBackgroundImageURL($div);
    ImgCache.getCachedFile(img_src, function (src, file_entry) {
      response_callback(src, file_entry !== null);
    });
  };

  ImgCache.cacheBackground = function ($div, success_callback, error_callback, on_progress) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    var img_src = Private.getBackgroundImageURL($div);
    if (!img_src) {
      ImgCache.overridables.log('No background to cache', LOG_LEVEL_WARNING);
      if (error_callback) { error_callback(); }
      return;
    }

    ImgCache.overridables.log('Background image URL: ' + img_src, LOG_LEVEL_INFO);
    ImgCache.cacheFile(img_src, success_callback, error_callback, on_progress);
  };

  ImgCache.useCachedBackground = function ($div, success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    var img_src = Private.getBackgroundImageURL($div);
    if (!img_src) {
      ImgCache.overridables.log('No background to cache', LOG_LEVEL_WARNING);
      if (error_callback) { error_callback(); }
      return;
    }

    Private.loadCachedFile($div, img_src, Private.setBackgroundImagePath, success_callback, error_callback);
  };

  ImgCache.useCachedBackgroundWithSource = function ($div, image_url, success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    Private.loadCachedFile($div, image_url, Private.setBackgroundImagePath, success_callback, error_callback);
  };

  // $div: jQuery object of an element
  // Synchronous method
  // Method used to revert call to useCachedBackground
  ImgCache.useBackgroundOnlineFile = function ($div) {
    if (!$div) {
      return;
    }

    var prev_src = DomHelpers.getAttribute($div, OLD_BACKGROUND_ATTR);
    if (prev_src) {
      DomHelpers.setBackgroundImage($div, 'url("' + prev_src + '")');
    }
    DomHelpers.removeAttribute($div, OLD_BACKGROUND_ATTR);
  };

  // returns the URI of the local cache folder (filesystem:)
  // this function is more useful for the examples than for anything else..
  // Synchronous method
  ImgCache.getCacheFolderURI = function () {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    return Helpers.EntryGetURL(ImgCache.attributes.dirEntry);
  };

  // private methods can now be used publicly
  ImgCache.helpers = Helpers;
  ImgCache.domHelpers = DomHelpers;
  ImgCache.private = Private;

  /****************************************************************************/

  // Expose the class either via AMD, CommonJS or the global object
  if (typeof define === 'function' && define.amd) {
    define('imgcache', [], function () {
      return ImgCache;
    });
  }
  else if (typeof module === 'object' && module.exports){
    module.exports = ImgCache;
  }
  else {
    window.ImgCache = ImgCache;
  }

})(window.jQuery || window.Zepto || function () { throw "jQuery is not available"; } );

;
/*** <End:imgcache.js LoadJs:"components/imgcache.js/lib/imgcache.js"> ***/
/*** <End:imgcache.js> ***/