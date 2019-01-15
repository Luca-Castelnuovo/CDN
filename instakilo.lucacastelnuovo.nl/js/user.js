function user_followers() {
    GETrequest(`/user/actions/followers`, function(response) {
        var followers_html;
        var follower_html;

        for (follower of response.followers) {
            follower_html = `
                <li class="collection-item avatar">
                    <a href="/u/${follower.username}" class="blue-text">
                        <img src="${follower.profile_picture}" onerror="this.src='https://github.com/identicons/${message.username}.png'" class="circle" />
                        <span class="title">${follower.username}</span>
                    </a>
                    <p class="truncate">${message.body}</p>
                </li>
            `;
            followers_html.push(follower_html);
        }

        document.querySelector('#followers_container').innerHTML = followers_html.join('');

        var modal = M.Modal.getInstance(document.querySelector('#followers_modal'));
        modal.open();
    });

}

function user_following() {
    GETrequest(`/user/actions/following`, function(response) {
        var followings_html;
        var following_html;

        for (follower of response.following) {
            following_html = `
                <li class="collection-item avatar">
                    <a href="/u/${follower.username}" class="blue-text">
                        <img src="${follower.profile_picture}" onerror="this.src='https://github.com/identicons/${message.username}.png'" class="circle" />
                        <span class="title">${follower.username}</span>
                    </a>
                    <p class="truncate">${message.body}</p>
                </li>
            `;
            followings_html.push(following_html);
        }

        document.querySelector('#followers_container').innerHTML = followings_html.join('');

        var modal = M.Modal.getInstance(document.querySelector('#followers_modal'));
        modal.open();
    });

}
