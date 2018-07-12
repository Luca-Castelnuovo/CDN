<?php

//Clean user submitted data
function clean_data($data, $disable = 'none')
{
    if ($disable != 'sql') {
        $conn = sql_connect();
        $data = $conn->escape_string($data);
        sql_disconnect($conn);
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


//Encode array to json
function response($output)
{
    return json_encode($output);
}


//Generate random string
function gen($length)
{
    $length = $length / 2;
    return bin2hex(random_bytes($length));
}


//Load configuration
function config_load($config)
{
    return parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/php/api/config/' . $config . '.ini');
}


//Return false on empty var
function is_empty($data, $error)
{
    if (empty($data)) {
        echo response($error);
        exit();
    }
}


//Log actions
function action_log($client_id, $client_action)
{
    $date = date('Y-m-d H:i:s', time());
    $client_ip = $_SERVER['REMOTE_ADDR'];
    $query = "INSERT INTO logs (date, client_id, client_action, client_ip) VALUES ('{$date}', '{$client_id}', '{$client_action}', '{$client_ip}')";
    sql_query('api_db', $query, false);
}
