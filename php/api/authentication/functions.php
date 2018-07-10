<?php

$config = parse_ini_file('../config/authentication.ini');

//Connect to database
function sql_connect($database = null)
{
    global $config;

    $database = isset($database) ? $database : $config['database'];

    $conn = new mysqli($config['host'], $config['username'], $config['password'], $database);

    if ($conn->connect_error) {
        exit();
    } else {
        return $conn;
    }
}


//Clean user submitted data
function clean_data($data)
{
    //connect to db to use escape_string()
    $conn = sql_connect();

    $data = $conn->escape_string($data);
    $data = trim($data);
    $data = htmlspecialchars($data);
    $data = stripslashes($data);
    return $data;
}

function output($output)
{
    //$out = ["status" => false, "error_code" => $error_code];
    echo json_encode($output);
    exit;
}
