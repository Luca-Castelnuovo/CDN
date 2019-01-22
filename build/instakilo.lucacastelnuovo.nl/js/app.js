function materialize_init() {
    // Enable SideBar
    var sidenav = M.Sidenav.init(document.querySelectorAll(".sidenav"), {
        edge: "right",
        draggable: 1
    });

    // Add character counter to inputs
    M.CharacterCounter.init(document.querySelectorAll(".counter"));

    // Enable MaterialBox
    var materialbox = M.Materialbox.init(
        document.querySelectorAll(".materialboxed"), {}
    );

    // Tooltip
    var tooltips = M.Tooltip.init(document.querySelectorAll(".tooltipped"), {});

    // Modals
    var modals = M.Modal.init(document.querySelectorAll(".modal"), {});
}

document.addEventListener("DOMContentLoaded", function() {
    yall({
        observeChanges: true,
        idlyLoad: true
    });

    if (typeof auto_init === "undefined" || !auto_init) {
        materialize_init();
    }
});


function GETrequest(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        var response = JSON.parse(xhr.responseText);
        CSRFtoken = response.CSRFtoken;
        callback(response);
    };

    xhr.open("GET", url);
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

    xhr.open("POST", url, true);
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
    localStorage.setItem("posts", JSON.stringify(data));

    var posts_array = [];

    for (post of data.posts) {
        posts_array.push(feed_render_post(post));
    }

    return posts_array.join("");
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
        posts_array.push(feed_render_post(post, true));
    }

    return posts_array.join("");
}

function feed_check_posts() {
    GETrequest(
        `https://instakilo.lucacastelnuovo.nl/posts/actions/feed`,
        function(response) {
            delete response.CSRFtoken;
            if (JSON.stringify(response) !== localStorage.getItem("posts")) {
                M.Toast.dismissAll();
                M.toast({
                    html: '<span>You have new posts!</span><button class="btn-flat toast-action blue-text accent-4" onclick="location.reload()">Load Posts</button>'
                });
            }
        }
    );
}

function feed_like_post(post_id) {
    GETrequest(
        `https://instakilo.lucacastelnuovo.nl/posts/actions/like/${CSRFtoken}/${post_id}`,
        function(response) {
            if (response.success) {
                const likes = document.querySelector(`#post-${post_id} .post_likes`);
                likes.innerHTML = response.likes + " likes";

                const like_function = document.querySelector(`#post-${post_id} a`);
                like_function.setAttribute(
                    "onClick",
                    `feed_undo_like_post(${post_id})`
                );

                const like_icon = document.querySelector(`#post-${post_id} a i`);
                like_icon.innerHTML = "favorite";

                M.Toast.dismissAll();
                M.toast({
                    html: "Liked"
                });

                var storageJSON = JSON.parse(localStorage.getItem("posts"));
                var storageJSONUpdated = storageJSON.posts.map(function(post) {
                    if (post.id == post_id) {
                        post.liked = true;
                        post.likes++;
                        post.likes = `${post.likes}`;
                    }

                    return post;
                });

                storageJSON.posts = storageJSONUpdated;
                localStorage.setItem("posts", JSON.stringify(storageJSON));
            }
        }
    );
}

function feed_undo_like_post(post_id) {
    GETrequest(
        `https://instakilo.lucacastelnuovo.nl/posts/actions/undo_like/${CSRFtoken}/${post_id}`,
        function(response) {
            if (response.success) {
                const likes = document.querySelector(`#post-${post_id} .post_likes`);
                likes.innerHTML = response.likes + " likes";

                const like_function = document.querySelector(`#post-${post_id} a`);
                like_function.setAttribute("onClick", `feed_like_post(${post_id})`);

                const like_icon = document.querySelector(`#post-${post_id} a i`);
                like_icon.innerHTML = "favorite_border";

                M.Toast.dismissAll();
                M.toast({
                    html: "Like removed"
                });

                var storageJSON = JSON.parse(localStorage.getItem("posts"));
                var storageJSONUpdated = storageJSON.posts.map(function(post) {
                    if (post.id == post_id) {
                        post.liked = false;
                        post.likes--;
                        post.likes = `${post.likes}`;
                    }

                    return post;
                });

                storageJSON.posts = storageJSONUpdated;
                localStorage.setItem("posts", JSON.stringify(storageJSON));
            }
        }
    );
}

