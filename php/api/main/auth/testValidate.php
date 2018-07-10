<?php

require $_SERVER['DOCUMENT_ROOT'] . '/php/api/main/init.php';

$client_id = clean_data($_GET['client_id']);
$client_token = clean_data($_GET['client_token']);

echo api_token_validate($client_id, $client_token, 0);
