<?php

require '../server.php';

$server = new Server($_GET['path']);
$output = $server->start();

var_dump($output);
exit;

if (!$output) {
    http_response_code(404);
    exit('Asset not found');
}

header($output->contentTypeHeaders);
header($output->cacheHeaders);
echo($output->fileContent);
