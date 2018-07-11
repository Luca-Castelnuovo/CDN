<?php

require $_SERVER['DOCUMENT_ROOT'] . '/php/api/main/init.php';

echo api_client_validate($_GET['client_id'], $_GET['client_password']);
//echo api_token_validate($_GET['client_id'], $_GET['client_token'], 0);
