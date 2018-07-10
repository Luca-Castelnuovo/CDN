<?php

$config = parse_ini_file('../config/authentication.ini');

//conmnect to database
function sql_connect()
{
    global $config;
    $conn = new mysqli($config['host'], $config['username'], $config['password'], $config['databse']);

    if ($conn->connect_error) {
        exit();
    } else {
        return $conn;
    }
}

//Clean user data
function clean_data($data)
{
}
