<?php

require $_SERVER['DOCUMENT_ROOT'] . '/php/api/main/init.php';

//echo api_client_validate($_GET['client_id'], $_GET['client_password']);

$client_id = clean_data($_GET['client_id']);
$client_password = clean_data($_GET['client_password']);
$client_ip = clean_data($_GET['client_ip']);

$query = "SELECT client_password FROM clients WHERE client_id=$client_id";
$query_result = sql_query('api_db', $query, false);

//Check is user exists
if ($query_result->num_rows != 1) {//reponse_code = 0
    echo response(["status" => false, "response_code" => 0]);
    //log command here
    exit;
}

//Check password
$query_result_assoc = $query_result->fetch_assoc();
if (!password_verify($client_password, $query_result_assoc['client_password'])) {
    echo response(["status" => false, "response_code" => 1]);
    //log command here
    exit;
}

//Generate token
$client_token = gen(256);
$query = "INSERT INTO tokens (client_id,client_token,client_ip) VALUES ('{$client_id}','{$client_token}','{$client_ip}')";
sql_query('api_db', $query, false);
//log command here

echo response(["status" => true, "response_code" => 2, "client_token" => $client_token]);
