<?php

require_once 'functions.php';

if (send_mail($_POST['name'], $_POST['subject'], $_POST['email'], $_POST['message'])) {
    //header('Location: /contact.php?success');
    echo $_POST['name'] . '<br />' . $_POST['subject'] . '<br />' . $_POST['email'] . '<br />' . $_POST['message'];
    exit;
}