function feed_comment_post(formElement) {
    var formData = new FormData(formElement);

    if (formData.get("comment")
        .length > 200) {
        M.Toast.dismissAll();
        M.toast({
            html: "Comment too long"
        });
        return false;
    }

    if (formData.get("comment")
        .length < 1) {
        M.Toast.dismissAll();
        M.toast({
            html: "Comment too short"
        });
        return false;
    }

    formData.append("CSRFtoken", CSRFtoken);
    var post_id = formData.get("post_id");

    FORMrequest("/posts/actions/", formData, function(response) {
        if (response.success) {
            const text_input = document.querySelector(`#form_comment-${post_id}`);
            text_input.value = "";
            let new_comment = document.createElement("div");
            new_comment.innerHTML = feed_render_comment(response.new_comment, post_id);
            const comment_container = document.querySelector(
                `#comment-container-${post_id}`
            );

            comment_container.appendChild(new_comment);

            M.Toast.dismissAll();
            M.toast({
                html: "Comment sent"
            });

            var storageJSON = JSON.parse(localStorage.getItem("posts"));
            var storageJSONPosts = storageJSON.posts;
            var storageJSONPostsUpdated = storageJSONPosts.map(function(post) {
                if (post.id == post_id) {
                    post.comments = response.comments;
                }

                return post;
            });

            storageJSON.posts = storageJSONPostsUpdated;
            localStorage.setItem("posts", JSON.stringify(storageJSON));

            render_hashtags();
        }
    });
}

function feed_delete_comment(post_id, comment_id) {
    if (!confirm("Are you sure?")) {
        return false;
    }

    GETrequest(
        `https://instakilo.lucacastelnuovo.nl/posts/actions/delete_comment/${CSRFtoken}/${post_id}&comment_id=${comment_id}`,
        function(response) {
            if (response.success) {
                var comment = document.querySelector(`#comment-${post_id}-${comment_id}`);
                comment.parentNode.removeChild(comment);

                M.Toast.dismissAll();
                M.toast({
                    html: "Comment deleted"
                });

                var storageJSON = JSON.parse(localStorage.getItem("posts"));
                var storageJSONUpdated = storageJSON.posts.map(function(post) {
                    if (post.id == post_id) {
                        post.comments = post.comments.filter(function(obj) {
                            return obj.id !== comment_id;
                        });
                    }

                    return post;
                });

                storageJSON.posts = storageJSONUpdated;
                localStorage.setItem("posts", JSON.stringify(storageJSON));
            }
        }
    );
}

function feed_render_post(post, profile = false) {
    var comments;
    var comments_form;

    if (post.comments_allowed) {
        comments = feed_render_comments(post.comments, profile, post.id);
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
        comments_form = "";
    }

    var like_icon = post.liked ? "favorite" : "favorite_border";
    var like_function = post.liked ?
        `feed_undo_like_post(${post.id})` :
        `feed_like_post(${post.id})`;

    return `
        <div class="col s12 ${profile ? "m6 l4" : ""}">
            <div class="card mt-0">
                <div class="card-image"><img id="post_image" class="materialboxed lazy" data-caption="${post.caption}" data-src="${post.img_url}" src="https://via.placeholder.com/150.jpg"></div>
                <div class="card-content">
                    <p>
                        <span class="bold"><a href="/u/${post.username}">${post.username}</a></span> <span class="post_caption">${post.caption}</span>
                        ${post.user_is_owner ? `<a href="/posts/edit/${post.id}" class="secondary-content tooltipped" data-position="right" data-tooltip="Edit post"><i class="material-icons blue-icon">edit</i></a>` : ""}
                    </p>
                </div>
                <div class="card-action">
                    <div class="row likes" id="post-${post.id}">
                        <a onclick="${like_function}" class="mr-6"><i class="material-icons blue-icon">${like_icon}</i></a> <span class="post_likes">${post.likes} likes</span>
                    </div>
                    ${profile ? `` : `<div class="row mb-0">
                        <h6>Comments:</h6>
                        <ul id="comment-container-${post.id}" class="collection">
                            ${comments}
                        </ul>
                            ${comments_form}
                    </div>`}
                </div>
            </div>
        </div>
    `;
}

