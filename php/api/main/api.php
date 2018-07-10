<?php

//Log api actions
function api_log($client_id, $client_action)
{
    $date = date('Y-m-d H:i:s', time());
    $client_ip = $_SERVER['REMOTE_ADDR'];
    $query = "INSERT INTO logs (date, client_id, client_action, client_ip) VALUES ('$date', '$client_id', '$client_action', '$client_ip')";
    sql_query('api_db', $query, false);
}

//Generate api access token
function api_token_generate($client_id)
{
    $client_token = gen(256);
    $query = "UPDATE clients SET client_token='$client_token' WHERE client_id='$client_id'";
    sql_query('api_db', $query, false);
    api_log($client_id, 'auth_success_token_generate');
    return $client_token;
}

//Make api calls for GET, PUT, POST
function api_call($method, $url, $data = false)
{
    $curl = curl_init();
    switch ($method) {
    case "POST":
        curl_setopt($curl, CURLOPT_POST, 1);
        if ($data) {
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }

        break;

    case "PUT":
        curl_setopt($curl, CURLOPT_PUT, 1);
        break;

    default:
        if ($data) {
            $url = sprintf("%s?%s", $url, http_build_query($data));
        }
    }

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    curl_close($curl);
    return json_decode($result, true);
}
