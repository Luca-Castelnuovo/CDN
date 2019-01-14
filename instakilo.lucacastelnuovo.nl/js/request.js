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

function FORMrequest(formElement, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        var response = JSON.parse(xhr.responseText);
        CSRFtoken = response.CSRFtoken;
        callback(response);
    };

    xhr.open('POST', formElement.action, true);
    xhr.send(new FormData (formElement));
}
