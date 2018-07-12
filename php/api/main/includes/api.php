<?php


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


//Generate api access token
function api_token_generate($client_id, $client_ip)
{
    $client_token = gen(256);
    $query = "INSERT INTO tokens (client_id,client_token,client_ip) VALUES ('{$client_id}','{$client_token}','{$client_ip}')";
    sql_query('api_db', $query, false);
    action_log($client_id, 'auth_success_api_token_generate');
    return $client_token;
}


//Delete used api access token //REMOVE
function api_token_delete($client_token)
{
    $query = "DELETE FROM tokens WHERE client_token='{$client_token}'";
    sql_query('api_db', $query, false);
    action_log($client_id, 'auth_success_api_token_delete');
}
