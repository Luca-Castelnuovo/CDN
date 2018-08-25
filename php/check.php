<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $config = parse_ini_file('/var/www/api.lucacastelnuovo.nl/config.ini');
    if (!empty($_POST['pingdom_key']) && ($_POST['pingdom_key'] === $config['pingdom_key'])) {
        switch ($_GET['pingdom_check']) {
        case 'db':
            $conn = new mysqli($config['db_host'], $config['db_user'], $config['db_password'], $config['db_name']);
            $conn->connect_error ? http_response_code(500) : http_response_code(200);
            $conn->connection->close;
            exit;
            break;

        case 'site':
            http_response_code(200);
            exit;
            break;

        default:
            http_response_code(400);
            exit;
        }
    } else {
        http_response_code(403);
        exit;
    }
} else {
    http_response_code(405);
    exit;
}
