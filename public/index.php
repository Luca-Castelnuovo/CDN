<?php

require '../cdn.php';

if(!isset($_GET['path']) || empty($_GET['path'])) {
	header('Location: gen.php');
}

$cdn = new CDN($_GET['path']);
$cdn = $cdn->outputAsset();

if (!$cdn) {
    exit('Asset not found');
}

header($cdn->contentTypeHeaders);
header($cdn->cacheHeaders);
echo($cdn->fileContent);
