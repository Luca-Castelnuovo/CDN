<?php
//vars needed to be passed: to,subject,body,altbody(optional)

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Load additional functions and configuration
require '../authentication/functions.php';
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
$mail->addAddress(clean_data($_POST['to']));

//Content
$mail->isHTML(true);
$mail->Subject = clean_data($_POST['subject']);
$mail->Body    = clean_data($_POST['body']);

$altBody = isset($_POST['altbody']) ? $_POST['altbody'] : $_POST['body'];
$mail->AltBody = clean_data($altBody);

if ($mail->send()) {
    echo output(["status" => true, "type" => "mail"]);
} else {
    echo output(["status" => false, "type" => "mail"]);
}
echo output(["status" => false, "type" => "mail"]);
