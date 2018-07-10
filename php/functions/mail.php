<?php
// $headers = array('From: ' . $_POST['email'],'Content-Type:text/html','Reply-To: ' . $_POST['email']);
// $message = '<h1>Name from sender: ' . $_POST['name'] . '</h1><h6>IP from sender: ' . $_SERVER['REMOTE_ADDR'] . '</h6>'  . '<br /><p>' . $_POST['message'] . '</p>';
//
// if (mail('ltcastelnuovo@yandex.com', $_POST['subject'], $message, implode("\r\n", $headers))) {
//     header('Location: index.html');
//     exit;
// }
require 'PHPMailerAutoload.php';
$mail = new PHPMailer;
