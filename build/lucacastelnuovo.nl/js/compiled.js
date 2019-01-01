"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(o,n){"function"==typeof define&&define.amd?define(["jquery"],function(e){return n(e,o,o.document,o.Math)}):"object"==("undefined"==typeof exports?"undefined":_typeof(exports))&&exports?module.exports=n(require("jquery"),o,o.document,o.Math):n(jQuery,o,o.document,o.Math)}("undefined"!=typeof window?window:void 0,function(oo,no,to,io,ao){var lo="fullpage-wrapper",so="."+lo,ro="fp-responsive",co="fp-notransition",fo="fp-destroyed",uo="fp-enabled",ho="fp-viewing",vo="active",po="."+vo,go="fp-completely",mo="fp-section",wo="."+mo,So=wo+po,yo="fp-tableCell",bo="."+yo,xo="fp-nav",Co="#"+xo,To="fp-tooltip",ko="fp-slide",Lo="."+ko,Ao=Lo+po,Oo="fp-slides",Io="."+Oo,Eo="fp-slidesContainer",Mo="."+Eo,Bo="fp-table",Ro="fp-slidesNav",zo="."+Ro,Ho=zo+" a",e="fp-controlArrow",Do="."+e,Po="fp-prev",qo=Do+"."+Po,Fo=Do+".fp-next",Vo=oo(no),jo=oo(to);oo.fn.fullpage=function(y){function n(e,o){e||de(0),he("autoScrolling",e,o);var n=oo(So);y.autoScrolling&&!y.scrollBar?(ge.css({overflow:"hidden",height:"100%"}),t(Ne.recordHistory,"internal"),Le.css({"-ms-touch-action":"none","touch-action":"none"}),n.length&&de(n.position().top)):(ge.css({overflow:"visible",height:"initial"}),t(!1,"internal"),Le.css({"-ms-touch-action":"","touch-action":""}),n.length&&ge.scrollTop(n.position().top))}function t(e,o){he("recordHistory",e,o)}function i(e,o){he("scrollingSpeed",e,o)}function a(e,o){he("fitToSection",e,o)}function o(e){e?(function(){var e,o="";no.addEventListener?e="addEventListener":(e="attachEvent",o="on");var n="onwheel"in to.createElement("div")?"wheel":to.onmousewheel!==ao?"mousewheel":"DOMMouseScroll";"DOMMouseScroll"==n?to[e](o+"MozMousePixelScroll",k,!1):to[e](o+n,k,!1)}(),Le.on("mousedown",j).on("mouseup",Y)):(to.addEventListener?(to.removeEventListener("mousewheel",k,!1),to.removeEventListener("wheel",k,!1),to.removeEventListener("MozMousePixelScroll",k,!1)):to.detachEvent("onmousewheel",k),Le.off("mousedown",j).off("mouseup",Y))}function l(n,e){void 0!==e?(e=e.replace(/ /g,"").split(","),oo.each(e,function(e,o){ue(n,o,"m")})):(ue(n,"all","m"),n?(o(!0),(Te||ke)&&(y.autoScrolling&&me.off(je.touchmove).on(je.touchmove,w),oo(so).off(je.touchstart).on(je.touchstart,C).off(je.touchmove).on(je.touchmove,S))):(o(!1),(Te||ke)&&(y.autoScrolling&&me.off(je.touchmove),oo(so).off(je.touchstart).off(je.touchmove))))}function s(n,e){void 0!==e?(e=e.replace(/ /g,"").split(","),oo.each(e,function(e,o){ue(n,o,"k")})):(ue(n,"all","k"),y.keyboardScrolling=n)}function r(){var e=oo(So).prev(wo);e.length||!y.loopTop&&!y.continuousVertical||(e=oo(wo).last()),e.length&&O(e,null,!0)}function c(){var e=oo(So).next(wo);e.length||!y.loopBottom&&!y.continuousVertical||(e=oo(wo).first()),e.length&&O(e,null,!1)}function d(e,o){i(0,"internal"),f(e,o),i(Ne.scrollingSpeed,"internal")}function f(e,o){var n=oe(e);void 0!==o?ne(e,o):0<n.length&&O(n)}function u(e){L("right",e)}function h(e){L("left",e)}function v(e){if(!Le.hasClass(fo)){Oe=!0,Ae=Vo.height(),oo(wo).each(function(){var e=oo(this).find(Io),o=oo(this).find(Lo);y.verticalCentered&&oo(this).find(bo).css("height",$(oo(this))+"px"),oo(this).css("height",Ae+"px"),1<o.length&&X(e,e.find(Ao))}),y.scrollOverflow&&Re.createScrollBarForAll();var o=oo(So).index(wo);o&&d(o+1),Oe=!1,oo.isFunction(y.afterResize)&&e&&y.afterResize.call(Le),oo.isFunction(y.afterReBuild)&&!e&&y.afterReBuild.call(Le)}}function p(e){var o=me.hasClass(ro);e?o||(n(!1,"internal"),a(!1,"internal"),oo(Co).hide(),me.addClass(ro),oo.isFunction(y.afterResponsive)&&y.afterResponsive.call(Le,e)):o&&(n(Ne.autoScrolling,"internal"),a(Ne.autoScrolling,"internal"),oo(Co).show(),me.removeClass(ro),oo.isFunction(y.afterResponsive)&&y.afterResponsive.call(Le,e))}function e(){var e,o=oo(So);o.addClass(go),M(o),B(o),y.scrollOverflow&&y.scrollOverflowHandler.afterLoad(),(!(e=oe(q().section))||e.length&&e.index()===xe.index())&&oo.isFunction(y.afterLoad)&&y.afterLoad.call(o,o.data("anchor"),o.index(wo)+1),oo.isFunction(y.afterRender)&&y.afterRender.call(Le)}function g(){var e,o,n,t,i;if(!y.autoScrolling||y.scrollBar){var a=Vo.scrollTop(),l=(i=Ue<a?"down":"up",Je=Ue=a,i),s=0,r=a+Vo.height()/2,c=me.height()-Vo.height()===a,d=to.querySelectorAll(wo);if(c)s=d.length-1;else if(a)for(var f=0;f<d.length;++f)d[f].offsetTop<=r&&(s=f);else s=0;if(o=l,n=oo(So).position().top,t=n+Vo.height(),("up"==o?t>=Vo.scrollTop()+Vo.height():n<=Vo.scrollTop())&&(oo(So).hasClass(go)||oo(So).addClass(go).siblings().removeClass(go)),!(e=oo(d).eq(s)).hasClass(vo)){Xe=!0;var u,h,v=oo(So),p=v.index(wo)+1,g=J(e),m=e.data("anchor"),w=e.index(wo)+1,S=e.find(Ao);S.length&&(h=S.data("anchor"),u=S.index()),Ee&&(e.addClass(vo).siblings().removeClass(vo),oo.isFunction(y.onLeave)&&y.onLeave.call(v,p,w,g),oo.isFunction(y.afterLoad)&&y.afterLoad.call(e,m,w),z(v),M(e),B(e),G(m,w-1),y.anchors.length&&(Se=m),ie(u,h,m,w)),clearTimeout(Pe),Pe=setTimeout(function(){Xe=!1},100)}y.fitToSection&&(clearTimeout(qe),qe=setTimeout(function(){y.fitToSection&&oo(So).outerHeight()<=Ae&&b()},y.fitToSectionDelay))}}function b(){Ee&&(Oe=!0,O(oo(So)),Oe=!1)}function m(e){if(Be.m[e]){var o="down"===e?c:r;if(y.scrollOverflow){var n=y.scrollOverflowHandler.scrollable(oo(So)),t="down"===e?"bottom":"top";if(0<n.length){if(!y.scrollOverflowHandler.isScrolled(t,n))return!0;o()}else o()}else o()}}function w(e){var o=e.originalEvent;y.autoScrolling&&x(o)&&e.preventDefault()}function S(e){var o=e.originalEvent,n=oo(o.target).closest(wo);if(x(o)){y.autoScrolling&&e.preventDefault();var t=re(o);_e=t.y,Qe=t.x,n.find(Io).length&&io.abs(Ke-Qe)>io.abs(We-_e)?!Ce&&io.abs(Ke-Qe)>Vo.outerWidth()/100*y.touchSensitivity&&(Qe<Ke?Be.m.right&&u(n):Be.m.left&&h(n)):y.autoScrolling&&Ee&&io.abs(We-_e)>Vo.height()/100*y.touchSensitivity&&(_e<We?m("down"):We<_e&&m("up"))}}function x(e){return void 0===e.pointerType||"mouse"!=e.pointerType}function C(e){var o=e.originalEvent;if(y.fitToSection&&ge.stop(),x(o)){var n=re(o);We=n.y,Ke=n.x}}function T(e,o){for(var n=0,t=e.slice(io.max(e.length-o,1)),i=0;i<t.length;i++)n+=t[i];return io.ceil(n/o)}function k(e){var o=(new Date).getTime(),n=oo(".fp-completely").hasClass("fp-normal-scroll");if(y.autoScrolling&&!be&&!n){var t=(e=e||no.event).wheelDelta||-e.deltaY||-e.detail,i=io.max(-1,io.min(1,t)),a=void 0!==e.wheelDeltaX||void 0!==e.deltaX,l=io.abs(e.wheelDeltaX)<io.abs(e.wheelDelta)||io.abs(e.deltaX)<io.abs(e.deltaY)||!a;149<Me.length&&Me.shift(),Me.push(io.abs(t)),y.scrollBar&&(e.preventDefault?e.preventDefault():e.returnValue=!1);var s=o-Ge;return Ge=o,200<s&&(Me=[]),Ee&&T(Me,10)>=T(Me,70)&&l&&m(i<0?"down":"up"),!1}y.fitToSection&&ge.stop()}function L(e,o){var n=(void 0===o?oo(So):o).find(Io),t=n.find(Lo).length;if(!(!n.length||Ce||t<2)){var i=n.find(Ao),a=null;if(!(a="left"===e?i.prev(Lo):i.next(Lo)).length){if(!y.loopHorizontal)return;a="left"===e?i.siblings(":last"):i.siblings(":first")}Ce=!0,X(n,a,e)}}function A(){oo(Ao).each(function(){ce(oo(this),"internal")})}function O(e,o,n){if(void 0!==e){var t,i,a={element:e,callback:o,isMovementUp:n,dtop:(r=e,c=r.position(),d=c.top,f=c.top>Je,u=d-Ae+r.outerHeight(),h=y.bigSectionsDestination,r.outerHeight()>Ae?(f||h)&&"bottom"!==h||(d=u):(f||Oe&&r.is(":last-child"))&&(d=u),Je=d),yMovement:J(e),anchorLink:e.data("anchor"),sectionIndex:e.index(wo),activeSlide:e.find(Ao),activeSection:oo(So),leavingSection:oo(So).index(wo)+1,localIsResizing:Oe};if(!(a.activeSection.is(e)&&!Oe||y.scrollBar&&Vo.scrollTop()===a.dtop&&!e.hasClass("fp-auto-height"))){if(a.activeSlide.length&&(t=a.activeSlide.data("anchor"),i=a.activeSlide.index()),oo.isFunction(y.onLeave)&&!a.localIsResizing){var l=a.yMovement;if(void 0!==n&&(l=n?"up":"down"),!1===y.onLeave.call(a.activeSection,a.leavingSection,a.sectionIndex+1,l))return}y.autoScrolling&&y.continuousVertical&&void 0!==a.isMovementUp&&(!a.isMovementUp&&"up"==a.yMovement||a.isMovementUp&&"down"==a.yMovement)&&((s=a).isMovementUp?oo(So).before(s.activeSection.nextAll(wo)):oo(So).after(s.activeSection.prevAll(wo).get().reverse()),de(oo(So).position().top),A(),s.wrapAroundElements=s.activeSection,s.dtop=s.element.position().top,s.yMovement=J(s.element),s.leavingSection=s.activeSection.index(wo)+1,s.sectionIndex=s.element.index(wo),a=s),a.localIsResizing||z(a.activeSection),y.scrollOverflow&&y.scrollOverflowHandler.beforeLeave(),e.addClass(vo).siblings().removeClass(vo),M(e),y.scrollOverflow&&y.scrollOverflowHandler.onLeave(),Ee=!1,ie(i,t,a.anchorLink,a.sectionIndex),function(e){if(y.css3&&y.autoScrolling&&!y.scrollBar){ee("translate3d(0px, -"+io.round(e.dtop)+"px, 0px)",!0),y.scrollingSpeed?(clearTimeout(He),He=setTimeout(function(){I(e)},y.scrollingSpeed)):I(e)}else{var o=(n=e,t={},y.autoScrolling&&!y.scrollBar?(t.options={top:-n.dtop},t.element=so):(t.options={scrollTop:n.dtop},t.element="html, body"),t);oo(o.element).animate(o.options,y.scrollingSpeed,y.easing).promise().done(function(){y.scrollBar?setTimeout(function(){I(e)},30):I(e)})}var n,t}(a),Se=a.anchorLink,G(a.anchorLink,a.sectionIndex)}}var s,r,c,d,f,u,h}function I(e){var o;(o=e).wrapAroundElements&&o.wrapAroundElements.length&&(o.isMovementUp?oo(".fp-section:first").before(o.wrapAroundElements):oo(".fp-section:last").after(o.wrapAroundElements),de(oo(So).position().top),A()),oo.isFunction(y.afterLoad)&&!e.localIsResizing&&y.afterLoad.call(e.element,e.anchorLink,e.sectionIndex+1),y.scrollOverflow&&y.scrollOverflowHandler.afterLoad(),e.localIsResizing||B(e.element),e.element.addClass(go).siblings().removeClass(go),Ee=!0,oo.isFunction(e.callback)&&e.callback.call(this)}function E(e,o){e.attr(o,e.data(o)).removeAttr("data-"+o)}function M(e){var t;y.lazyLoading&&H(e).find("img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]").each(function(){if(t=oo(this),oo.each(["src","srcset"],function(e,o){var n=t.attr("data-"+o);void 0!==n&&n&&E(t,o)}),t.is("source")&&!t.closest("picture").length){var e=t.closest("video").length?"video":"audio";t.closest(e).get(0).load()}})}function B(e){var o=H(e);o.find("video, audio").each(function(){var e=oo(this).get(0);e.hasAttribute("data-autoplay")&&"function"==typeof e.play&&e.play()}),o.find('iframe[src*="youtube.com/embed/"]').each(function(){var e=oo(this).get(0);e.hasAttribute("data-autoplay")&&R(e),e.onload=function(){e.hasAttribute("data-autoplay")&&R(e)}})}function R(e){e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*")}function z(e){var o=H(e);o.find("video, audio").each(function(){var e=oo(this).get(0);e.hasAttribute("data-keepplaying")||"function"!=typeof e.pause||e.pause()}),o.find('iframe[src*="youtube.com/embed/"]').each(function(){var e=oo(this).get(0);/youtube\.com\/embed\//.test(oo(this).attr("src"))&&!e.hasAttribute("data-keepplaying")&&oo(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")})}function H(e){var o=e.find(Ao);return o.length&&(e=oo(o)),e}function D(){var e=q(),o=e.section,n=e.slide;o&&(y.animateAnchor?ne(o,n):d(o,n))}function P(){if(!Xe&&!y.lockAnchors){var e=q(),o=e.section,n=e.slide,t=void 0===Se,i=void 0===Se&&void 0===n&&!Ce;o&&o.length&&(o&&o!==Se&&!t||i||!Ce&&ye!=n)&&ne(o,n)}}function q(){var e,o,n=no.location.hash;if(n.length){var t=n.replace("#","").split("/"),i=-1<n.indexOf("#/");e=i?"/"+t[1]:decodeURIComponent(t[0]);var a=i?t[2]:t[1];a&&a.length&&(o=decodeURIComponent(a))}return{section:e,slide:o}}function F(e){clearTimeout(Fe);var o=oo(":focus"),n=e.which;9===n?function(e){function o(e){return e.preventDefault(),l.first().focus()}var n=e.shiftKey,t=oo(":focus"),i=oo(So),a=i.find(Ao),l=(a.length?a:i).find(Ye).not('[tabindex="-1"]');t.length?t.closest(So,Ao).length||(t=o(e)):o(e),(!n&&t.is(l.last())||n&&t.is(l.first()))&&e.preventDefault()}(e):o.is("textarea")||o.is("input")||o.is("select")||"true"===o.attr("contentEditable")||""===o.attr("contentEditable")||!y.keyboardScrolling||!y.autoScrolling||(-1<oo.inArray(n,[40,38,32,33,34])&&e.preventDefault(),be=e.ctrlKey,Fe=setTimeout(function(){!function(e){var o=e.shiftKey;if(Ee||!([37,39].indexOf(e.which)<0))switch(e.which){case 38:case 33:Be.k.up&&r();break;case 32:if(o&&Be.k.up){r();break}case 40:case 34:Be.k.down&&c();break;case 36:Be.k.up&&f(1);break;case 35:Be.k.down&&f(oo(wo).length);break;case 37:Be.k.left&&h();break;case 39:Be.k.right&&u()}}(e)},150))}function V(e){Ie&&(be=e.ctrlKey)}function j(e){2==e.which&&(Ze=e.pageY,Le.on("mousemove",N))}function Y(e){2==e.which&&Le.off("mousemove")}function N(e){Ee&&(e.pageY<Ze&&Be.m.up?r():e.pageY>Ze&&Be.m.down&&c()),Ze=e.pageY}function X(e,o,n){var t,i,a=e.closest(wo),l={slides:e,destiny:o,direction:n,destinyPos:o.position(),slideIndex:o.index(),section:a,sectionIndex:a.index(wo),anchorLink:a.data("anchor"),slidesNav:a.find(zo),slideAnchor:le(o),prevSlide:a.find(Ao),prevSlideIndex:a.find(Ao).index(),localIsResizing:Oe};l.xMovement=(t=l.prevSlideIndex,i=l.slideIndex,t==i?"none":i<t?"left":"right"),l.localIsResizing||(Ee=!1),y.onSlideLeave&&!l.localIsResizing&&"none"!==l.xMovement&&oo.isFunction(y.onSlideLeave)&&!1===y.onSlideLeave.call(l.prevSlide,l.anchorLink,l.sectionIndex+1,l.prevSlideIndex,l.direction,l.slideIndex)?Ce=!1:(o.addClass(vo).siblings().removeClass(vo),l.localIsResizing||(z(l.prevSlide),M(o)),!y.loopHorizontal&&y.controlArrows&&(a.find(qo).toggle(0!==l.slideIndex),a.find(Fo).toggle(!o.is(":last-child"))),a.hasClass(vo)&&!l.localIsResizing&&ie(l.slideIndex,l.slideAnchor,l.anchorLink,l.sectionIndex),function(e,o){var n=o.destinyPos;if(y.css3){var t="translate3d(-"+io.round(n.left)+"px, 0px, 0px)";_(e.find(Mo)).css(fe(t)),De=setTimeout(function(){U(o)},y.scrollingSpeed,y.easing)}else e.animate({scrollLeft:io.round(n.left)},y.scrollingSpeed,y.easing,function(){U(o)})}(e,l))}function U(e){var o,n;o=e.slidesNav,n=e.slideIndex,o.find(po).removeClass(vo),o.find("li").eq(n).find("a").addClass(vo),e.localIsResizing||(oo.isFunction(y.afterSlideLoad)&&y.afterSlideLoad.call(e.destiny,e.anchorLink,e.sectionIndex+1,e.slideAnchor,e.slideIndex),Ee=!0,B(e.destiny)),Ce=!1}function W(){if(K(),Te){var e=oo(to.activeElement);if(!e.is("textarea")&&!e.is("input")&&!e.is("select")){var o=Vo.height();io.abs(o-$e)>20*io.max($e,o)/100&&(v(!0),$e=o)}}else clearTimeout(ze),ze=setTimeout(function(){v(!0)},350)}function K(){var e=y.responsive||y.responsiveWidth,o=y.responsiveHeight,n=e&&Vo.outerWidth()<e,t=o&&Vo.height()<o;e&&o?p(n||t):e?p(n):o&&p(t)}function _(e){var o="all "+y.scrollingSpeed+"ms "+y.easingcss3;return e.removeClass(co),e.css({"-webkit-transition":o,transition:o})}function Q(e){return e.addClass(co)}function G(e,o){var n,t,i;i=e,y.menu&&(oo(y.menu).find(po).removeClass(vo),oo(y.menu).find('[data-menuanchor="'+i+'"]').addClass(vo)),n=e,t=o,y.navigation&&(oo(Co).find(po).removeClass(vo),n?oo(Co).find('a[href="#'+n+'"]').addClass(vo):oo(Co).find("li").eq(t).find("a").addClass(vo))}function J(e){var o=oo(So).index(wo),n=e.index(wo);return o==n?"none":n<o?"up":"down"}function Z(e){if(!e.hasClass(Bo)){var o=oo('<div class="'+yo+'" />').height($(e));e.addClass(Bo).wrapInner(o)}}function $(e){var o=Ae;if(y.paddingTop||y.paddingBottom){var n=e;n.hasClass(mo)||(n=e.closest(wo));var t=parseInt(n.css("padding-top"))+parseInt(n.css("padding-bottom"));o=Ae-t}return o}function ee(e,o){o?_(Le):Q(Le),Le.css(fe(e)),setTimeout(function(){Le.removeClass(co)},10)}function oe(e){var o=Le.find(wo+'[data-anchor="'+e+'"]');if(!o.length){var n=void 0!==e?e-1:0;o=oo(wo).eq(n)}return o}function ne(e,o){var n,t,i,a=oe(e);if(a.length){var l=(n=o,(i=(t=a).find(Lo+'[data-anchor="'+n+'"]')).length||(n=void 0!==n?n:0,i=t.find(Lo).eq(n)),i);e===Se||a.hasClass(vo)?te(l):O(a,function(){te(l)})}}function te(e){e.length&&X(e.closest(Io),e)}function ie(e,o,n){var t="";y.anchors.length&&!y.lockAnchors&&(e?(void 0!==n&&(t=n),void 0===o&&(o=e),ae(t+"/"+(ye=o))):(void 0!==e&&(ye=o),ae(n))),se()}function ae(e){if(y.recordHistory)location.hash=e;else if(Te||ke)no.history.replaceState(ao,ao,"#"+e);else{var o=no.location.href.split("#")[0];no.location.replace(o+"#"+e)}}function le(e){var o=e.data("anchor"),n=e.index();return void 0===o&&(o=n),o}function se(){var e=oo(So),o=e.find(Ao),n=le(e),t=le(o),i=String(n);o.length&&(i=i+"-"+t),i=i.replace("/","-").replace("#","");var a=new RegExp("\\b\\s?"+ho+"-[^\\s]+\\b","g");me[0].className=me[0].className.replace(a,""),me.addClass(ho+"-"+i)}function re(e){var o=[];return o.y=void 0!==e.pageY&&(e.pageY||e.pageX)?e.pageY:e.touches[0].pageY,o.x=void 0!==e.pageX&&(e.pageY||e.pageX)?e.pageX:e.touches[0].pageX,ke&&x(e)&&(y.scrollBar||!y.autoScrolling)&&(o.y=e.touches[0].pageY,o.x=e.touches[0].pageX),o}function ce(e,o){i(0,"internal"),void 0!==o&&(Oe=!0),X(e.closest(Io),e),void 0!==o&&(Oe=!1),i(Ne.scrollingSpeed,"internal")}function de(e){var o=io.round(e);y.css3&&y.autoScrolling&&!y.scrollBar?ee("translate3d(0px, -"+o+"px, 0px)",!1):y.autoScrolling&&!y.scrollBar?Le.css("top",-o):ge.scrollTop(o)}function fe(e){return{"-webkit-transform":e,"-moz-transform":e,"-ms-transform":e,transform:e}}function ue(n,e,t){"all"!==e?Be[t][e]=n:oo.each(Object.keys(Be[t]),function(e,o){Be[t][o]=n})}function he(e,o,n){y[e]=o,"internal"!==n&&(Ne[e]=o)}function ve(){oo("html").hasClass(uo)?pe("error","Fullpage.js can only be initialized once and you are doing it multiple times!"):(y.continuousVertical&&(y.loopTop||y.loopBottom)&&(y.continuousVertical=!1,pe("warn","Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),y.scrollBar&&y.scrollOverflow&&pe("warn","Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"),!y.continuousVertical||!y.scrollBar&&y.autoScrolling||(y.continuousVertical=!1,pe("warn","Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),y.scrollOverflow&&!y.scrollOverflowHandler&&(y.scrollOverflow=!1,pe("error","The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.")),oo.each(["fadingEffect","continuousHorizontal","scrollHorizontally","interlockedSlides","resetSliders","responsiveSlides","offsetSections","dragAndMove","scrollOverflowReset","parallax"],function(e,o){y[o]&&pe("warn","fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: "+o)}),oo.each(y.anchors,function(e,o){var n=jo.find("[name]").filter(function(){return oo(this).attr("name")&&oo(this).attr("name").toLowerCase()==o.toLowerCase()}),t=jo.find("[id]").filter(function(){return oo(this).attr("id")&&oo(this).attr("id").toLowerCase()==o.toLowerCase()});(t.length||n.length)&&(pe("error","data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."),t.length&&pe("error",'"'+o+'" is is being used by another element `id` property'),n.length&&pe("error",'"'+o+'" is is being used by another element `name` property'))}))}function pe(e,o){console&&console[e]&&console[e]("fullPage: "+o)}if(oo("html").hasClass(uo))ve();else{var ge=oo("html, body"),me=oo("body"),we=oo.fn.fullpage;y=oo.extend({menu:!1,anchors:[],lockAnchors:!1,navigation:!1,navigationPosition:"right",navigationTooltips:[],showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:"bottom",scrollBar:!1,hybrid:!1,css3:!0,scrollingSpeed:700,autoScrolling:!0,fitToSection:!0,fitToSectionDelay:1e3,easing:"easeInOutCubic",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,continuousHorizontal:!1,scrollHorizontally:!1,interlockedSlides:!1,dragAndMove:!1,offsetSections:!1,resetSliders:!1,fadingEffect:!1,normalScrollElements:null,scrollOverflow:!1,scrollOverflowReset:!1,scrollOverflowHandler:oo.fn.fp_scrolloverflow?oo.fn.fp_scrolloverflow.iscrollHandler:null,scrollOverflowOptions:null,touchSensitivity:5,normalScrollElementTouchThreshold:5,bigSectionsDestination:null,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,controlArrows:!0,controlArrowColor:"#fff",verticalCentered:!0,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,responsiveWidth:0,responsiveHeight:0,responsiveSlides:!1,parallax:!1,parallaxOptions:{type:"reveal",percentage:62,property:"translate"},sectionSelector:".section",slideSelector:".slide",afterLoad:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null,afterResponsive:null,lazyLoading:!0},y);var Se,ye,be,xe,Ce=!1,Te=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),ke="ontouchstart"in no||0<navigator.msMaxTouchPoints||navigator.maxTouchPoints,Le=oo(this),Ae=Vo.height(),Oe=!1,Ie=!0,Ee=!0,Me=[],Be={m:{up:!0,down:!0,left:!0,right:!0}};Be.k=oo.extend(!0,{},Be.m);var Re,ze,He,De,Pe,qe,Fe,Ve=no.PointerEvent?{down:"pointerdown",move:"pointermove"}:{down:"MSPointerDown",move:"MSPointerMove"},je={touchmove:"ontouchmove"in no?"touchmove":Ve.move,touchstart:"ontouchstart"in no?"touchstart":Ve.down},Ye='a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]',Ne=oo.extend(!0,{},y);ve(),oo.extend(oo.easing,{easeInOutCubic:function(e,o,n,t,i){return(o/=i/2)<1?t/2*o*o*o+n:t/2*((o-=2)*o*o+2)+n}}),oo(this).length&&(we.version="2.9.7",we.setAutoScrolling=n,we.setRecordHistory=t,we.setScrollingSpeed=i,we.setFitToSection=a,we.setLockAnchors=function(e){y.lockAnchors=e},we.setMouseWheelScrolling=o,we.setAllowScrolling=l,we.setKeyboardScrolling=s,we.moveSectionUp=r,we.moveSectionDown=c,we.silentMoveTo=d,we.moveTo=f,we.moveSlideRight=u,we.moveSlideLeft=h,we.fitToSection=b,we.reBuild=v,we.setResponsive=p,we.destroy=function(e){n(!1,"internal"),l(!1),s(!1),Le.addClass(fo),clearTimeout(De),clearTimeout(He),clearTimeout(ze),clearTimeout(Pe),clearTimeout(qe),Vo.off("scroll",g).off("hashchange",P).off("resize",W),jo.off("keydown",F).off("keyup",V).off("click touchstart",Co+" a").off("mouseenter",Co+" li").off("mouseleave",Co+" li").off("click touchstart",Ho).off("mouseover",y.normalScrollElements).off("mouseout",y.normalScrollElements),oo(wo).off("click touchstart",Do),clearTimeout(De),clearTimeout(He),e&&function(){de(0),Le.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function(){E(oo(this),"src")}),Le.find("img[data-srcset]").each(function(){E(oo(this),"srcset")}),oo(Co+", "+zo+", "+Do).remove(),oo(wo).css({height:"","background-color":"",padding:""}),oo(Lo).css({width:""}),Le.css({height:"",position:"","-ms-touch-action":"","touch-action":""}),ge.css({overflow:"",height:""}),oo("html").removeClass(uo),me.removeClass(ro),oo.each(me.get(0).className.split(/\s+/),function(e,o){0===o.indexOf(ho)&&me.removeClass(o)}),oo(wo+", "+Lo).each(function(){y.scrollOverflowHandler&&y.scrollOverflowHandler.remove(oo(this)),oo(this).removeClass(Bo+" "+vo),oo(this).attr("style",oo(this).data("fp-styles"))}),Q(Le),Le.find(bo+", "+Mo+", "+Io).each(function(){oo(this).replaceWith(this.childNodes)}),Le.css({"-webkit-transition":"none",transition:"none"}),ge.scrollTop(0);var e=[mo,ko,Eo];oo.each(e,function(e,o){oo("."+o).removeClass(o)})}()},we.shared={afterRenderActions:e},y.css3&&(y.css3=function(){var e,o=to.createElement("p"),n={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};for(var t in to.body.insertBefore(o,null),n)o.style[t]!==ao&&(o.style[t]="translate3d(1px,1px,1px)",e=no.getComputedStyle(o).getPropertyValue(n[t]));return to.body.removeChild(o),e!==ao&&0<e.length&&"none"!==e}()),y.scrollBar=y.scrollBar||y.hybrid,eo=Le.find(y.sectionSelector),y.anchors.length||(y.anchors=eo.filter("[data-anchor]").map(function(){return oo(this).data("anchor").toString()}).get()),y.navigationTooltips.length||(y.navigationTooltips=eo.filter("[data-tooltip]").map(function(){return oo(this).data("tooltip").toString()}).get()),Le.css({height:"100%",position:"relative"}),Le.addClass(lo),oo("html").addClass(uo),Ae=Vo.height(),Le.removeClass(fo),Le.find(y.sectionSelector).addClass(mo),Le.find(y.slideSelector).addClass(ko),oo(wo).each(function(e){var o,n,t,i,a=oo(this),l=a.find(Lo),s=l.length;a.data("fp-styles",a.attr("style")),t=a,(i=e)||0!==oo(So).length||t.addClass(vo),xe=oo(So),t.css("height",Ae+"px"),y.paddingTop&&t.css("padding-top",y.paddingTop),y.paddingBottom&&t.css("padding-bottom",y.paddingBottom),void 0!==y.sectionsColor[i]&&t.css("background-color",y.sectionsColor[i]),void 0!==y.anchors[i]&&t.attr("data-anchor",y.anchors[i]),o=a,n=e,void 0!==y.anchors[n]&&o.hasClass(vo)&&G(y.anchors[n],n),y.menu&&y.css3&&oo(y.menu).closest(so).length&&oo(y.menu).appendTo(me),0<s?function(e,o,n){var t,i=100*n,a=100/n;o.wrapAll('<div class="'+Eo+'" />'),o.parent().wrap('<div class="'+Oo+'" />'),e.find(Mo).css("width",i+"%"),1<n&&(y.controlArrows&&((t=e).find(Io).after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>'),"#fff"!=y.controlArrowColor&&(t.find(Fo).css("border-color","transparent transparent transparent "+y.controlArrowColor),t.find(qo).css("border-color","transparent "+y.controlArrowColor+" transparent transparent")),y.loopHorizontal||t.find(qo).hide()),y.slidesNavigation&&function(e,o){e.append('<div class="'+Ro+'"><ul></ul></div>');var n=e.find(zo);n.addClass(y.slidesNavPosition);for(var t=0;t<o;t++)n.find("ul").append('<li><a href="#"><span></span></a></li>');n.css("margin-left","-"+n.width()/2+"px"),n.find("li").first().find("a").addClass(vo)}(e,n)),o.each(function(){oo(this).css("width",a+"%"),y.verticalCentered&&Z(oo(this))});var l=e.find(Ao);l.length&&(0!==oo(So).index(wo)||0===oo(So).index(wo)&&0!==l.index())?ce(l,"internal"):o.eq(0).addClass(vo)}(a,l,s):y.verticalCentered&&Z(a)}),y.fixedElements&&y.css3&&oo(y.fixedElements).appendTo(me),y.navigation&&function(){me.append('<div id="'+xo+'"><ul></ul></div>');var e=oo(Co);e.addClass(function(){return y.showActiveTooltip?"fp-show-active "+y.navigationPosition:y.navigationPosition});for(var o=0;o<oo(wo).length;o++){var n="";y.anchors.length&&(n=y.anchors[o]);var t='<li><a href="#'+n+'"><span></span></a>',i=y.navigationTooltips[o];void 0!==i&&""!==i&&(t+='<div class="'+To+" "+y.navigationPosition+'">'+i+"</div>"),t+="</li>",e.find("ul").append(t)}oo(Co).css("margin-top","-"+oo(Co).height()/2+"px"),oo(Co).find("li").eq(oo(So).index(wo)).find("a").addClass(vo)}(),Le.find('iframe[src*="youtube.com/embed/"]').each(function(){var e,o,n;e=oo(this),n=e.attr("src"),e.attr("src",n+(o=n,/\?/.test(o)?"&":"?")+"enablejsapi=1")}),y.scrollOverflow?Re=y.scrollOverflowHandler.init(y):e(),l(!0),n(y.autoScrolling,"internal"),K(),se(),"complete"===to.readyState&&D(),Vo.on("load",D),Vo.on("scroll",g).on("hashchange",P).blur(function(){be=Ie=!1}).resize(W),jo.keydown(F).keyup(V).on("click touchstart",Co+" a",function(e){e.preventDefault();var o=oo(this).parent().index();O(oo(wo).eq(o))}).on("click touchstart",Ho,function(e){e.preventDefault();var o=oo(this).closest(wo).find(Io);X(o,o.find(Lo).eq(oo(this).closest("li").index()))}).on("click",".fp-tooltip",function(){oo(this).prev().trigger("click")}),oo(wo).on("click touchstart",Do,function(){var e=oo(this).closest(wo);oo(this).hasClass(Po)?Be.m.left&&h(e):Be.m.right&&u(e)}),y.normalScrollElements&&(jo.on("mouseenter touchstart",y.normalScrollElements,function(){l(!1)}),jo.on("mouseleave touchend",y.normalScrollElements,function(){l(!0)})));var Xe=!1,Ue=0,We=0,Ke=0,_e=0,Qe=0,Ge=(new Date).getTime(),Je=0,Ze=0,$e=Ae}var eo}});
//# sourceMappingURL=compiled.js.map