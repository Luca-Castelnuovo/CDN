<?php

session_start();

$GLOBALS['config'] = require $_SERVER['DOCUMENT_ROOT'] . '/includes/config.php';

require $_SERVER['DOCUMENT_ROOT'] . '/includes/auth_sec/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/includes/auth_sec/authentication.php';
require $_SERVER['DOCUMENT_ROOT'] . '/includes/auth_sec/security.php';

require $_SERVER['DOCUMENT_ROOT'] . '/includes/functions/files.php';
require $_SERVER['DOCUMENT_ROOT'] . '/includes/functions/folders.php';

require $_SERVER['DOCUMENT_ROOT'] . '/includes/io/output.php';
require $_SERVER['DOCUMENT_ROOT'] . '/includes/io/sql.php';
require $_SERVER['DOCUMENT_ROOT'] . '/includes/io/template.php';
