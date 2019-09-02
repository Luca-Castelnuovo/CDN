<?php

// debug
echo $_GET['path'];
exit;
// end debug

require '../server.php';

$server = new Server($_GET['path']);
$output = $server->start();

if (!$output) {
    exit('Asset not found');
}

header($output->contentTypeHeaders);
header($output->cacheHeaders);
echo($output->fileContent);
