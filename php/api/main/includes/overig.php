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


//Compare hash to password
function validate_client_id_and_pass($client_id, $client_password)
{
    $query = "SELECT client_password FROM clients WHERE client_id=$client_id";
    $query_result = sql_query('api_db', $query, false);

    if ($query_result->num_rows == 1) {//reponse_code = 0
        $query_result_assoc = $query_result->fetch_assoc();
        if (password_verify($client_password, $query_result_assoc['client_password'])) {
            return ["response_code" => 1.0];
        } else {
            return ["response_code" => 1.1];
        }
    } else {
        return ["response_code" => 0.0];
    }
}

//Return false on empty var
function is_empty_var($data, $error)
{
    if (empty($data) && $data != 0) {
        echo response($error);
        exit();
    } else {
        echo 'not empty';
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
