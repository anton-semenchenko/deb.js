// Function to inject script into top of <head> or <html>
function injectScript() {
  var s = document.createElement('script');
  s.textContent = '!function(o,n){"function"==typeof define&&define.amd?define([],n):n()}(this,function(){Function.prototype.debc=function(o){return Function.prototype.deb.apply(this,[o,!0])},Function.prototype.deb=function(o,n){var t,e=function(){return"rgb("+(Math.floor(76*Math.random())+200)+","+(Math.floor(76*Math.random())+200)+","+(Math.floor(76*Math.random())+200)+")"},r=function(o,e,r){"undefined"!=typeof console&&(p&&"string"==typeof o?r!==!1&&o.indexOf("%20")<0?console[e?n?"groupCollapsed":"group":"log"]("%c"+o,"background:"+t+";"+r):console[e?n?"groupCollapsed":"group":"log"](o):console[e?"group":"log"](o))},i=function(){"undefined"!=typeof console&&console.groupEnd()},u=function(o){return o.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[0]},c=function(n,t,e){var c=u(e);if(0===n[0].indexOf("Error")&&(n=n.slice(1)),r(o+c+")",l),t&&t.length>0){r("arguments:",!0);for(var a=0;a<t.length;a++){var f="function"==typeof t[a]?"function":t[a];r(f,!1,"color:#727272;font-size:10px;")}i()}if(n&&n.length>1){r("stack trace:",!0);for(var a=0;a<n.length;a++)r("  "+n[a].trim(),!1,!1);i()}},a=function(o,n){var t="function"==typeof n;r("  returns: "+(t&&u(n)||""),!t),!t&&(r(n,!1)||i()),r("  duration: "+(Date.now()-o)+"ms"),r("}"),l&&i()},f=this,o=o?o+": ":"",l=console&&console.group&&console.groupEnd,p=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;return function(){t=e();var o=Date.now();c((new Error).stack.split(new RegExp("\\n")),arguments,f);var n=f.apply(this,Array.prototype.slice.call(arguments,0));return a(o,n),n}}});';

  var root = document.head || document.documentElement;
  var newScript = root.insertBefore(s, root.firstChild);
  s.parentNode.removeChild(s);
}

// This logic decides if deb.js should be injected or not.
if (sessionStorage.debJsState) injectScript();

// Listen for messages from background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message === 'getState') { // Get debJsState
    sendResponse(sessionStorage.debJsState);
  } else if (typeof message.setState === 'string') { // Set debJsState
    sessionStorage.debJsState = message.setState;
    sendResponse();
  }
});
