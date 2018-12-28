<?php

function folders_list()
{
    $projects = sql_select('projects', 'id,name', "owner_id='{$user_id}'", false);

    echo '<style>.blue-icon{color:#2962ff}</style>';
    echo '<ul class="collection with-header">';
    echo '<li class="collection-header"><h4>Projects</h4></li>';

    if ($projects->num_rows != 0) {
        $CSRFtoken = csrf_gen();

        while ($project = $projects->fetch_assoc()) {
            echo <<<HTML
            <li class="collection-item">
                <div>
                    <a href="?project_id={$project['id']}">
                        {$project['name']}
                    </a>
                    <a href="?project_id={$project['id']}&CSRFtoken={$CSRFtoken}" class="secondary-content" onclick="return confirm('Are you sure?')">
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
