<?php

function files_delete($CSRFtoken, $folder_id, $file_id) {
    csrf_val($CSRFtoken, '/home');

    $folder_id = check_data($folder_id, true, 'Folder ID', true, '/panel/home');
    $file_id = check_data($file_id, true, 'File ID', true, '/panel/home');

    $project = sql_select('folders', 'id,name', "id='{$folder_id}'", true);
    $file = sql_select('files', 'name', "id='{$file_id}' AND project_id='{$project['id']}'", true);

    if (empty($file['name'])) {
        redirect('/home', 'File doesn\'t exist');
    }

    sql_delete('files', "owner_id='{$user_id}' AND id='{$file_id}' AND project_id='{$folder_id}'");
    unlink("{$_SERVER['DOCUMENT_ROOT']}/users/{$_SESSION['username']}/{$project['name']}/{$file['name']}");

    redirect('/home?project_id=' . $folder_id, 'File deleted');
}
