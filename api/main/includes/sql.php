<?php

//Connect to database
function sql_connect($database = null)
{
    $config = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/php/api/config/sql.ini');

    $database = isset($database) ? $database : $config['database'];

    $conn = new mysqli($config['host'], $config['username'], $config['password'], $database);

    if ($conn->connect_error) {
        exit();
    } else {
        return $conn;
    }
}


//Close sql connection
function sql_disconnect($conn)
{
    mysqli_close($conn);
}


//Execute sql query's
function sql_query($database, $query, $assoc = true)
{
    $conn = sql_connect($database);

    $result = $conn->query($query);

    //Check if query was succesfull
    if (!$result) {
        echo response(["status" => false, "type" => "sql"]);
        exit();
    }

    sql_disconnect($conn);

    if ($assoc) {
        return $result->fetch_assoc();
    } else {
        return $result;
    }
}
