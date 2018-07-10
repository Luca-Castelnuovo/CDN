<?php

$name = $_POST['name'];
$from = $_POST['email'];
$subject = $_POST['subject'];
$body = '<h1>This email is from: ' . $name  . '</h1>' . PHP_EOL . $_POST['body'];

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
$result = json_decode(file_get_contents($url, false, $context), true);

if ($result['status'] == 'true') {
    echo '<h1>Mail succesvol verstuurd.</h1>' . PHP_EOL . '<h4>U wordt doorgestuurd in 3 seconden.</h4>';
    header('Refresh: 3; URL=https://ctg.bss.design/');
} else {
    echo '<h1>Mail niet verstuurd.</h1>' . PHP_EOL . '<h2>Probeer het later opnieuw AUB.</h2>' . PHP_EOL . '<h4>U wordt doorgestuurd in 5 seconden.</h4>';
    header('Refresh: 5; URL=https://ctg.bss.design/');
}
