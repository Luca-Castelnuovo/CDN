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
