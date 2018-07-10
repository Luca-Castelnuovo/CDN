<?php

$config = parse_ini_file('../config/authentication.ini');

//Connect to database
function sql_connect($database = null)
{
    $config = parse_ini_file('../config/authentication.ini');

    $database = isset($database) ? $database : $config['database'];

    $conn = new mysqli($config['host'], $config['username'], $config['password'], $database);

    if ($conn->connect_error) {
        exit();
    } else {
        return $conn;
    }
}


//Clean user submitted data
function clean_data($data, $disable = 'none')
{
    if ($disable != 'sql') {
        //connect to db to use escape_string()
        $conn = sql_connect();
        $data = $conn->escape_string($data);
    }

    if ($disable != 'trim') {
        $data = trim($data);
    }

    if ($disable != 'html') {
        $data = htmlspecialchars($data);
    }

    if ($disable != 'slash') {
        $data = stripslashes($data);
    }

    return $data;
}

//encode array to json
function response($output)
{
    return json_encode($output);
}

//make a post request
function request_post($url, $data)
{
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        )
    );

    $context  = stream_context_create($options);
    return json_decode(file_get_contents($url, false, $context), true);
}

function request_get($url, $data)
{
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        )
    );

    $context  = stream_context_create($options);
    return json_decode(file_get_contents($url, false, $context), true);
}
