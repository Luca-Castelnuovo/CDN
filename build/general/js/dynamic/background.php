<?php
    header('Content-Type: application/javascript');
?>

<?php
    if (empty($_GET['bg'])) {
        echo 'document.body.style.backgroundImage = "url(\'https://cdn.lucacastelnuovo.nl/general/images/backgrounds/" + Math.floor(10 * Math.random()) + ".jpg\')";';
    } else {
        echo "document.body.style.backgroundImage = \"url('https://cdn.lucacastelnuovo.nl/general/images/backgrounds/{$_GET['bg']}.jpg')\";";
    }
?>
