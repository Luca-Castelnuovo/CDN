function feed_render_messages(data) {
    setInterval(feed_check_messages, 30000);

    if (!data.success) {
        return `
            <li class="collection-item avatar">
                <i class="material-icons circle">account_circle</i> <span class="title">FirstName Last Name</span>
                <p class="truncate">Layers, background, shot, concept – good!</p><a class="secondary-content" href="#!"><i class="material-icons blue-icon">message</i></a>
            </li>
        `;
    }

    localStorage.setItem('messages', JSON.stringify(data));

    var messages_array = [];

    for (message of data.messages) {
        messages_array.push(feed_render_message(message));
    }

    return messages_array.join('');
}

function feed_check_messages() {
    request('GET', `https://instakilo.lucacastelnuovo.nl/messages/actions/${CSRFtoken}`, function(response) {
        if (JSON.stringify(response) !== localStorage.getItem('messages')) {
            M.Toast.dismissAll();
            M.toast({
                html: '<span>You have new messages!</span><button class="btn-flat toast-action blue-text accent-4" onclick="location.reload()">Load messages</button>',
                displayLength: 86400000
            });
        }
    });
}

function feed_render_message(message) {
    return `
        <li class="collection-item avatar">
            <i class="material-icons circle">account_circle</i> <span class="title">FirstName Last Name</span>
            <p class="truncate">Layers, background, shot, concept – good!</p><a class="secondary-content" href="#!"><i class="material-icons blue-icon">message</i></a>
        </li>
    `;
}
