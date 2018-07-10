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

function response($output)
{
    return json_encode($output);
}