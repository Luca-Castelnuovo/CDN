!function(r,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()}(this,function(){"use strict";Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(r){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),t=e.length>>>0;if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var n=arguments[1],o=0;o<t;){var i=e[o];if(r.call(n,i,o,e))return i;o++}}}),Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(r){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),t=e.length>>>0;if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var n=arguments[1],o=0;o<t;){var i=e[o];if(r.call(n,i,o,e))return o;o++}return-1}}),Array.from||(Array.from=function(){var r=Object.prototype.toString,e=function(e){return"function"==typeof e||"[object Function]"===r.call(e)},t=function(r){var e=Number(r);return isNaN(e)?0:0!==e&&isFinite(e)?(e>0?1:-1)*Math.floor(Math.abs(e)):e},n=Math.pow(2,53)-1,o=function(r){var e=t(r);return Math.min(Math.max(e,0),n)};return function(r){var t=this,n=Object(r);if(null==r)throw new TypeError("Array.from requires an array-like object - not null or undefined");var i,f=arguments.length>1?arguments[1]:void 0;if("undefined"!=typeof f){if(!e(f))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(i=arguments[2])}for(var u,a=o(n.length),l=e(t)?Object(new t(a)):new Array(a),c=0;c<a;)u=n[c],f?l[c]="undefined"==typeof i?f(u,c):f.call(i,u,c):l[c]=u,c+=1;return l.length=a,l}}()),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(r,e){function t(r,e){return r===e||"number"==typeof r&&"number"==typeof e&&isNaN(r)&&isNaN(e)}if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if(0===o)return!1;for(var i=0|e,f=Math.max(i>=0?i:o-Math.abs(i),0);f<o;){if(t(n[f],r))return!0;f++}return!1}}),Array.prototype.some||(Array.prototype.some=function(r){if(null==this)throw new TypeError("Array.prototype.some called on null or undefined");if("function"!=typeof r)throw new TypeError;for(var e=Object(this),t=e.length>>>0,n=arguments.length>=2?arguments[1]:void 0,o=0;o<t;o++)if(o in e&&r.call(n,e[o],o,e))return!0;return!1}),Array.prototype.every||(Array.prototype.every=function(r,e){var t,n;if(null==this)throw new TypeError("this is null or not defined");var o=Object(this),i=o.length>>>0;if("function"!=typeof r)throw new TypeError;for(arguments.length>1&&(t=e),n=0;n<i;){var f;if(n in o){f=o[n];var u=r.call(t,f,n,o);if(!u)return!1}n++}return!0}),"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(r,e){if(null==r)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(r),n=1;n<arguments.length;n++){var o=arguments[n];if(null!=o)for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i])}return t},writable:!0,configurable:!0}),function(){function r(r,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var t=document.createEvent("CustomEvent");return t.initCustomEvent(r,e.bubbles,e.cancelable,e.detail),t}return"function"!=typeof window.CustomEvent&&(r.prototype=window.Event.prototype,void(window.CustomEvent=r))}()});
