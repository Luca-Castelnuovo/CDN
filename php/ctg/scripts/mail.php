<?php

require_once 'functions.php';

$name = clean_data($_POST['name']);
$subject = clean_data($_POST['subject']);
$from = clean_data($_POST['email']);
$message = clean_data($_POST['message']);

if (send_mail($name, $subject, $from, $message)) {
    header('Location: /contact.php?success');
    exit;
}
