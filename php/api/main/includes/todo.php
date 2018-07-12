<?php

//validate client and api_level TODO
function api_validate_level($client_id, $required_api_level)
{
    $query = "SELECT client_level FROM clients WHERE client_id='{$client_id}'";
    $result = sql_query('api_db', $query, false);

    if ($result->num_rows == 1) {
        $result_assoc = $result->fetch_assoc();
        if ($required_api_level <= $result_assoc['client_level']) {
            action_log($client_id, 'auth_success_token_client_level');
            return ["response_code" => 1.0];
        } else {
            action_log($client_id, 'auth_failure_api_validate_level_client_level_too_low');
            return ["respone_code" => 1.1];
        }
    } else {
        action_log($client_id, 'auth_failure_api_validate_level_client_unknown');
        return ["respone_code" => 0.0];
    }
}


//Validate api access token and access level REMOVE
function api_token_validate($client_id, $client_token, $required_api_level)
{
    $client_id = clean_data($client_id);
    $client_token = clean_data($client_token);
    $required_api_level = clean_data($required_api_level);

    //check client exists
    $query = "SELECT id FROM clients WHERE client_id='{$client_id}'";
    $result = sql_query('api_db', $query, false);

    if ($result->num_rows == 1) {
        $result_assoc = $result->fetch_assoc();
    } else {
        action_log($client_id, 'auth_failure_api_token_validate_client_unknown');
        return response(["status" => false, "type" => "auth", "subType" => "validateToken", "response_code" => 0.0]);
    }

    //check token valid
    $query = "SELECT id FROM tokens WHERE client_id='{$client_id}' AND client_token='{$client_token}'";
    $result = sql_query('api_db', $query, false);

    if ($result->num_rows != 1) {
        action_log($client_id, 'auth_failure_api_token_validate_id_mismatch_token');
        return response(["status" => false, "type" => "auth", "subType" => "validateToken", "response_code" => 1.0]);
    }

    //check client access level
    api_validate_level($client_id, $required_api_level);

    //delete old token
    api_token_delete($client_token);

    //return true
    return ["status" => true, "type" => "auth", "subType" => "validateToken", "response_code" => 3.0];
}


//Check if token is valid
function api_client_valid_check($client_id, $client_token)
{
    $client_id = clean_data($client_id);
    $client_token = clean_data($client_token);
    $required_api_level = clean_data($required_api_level);

    //check client exists
    $query = "SELECT id FROM clients WHERE client_id='{$client_id}'";
    $result = sql_query('api_db', $query, false);

    if ($result->num_rows == 1) {
        $result_assoc = $result->fetch_assoc();
    } else {
        action_log($client_id, 'auth_failure_api_token_validate_client_unknown');
        return response(["status" => false, "type" => "auth", "subType" => "validateToken", "response_code" => 0.0]);
    }

    //check token valid
    $query = "SELECT id FROM tokens WHERE client_id='{$client_id}' AND client_token='{$client_token}'";
    $result = sql_query('api_db', $query, false);

    if ($result->num_rows != 1) {
        action_log($client_id, 'auth_failure_api_token_validate_id_mismatch_token');
        return response(["status" => false, "type" => "auth", "subType" => "validateToken", "response_code" => 1.0]);
    }

    //check client access level
    api_validate_level($client_id, $required_api_level);

    //delete old token
    api_token_delete($client_token);

    //return true
    return ["status" => true, "type" => "auth", "subType" => "validateToken", "response_code" => 3.0];
}
