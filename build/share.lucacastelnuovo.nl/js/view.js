"use strict";var btn=document.querySelector("#btn"),container=document.querySelector(".card-content");btn.addEventListener("click",function(){var e=document.querySelector("#token").value,n=new XMLHttpRequest;n.onreadystatechange=function(){if(n.readyState<4)btn.innerHTML="Loading...";else if(4===n.readyState&&200==n.status&&n.status<300){var e=JSON.parse(n.responseText);if(!e.status)return alert(e.error),!(btn.innerHTML="View message");// const html =
//     "<div class='row'>" +
//     "<textarea id='textarea-message' class='materialize-textarea'>" +
//     json.message +
//     "</textarea>" +
//     "</div>";
var t="<div class='row'><p>"+e.message+"</p></div>";container.innerHTML=t}},n.open("GET","/view.php?token="+e),n.send()});
//# sourceMappingURL=view.js.map