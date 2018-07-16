<?php

$background = isset($_GET['background']) ? $_GET['background'] : 0;
echo "document.body.style.backgroundImage = \"url('https://cdn.lucacastelnuovo.nl/images/backgrounds/\" + $background + \".jpg')\";"
