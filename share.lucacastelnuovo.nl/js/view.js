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
                    M.toast({html: json.error})
                    btn.innerHTML = "View message";
                    return false;
                }

                const html =
                    "<div class='row'>" +
                    "<p>" +
                    json.message +
                    "</p>" +
                    "</div>" +
                    "<div class='row'>" +
                    "<a onClick='window.location.reload()' class='col s12 btn-small waves-effect orange'>" +
                    "Close message" +
                    "</a>" +
                    "</div>";

                container.innerHTML = html;
            }
        }
    }

    xhr.open('GET', '/view.php?token=' + token);
    xhr.send();
});
