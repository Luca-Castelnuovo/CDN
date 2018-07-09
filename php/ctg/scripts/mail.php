<?php

require_once 'functions.php';

if (send_mail($_POST['name'], $_POST['subject'], $_POST['email'], $_POST['message'])) {
    $headers = array(
        'From: ' . $from,
        'Content-Type:text/html',
        'Reply-To: ' . $from
    );
    mail('hujxu@slipry.net', 'subject', 'hello', implode("\r\n", $headers));

    header('Location: /contact.php?success');
    exit;
}