function feed_render_comments(comments, profile, post_id) {
    var comments_array = [];

    if (profile) {
        comments = comments.slice(0, 3);
    }

    for (comment of comments) {
        comments_array.push(feed_render_comment(comment, post_id));
    }

    return comments_array.join("");
}

function feed_render_comment(comment, post_id) {
    return `
        <li class="collection-item avatar comment_container" id="comment-${post_id}-${comment.id}">
            <a href="/u/${comment.username}" class="blue-text">
                <img src="https://via.placeholder.com/25.jpg" data-src="${comment.profile_picture}" onerror="this.src='https://cdn.lucacastelnuovo.nl/general/images/profile_picture.png'" class="circle lazy" />
                <span class="title tt-none">${comment.username}</span>
            </a>
            <p class="truncate comment_body">${comment.body}</p>
            ${comment.user_is_owner ? `<a href="#!" onclick="feed_delete_comment('${post_id}', '${comment.id}')" class="secondary-content tooltipped comment_delete_btn" data-position="right" data-tooltip="Delete comment"><i class="material-icons blue-icon">delete</i></a>` : ""}
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
    localStorage.setItem("messages", JSON.stringify(data));

    var messages_array = [];

    for (message of data.messages) {
        messages_array.push(feed_render_message(message));
    }

    var messages_box = new Sticky("#messages_box");

    return messages_array.join("");
}

function feed_check_messages() {
    GETrequest(`https://instakilo.lucacastelnuovo.nl/messages/actions`, function(
        response
    ) {
        delete response.CSRFtoken;
        if (JSON.stringify(response) !== localStorage.getItem("messages")) {
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
                <img src="${message.profile_picture}" onerror="this.src='https://cdn.lucacastelnuovo.nl/general/images/profile_picture.png'" class="circle" />
                <span class="title">${message.username}</span>
            </a>
            <p class="truncate">${message.body}</p>
            <a href="/messages/#reply_to=${message.username}" class="secondary-content tooltipped" data-position="right" data-tooltip="Reply"><i class="material-icons blue-icon">reply</i></a>
        </li>
    `;
}


function user_followers(username) {
    GETrequest(`/u/${username}/followers`, function(response) {
        var users_owner_is_following = [];
        var following_html;

        for (user_owner_is_following of response.followers) {
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
                        ${user_owner_is_following.is_user_self ?
                            `<a href="#" class="btn hidden">btn</a>`
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
        var modal = M.Modal.getInstance(document.querySelector("#followers_modal"));
        modal.open();

        document.querySelector('#followers_number')
            .innerHTML = response.followers_number;
    });
}

function user_following(username) {
    GETrequest(`/u/${username}/following`, function(response) {
        var users_owner_is_following = [];
        var following_html;

        for (user_owner_is_following of response.following) {
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
                        ${user_owner_is_following.is_user_self ?
                            `<a href="#" class="btn hidden">btn</a>`
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


function render_hashtags() {
    var captions = document.querySelectorAll(".post_caption");
    for (caption of captions) {
        caption.innerHTML = caption.innerHTML.replace(
            /(^|\s)(#[a-z\d-]+)/gi,
            "$1<span class='hash_tag'>$2</span>"
        );
    }

    var comments = document.querySelectorAll(".comment_body");
    for (comment of comments) {
        comment.innerHTML = comment.innerHTML.replace(
            /(^|\s)(#[a-z\d-]+)/gi,
            "$1<span class='hash_tag'>$2</span>"
        );
    }
}


"use strict";

function _extends() {
    return (_extends = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a])
            }
            return e
        })
        .apply(this, arguments)
}
window.yall = function(e) {
    var a = function(e) {
            if ("IMG" === e.tagName) {
                var t = e.parentNode;
                "PICTURE" === t.tagName && [].slice.call(t.querySelectorAll("source"))
                    .forEach(function(e) {
                        return r(e)
                    }), r(e)
            }
            "VIDEO" === e.tagName && ([].slice.call(e.querySelectorAll("source"))
                .forEach(function(e) {
                    return r(e)
                }), r(e), !0 === e.autoplay && e.load()), "IFRAME" === e.tagName && (e.src = e.dataset.src, e.removeAttribute("data-src")), e.classList.contains(n.lazyBackgroundClass) && (e.classList.remove(n.lazyBackgroundClass), e.classList.add(n.lazyBackgroundLoaded))
        },
        r = function(e) {
            for (var t in e.dataset) - 1 !== o.acceptedDataAttributes.indexOf("data-" + t) && (e.setAttribute(t, e.dataset[t]), e.removeAttribute("data-" + t))
        },
        t = function yallBack() {
            var e = !1;
            !1 === e && 0 < l.length && (e = !0, setTimeout(function() {
                l.forEach(function(t) {
                    t.getBoundingClientRect()
                        .top <= window.innerHeight + n.threshold && t.getBoundingClientRect()
                        .bottom >= -n.threshold && "none" !== getComputedStyle(t)
                        .display && (!0 === n.idlyLoad && !0 === o.idleCallbackSupport ? requestIdleCallback(function() {
                            a(t)
                        }, i) : a(t), t.classList.remove(n.lazyClass), l = l.filter(function(e) {
                            return e !== t
                        }))
                }), e = !1, 0 === l.length && !1 === n.observeChanges && o.eventsToBind.forEach(function(e) {
                    return e[0].removeEventListener(e[1], yallBack)
                })
            }, n.throttleTime))
        },
        o = {
            intersectionObserverSupport: "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype,
            mutationObserverSupport: "MutationObserver" in window,
            idleCallbackSupport: "requestIdleCallback" in window,
            ignoredImgAttributes: ["data-src", "data-sizes", "data-media", "data-srcset", "src", "srcset"],
            acceptedDataAttributes: ["data-src", "data-sizes", "data-media", "data-srcset", "data-poster"],
            eventsToBind: [
                [document, "scroll"],
                [document, "touchmove"],
                [window, "resize"],
                [window, "orientationchange"]
            ]
        },
        n = _extends({
            lazyClass: "lazy",
            lazyBackgroundClass: "lazy-bg",
            lazyBackgroundLoaded: "lazy-bg-loaded",
            throttleTime: 200,
            idlyLoad: !1,
            idleLoadTimeout: 100,
            threshold: 200,
            observeChanges: !1,
            observeRootSelector: "body",
            mutationObserverOptions: {
                childList: !0
            }
        }, e),
        s = "img." + n.lazyClass + ",video." + n.lazyClass + ",iframe." + n.lazyClass + ",." + n.lazyBackgroundClass,
        i = {
            timeout: n.idleLoadTimeout
        },
        l = [].slice.call(document.querySelectorAll(s));
    if (!0 === o.intersectionObserverSupport) {
        var c = new IntersectionObserver(function(e, r) {
            e.forEach(function(e) {
                if (!0 === e.isIntersecting || 0 < e.intersectionRatio) {
                    var t = e.target;
                    !0 === n.idlyLoad && !0 === o.idleCallbackSupport ? requestIdleCallback(function() {
                        return a(t)
                    }, i) : a(t), t.classList.remove(n.lazyClass), r.unobserve(t), l = l.filter(function(e) {
                        return e !== t
                    })
                }
            })
        }, {
            rootMargin: n.threshold + "px 0%"
        });
        l.forEach(function(e) {
            return c.observe(e)
        })
    } else o.eventsToBind.forEach(function(e) {
        return e[0].addEventListener(e[1], t)
    }), t();
    !0 === o.mutationObserverSupport && !0 === n.observeChanges && new MutationObserver(function(e) {
            return e.forEach(function() {
                [].slice.call(document.querySelectorAll(s))
                    .forEach(function(e) {
                        -1 === l.indexOf(e) && (l.push(e), !0 === o.intersectionObserverSupport ? c.observe(e) : t())
                    })
            })
        })
        .observe(document.querySelector(n.observeRootSelector), n.mutationObserverOptions)
};


// @codekit-prepend "init.js";
// @codekit-prepend "request.js";
// @codekit-prepend "feed_posts.js";
// @codekit-prepend "feed_messages.js";
// @codekit-prepend "user.js";
// @codekit-prepend "hash_tag.js";

// @codekit-prepend "lazyload.js";
