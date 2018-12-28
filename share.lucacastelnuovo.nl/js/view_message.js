"use strict";

const submitBtn = document.querySelector("#submitBtn");
const container = document.querySelector("#container");

submitBtn.addEventListener("click", function() {
const inputToken = document.querySelector("#inputToken").value;

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
                    submitBtn.innerHTML = "View message";
                    return false;
                }

                const html = `
                    <div class='row'>
                        <p>
                            ${json.message}
                        </p>
                    </div>
                    <div class='row'>
                        <a onClick='window.location.replace("/");' class='col s12 btn-small waves-effect blue accent-4'>
                            Close message
                        </a>
                    </div>
                `;

                container.innerHTML = html;
            } else {
                M.Toast.dismissAll();
                M.toast({html: "Server error, please try again later."});
                submitBtn.innerHTML = "View message";
                return false;
            }
        }
    }

    xhr.open("GET", `/message/?token=${inputToken}`);
    xhr.send();
});
