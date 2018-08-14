<?php

$config = parse_ini_file('/var/www/test.lucacastelnuovo.nl/config.ini');

$conn = new mysqli($config['host'], $config['username'], $config['password'], 'test_db');

$conn->connect_error ? http_response_code(500) : http_response_code(200);exit;
