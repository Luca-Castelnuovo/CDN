<?php

function rrmdir($dir)
{
    if (is_dir($dir)) {
        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                if (is_dir($dir."/".$object)) {
                    rrmdir($dir."/".$object);
                } else {
                    unlink($dir."/".$object);
                }
            }
        }
        rmdir($dir);
    }
}


function projects_delete($CSRFtoken, $project_id)
{
    csrf_val($CSRFtoken, '/home');

    $user_id = check_data($user_id, true, 'User ID', true, '/home');
    $project_id = check_data($project_id, true, 'Project ID', true, '/home');

    $project = sql_select('projects', 'name', "owner_id='{$user_id}' AND id='{$project_id}'", true);

    if (empty($project['name'])) {
        redirect('/home', 'Project doesn\'t exist');
    }

    rrmdir("{$_SERVER['DOCUMENT_ROOT']}/users/{$_SESSION['username']}/{$project['name']}");

    sql_delete('projects', "owner_id='{$user_id}' AND id='{$project_id}'");
    sql_delete('files', "owner_id='{$user_id}' AND project_id='{$project_id}'");

    redirect('/home', 'Project deleted');
}
