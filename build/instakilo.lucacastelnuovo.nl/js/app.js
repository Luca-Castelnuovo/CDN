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
}

if (typeof auto_init !== 'undefined' && auto_init) {
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
        return false;
    }

    delete data.CSRFtoken;
    localStorage.setItem('posts', JSON.stringify(data));

    var posts_array = [];

    for (post of data.posts) {
        posts_array.push(feed_render_post(post));
    }

    return posts_array.join('');
}

function feed_check_posts() {
    GETrequest(`https://instakilo.lucacastelnuovo.nl/posts/actions/feed`, function(response) {
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
            var storageJSONPosts = storageJSON.posts;
            var storageJSONPostsUpdated = storageJSONPosts.map(function(post) {
                if (post.id == post_id) {
                    post.liked = true;
                }

                return post;
            });

            storageJSON.posts = storageJSONPostsUpdated;
            localStorage.setItem('posts', JSON.stringify(storageJSON));
        } else {
            console.log('request', response);
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
            var storageJSONPosts = storageJSON.posts;
            var storageJSONPostsUpdated = storageJSONPosts.map(function(post) {
                if (post.id == post_id) {
                    post.liked = false;
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

function feed_comment_post(formElement) {
    var formData = new FormData (formElement);
    var comment = formData.get('comment');
    if (comment.legth > 200) {
        M.Toast.dismissAll();
        M.toast({html: 'Comment too long'});
        return false;
    }

    formData.append("CSRFtoken", CSRFtoken);
    var post_id = formData.get('post_id');

    FORMrequest('/posts/actions/', formData, function(response) {
        if (response.success) {
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

function feed_render_post(post) {
    var comments;
    var comments_form;

    if (post.comments !== null && post.comments_allowed) {
        comments = feed_render_comments(post.comments);
        comments_form = `
            <form action="/posts/actions" method="POST" onsubmit="event.preventDefault(); feed_comment_post(this);">
                <div class="row mb-0">
                    <div class="col s10">
                        <div class="input-field">
                            <label for="form_comment">Comment</label>
                            <textarea id="form_comment" class="materialize-textarea counter" name="comment" data-length="200"></textarea>
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
        <div class="col s12">
            <div class="card">
                <div class="card-image"><img id="post_image" class="materialboxed" data-caption="${post.caption}" src="${post.img_url}"></div>
                <div class="card-content">
                    <p>
                        <span id="post_owner"><a href="/u/${post.username}">${post.username}</a></span> ${post.caption}
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
                <span class="title">${comment.username}</span>
            </a>
            <p class="truncate">${comment.body}</p>
        </li>
    `;
}


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
        </li>
    `;
}


// @codekit-prepend "init.js";
// @codekit-prepend "request.js";
// @codekit-prepend "feed_posts.js";
// @codekit-prepend "feed_messages.js";
