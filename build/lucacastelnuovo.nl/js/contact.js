"use strict";$(function(){$("input,textarea").jqBootstrapValidation({preventSubmit:!0,submitError:function(){// additional error messages or events
},submitSuccess:function(s,e){e.preventDefault();// prevent default submit behaviour
// get values from FORM
var t=$("input#name").val(),a=$("input#email").val(),n=$("textarea#message").val(),c=t;// For Success/Failure Message
// Check for white space in name for Success/Fail message
0<=c.indexOf(" ")&&(c=t.split(" ").slice(0,-1).join(" ")),$.ajax({url:"mail.php",type:"POST",data:{name:t,email:a,message:n},cache:!1,success:function(){
// Success message
$("#success").html("<div class='alert alert-success'>"),$("#success > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>"),$("#success > .alert-success").append("<strong>Your message has been sent.</strong>"),$("#success > .alert-success").append("</div>"),//clear all fields
$("#contactForm").trigger("reset")},error:function(s){
// Fail message
$("#success").html("<div class='alert alert-danger'>"),$("#success > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>"),$("#success > .alert-danger").append("<strong>"+s.responseJSON.message),$("#success > .alert-danger").append("</div>")}})},filter:function(){return $(this).is(":visible")}}),$('a[data-toggle="tab"]').click(function(s){s.preventDefault(),$(this).tab("show")})}),
/*When clicking on Full hide fail/success boxes */
$("#name").focus(function(){$("#success").html("")});
//# sourceMappingURL=contact.js.map