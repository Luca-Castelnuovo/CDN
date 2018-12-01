const btn = document.querySelector('#btn');
const container = document.querySelector('.card-content');

btn.addEventListener("click", function() {
    const token = document.querySelector('#token').value;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState < 4)
            btn.innerHTML = "Loading...";
        else if (xhr.readyState === 4) {
            if (xhr.status == 200 && xhr.status < 300) {
                var json = JSON.parse(xhr.responseText);

                if (!json.status) {
                    alert(json.error);
                    btn.innerHTML = "View message";
                    return false;
                }

                // const html =
                //     "<div class='row'>" +
                //     "<textarea id='textarea-message' class='materialize-textarea'>" +
                //     json.message +
                //     "</textarea>" +
                //     "</div>";

                const html =
                    "<div class='row'>" +
                    "<p>" +
                    json.message +
                    "</p>" +
                    "</div>";

                container.innerHTML = html;

                // const textarea = document.querySelector('#textarea-message');
                // M.textareaAutoResize(textarea);
            }
        }
    }

    xhr.open('GET', '/view.php?token=' + token);
    xhr.send();
});
