<?php
$headers = array('From: ' . $_POST['email'],'Content-Type:text/html','Reply-To: ' . $_POST['email']);
$message = '<h1>Name from sender: ' . $_POST['name'] . '</h1><h6>IP from sender: ' . $_SERVER['REMOTE_ADDR'] . '</h6>'  . '<br /><p>' . nl2br($_POST['message']) . '</p>';
mail('hujxu@slipry.net', $_POST['subject'], $message, implode("\r\n", $headers));
header('Location: index.html');
exit;
