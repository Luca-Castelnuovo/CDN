"use strict";$("#submit").click(function(){var e=$("input[name=user_name]"),t=$("input[name=user_password]"),a=$("input[name=auth_code]"),r=$("input[name=type]"),n=$("input[name=CSRFtoken]"),i="",s="",o="",u="",l="";if(""==r.val())return!1;if(""==n.val())return!1;if("invite_code"==r.val()){if(""==a.val())return!1;i="Invite Code Valid!",s="Invalid Invite Code!",o="Checking Invite Code",u="/register",l="/register?reset"}if("register"==r.val()){if(""==e.val())return!1;if(""==t.val())return!1;i="Account Created!",s="Username is taken. Please choose another!",o="Registering User",u="/",l="/register"}var d="user_name="+e.val()+"&user_password="+t.val()+"&auth_code="+a.val()+"&CSRFtoken="+n.val()+"&type=register&register_type="+r.val();$(".text").attr("disabled","true");var c=$(".login"),v=c.find("button > .state");return c.addClass("loading"),v.html(o),$.ajax({url:"/process.php",type:"GET",data:d,cache:!1,dataType:"JSON",success:function(e){e.status?(c.addClass("ok"),v.html(i),setTimeout(function(){window.location.replace(u)},1e3)):(c.addClass("error"),v.html(s),setTimeout(function(){window.location.replace(l)},1e3))}}),!1});