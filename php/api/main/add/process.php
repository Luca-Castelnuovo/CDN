<?php

require $_SERVER['DOCUMENT_ROOT'] . '/php/api/main/init.php';

$client_id = clean_data($_GET['client_id']);
$client_password = clean_data($_GET['client_password']);
$client_ip = clean_data($_GET['client_ip']);

$query = "SELECT client_password FROM clients WHERE client_id=$client_id";
$query_result = sql_query('api_db', $query, false);

//Check if vars are not empty
is_empty($_GET['client_id'], ["status" => false, "response_code" => 3]);
is_empty($_GET['client_password'], ["status" => false, "response_code" => 3.1]);
is_empty($_GET['client_ip'], ["status" => false, "response_code" => 3.2]);

//Check is user exists
if ($query_result->num_rows != 1) {//reponse_code = 0
    action_log('unknown', 'add_failure_user_unknown');
    echo response(["status" => false, "response_code" => 0]);
    exit;
}

//Check password
$query_result_assoc = $query_result->fetch_assoc();
if (!password_verify($client_password, $query_result_assoc['client_password'])) {
    action_log($client_id, 'add_failure_user_mismatch_password');
    echo response(["status" => false, "response_code" => 1]);
    exit;
}

//Generate token
api_token_generate($client_id, $client_ip);


//Output token
action_log($client_id, 'add_success');
echo response(["status" => true, "response_code" => 2, "client_token" => $client_token]);
