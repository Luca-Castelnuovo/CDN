<?php
    header('Content-Type: application/javascript');
?>

<?php

    if (isset($_GET['require_consent'])) {
        $consent = '_paq.push(["require_consent"]);';
    }

    if (isset($_GET['site_id'])) {
        $site_id = $_GET['site_id'];
    } else {
        echo 'alert("please specify site_id")';
        exit;
    }

    echo <<<JS
    var _paq = window._paq || [];

    {$consent}

    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);

    (function() {
      var u = "https://analytics.lucacastelnuovo.nl/";
      _paq.push(["setTrackerUrl", u + "matomo.php"]);
      _paq.push(["setSiteId", {$site_id}]);
      var d = document,
        g = d.createElement("script"),
        s = d.getElementsByTagName("script")[0];
      g.type = "text/javascript";
      g.async = true;
      g.defer = true;
      g.src = u + "matomo.js";
      s.parentNode.insertBefore(g, s);
    })();
JS;
?>

<?php
    if (!empty($consent)) {
        echo <<<'JS'
        if (document.cookie.indexOf("consent=") >= 0) {
            _paq.push(['setConsentGiven'])
        }
JS;
    }
?>

<?php
    if (!empty($consent)) {
        echo <<<'JS'
        !function(i){"use strict";var t=i,l=t.document,o="cbinstance",e={get:function(e){return decodeURIComponent(l.cookie.replace(new RegExp("(?:(?:^|.*;)s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"$&")+"s*=s*([^;]*).*$)|^.*$"),"$1"))||null},set:function(e,t,i,o,n,s){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var a="";if(i)switch(i.constructor){case Number:a=i===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+i;break;case String:a="; expires="+i;break;case Date:a="; expires="+i.toUTCString()}return l.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+a+(n?"; domain="+n:"")+(o?"; path="+o:"")+(s?"; secure":""),!0},has:function(e){return new RegExp("(?:^|;s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"$&")+"s*=").test(l.cookie)},remove:function(e,t,i){return!(!e||!this.has(e)||(l.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(i?"; domain="+i:"")+(t?"; path="+t:""),0))}},c={merge:function(){var e,t={},i=0,o=arguments.length;if(0===o)return t;for(;i<o;i++)for(e in arguments[i])Object.prototype.hasOwnProperty.call(arguments[i],e)&&(t[e]=arguments[i][e]);return t},str2bool:function(e){switch((e=""+e).toLowerCase()){case"false":case"no":case"0":case"":return!1;default:return!0}},fade_in:function(e){e.style.opacity<1&&(e.style.opacity=(parseFloat(e.style.opacity)+.05).toFixed(2),t.setTimeout(function(){c.fade_in(e)},50))},get_data_attribs:function(e){var t={};if(Object.prototype.hasOwnProperty.call(e,"dataset"))t=e.dataset;else{var i,o=e.attributes;for(i in o)if(Object.prototype.hasOwnProperty.call(o,i)){var n=o[i];/^data-/.test(n.name)&&(t[c.camelize(n.name.substr(5))]=n.value)}}return t},normalize_keys:function(e){var t={};for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var o=c.camelize(i);t[o]=e[o]?e[o]:e[i]}return t},camelize:function(e){for(var t="-",i=e.indexOf(t);-1!=i;){var o=i===e.length-1,n=o?"":e[i+1],s=n.toUpperCase(),a=o?t:t+n;i=(e=e.replace(a,s)).indexOf(t)}return e},find_script_by_id:function(e){for(var t=l.getElementsByTagName("script"),i=0,o=t.length;i<o;i++)if(e===t[i].id)return t[i];return null}},n=c.find_script_by_id("cookieinfo"),s=i.cookieinfo=function(e){this.init(e)};s.prototype={cookiejar:e,init:function(e){if(this.inserted=!1,this.closed=!1,this.test_mode=!1,this.default_options={cookie:"we-love-cookies",closeText:"&#10006;",cookiePath:"/",debug:!1,expires:1/0,zindex:1e20,mask:!1,maskOpacity:.5,maskBackground:"#999",height:"auto",minHeight:"21px",bg:"#eee",fg:"#333",link:"#31A8F0",divlink:"#000",divlinkbg:"#F1D600",position:"bottom",message:"We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",linkmsg:"More info",scriptmsg:"Cookie Info Script",moreinfo:"https://lucacastelnuovo.nl/privacy",scriptinfo:"https://lucacastelnuovo.nl",tracking:"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",effect:null,fontSize:"14px",fontFamily:"verdana, arial, sans-serif",instance:o,textAlign:"center",acceptOnScroll:!1},this.options=this.default_options,this.script_el=n,this.script_el){var t=c.get_data_attribs(this.script_el);this.options=c.merge(this.options,t)}e&&(e=c.normalize_keys(e),this.options=c.merge(this.options,e)),o=this.options.instance,this.options.zindex=parseInt(this.options.zindex,10),this.options.mask=c.str2bool(this.options.mask),"string"==typeof this.options.expires&&"function"==typeof i[this.options.expires]&&(this.options.expires=i[this.options.expires]),"function"==typeof this.options.expires&&(this.options.expires=this.options.expires()),this.script_el&&this.run()},log:function(){"undefined"!=typeof console&&console.log.apply(console,arguments)},run:function(){if(!this.agreed()){var e=this;!function(t,i){var o=!1,e=!0,n=t.document,s=n.documentElement,a=n.addEventListener?"addEventListener":"attachEvent",r=n.addEventListener?"removeEventListener":"detachEvent",l=n.addEventListener?"":"on",c=function(e){"readystatechange"==e.type&&"complete"!=n.readyState||(("load"==e.type?t:n)[r](l+e.type,c,!1),!o&&(o=!0)&&i.call(t,e.type||e))},p=function(){try{s.doScroll("left")}catch(e){return void setTimeout(p,50)}c("poll")};if("complete"==n.readyState)i.call(t,"lazy");else{if(n.createEventObject&&s.doScroll){try{e=!t.frameElement}catch(t){}e&&p()}n[a](l+"DOMContentLoaded",c,!1),n[a](l+"readystatechange",c,!1),t[a](l+"load",c,!1)}}(t,function(){e.insert()})}},build_viewport_mask:function(){var e=null;if(!0===this.options.mask){var t=this.options.maskOpacity,i='<div id="cookieinfo-mask" style="position:fixed;top:0;left:0;width:100%;height:100%;background:'+this.options.maskBackground+";zoom:1;filter:alpha(opacity="+100*t+");opacity:"+t+";z-index:"+this.options.zindex+';"></div>',o=l.createElement("div");o.innerHTML=i,e=o.firstChild}return e},agree:function(){return this.cookiejar.set(this.options.cookie,1,this.options.expires,this.options.cookiePath),!0},agreed:function(){return this.cookiejar.has(this.options.cookie)},close:function(){return this.inserted&&(this.closed||(this.element&&this.element.parentNode.removeChild(this.element),this.element_mask&&this.element_mask.parentNode.removeChild(this.element_mask),this.closed=!0)),this.closed},agree_and_close:function(){return this.agree(),this.close()},cleanup:function(){return this.close(),this.unload()},unload:function(){return this.script_el&&this.script_el.parentNode.removeChild(this.script_el),!(i[o]=void 0)},insert:function(){this.element_mask=this.build_viewport_mask();var e=this.options.zindex;this.element_mask&&(e+=1);var t=l.createElement("div");t.className="cookieinfo",t.style.position="fixed",t.style.left=0,t.style.right=0,t.style.height=this.options.height,t.style.minHeight=this.options.minHeight,t.style.zIndex=e,t.style.background=this.options.bg,t.style.color=this.options.fg,t.style.lineHeight=t.style.minHeight,t.style.padding="8px 18px",t.style.fontFamily=this.options.fontFamily,t.style.fontSize=this.options.fontSize,t.style.textAlign=this.options.textAlign,"top"===this.options.position?t.style.top=0:t.style.bottom=0,t.innerHTML='<div class="cookieinfo-close" style="float:right;display:block;padding:5px 8px 5px 8px;min-width:100px;margin-left:5px;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;">'+this.options.closeText+'</div><span style="display:block;padding:5px 0 5px 0;">'+this.options.message+" <a>"+this.options.linkmsg+"</a><img> <a>"+this.options.scriptmsg+"</a></span>";var i=(this.element=t).getElementsByTagName("a")[0];i.href=this.options.moreinfo,i.style.textDecoration="none",i.style.color=this.options.link;var o=t.getElementsByTagName("a")[1];o.href=this.options.scriptinfo,o.style.textDecoration="none",o.style.display="none",o.style.color=this.options.link;var n=t.getElementsByTagName("div")[0];n.style.cursor="pointer",n.style.color=this.options.divlink,n.style.background=this.options.divlinkbg,n.style.textAlign="center";var s=t.getElementsByTagName("img")[0];function a(e,t,i){var o=e.addEventListener?"addEventListener":"attachEvent",n=e.addEventListener?"":"on";e[o](n+t,i,!1)}s.src=this.options.tracking,s.style.display="none";var r=this;a(n,"click",function(){r.agree_and_close()}),this.element_mask&&(a(this.element_mask,"click",function(){r.agree_and_close()}),l.body.appendChild(this.element_mask)),this.options.acceptOnScroll&&a(window,"scroll",function(){r.agree_and_close()}),l.body.appendChild(this.element),this.inserted=!0,"fade"===this.options.effect?(this.element.style.opacity=0,c.fade_in(this.element)):this.element.style.opacity=1}},n&&(i[o]||(i[o]=new s))}(window);

JS;
    }
?>
