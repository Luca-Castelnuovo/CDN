const btn = document.querySelector('#btn');
const container = document.querySelector('.card-content');

btn.addEventListener("click", function() {
    const token = document.querySelector('#token').value;
    const message = document.querySelector('#message').value;
    const expires = document.querySelector('#expires').value;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState < 4)
            btn.innerHTML = "Loading...";
        else if (xhr.readyState === 4) {
            if (xhr.status == 200 && xhr.status < 300) {
                var json = JSON.parse(xhr.responseText);

                if (!json.status) {
                    alert(json.error);
                    btn.innerHTML = "Generate Message";
                    return false;
                }

                const html =
                    "<div class='row'>" +
                    "<div class='input-field col s12'>" +
                    "<input id='url_user' value='" +   json.url_user + "'>" +
                    "<label for='url_user'>User Url</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='row'>" +
                    "<div class='input-field col s12'>" +
                    "<input id='url_server' value='" +   json.url_server + "'>" +
                    "<label for='url_server'>Server Url</label>" +
                    "</div>" +
                    "</div>";

                container.innerHTML = html;
            }
        }
    }

    xhr.open('GET', '/add.php?token=' + token + '&message=' + message + '&expires=' + expires);
    xhr.send();
});
