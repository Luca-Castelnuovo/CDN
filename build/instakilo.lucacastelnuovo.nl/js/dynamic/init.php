<?php
    header('Content-Type: application/javascript');
?>

<?php
    if (!isset($_GET['auto_init']) || $_GET['auto_init']) {
        echo <<<JS
        document.addEventListener('DOMContentLoaded', function() {
            // Enable SideBar
            var sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {
                edge: 'right',
                draggable: 1
            });

            // Add character counter to inputs
            M.CharacterCounter.init(document.querySelectorAll('.counter'));

            // Enable MaterialBox
            var materialbox = M.Materialbox.init(document.querySelectorAll('.materialboxed'), {});
        });
JS;
    } else {
        echo <<<JS
        document.addEventListener('DOMContentLoaded', function() {
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
            }
        });
JS;
    }
?>
