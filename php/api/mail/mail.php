<?php
// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';
$config = parse_ini_file('../config/mail.ini');

$mail = new PHPMailer();

//Server configuration
$mail->isSMTP();
$mail->Host = $config['Host'];
$mail->SMTPAuth = $config['SMTPAuth'];
$mail->Username = $config['Username'];
$mail->Password = $config['Password'];
$mail->SMTPSecure = $config['SMTPSecure'];
$mail->Port = $config['Port'];

$mail->setFrom($config['setFrom'], $config['setFromName']);
$mail->addReplyTo($config['addReplyTo'], $config['addReplyToName']);

//Recipients
$mail->addAddress('ltcastelnuovo@gmail.com', 'Luca Castelnuovo');

//Content
$mail->isHTML(true);
$mail->Subject = 'Here is the subject';
$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

$mail->send();
