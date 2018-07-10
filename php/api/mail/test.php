<?php
//Load additional functions and configuration
require '../authentication/functions.php';
$config = parse_ini_file('../config/mail.ini');
$response = clean_data($_POST['data']);
echo response(["response" => $response]);
