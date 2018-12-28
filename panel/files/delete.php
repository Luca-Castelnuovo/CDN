<?php

require $_SERVER['DOCUMENT_ROOT'] . '/panel/includes/init.php';

loggedin();

csrf_val($_GET['CSRFtoken'], '/panel/panel/home');

$file_id = check_data($_GET['file_id'], true, 'File ID', true, '/panel/panel/home');

$file = sql_select(
                'files',
                'name,folder_id',
                "id='{$file_id}'",
                true
            );

if (empty($file['name'])) {
    redirect('/panel/home', 'File doesn\'t exist');
}

sql_delete(
    'files',
    "id='{$file_id}'"
);

$path = folder_path($file['folder_id'], true)['path'] . $file['name'];
unlink($path);

redirect('/panel/home?folder_id=' . $file['folder_id'], 'File deleted');
