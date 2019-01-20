function user_followers(username) {
    GETrequest(`/u/${username}/followers`, function(response) {
        var followers_html = [];
        var follower_html;

        for (follower of response.followers) {
            follower_html = `
                <li class="collection-item avatar">
                    <div class="row mb-0">
                        <a href="/u/${follower.username}" class="blue-text">
                            <img src="${follower.profile_picture}" onerror="this.src='https://github.com/identicons/${follower.username}.png'" class="circle" />
                            <span class="title">${follower.username}</span>
                        </a>
                        <a onclick="${ follower.is_following ? `user_follow('${follower.username}')` : `user_undo_follow('${follower.username}')`}" class="waves-effect btn right ${follower.is_following ? `grey lighten-5 black-text tooltipped" data-position="right" data-tooltip="Unfollow` : 'waves-light blue accent-4 "'}">${follower.is_following ? "Following" : "Follow"}</a>
                    </div>
                </li>
            `;
            followers_html.push(follower_html);
        }

        document.querySelector(
                "#followers_container"
            )
            .innerHTML = followers_html.join("");

        var tooltips = M.Tooltip.init(document.querySelectorAll(".tooltipped"), {});
        var modal = M.Modal.getInstance(document.querySelector("#followers_modal"));
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
                    <div class="row mb-0">
                        <a href="/u/${following.username}" class="blue-text">
                            <img src="${following.profile_picture}" onerror="this.src='https://github.com/identicons/${following.username}.png'" class="circle" />
                            <span class="title">${following.username}</span>
                        </a>
                        <a onclick="${ following.is_following ? `user_follow('${following.username}')` : `user_undo_follow('${following.username}')` }" class="waves-effect btn right ${ following.is_following ? `grey lighten-5 black-text tooltipped" data-position="right" data-tooltip="Unfollow` : 'waves-light blue accent-4 "'}">
                            ${following.is_following ? "Following" : "Follow"}
                        </a>
                    </div>
                </li>
            `;
            followings_html.push(following_html);
        }

        document.querySelector("#followers_container")
            .innerHTML = followings_html.join("");

        var tooltips = M.Tooltip.init(document.querySelectorAll(".tooltipped"), {});
        var modal = M.Modal.getInstance(document.querySelector("#followers_modal"));
        modal.open();
    });
}

function user_follow(user_name) {
    console.log(user_name);
}

function user_undo_follow(user_name) {
    console.log(user_name);
}
