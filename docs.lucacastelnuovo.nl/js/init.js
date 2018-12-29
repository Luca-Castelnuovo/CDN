//Mobile Side nav
document.addEventListener("DOMContentLoaded", function() {
    var e = document.querySelectorAll(".sidenav");
    M.Sidenav.init(e, {
        edge: "right",
        draggable: !0
    })
});
