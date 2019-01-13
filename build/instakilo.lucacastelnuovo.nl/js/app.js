"use strict";

function materialize_init() {
  // Enable SideBar
  var sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {
    edge: 'right',
    draggable: 1
  }); // Add character counter to inputs

  M.CharacterCounter.init(document.querySelectorAll('.counter')); // Enable MaterialBox

  var materialbox = M.Materialbox.init(document.querySelectorAll('.materialboxed'), {});
}

if (typeof auto_init !== 'undefined' && auto_init) {
  document.addEventListener('DOMContentLoaded', function () {
    materialize_init();
  });
}
"use strict";

function request(method, url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    callback(JSON.parse(xhr.responseText));
  };

  xhr.open(method, url);
  xhr.send();
}
"use strict";

function feed_render_posts(data) {
  setInterval(feed_check_posts(), 3000);

  if (!data.success) {
    return false;
  }

  localStorage.setItem('posts', data);
  var posts_array = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data.posts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      post = _step.value;
      posts_array.push(feed_render_post(post));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return posts_array.join('');
}

function feed_check_posts() {
  request('GET', "https://instakilo.lucacastelnuovo.nl/posts/actions/".concat(CSRFtoken, "/feed"), function (response) {
    if (response !== localStorage.getItem('posts')) {
      M.toast({
        html: '<span>You have new posts!</span><button class="btn-flat toast-action blue-text accent-4" onclick="location.reload()">Load Posts</button>',
        displayLength: 86400000
      });
    }
  });
}

function feed_render_post(post) {
  var comments;
  var comments_form;

  if (post.comments !== null && post.comments_allowed) {
    comments = feed_render_comments(post.comments);
    comments_form = "\n            <form action=\"/posts/actions\" method=\"POST\">\n                <div class=\"row mb-0\">\n                    <div class=\"col s12 m9\">\n                        <div class=\"input-field col s12 mb-0\">\n                            <label for=\"form_comment\">Comment</label>\n                            <textarea id=\"form_comment\" class=\"materialize-textarea counter\" name=\"comment\" data-length=\"200\"></textarea>\n                        </div>\n                    </div>\n                    <div class=\"input-field col s12 m3\">\n                        <input type=\"hidden\" name=\"CSRFtoken\" value=\"".concat(CSRFtoken, "\">\n                        <input type=\"hidden\" name=\"post_id\" value=\"").concat(post.id, "\">\n\n                        <button class=\"btn waves-effect waves-light col s12 blue accent-4\" name=\"action\" type=\"submit\">\n                            Send <i class=\"material-icons right\">send</i>\n                        </button>\n                    </div>\n                </div>\n            </form>\n        ");
  } else {
    comments = '<li class="collection-item">Comments are disabled</li>';
    comments_form = '';
  }

  var like_icon = post.liked ? 'favorite' : 'favorite_border';
  var like_action = post.liked ? 'undo_like' : 'like';
  return "\n        <div class=\"col s12\">\n            <div class=\"card\">\n                <div class=\"card-image\"><img id=\"post_image\" class=\"materialboxed\" data-caption=\"".concat(post.caption, "\" src=\"").concat(post.img_url, "\"></div>\n                <div class=\"card-content\">\n                    <p>\n                        <span id=\"post_owner\"><a href=\"/u/").concat(post.username, "\">").concat(post.username, "</a></span> ").concat(post.caption, "\n                    </p>\n                </div>\n                <div class=\"card-action\">\n                    <div class=\"row likes\">\n                        <a href=\"/posts/actions/").concat(CSRFtoken, "/").concat(like_action, "/").concat(post.id, "\" class=\"mr-6\"><i class=\"material-icons blue-icon\">").concat(like_icon, "</i></a> ").concat(post.likes, " likes\n                    </div>\n                    <div class=\"row mb-0\">\n                        <h6>Comments:</h6>\n                        <ul class=\"collection\">\n                            ").concat(comments, "\n                        </ul>\n                            ").concat(comments_form, "\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
}

function feed_render_comments(comments) {
  var comments_array = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = comments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      comment = _step2.value;
      comments_array.push(feed_render_comment(comment));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return comments_array.join('');
}

function feed_render_comment(comment) {
  return "\n        <li class=\"collection-item avatar\">\n            <img src=\"".concat(comment.profile_picture, "\" onerror=\"this.src='https://github.com/identicons/").concat(comment.username, ".png'\" class=\"circle\" />\n            <span class=\"title\"><a href=\"/u/").concat(comment.username, "\" class=\"blue-text\">").concat(comment.username, "</a></span>\n            <p class=\"truncate\">").concat(comment.body, "</p>\n        </li>\n    ");
}
"use strict";

function feed_render_messages(data) {
  // setInterval(feed_check_messages(), 3000);
  if (!data.success) {
    return false;
  } // localStorage.setItem('messages', data);


  var messages_array = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data.messages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      message = _step.value;
      messages_array.push(feed_render_message(message));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return messages_array.join('');
}

function feed_check_messages() {
  request('GET', "https://instakilo.lucacastelnuovo.nl/messages/actions/".concat(CSRFtoken), function (response) {
    if (response !== localStorage.getItem('messages')) {
      M.toast({
        html: '<span>You have new messages!</span><button class="btn-flat toast-action blue-text accent-4" onclick="location.reload()">Load messages</button>',
        displayLength: 86400000
      });
    }
  });
}

function feed_render_message(message) {
  return "\n        <li class=\"collection-item avatar\">\n            <i class=\"material-icons circle\">account_circle</i> <span class=\"title\">FirstName Last Name</span>\n            <p class=\"truncate\">Layers, background, shot, concept \u2013 good!</p><a class=\"secondary-content\" href=\"#!\"><i class=\"material-icons blue-icon\">message</i></a>\n        </li>\n    ";
}
// @codekit-prepend "init.js";
// @codekit-prepend "request.js";
// @codekit-prepend "feed_posts.js";
// @codekit-prepend "feed_messages.js";
"use strict";

//# sourceMappingURL=app.js.map
