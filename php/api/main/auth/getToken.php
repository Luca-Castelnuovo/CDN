<?php

require '../functions.php';

$client_id = $_POST['client_id'];
$client_password = $_POST['client_password'];

$query = '';

sql_query('api_db', $query);

if (sql_query('api_db', $query, false)->num_rows = 0) {
    //log client ip, gen token, set token in db, send token trough encoded json
} else {
    //log client ip, send error trough encoded json
}
