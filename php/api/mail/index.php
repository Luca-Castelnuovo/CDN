<?php
//vars needed to be passed: client_id,client_token,to,subject,body,altbody(optional)

//Load api functions
require $_SERVER['DOCUMENT_ROOT'] . '/php/api/main/init.php';

//api validation
$validate_response = api_validate_access($_GET['client_id'], $_GET['client_token'], 'mail');
if (!$validate_response['status']) {
    echo response(["status" => false, "type" => "mail", "response_code" => 2]);
    exit();
} else {
    echo $validate_response['status'];
    exit();
}


// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';


//Load mail congfig
$config = config_load('mail');

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
    echo response(["status" => false, "response_code" => 0]);
    exit;
}
if (!isset($_POST['subject'])) {//reponse_code = 0
    echo response(["status" => false, "response_code" => 0.1]);
    exit;
}
if (!isset($_POST['body'])) {//reponse_code = 0
    echo response(["status" => false, "response_code" => 0.2]);
    exit;
}

$mail->isHTML(true);
$mail->Body    = clean_data($_POST['body'], 'html');
$mail->Subject = clean_data($_POST['subject']);

$altBody = isset($_POST['altbody']) ? $_POST['altbody'] : $_POST['body'];
$mail->AltBody = clean_data($altBody, 'html');

if ($mail->send()) {//reponse_code = 1
    echo response(["status" => true, "response_code" => 1]);
} else {
    echo response(["status" => false, "response_code" => 1.1]);
}
