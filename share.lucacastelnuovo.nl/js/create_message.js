"use strict";

const submitBtn = document.querySelector("#submitBtn");
const container = document.querySelector("#container");

submitBtn.addEventListener("click", function() {
    const access_token = document.querySelector("#access_token").value;
    const inputMessage = encodeURIComponent(document.querySelector("#inputMessage").value);
    const inputExpires = document.querySelector("#inputExpires").value;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState < 4) {
            submitBtn.innerHTML = "Loading...";
        } else if (xhr.readyState === 4) {
            if (xhr.status === 200 && xhr.status < 300) {
                var json = JSON.parse(xhr.responseText);

                if (!json.success) {
                    M.Toast.dismissAll();
                    M.toast({html: json.error});
                    submitBtn.innerHTML = "Create Message";
                    return false;
                }

                const html = `
                    <div class='row'>
                        <div class='input-field col s12'>
                            <input id="inputURL" type="text" value="${json.url}" readonly onclick="copyURL();">
                        </div>
                    </div>
                    <div class='row'>
                        <a onClick='window.location.reload()' class='col s12 btn-large waves-effect blue accent-4'>
                            Create another message
                        </a>
                    </div>
                    <div class='row'>
                        <a href='/' class='col s12 btn-small waves-effect blue accent-4'>
                            Home
                        </a>
                    </div>
                `;

                container.innerHTML = html;
                const textarea = document.querySelector("#textarea-message");
                M.textareaAutoResize(textarea);
            } else {
                M.Toast.dismissAll();
                M.toast({html: "Server error, please try again later."});
                submitBtn.innerHTML = "Create message";
                return false;
            }
        }
    }

    xhr.open("POST", "/message/index.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`access_token=${access_token}&message=${inputMessage}&expires=${inputExpires}`);
});

function copyURL() {
    const inputURL = document.querySelector("#inputURL");
    inputURL.select();
    document.execCommand("copy");
    M.toast({html: "Copied link"});
}
