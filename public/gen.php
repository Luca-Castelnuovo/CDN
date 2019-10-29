<?php

require '../include.php';

$output = cdnPath($_GET['path']);

if (empty($_GET['path']) || !$output) {
    http_response_code(404);
    exit('Asset not found');
}

echo $output;
