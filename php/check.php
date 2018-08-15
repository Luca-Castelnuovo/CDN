<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $config = parse_ini_file('/var/www/cdn.lucacastelnuovo.nl/config.ini');
    if (!empty($_POST['pingdom_key']) && ($_POST['pingdom_key'] === $config['pingdom_key'])) {
        switch ($_GET['pingdom_check']) {
        case 'db':
            $conn = new mysqli($config['host'], $config['username'], $config['password'], 'test_db');
            $conn->connect_error ? http_response_code(500) : http_response_code(200);
            echo $mysqli->connect_error;
            $conn->connection->close();
            exit;
            break;

        case 'site':
            function checkOnline($domain)
            {
                $curlInit = curl_init($domain);
                curl_setopt($curlInit, CURLOPT_CONNECTTIMEOUT, 10);
                curl_setopt($curlInit, CURLOPT_HEADER, true);
                curl_setopt($curlInit, CURLOPT_NOBODY, true);
                curl_setopt($curlInit, CURLOPT_RETURNTRANSFER, true);

                // get answer

                $response = curl_exec($curlInit);
                curl_close($curlInit);
                if ($response) {
                    return true;
                }

                return false;
            }

            if (checkOnline('https://api.lucacastelnuovo.nl') && checkOnline('https://betasterren.lucacastelnuovo.nl') && checkOnline('https://cdn.lucacastelnuovo.nl') && checkOnline('https://test.lucacastelnuovo.nl') && checkOnline('https://lustrum.lucacastelnuovo.nl') && checkOnline('https://lucacastelnuovo.nl')) {
                http_response_code(200);
                exit;
            } else {
                http_response_code(500);
                exit;
            }

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
