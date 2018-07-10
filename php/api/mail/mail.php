<?php
//vars needed to be passed: to,subject,body,altbody(optional)

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Load additional functions and configuration
require '../main/functions.php';
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
if (!isset($_POST['to'])) {//reponse_code = 0
    echo response(["status" => false, "type" => "mail", "response_code" => 0.0]);
    exit;
}
if (!isset($_POST['subject'])) {//reponse_code = 0
    echo response(["status" => false, "type" => "mail", "response_code" => 0.1]);
    exit;
}
if (!isset($_POST['body'])) {//reponse_code = 0
    echo response(["status" => false, "type" => "mail", "response_code" => 0.2]);
    exit;
}

$mail->isHTML(true);
$mail->Body    = clean_data($_POST['body'], 'html');
$mail->Subject = clean_data($_POST['subject']);

$altBody = isset($_POST['altbody']) ? $_POST['altbody'] : $_POST['body'];
$mail->AltBody = clean_data($altBody, 'html');

if ($mail->send()) {//reponse_code = 1
    echo response(["status" => true, "type" => "mail", "response_code" => 1.1]);
} else {
    echo response(["status" => false, "type" => "mail", "response_code" => 1.0]);
}
