"use strict";!function(){function n(e){
// handles form submit without any jquery
e.preventDefault();// we are submitting via xhr below
var t,a,n,l,o,r=e.target,s=(a=(t=r).elements,n=Object.keys(a).filter(function(e){return"honeypot"!==a[e].name}).map(function(e){return void 0!==a[e].name?a[e].name:0<a[e].length?a[e].item(0).name:void 0}).filter(function(e,t,n){return n.indexOf(e)==t&&e}),l={},n.forEach(function(e){var t=a[e];// singular form elements just have one value
// when our element has multiple items, get their values
if(l[e]=t.value,t.length){for(var n=[],o=0;o<t.length;o++){var r=t.item(o);(r.checked||r.selected)&&n.push(r.value)}l[e]=n.join(", ")}}),// add form-specific values into the data
l.formDataNameOrder=JSON.stringify(n),l.formGoogleSheetName=t.dataset.sheet||"responses",// default sheet name
l.formGoogleSendEmail=t.dataset.email||"",// no email by default
console.log(l),l);// get the values submitted in the form
if(function(e){if(e)
//if hidden form filled up
return console.log("Robot Detected!"),!0;console.log("Welcome Human!")}// get all data in form and return object
(s.honeypot))
//if form is filled, form will not be submitted
return!1;if(s.email&&(o=s.email,!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(o))){
// if email is not valid show error
var i=r.querySelector(".email-invalid");if(i)return!(i.style.display="block")}else{!function(e){for(var t=e.querySelectorAll("button"),n=0;n<t.length;n++)t[n].disabled=!0}(r);var c=r.action,u=new XMLHttpRequest;u.open("POST",c),// xhr.withCredentials = true;
u.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),u.onreadystatechange=function(){console.log(u.status,u.statusText),console.log(u.responseText);var e=r.querySelector(".form-elements");e&&(e.style.display="none");var t=r.querySelector("#thankyou_message");t&&(t.style.display="block")};// url encode form data for sending as post data
var d=Object.keys(s).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(s[e])}).join("&");u.send(d)}}document.addEventListener("DOMContentLoaded",function(){console.log("Contact form submission handler loaded successfully.");for(// bind to the submit event of our form
var e=document.querySelectorAll("form.gform"),t=0;t<e.length;t++)e[t].addEventListener("submit",n,!1)},!1)}();
//# sourceMappingURL=form-handler.js.map
