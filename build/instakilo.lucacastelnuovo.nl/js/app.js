function materialize_init() {
    // Enable SideBar
    var sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {
        edge: 'right',
        draggable: 1
    });

    // Add character counter to inputs
    M.CharacterCounter.init(document.querySelectorAll('.counter'));

    // Enable MaterialBox
    var materialbox = M.Materialbox.init(document.querySelectorAll('.materialboxed'), {});

    // Tooltip
    var tooltips = M.Tooltip.init(document.querySelectorAll('.tooltipped'), []);

    // Modals
    var modals = M.Modal.init(document.querySelectorAll('.modal'), {});
}

if (typeof auto_init === 'undefined' || !auto_init) {
    document.addEventListener('DOMContentLoaded', function() {
        materialize_init();
    });
}


function GETrequest(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        var response = JSON.parse(xhr.responseText);
        CSRFtoken = response.CSRFtoken;
        callback(response);
    };

    xhr.open('GET', url);
    xhr.send();
}

function FORMrequest(url, formData, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        var response = JSON.parse(xhr.responseText);
        CSRFtoken = response.CSRFtoken;
        callback(response);
    };

    xhr.open('POST', url, true);
    xhr.send(formData);
}


function feed_render_posts(data) {
    setInterval(feed_check_posts, 60000);

    if (!data.success) {
        return `
        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <h4>You don't have any posts.</h4>
                </div>
                <div class="card-action center">
                    <div class="row mb-0">
                        <a href="/posts/add" class="btn waves-effect waves-light blue accent-4 col s12">Create a post</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    delete data.CSRFtoken;
    localStorage.setItem('posts', JSON.stringify(data));

    var posts_array = [];

    for (post of data.posts) {
        posts_array.push(feed_render_post(post));
    }

    return posts_array.join('');
}

function feed_render_posts_profile(data) {
    if (!data.success) {
        return `
        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <h4>This user doesn't have any posts.</h4>
                </div>
            </div>
        </div>
        `;
    }

    var posts_array = [];

    for (post of data.posts) {
        posts_array.push(feed_render_post(post));
    }

    return posts_array.join('');
}

function feed_check_posts() {
    GETrequest(`https://instakilo.lucacastelnuovo.nl/posts/actions/feed`, function(response) {
        delete response.CSRFtoken;
        if (JSON.stringify(response) !== localStorage.getItem('posts')) {
            M.Toast.dismissAll();
            M.toast({
                html: '<span>You have new posts!</span><button class="btn-flat toast-action blue-text accent-4" onclick="location.reload()">Load Posts</button>'
            });
        }
    });
}

function feed_like_post(post_id) {
    GETrequest(`https://instakilo.lucacastelnuovo.nl/posts/actions/like/${CSRFtoken}/${post_id}`, function(response) {
        if (response.success) {
            const likes = document.querySelector(`#post-${post_id} .post_likes`);
            likes.innerHTML = response.likes + ' likes';

            const like_function = document.querySelector(`#post-${post_id} a`);
            like_function.setAttribute('onClick', `feed_undo_like_post(${post_id})`);

            const like_icon = document.querySelector(`#post-${post_id} a i`);
            like_icon.innerHTML = 'favorite';

            M.Toast.dismissAll();
            M.toast({html: 'Liked'});

            var storageJSON = JSON.parse(localStorage.getItem('posts'));
            var storageJSONUpdated = storageJSON.posts.map(function(post) {
                if (post.id == post_id) {
                    post.liked = true;
                    post.likes++;
                    post.likes = `${post.likes}`;
                }

                return post;
            });

            storageJSON.posts = storageJSONUpdated;
            localStorage.setItem('posts', JSON.stringify(storageJSON));
        } else {
            console.log('error', response);
        }
    });
}

