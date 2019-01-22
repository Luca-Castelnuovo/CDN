function user_followers(username) {
    GETrequest(`/u/${username}/followers`, function(response) {
        var followers_of_owner = [];

        for (follower of response.followers) {
            followers_of_owner.push(`
                <li class="collection-item avatar">
                    <div class="row mb-0">
                        <a href="/u/${follower.username}" class="blue-text">
                            <img src="${follower.profile_picture}" onerror="this.src='https://cdn.lucacastelnuovo.nl/general/images/profile_picture.png'" class="circle" />
                            <span class="title">${follower.username}</span>
                        </a>
                        <a onclick="${ follower.is_following ? `user_undo_follow('${follower.username}')` : `user_follow('${follower.username}')`}" class="waves-effect btn right ${follower.is_following ? `grey lighten-5 black-text tooltipped" data-position="right" data-tooltip="Unfollow` : 'waves-light blue accent-4 "'}">${follower.is_following ? "Following" : "Follow"}</a>
                    </div>
                </li>
            `);
        }

        document.querySelector("#followers_container")
            .innerHTML = followers_of_owner.join("");

        var tooltips = M.Tooltip.init(document.querySelectorAll(".tooltipped"), {});
        var modal = M.Modal.getInstance(document.querySelector("#followers_modal"));
        modal.open();

        document.querySelector('#followers_number')
            .innerHTML = response.follower_number;
    });
}

function user_following(username) {
    GETrequest(`/u/${username}/following`, function(response) {
        var users_owner_is_following = [];
        var following_html;

        for (user_owner_is_following of response.following) {
            console.log(user_owner_is_following);
            users_owner_is_following.push(`
                <li class="collection-item avatar">
                    <div class="row mb-0">
                        <a href="/u/${user_owner_is_following.username}" class="blue-text">
                            <img
                                src="${user_owner_is_following.profile_picture}"
                                onerror="this.src='https://cdn.lucacastelnuovo.nl/general/images/profile_picture.png'"
                                class="circle"
                            />
                            <span class="title">${user_owner_is_following.username}</span>
                        </a>
                        ${users_owner_is_following.is_user_self ?
                            ``
                            :
                            `<a onclick="${user_owner_is_following.is_following ?
                                `user_undo_follow('${user_owner_is_following.username}')`
                                :
                                `user_follow('${user_owner_is_following.username}')` }" class="waves-effect btn right ${user_owner_is_following.is_following ?
                                    `grey lighten-5 black-text tooltipped" data-position="right" data-tooltip="Unfollow`
                                    :
                                    'waves-light blue accent-4 "'}">${user_owner_is_following.is_following ?
                                        "Following"
                                        :
                                        "Follow"}
                            </a>`}
                    </div>
                </li>
            `);
        }

        document.querySelector("#following_container")
            .innerHTML = users_owner_is_following.join("");

        var tooltips = M.Tooltip.init(document.querySelectorAll(".tooltipped"), {});
        var modal = M.Modal.getInstance(document.querySelector("#following_modal"));
        modal.open();

        document.querySelector('#following_number')
            .innerHTML = response.following_number;
    });
}

function user_follow(user_name) {
    GETrequest(`/u/${user_name}/follow/${CSRFtoken}`, function(response) {
        M.Toast.dismissAll();
        M.toast({
            html: `${user_name} followed`
        });
        location.reload();
    });
}

function user_undo_follow(user_name) {
    GETrequest(`/u/${user_name}/undo_follow/${CSRFtoken}`, function(response) {
        M.Toast.dismissAll();
        M.toast({
            html: `${user_name} unfollowed`
        });
        location.reload();
    });
}
