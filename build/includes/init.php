<?php

session_start();

$GLOBALS['config'] = require $_SERVER['DOCUMENT_ROOT'] . '/includes/config.php';

require $_SERVER['DOCUMENT_ROOT'] . '/includes/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/includes/authentication.php';
require $_SERVER['DOCUMENT_ROOT'] . '/includes/security.php';
require $_SERVER['DOCUMENT_ROOT'] . '/includes/output.php';

// External
require '/var/www/logs.lucacastelnuovo.nl/public_html/logs.php';
