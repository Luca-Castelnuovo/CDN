const btn = document.querySelector('#btn');
const container = document.querySelector('.card-content');

btn.addEventListener("click", function() {
    const token = document.querySelector('#token').value;
    const message = encodeURIComponent(document.querySelector('#message').value);
    const expires = document.querySelector('#expires').value;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState < 4)
            btn.innerHTML = "Loading...";
        else if (xhr.readyState === 4) {
            if (xhr.status == 200 && xhr.status < 300) {
                var json = JSON.parse(xhr.responseText);

                if (!json.status) {
                    M.toast({html: json.error})
                    btn.innerHTML = "Generate Message";
                    return false;
                }

                const html =
                    "<div class='row'>" +
                    "<div class='input-field col s12'>" +
                    "<textarea id='textarea-message' class='materialize-textarea'>" +   json.url_user + "</textarea>" +
                    "</div>" +
                    "</div>" +
                    "<div class='row'>" +
                    "<a onClick='window.location.reload()' class='col s12 btn-large waves-effect orange'>" +
                    "Create another message" +
                    "</a>" +
                    "</div>";

                container.innerHTML = html;
                const textarea = document.querySelector('#textarea-message');
                M.textareaAutoResize(textarea);
            }
        }
    }

    xhr.open('POST', '/add.php?token=' + token + '&message=' + message + '&expires=' + expires);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
});
