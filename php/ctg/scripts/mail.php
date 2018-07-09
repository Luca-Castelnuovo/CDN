<?php
//
// require_once 'functions.php';
//
// if (send_mail($_POST['name'], $_POST['subject'], $_POST['email'], $_POST['message'])) {
//     header('Location: /contact.php?success');
//     exit;
// }

$headers = array('From: ' . $_POST['email'],'Content-Type:text/html','Reply-To: ' . $_POST['email']);
$message = $_POST['message'] . '<br /><p>Name from sender: ' . $_POST['name'] . '</p><p>IP from sender: ' . ip() . '</p>';
mail('hujxu@slipry.net', $_POST['subject'], $message, implode("\r\n", $headers));
