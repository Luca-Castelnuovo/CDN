function request(method, url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        callback(JSON.parse(xhr.responseText));
    };

    xhr.open(method, url);
    xhr.send();
}
