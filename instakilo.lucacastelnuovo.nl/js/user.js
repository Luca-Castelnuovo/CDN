function user_followers(username) {
    GETrequest(`/u/${username}/followers`, function(response) {
        var followers_html = [];
        var follower_html;

        for (follower of response.followers) {
            follower_html = `
                <li class="collection-item avatar">
                    <a href="/u/${follower.username}" class="blue-text">
                        <img src="${follower.profile_picture}" onerror="this.src='https://github.com/identicons/${follower.username}.png'" class="circle" />
                        <span class="title">${follower.username}</span>
                    </a>
                    <a href="#!" class="waves-effect waves-light btn right ${follower.is_following ? `grey lighten-5 black-text tooltipped" data-position="right" data-tooltip="Unfollow` : 'blue accent-4 "'}">${follower.is_following ? 'Following' : 'Follow'}</a>
                </li>
            `;
            followers_html.push(follower_html);
        }

        document.querySelector('#followers_container').innerHTML = followers_html.join('');

        var modal = M.Modal.getInstance(document.querySelector('#followers_modal'));
        modal.open();
    });
}

function user_following(username) {
    GETrequest(`/u/${username}/following`, function(response) {
        var followings_html = [];
        var following_html;

        for (following of response.following) {
            following_html = `
                <li class="collection-item avatar">
                    <a href="/u/${following.username}" class="blue-text">
                        <img src="${following.profile_picture}" onerror="this.src='https://github.com/identicons/${following.username}.png'" class="circle" />
                        <span class="title">${following.username}</span>
                    </a>
                    <a href="#!" class="waves-effect waves-light btn tooltipped grey lighten-5 black-text roght" data-position="right" data-tooltip="Unfollow">Following</a>
                </li>
            `;
            followings_html.push(following_html);
        }

        document.querySelector('#followers_container').innerHTML = followings_html.join('');

        var modal = M.Modal.getInstance(document.querySelector('#followers_modal'));
        modal.open();
    });
}
