<?php

// require '/var/www/cdn.lucacastelnuovo.nl/include.php';
	// cdnPath('/var/www/general/js/ajax.js');
	// cdnPath('/general/js/ajax.js'); - recommended
	// cdnPath('general/js/ajax.js');


function cdnPath($path) {
    $cdnHost = 'https://cdn.lucacastelnuovo.nl';

	if (substr( $path, 0, 9 ) !== "/var/www/") {
		$path = ltrim($path, '/');
		$path = "/var/www/{$path}";
	}

	$pathInfo = pathinfo($path);

	if (!in_array($pathInfo['extension'], ['js','css','png','jpg']) || !file_exists($path)) {
    	return "File not found";
    }

    $fileHash = hash_file('haval160,4', $path);    
    $dirName = str_replace('/var/www/', '', $pathInfo['dirname']);
        
    return "{$cdnHost}/{$dirName}/{$pathInfo['filename']}.{$fileHash}.{$pathInfo['extension']}";
}
