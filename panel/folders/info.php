<?php

function projects_info($user_id, $project_id)
{
    $user_id = check_data($user_id, true, 'User ID', true, '/home');
    $project_id = check_data($project_id, true, 'Project ID', true, '/home');

    $project = sql_select('projects', 'name', "owner_id='{$user_id}' AND id='{$project_id}'", true);

    if (empty($project)) {
        redirect('/home', 'Project doesn\'t exist');
    }

    echo <<<HTML
    <div class="row">
HTML;
    files_list($user_id, $project_id);
    echo '</div>';
}
