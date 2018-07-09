<?php

//start a session
session_start();


//connect to db

//clean_data
function clean_data($data)
{
    //global $mysqli;
    //$data = $mysqli->escape_string($data);
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
    $to = 'ltcastelnuovo@gmail.com';
    $headers = array(
        'From: ' . $from,
        'Content-Type:text/html',
        'Reply-To: ' . $from
    );
    $message = $message . '<br /><p>Name from sender: ' . $name . '</p><p>IP from sender: ' . ip() . '</p>';
    mail($to, $subject, $message, implode("\r\n", $headers));
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