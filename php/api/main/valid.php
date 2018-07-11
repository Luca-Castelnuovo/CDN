<?php

require $_SERVER['DOCUMENT_ROOT'] . '/php/api/main/init.php';

echo api_client_valid_check($_GET['client_id'], $_GET['client_token']);
