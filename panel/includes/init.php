<?php

session_start();

$GLOBALS['config'] = require $_SERVER['DOCUMENT_ROOT'] . '/panel/includes/config.php';

require $_SERVER['DOCUMENT_ROOT'] . '/panel/includes/auth_sec/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/panel/includes/auth_sec/authentication.php';
require $_SERVER['DOCUMENT_ROOT'] . '/panel/includes/auth_sec/security.php';

require $_SERVER['DOCUMENT_ROOT'] . '/panel/includes/functions/files.php';
require $_SERVER['DOCUMENT_ROOT'] . '/panel/includes/functions/folders.php';

require $_SERVER['DOCUMENT_ROOT'] . '/panel/includes/io/output.php';
require $_SERVER['DOCUMENT_ROOT'] . '/panel/includes/io/sql.php';
require $_SERVER['DOCUMENT_ROOT'] . '/panel/includes/io/template.php';
