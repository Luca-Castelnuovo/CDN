<!DOCTYPE html>

<html lang="en">

<head>
    <title>Log In</title>
    <meta charset=utf-8>
    <meta content="ie=edge" http-equiv=x-ua-compatible>
    <meta content="width=device-width,initial-scale=1,shrink-to-fit=no" name=viewport>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/css/test.css">
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Montserrat|Open+Sans:400,700">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"></head>
<body>
    <div class="wrapper">
        <form class="login" method="post">
            <?php if (!isset($_GET['client_token'])) {
    ?>
            <p class="title">Generate Token</p>
            <div class="input-field">
                <label for="username">Client Username</label>
                <input type="text" name="client_id" class="text validate" id="username" autocomplete="off" autofocus>
            </div>
            <div class="input-field">
                <label for="password">Client Password</label>
                <input type="password" name="client_password" class="text validate" id="password" autocomplete="off">
            </div>
            <div class="input-field">
                <label for="client_ip">Server IP</label>
                <input type="text" name="client_ip" class="text validate" id="client_ip" autocomplete="off">
            </div>
            <button id="submit"><i class="spinner"></i> <span class="state">Generate Token</span></button>
        <?php
} else {
        require $_SERVER['DOCUMENT_ROOT'] . '/php/api/main/init.php';
        echo '<p class="title">Client Token:</p><textarea rows="9" readonly>' . clean_data($_GET['client_token']) . '</textarea><button onclick="console.log(window.location.pathname);"><span class="state">Back</span></button>';
    } ?>
        </form>
    </div>
    <script src="/js/vanilla/randomBackground.js"></script><script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js">
    </script><script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script><script src= 'ajax.js'></script></body>

</html>
