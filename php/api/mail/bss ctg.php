<?php

$body = 'test message <h1>capitiol</h1>';
$subject = 'test subject';
// $subject = $_POST['subject'];

$url = 'https://cdn.lucacastelnuovo.nl/php/api/mail/mail.php';
$data = array('to' => 'lucacastelnuovo@hetbaarnschlyceum.nl', 'subject' => $subject, 'body' => $body);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === false) {
    echo 'error';
}

var_dump($result);