function feed_undo_like_post(post_id) {
    GETrequest(`https://instakilo.lucacastelnuovo.nl/posts/actions/undo_like/${CSRFtoken}/${post_id}`, function(response) {
        if (response.success) {
            const likes = document.querySelector(`#post-${post_id} .post_likes`);
            likes.innerHTML = response.likes + ' likes';

            const like_function = document.querySelector(`#post-${post_id} a`);
            like_function.setAttribute('onClick', `feed_like_post(${post_id})`);

            const like_icon = document.querySelector(`#post-${post_id} a i`);
            like_icon.innerHTML = 'favorite_border';

            M.Toast.dismissAll();
            M.toast({html: 'Like removed'});

            var storageJSON = JSON.parse(localStorage.getItem('posts'));
            var storageJSONUpdated = storageJSON.posts.map(function(post) {
                if (post.id == post_id) {
                    post.liked = false;
                    post.likes--;
                    post.likes = `${post.likes}`;
                }

                return post;
            });

            storageJSON.posts = storageJSONUpdated;
            localStorage.setItem('posts', JSON.stringify(storageJSON));
        } else {
            console.log('error', response);
        }
    });
}

function feed_comment_post(formElement) {
    var formData = new FormData (formElement);
    if (formData.get('comment').legth > 200) {
        M.Toast.dismissAll();
        M.toast({html: 'Comment too long'});
        return false;
    }

    formData.append("CSRFtoken", CSRFtoken);
    var post_id = formData.get('post_id');

    FORMrequest('/posts/actions/', formData, function(response) {
        if (response.success) {
            const text_input = document.querySelector(`#form_comment-${post_id}`);
            text_input.value = '';
            let new_comment = document.createElement('div');
            new_comment.innerHTML = feed_render_comment(response.new_comment);
            const comment_container = document.querySelector(`#comment-container-${post_id}`);

            comment_container.appendChild(new_comment);

            M.Toast.dismissAll();
            M.toast({html: 'Comment sent'});

            var storageJSON = JSON.parse(localStorage.getItem('posts'));
            var storageJSONPosts = storageJSON.posts;
            var storageJSONPostsUpdated = storageJSONPosts.map(function(post) {
                if (post.id == post_id) {
                    post.comments = response.comments;
                }

                return post;
            });

            storageJSON.posts = storageJSONPostsUpdated;
            localStorage.setItem('posts', JSON.stringify(storageJSON));
        } else {
            console.log('error', response);
        }
    });
}

function feed_delete_comment(comment_id) {
    if (!confirm('Are you sure?')) {
        return false;
    }

    console.log(`delete ${comment_id}`);
}

