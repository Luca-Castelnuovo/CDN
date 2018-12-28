<?php

function folders_list() {
    $folder_id = check_data($folder_id, true, 'Folder ID', true, '/panel/home');
    $folder = folder_path($folder_id, true);
    $files = sql_select('files', 'id,name', "folder_id='{$folder_id}'", false);

    $folder_title = ['<a href="/panel/home">./</a>'];
    foreach ($folder['folders'] as $folder) {
        array_push($folder_title, "<a href='/panel/home?folder_id={$folder['id']}'>{$folder['name']}/</a>");
    }

    echo '<style>.blue-icon{color:#2962ff}</style>';
    echo '<ul class="collection with-header">';
    echo '<li class="collection-header"><h4>' . implode('', $folder_title) . '</h4></li>';

    if ($files->num_rows != 0) {
        $CSRFtoken = csrf_gen();

        while ($file = $files->fetch_assoc()) {
            $file_path = $folder['path'] . $file['name'];

            echo <<<HTML
            <li class="collection-item">
                <div>
                    <a href="{$file_path}" target="_blank">
                        {$file['name']}
                    </a>
                    <a href="/files/delete?file_id={$file['id']}&CSRFtoken={$CSRFtoken}" class="secondary-content" onclick="return confirm('Are you sure?')">
                        <i class="material-icons blue-icon">delete</i>
                    </a>
                    <a href="/files/edit?file_id={$file['id']}" class="secondary-content">
                        <i class="material-icons blue-icon">edit</i>
                    </a>
                </div>
            </li>
HTML;
        }
    } else {
        echo '<li class="collection-item">You don\'t have any files in this folder.</li>';
    }

    echo '</ul>';
    echo '<a href="/files/add?folder_id=' . $folder_id . '" class="btn waves-effect blue accent-4">Create File</a>';
}


function folders_info($folder_id)
{
    $folder_id = check_data($folder_id, true, 'Folder ID', true, '/panel/home');

    $project = sql_select('folders', 'name', "id='{$project_id}'", true);

    if (empty($project)) {
        redirect('/panel/home', 'Project doesn\'t exist');
    }

    echo <<<HTML
    <div class="row">
HTML;
    files_list($folder_id);
    echo '</div>';
}


function folder_path($folder_id, $include_parents = false) {
    // sort on inherited order
    // EXAMPLE
    // VVVVVVV
    return
    [
        'path' => "{$_SERVER['DOCUMENT_ROOT']}/folder1/folder2/folder3/",
        'folders' =>
            [
                'id' => 1,
                'name' => 'folder1',
            ],
            [
                'id' => 2,
                'name' => 'folder2',
            ],
            [
                'id' => 3,
                'name' => 'folder3',
            ],
    ];
}
