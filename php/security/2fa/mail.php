<?php

require_once 'functions.php';

if (send_mail($_POST['name'], $_POST['subject'], $_POST['email'], $_POST['message'])) {
    header('Location: /contact.php?success');
    exit;
}
