<?php

//clean_data
function clean_data($data)
{
    $data = trim($data);
    $data = htmlspecialchars($data);
    $data = stripslashes($data);
    return $data;
}


//get ip from user
function ip()
{
    return $_SERVER['REMOTE_ADDR'];
}


//mail function
function send_mail($name, $subject, $from, $message)
{
    $name = clean_data($name);
    $subject = clean_data($subject);
    $from = clean_data($from);
    $message = clean_data($message);

    $to = 'lucacastelnuovo@hetbaarnschlcyeum.nl';
    $headers = "From:" . $from;
    $message = $message . '<br /><p>Name from sender: ' . $name . '</p><p>IP from sender: ' . ip() . '</p>';
    mail($to, $subject, $message, $headers);
    return true;
}


//generate random string
function gen($length)
{
    $length = $length / 2;
    return bin2hex(random_bytes($length));
}


//generate csrf token and set token in session
function csrf_gen()
{
    if (isset($_SESSION['token'])) {
        return $_SESSION['token'];
    } else {
        $_SESSION['token'] = gen(32);
        return $_SESSION['token'];
    }
}


//check is submitted token equeals token in session
function csrf_val($post_token)
{
    if (!isset($_SESSION['token'])) {
        destroy_session();
    }

    if (!(hash_equals($_SESSION['token'], $post_token))) {
        destroy_session();
    } else {
        unset($_SESSION['token']);
    }
}

function destroy_session()
{
    echo '';
}
