

<!DOCTYPE html>

<html lang="en">

<head>
    <title>Log In</title>
    <meta charset=utf-8>
    <meta content="ie=edge" http-equiv=x-ua-compatible>
    <meta content="width=device-width,initial-scale=1,shrink-to-fit=no" name=viewport>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Montserrat|Open+Sans:400,700">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"></head>
<body>
    <div class="wrapper">
        <form class="login" method="post">
            <p class="title">Generate Token</p>
            <div class="input-field">
                <label for="username">Client Username</label>
                <input type="text" name="client_id" class="text validate" id="username" autocomplete="off" required autofocus>
            </div>
            <div class="input-field">
                <label for="password">Client Password</label>
                <input type="password" name="client_password" class="text validate" id="password" autocomplete="off" required>
            </div>
            <div class="input-field">
                <label for="client_url">Server Url</label>
                <input type="password" name="client_url" class="text validate" id="client_url" autocomplete="off" required>
            </div>
            <div class="input-field">
                <label for="server_token">Server Token</label>
                <input type="password" name="server_token" class="text validate" id="server_token" autocomplete="off" readonly>
            </div>
            <button id="submit"><i class="spinner"></i> <span class="state">Log in</span></button>
        </form>
    </div>
    <script src="/js/background.js"></script><script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js">
    </script><script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script><script src= '/js/login.js'></script></body>

</html>
