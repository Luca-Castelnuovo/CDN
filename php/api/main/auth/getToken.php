<?php

require '../functions.php';

$client_id = clean_data($_POST['client_id']);
$client_password = clean_data($_POST['test']);

$query = "SELECT client_password FROM clients WHERE client_id=$client_id";
$client_authentication = sql_query('api_db', $query, false);

if ($client_authentication->num_rows == 1) {//reponse_code = 0
    $client_authentication_associative = $client_authentication->fetch_assoc();
    if (password_verify($client_password, $client_authentication_associative['client_password'])) {//reponse_code = 1
        //log client ip, gen token, set token in db, send token trough encoded json
        echo response(["status" => true, "type" => "auth", "subType" => "getToken", "response_code" => 1.0, "token" => api_token_generate($client_id)]);
    } else {
        api_log($client_id, 'auth_failure_password');
        echo response(["status" => false, "type" => "auth", "subType" => "getToken", "response_code" => 1.1]);
    }
} else {
    api_log('unknown', 'auth_failure_unknown_user');
    echo response(["status" => false, "type" => "auth", "subType" => "getToken", "response_code" => 0.0]);
}
