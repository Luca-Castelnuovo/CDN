//theme specific js
$(function() {
  $("body")
    .on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass(
        "floating-label-form-group-with-value",
        !!$(e.target).val()
      );
    })
    .on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    })
    .on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
});

//contact
$(function() {
  $("input,textarea").jqBootstrapValidation({
    preventSubmit: !0,
    submitError: function(t, i, n) {},
    filter: function() {
      return $(this).is(":visible");
    }
  }),
    $('a[data-toggle="tab"]').click(function(t) {
      t.preventDefault(), $(this).tab("show");
    });
}),
  $("#name").focus(function() {
    $("#success").html("");
  });

//fullpage js
$(document).ready(function() {
  $("#fullpage").fullpage({
    anchors: ["Home", "About", "Contact"],
    sectionsColor: ["#dc2f21", "#ffffff", "#dc2f21"],
    menu: "#menu",
    navigation: true,
    navigationPosition: "right",
    navigationTooltips: ["Home", "About Me", "Contact Me"],
    responsiveWidth: 600
  });
});

//remove loader
$("#preloader").addClass("loaded");
