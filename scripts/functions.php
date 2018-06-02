<?php

function ip()
{
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipx = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ipx = 'Not Set!';
    }

    if (!empty($_SERVER['REMOTE_ADDR'])) {
        $ipr = $_SERVER['REMOTE_ADDR'];
    } else {
        $ipr = 'Not Set!';
    }

    return "HTTP_X_FORWARDED_FOR: $ipx & REMOTE_ADDR: $ipr";
}

function mail_alert($content, $to = 'lucacastelnuovo@hetbaarnschlyceum.nl')
{
    $subject = 'CDN';
    $headers = array(
        'From: no-reply@hetbaarnschlyceum.nl',
        'Content-Type:text/html',
        'Reply-To: no-reply@hetbaarnschlyceum.nl'
    );
    mail($to, $subject, $content, implode("\r\n", $headers));
}
