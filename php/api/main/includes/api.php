<?php


//Validate api token
//valid token
//valid ip
//valid access level
function api_validate_access($client_id, $client_token)
{
    $client_id = clean_data($client_id);
    $client_token = clean_data($client_token);
    $client_ip = $_SERVER['REMOTE_ADDR'];

    //Check if id matches token
    $query = "SELECT token_ip FROM tokens WHERE client_id='{$client_id}' AND client_token='{$client_token}'";
    $result = sql_query('api_db', $query, false);

    if ($result->num_rows == 1) {
        $result_assoc = $result->fetch_assoc();
    } else {
        action_log($client_id, 'validate_access_failure_id_mismatch_token');
        return response(["status" => false, "response_code" => 0]);
    }

    //Check ip
    if ($result_assoc['token_ip'] == $client_ip) {
        $result_assoc = $result->fetch_assoc();
    } else {
        action_log($client_id, 'validate_access_failure_id_mismatch_token');
        return response(["status" => false, "response_code" => 0]);
    }
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


//Generate api access token
function api_token_generate($client_id, $token_ip)
{
    $client_token = gen(256);
    $query = "INSERT INTO tokens (client_id,client_token,token_ip) VALUES ('{$client_id}','{$client_token}','{$token_ip}')";
    sql_query('api_db', $query, false);
    return $client_token;
}


//Delete used api access token //REMOVE
function api_token_delete($client_token)
{
    $query = "DELETE FROM tokens WHERE client_token='{$client_token}'";
    sql_query('api_db', $query, false);
}
