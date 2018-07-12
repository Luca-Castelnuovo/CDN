<?php

//Load api functions
require $_SERVER['DOCUMENT_ROOT'] . '/php/api/main/init.php';

//api validation
echo api_validate_access($_GET['client_id'], $_GET['client_token'], 'mail');
