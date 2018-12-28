<?php

function folders_list() {
    $folders = sql_select('folders', 'id,name', "is_subfolder='0'", false);

    echo '<style>.blue-icon{color:#2962ff}</style>';
    echo '<ul class="collection with-header">';
    echo '<li class="collection-header"><h4>Projects</h4></li>';

    if ($folders->num_rows != 0) {
        $CSRFtoken = csrf_gen();

        while ($folder = $folders->fetch_assoc()) {
            echo <<<HTML
            <li class="collection-item">
                <div>
                    <a href="?folder_id={$folder['id']}">
                        {$folder['name']}
                    </a>
                    <a href="/folders/delete?folder_id={$folder['id']}&CSRFtoken={$CSRFtoken}" class="secondary-content" onclick="return confirm('Are you sure?')">
                        <i class="material-icons blue-icon">delete</i>
                    </a>
                </div>
            </li>
HTML;
        }
    } else {
        echo '<li class="collection-item">You don\'t have any projects.</li>';
    }

    echo '</ul>';
    echo '<a href="/project" class="btn waves-effect blue accent-4">Create Project</a>';
}


function sub_folders_list($folder_id) {
    $folder_id = check_data($folder_id, true, 'Folder ID', true, '/panel/home');

    $folders = sql_select('folders', 'name', "parent_id='{$folder_id}' AND is_subfolder='1'", false);

    echo '<style>.blue-icon{color:#2962ff}</style>';
    echo '<ul class="collection with-header">';
    echo '<li class="collection-header"><h4>Projects</h4></li>';

    if ($folders->num_rows != 0) {
        $CSRFtoken = csrf_gen();

        while ($folder = $folders->fetch_assoc()) {
            echo <<<HTML
            <li class="collection-item">
                <div>
                    <a href="?folder_id={$folder['id']}">
                        {$folder['name']}
                    </a>
                    <a href="/folders/delete?folder_id={$folder['id']}&CSRFtoken={$CSRFtoken}" class="secondary-content" onclick="return confirm('Are you sure?')">
                        <i class="material-icons blue-icon">delete</i>
                    </a>
                </div>
            </li>
HTML;
        }
    } else {
        echo '<li class="collection-item">You don\'t have any projects.</li>';
    }

    echo '</ul>';
    echo '<a href="/project" class="btn waves-effect blue accent-4">Create Project</a>';
}


function folders_info($folder_id)
{
    $folder_id = check_data($folder_id, true, 'Folder ID', true, '/panel/home');

    $folder = sql_select('folders', 'is_subfolder,name', "id='{$folder_id}'", true);

    if (empty($folder)) {
        redirect('/panel/home', 'Folder doesn\'t exist');
    }

    echo <<<HTML
    <div class="row">
HTML;
    if ($folder['is_subfolder']) {
        sub_folders_list($folder_id);
    } else {
        files_list($folder_id);
    }
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
