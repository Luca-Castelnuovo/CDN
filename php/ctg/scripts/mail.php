<?php

require_once 'functions.php';

if (send_mail($_POST['name'], $_POST['subject'], $_POST['email'], $_POST['message'])) {
    $headers = array(
        'From: ' . $_POST['email'],
        'Content-Type:text/html',
        'Reply-To: ' . $_POST['email']
    );
    mail('hujxu@slipry.net', 'subject', 'hello', implode("\r\n", $headers));

    header('Location: /contact.php?success');
    exit;
}
