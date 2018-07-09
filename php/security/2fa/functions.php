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
