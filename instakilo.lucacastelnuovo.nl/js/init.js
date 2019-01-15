function materialize_init() {
    // Enable SideBar
    var sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {
        edge: 'right',
        draggable: 1
    });

    // Add character counter to inputs
    M.CharacterCounter.init(document.querySelectorAll('.counter'));

    // Enable MaterialBox
    var materialbox = M.Materialbox.init(document.querySelectorAll('.materialboxed'), {});

    // Tooltip
    var tooltips = M.Tooltip.init(document.querySelectorAll('.tooltipped'), []);
}

if (typeof auto_init === 'undefined' || !auto_init) {
    document.addEventListener('DOMContentLoaded', function() {
        materialize_init();
    });
}
