<?php

//Log api actions
function api_log($client_id, $client_action)
{
    $date = date('Y-m-d H:i:s', time());
    $client_ip = $_SERVER['REMOTE_ADDR'];
    $query = "INSERT INTO logs (date, client_id, client_action, client_ip) VALUES ('{$date}', '{$client_id}', '{$client_action}', '{$client_ip}')";
    sql_query('api_db', $query, false);
}

//Validate client credentials
function api_client_validate($client_id, $client_password)
{
    $validate_result = validate_client_id_and_pass($client_id, $client_password);

    switch ($validate_result['response_code']) {
        case 1.0://success
            if ($validate_result['status']) {
                return response(["status" => true, "type" => "auth", "subType" => "getToken", "response_code" => 1.0, "client_token" => api_token_generate($client_id)]);
            } else {
                api_log($client_id, 'auth_failure_status_not_match_response_code');
                return response(["status" => false, "type" => "auth", "subType" => "getToken", "response_code" => 1.1]);
            }
            break;

        case 1.1:////username_password_no_match
            api_log($client_id, 'auth_failure_password');
            return response(["status" => false, "type" => "auth", "subType" => "getToken", "response_code" => 0.0]);
            break;

        default://client_not_found
            api_log('unknown', 'auth_failure_unknown_user');
            return response(["status" => false, "type" => "auth", "subType" => "getToken", "response_code" => 0.1]);
            break;
    }
}


//Generate api access token
function api_token_generate($client_id)
{
    $client_token = gen(256);
    $query = "UPDATE clients SET client_token='{$client_token}' WHERE client_id='{$client_id}'";
    sql_query('api_db', $query, false);
    api_log($client_id, 'auth_success_token_generate');
    return $client_token;
}


//Generate api access token
function api_token_validate($client_id, $client_token, $api_level)
{
    $query = "SELECT client_level FROM clients WHERE client_id='{$client_id}' AND client_token='{$client_token}'";
    $result = sql_query('api_db', $query, false);

    if ($result->num_rows == 1) {
        $result_assoc = $result->fetch_assoc();
        if ($api_level <= $result_assoc['client_level']) {
            api_log($client_id, 'auth_success_token_valid');
            $client_token_new = api_token_generate($client_id);
            return response(["status" => true, "type" => "auth", "subType" => "validateToken", "response_code" => 1.0, "client_token" => $client_token_new]);
        } else {
            api_log($client_id, 'auth_failure_client_level');
            return response(["status" => false, "type" => "auth", "subType" => "validateToken", "response_code" => 1.1]);
        }
    } else {
        api_log($client_id, 'auth_failure_token_validate_mismatch_id_token');
        return response(["status" => false, "type" => "auth", "subType" => "validateToken", "response_code" => 0.0]);
    }


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
