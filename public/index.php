<?php

require '../cdn.php';

$cdn = new CDN($_GET['url_path']);
$cdn = $cdn->outputAsset();

if (!$cdn) {
    exit('Asset not found.');
}

header($cdn->contentTypeHeaders);
header($cdn->cacheHeaders);
echo($cdn->fileContent);
