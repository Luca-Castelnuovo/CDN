function feed_render_posts(data) {
    setInterval(feed_check_posts, 30000);

    if (!data.success) {
        return false;
    }

    localStorage.setItem('posts', JSON.stringify(data));

    var posts_array = [];

    for (post of data.posts) {
        posts_array.push(feed_render_post(post));
    }

    return posts_array.join('');
}

function feed_check_posts() {
    request('GET', `https://instakilo.lucacastelnuovo.nl/posts/actions/feed`, function(response) {
        if (JSON.stringify(response) !== localStorage.getItem('posts')) {
            M.Toast.dismissAll();
            M.toast({
                html: '<span>You have new posts!</span><button class="btn-flat toast-action blue-text accent-4" onclick="location.reload()">Load Posts</button>'
            });
        }
    });
}

function feed_like_post(post_id) {
    request('GET', `https://instakilo.lucacastelnuovo.nl/posts/actions/like/${CSRFtoken}/${post_id}`, function(response) {
        CSRFtoken = response.CSRFtoken;

        if (response.success) {
            const likes = document.querySelector(`#post-${post_id} .post_likes`);
            likes.innerHTML = response.likes + ' likes';

            const like_url = document.querySelector(`#post-${post_id} a`);
            like_url.onclick = `feed_undo_like_post(${post_id})`;

            const like_icon = document.querySelector(`#post-${post_id} a i`);
            like_icon.innerHTML = 'favorite';

            M.toast({html: 'Liked'});
        } else {
            console.log('request', response);
        }
    });
}

function feed_undo_like_post(post_id) {
    request('GET', `https://instakilo.lucacastelnuovo.nl/posts/actions/undo_like/${CSRFtoken}/${post_id}`, function(response) {
        CSRFtoken = response.CSRFtoken;

        if (response.success) {
            const likes = document.querySelector(`#post-${post_id} .post_likes`);
            likes.innerHTML = response.likes + ' likes';

            const like_url = document.querySelector(`#post-${post_id} a`);
            like_url.onclick = `feed_like_post(${post_id})`;

            const like_icon = document.querySelector(`#post-${post_id} a i`);
            like_icon.innerHTML = 'favorite_border';

            M.toast({html: 'Like removed'});
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
            <form action="/posts/actions" method="POST">
                <div class="row mb-0">
                    <div class="col s12 m9">
                        <div class="input-field col s12 mb-0">
                            <label for="form_comment">Comment</label>
                            <textarea id="form_comment" class="materialize-textarea counter" name="comment" data-length="200"></textarea>
                        </div>
                    </div>
                    <div class="input-field col s12 m3">
                        <input type="hidden" name="CSRFtoken" value="${CSRFtoken}">
                        <input type="hidden" name="post_id" value="${post.id}">

                        <button class="btn waves-effect waves-light col s12 blue accent-4" name="action" type="submit">
                            Send <i class="material-icons right">send</i>
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
                        <ul class="collection">
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
