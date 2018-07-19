<?php

$background = !empty($_GET['background']) ? $_GET['background'] : 'null';

header('Content-Type: application/javascript');

if (empty($_GET['url'])) {
    if ($background == 'null') {
        echo "document.body.style.backgroundImage = \"url('https://cdn.lucacastelnuovo.nl/images/backgrounds/\" + Math.floor(10 * Math.random()) + \".jpg')\";";
    } else {
        echo "document.body.style.backgroundImage = \"url('https://cdn.lucacastelnuovo.nl/images/backgrounds/\" + $background + \".jpg')\";";
    }
} else {
    echo "document.body.style.backgroundImage = \"url('{$_GET['url']}')\";";
}