function feed_render_post(post, profile = false) {
    var comments;
    var comments_form;

    if (post.comments_allowed) {
        comments = feed_render_comments(post.comments);
        comments_form = `
            <form action="/posts/actions" method="POST" onsubmit="event.preventDefault(); feed_comment_post(this);">
                <div class="row mb-0">
                    <div class="col s10">
                        <div class="input-field">
                            <label for="form_comment-${post.id}">Comment</label>
                            <textarea id="form_comment-${post.id}" class="materialize-textarea counter" name="comment" data-length="200"></textarea>
                        </div>
                    </div>
                    <div class="input-field col s2">
                        <input type="hidden" name="post_id" value="${post.id}">
                        <button type="submit" class="btn-floating btn waves-effect waves-light blue accent-4">
                            <i class="material-icons">send</i>
                        </button>
                    </div>
                </div>
            </form>
        `;
    } else {
        comments = '<li class="collection-item">Comments are disabled</li>';
        comments_form = '';
    }

    var like_icon = post.liked ? 'favorite' : 'favorite_border';
    var like_function = post.liked ? `feed_undo_like_post(${post.id})` : `feed_like_post(${post.id})`;

    return `
        <div class="col s12 ${profile ? 'm6 l4 xl3' : ''}">
            <div class="card">
                <div class="card-image"><img id="post_image" class="materialboxed" data-caption="${post.caption}" src="${post.img_url}"></div>
                <div class="card-content">
                    <p>
                        <span class="bold"><a href="/u/${post.username}">${post.username}</a></span> ${post.caption}
                        ${post.user_is_owner ? `<a href="/posts/edit/${post.id}" class="secondary-content tooltipped" data-position="right" data-tooltip="Edit post"><i class="material-icons blue-icon">edit</i></a>` : ''}
                    </p>
                </div>
                <div class="card-action">
                    <div class="row likes" id="post-${post.id}">
                        <a onclick="${like_function}" class="mr-6"><i class="material-icons blue-icon">${like_icon}</i></a> <span class="post_likes">${post.likes} likes</span>
                    </div>
                    <div class="row mb-0">
                        <h6>Comments:</h6>
                        <ul id="comment-container-${post.id}" class="collection">
                            ${comments}
                        </ul>
                            ${comments_form}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function feed_render_comments(comments) {
    var comments_array = [];

    for (comment of comments) {
        comments_array.push(feed_render_comment(comment));
    }

    return comments_array.join('');
}

function feed_render_comment(comment) {
    return `
        <li class="collection-item avatar">
            <a href="/u/${comment.username}" class="blue-text">
                <img src="${comment.profile_picture}" onerror="this.src='https://github.com/identicons/${comment.username}.png'" class="circle" />
                <span class="title tt-none">${comment.username}</span>
            </a>
            <p class="truncate">${comment.body}</p>
            ${comment.user_is_owner ? `<a href="#!" onclick="feed_delete_comment('${comment.id}')" class="secondary-content tooltipped" data-position="right" data-tooltip="Delete comment"><i class="material-icons blue-icon">delete</i></a>` : ''}
        </li>
    `;
}


function feed_render_messages(data) {
    setInterval(feed_check_messages, 30000);

    if (!data.success) {
        return `
            <li class="collection-item">
                You don't have any messages.
            </li>
        `;
    }

    delete data.CSRFtoken;
    localStorage.setItem('messages', JSON.stringify(data));

    var messages_array = [];

    for (message of data.messages) {
        messages_array.push(feed_render_message(message));
    }

    return messages_array.join('');
}

function feed_check_messages() {
    GETrequest(`https://instakilo.lucacastelnuovo.nl/messages/actions`, function(response) {
        delete response.CSRFtoken;
        if (JSON.stringify(response) !== localStorage.getItem('messages')) {
            M.Toast.dismissAll();
            M.toast({
                html: '<span>You have new messages!</span><button class="btn-flat toast-action blue-text accent-4" onclick="location.reload()">Load messages</button>'
            });
        }
    });
}

function feed_render_message(message) {
    return `
        <li class="collection-item avatar">
            <a href="/u/${message.username}" class="blue-text">
                <img src="${message.profile_picture}" onerror="this.src='https://github.com/identicons/${message.username}.png'" class="circle" />
                <span class="title">${message.username}</span>
            </a>
            <p class="truncate">${message.body}</p>
            <a href="/messages/#reply_to=${message.username}" class="secondary-content tooltipped" data-position="right" data-tooltip="Reply"><i class="material-icons blue-icon">reply</i></a>
        </li>
    `;
}


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
                        <a onclick="${follower.is_following ? `user_follow(${follower.username})` : `user_undo_follow(${follower.username})`}" class="waves-effect btn right ${follower.is_following ? `grey lighten-5 black-text tooltipped" data-position="right" data-tooltip="Unfollow` : 'waves-light blue accent-4 "'}">${follower.is_following ? 'Following' : 'Follow'}</a>
                    </div>
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
                    <div class="row mb-0">
                        <a href="/u/${following.username}" class="blue-text">
                            <img src="${following.profile_picture}" onerror="this.src='https://github.com/identicons/${following.username}.png'" class="circle" />
                            <span class="title">${following.username}</span>
                        </a>
                        <a onclick="user_follow(${following.username})" class="waves-effect btn tooltipped grey lighten-5 black-text right" data-position="right" data-tooltip="Unfollow">Following</a>
                    </div>
                </li>
            `;
            followings_html.push(following_html);
        }

        document.querySelector('#followers_container').innerHTML = followings_html.join('');

        var modal = M.Modal.getInstance(document.querySelector('#followers_modal'));
        modal.open();
    });
}

function user_follow(user_name) {
    console.log(user_name);
}

function user_undo_follow(user_name) {
    console.log(user_name);
}


// @codekit-prepend "init.js";
// @codekit-prepend "request.js";
// @codekit-prepend "feed_posts.js";
// @codekit-prepend "feed_messages.js";
// @codekit-prepend "user.js";
