<?php

$name = $_POST['name'];
$from = $_POST['email'];
$subject = 'Close The Gap | ' . $_POST['subject'];
$body = '<h1>This email is from: ' . $name  . '</h1><br /><h2>Email: ' . $from  . '</h2>' . $_POST['body'];

$data = ['to' => 'lucacastelnuovo@hetbaarnschlyceum.nl', 'subject' => $subject, 'body' => $body];

require '../main/functions.php';
//$result = request_post('https://cdn.lucacastelnuovo.nl/php/api/mail/mail.php', $data);
$result = api_call('POST', 'https://cdn.lucacastelnuovo.nl/php/api/mail/mail.php', $data);

if ($result['status'] == 'true') {
    echo '<h1>Mail succesvol verstuurd.</h1><br /><h4>U wordt doorgestuurd in 3 seconden.</h4>';
//header('Refresh: 3; URL=https://ctg.bss.design/');
} else {
    echo '<h1>Mail niet verstuurd.</h1><br /><h2>Probeer het later opnieuw AUB.</h2><br /><h4>U wordt doorgestuurd in 5 seconden.</h4>';
    //header('Refresh: 5; URL=https://ctg.bss.design/');
    echo $result['response_code'];
}
