(()=>{var e={50203:function(e,t){var n,o,i;o=[],void 0===(i="function"==typeof(n=function(){var e,t,n,o,i,a,r,s=/^(?:AUTH|ENROLL)+\|[A-Za-z0-9\+\/=]+\|[A-Za-z0-9\+\/=]+$/,u=/^ERR\|[\w\s\.\(\)]+$/,m=/^DUO_OPEN_WINDOW\|/,d=["duo.com","duosecurity.com","duomobile.s3-us-west-1.amazonaws.com"];function c(){e="",t="sig_response",n=void 0,o=void 0,i=void 0,a=void 0,r=void 0}function f(e,t){var n=t||"https://www.duosecurity.com/docs/duoweb#3.-show-the-iframe";throw new Error("Duo Web SDK error: "+e+(n?"\nSee "+n+" for more information":""))}function l(e){return e.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase()}function h(e,t){return"dataset"in e?e.dataset[t]:e.getAttribute("data-"+l(t))}function p(e,t,n,o){"addEventListener"in window?e.addEventListener(t,o,!1):e.attachEvent(n,o)}function g(e,t,n,o){"removeEventListener"in window?e.removeEventListener(t,o,!1):e.detachEvent(n,o)}function v(e){p(document,"DOMContentLoaded","onreadystatechange",e)}function w(e){g(document,"DOMContentLoaded","onreadystatechange",e)}function b(e){p(window,"message","onmessage",e)}function _(e){g(window,"message","onmessage",e)}function y(e){if(e){0===e.indexOf("ERR|")&&f(e.split("|")[1]),-1!==e.indexOf(":")&&2===e.split(":").length||f("Duo was given a bad token.  This might indicate a configuration problem with one of Duo's client libraries.");var t=e.split(":");return o=t[0],i=t[1],{sigRequest:e,duoSig:t[0],appSig:t[1]}}}function E(e){return Boolean(e.origin==="https://"+n&&"string"==typeof e.data&&(e.data.match(s)||e.data.match(u)||e.data.match(m)))}function C(o){c(),o&&(o.host&&(n=o.host),o.sig_request&&y(o.sig_request),o.post_action&&(e=o.post_action),o.post_argument&&(t=o.post_argument),"function"==typeof o.submit_callback&&(r=o.submit_callback));var i=D(o);i?I(i,o.iframeAttributes||{}):N(o),w(C)}function D(e){var t;return e.iframe&&e.iframeContainer?f("Passing both `iframe` and `iframeContainer` arguments at the same time is not allowed."):e.iframe?R(t=O(e.iframe)):e.iframeContainer?x(t=O(e.iframeContainer)):t=document.getElementById("duo_iframe"),t}function O(e){return e.tagName?e:"string"==typeof e?document.getElementById(e):null}function A(e){return e&&e.tagName&&"iframe"===e.tagName.toLowerCase()}function R(e){e&&!A(e)&&f("`iframe` only accepts an iframe element or the id of an iframe. To use a non-iframe element, use the `iframeContainer` argument.")}function x(e){e&&A(e)&&f("`iframeContainer` only accepts a non-iframe element or the id of a non-iframe. To use a non-iframe element, use the `iframeContainer` argument on Duo.init().")}function L(){return["https://",n,"/frame/web/v1/auth?tx=",encodeURIComponent(o),"&parent=",encodeURIComponent(document.location.href),"&v=2.9"].join("")}function S(e){if(E(e))if(e.data.match(m)){var t=e.data.substring("DUO_OPEN_WINDOW|".length);q(t)&&window.open(t,"_self")}else B(e.data),_(S)}function q(e){if(!e)return!1;var t=document.createElement("a");if(t.href=e,"duotrustedendpoints:"===t.protocol)return!0;if("https:"!==t.protocol)return!1;for(var n=0;n<d.length;n++)if(t.hostname.endsWith("."+d[n])||t.hostname===d[n])return!0;return!1}function N(e){var t=function(){var n=D(e);n||f('This page does not contain an iframe for Duo to use. Add an element like <iframe id="duo_iframe"></iframe> to this page.'),I(n,e.iframeAttributes||{}),w(t)};v(t)}function I(r,s){if(n||(n=h(r,"host"))||f("No API hostname is given for Duo to use.  Be sure to pass a `host` parameter to Duo.init, or through the `data-host` attribute on the iframe element."),o&&i||(y(h(r,"sigRequest")),o&&i||f("No valid signed request is given.  Be sure to give the `sig_request` parameter to Duo.init, or use the `data-sig-request` attribute on the iframe element.")),""===e&&(e=h(r,"postAction")||e),"sig_response"===t&&(t=h(r,"postArgument")||t),A(r))(a=r).src=L();else{for(;r.firstChild;)r.removeChild(r.firstChild);for(var u in a=document.createElement("iframe"),s.src=L(),s)a.setAttribute(u,s[u]);r.appendChild(a)}b(S)}function B(n){var o=document.createElement("input");o.type="hidden",o.name=t,o.value=n+":"+i;var s=document.getElementById("duo_form");s||(s=document.createElement("form"),a.parentElement.insertBefore(s,a.nextSibling)),s.method="POST",s.action=e,s.appendChild(o),"function"==typeof r?r.call(null,s):s.submit()}return c(),{init:C,_onReady:v,_parseSigRequest:y,_isDuoMessage:E,_doPostBack:B}})?n.apply(t,o):n)||(e.exports=i)},35041:(e,t,n)=>{"use strict";n.r(t)}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,n),a.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";var e=n(50203);function t(e){const t=window.location.href;e=e.replace(/[\[\]]/g,"\\$&");const n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}n(35041),document.addEventListener("DOMContentLoaded",(()=>{const n=document.createElement("iframe");n.setAttribute("id","duo_iframe"),r(),document.body.appendChild(n);const o=t("host"),i=t("request"),a=new URL("https://"+o);function r(){n.style.height=window.innerHeight+"px"}(a.hostname.endsWith(".duosecurity.com")||a.hostname.endsWith(".duofederal.com"))&&(e.init({iframe:"duo_iframe",host:a.hostname,sig_request:i,submit_callback:e=>{!function(e){try{window.invokeCSharpAction(e)}catch(t){console.log(t)}}(e.elements.sig_response.value)}}),window.onresize=r)}))})()})();
//# sourceMappingURL=duo.ea24746ddbb6ac2bf5cd.js.map