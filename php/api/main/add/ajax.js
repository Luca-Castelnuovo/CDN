$("#submit").click(function () {
	var a = $("input[name=client_id]"),
		t = $("input[name=client_password]"),
		e = $("input[name=client_ip]");
	if ("" == a.val()) return !1;
	if ("" == t.val()) return !1;
	if ("" == e.val()) return !1;
	var n = "client_id=" + a.val() + "&client_password=" + t.val() + "&client_ip=" + e.val() + "&type=login";
	$(".text").attr("disabled", "true");
	var o = $(".login"),
		s = o.find("button > .state");
	return o.addClass("loading"), s.html("Authenticating"), $.ajax({
		url: "process.php",
		type: "GET",
		data: n,
		cache: !1,
		dataType: "JSON",
		success: function (a) {
			a.status ? (o.addClass("ok"), s.html(a.client_token), setTimeout(function () {
				//window.location.replace("/home")
			}, 500)) : (o.addClass("error"), s.html("Username and Password did not match!"), setTimeout(function () {
				window.location.reload();
			}, 1e3))
		}
	}), !1
});
