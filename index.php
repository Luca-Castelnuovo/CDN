<?php

##########
# Config #
##########

$GLOBALS['config'] = (object) array(
    'server_token' => '1bfce65d195e2fdc1ae5eed6d537f0b0da1a76b8ea169ceae94af6312f57efbbeac5c0a4e69de5dda39bbf0f920863782fd5bc125dd77b290db94300c87e0a86'
);


#############
# Functions #
#############

function request($url, $data)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    curl_close($curl);
    return json_decode($result, true);
}

function response($status, $extra)
{
    $output = array_merge(["status" => $status], $extra);
    echo json_encode($output);
    exit;
}


###############
# Check token #
###############

$check_request = request('https://auth.lucacastelnuovo.nl/check.php', ["token" => "{$_GET['token']}", "server_token" => "{$GLOBALS['config']->server_token}"]);

if (empty($check_request)) {
    response(false, ["error" => "Couldn't reach authentication server."]);
}

if (!$check_request['status']) {
    response(false, ["error" => "{$check_request['error']}"]);
}

if (empty($_GET['file'])) {
    response(false, ["error" => "Please specify a file."]);
}


#####################
# Background Script #
#####################

if ($_GET['file'] == 'background') {
    header('Content-Type: application/javascript');

    if (empty($_GET['background'])) {
        echo "document.body.style.backgroundImage = \"url('https://cdn.lucacastelnuovo.nl/{$_GET['token']}/general/images/backgrounds/\" + Math.floor(10 * Math.random()) + \".jpg')\";";
    } else {
        echo "document.body.style.backgroundImage = \"url('https://cdn.lucacastelnuovo.nl/{$_GET['token']}/general/images/backgrounds/{$_GET['background']}.jpg')\";";
    }

    exit;
}


##############
# File Path #
#############

if (isset($_GET['folder1']) && isset($_GET['folder2']) && isset($_GET['folder3'])  && isset($_GET['folder4'])) {
    $file = 'files/' . $_GET['folder1'] . '/' . $_GET['folder2'] . '/' . $_GET['folder3'] . '/'  . $_GET['folder4'] . '/' . $_GET['file'];
} elseif (isset($_GET['folder1']) && isset($_GET['folder2']) && isset($_GET['folder3'])) {
    $file = 'files/' . $_GET['folder1'] . '/' . $_GET['folder2'] . '/' . $_GET['folder3'] . '/' . $_GET['file'];
} elseif (isset($_GET['folder1']) && isset($_GET['folder2'])) {
    $file = 'files/' . $_GET['folder1'] . '/' . $_GET['folder2'] . '/' . $_GET['file'];
} elseif (isset($_GET['folder1'])) {
    $file = 'files/' . $_GET['folder1'] . '/' . $_GET['file'];
} else {
    $file = 'files/' . $_GET['file'];
}

if (!file_exists($file)) {
    response(false, ["error" => "File not found.", "path" => "{$file}"]);
}


################
# Display file #
################

header('Content-Type: ' . mime_content_type($file));

readfile($file, 'r');
