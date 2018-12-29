function getService() {
    let hash = window.location.hash.substr(1);

    let result = hash.split('&').reduce(function (result, item) {
        let parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});

    if (result != null) {
        return result['service'];
    } else {
        location.replace('/');
    }
}

function swaggerRender(service) {
    let ui = SwaggerUIBundle({
        url: service + '.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
    })
    window.ui = ui

    let topbar = document.querySelector('.topbar');
    topbar.parentNode.removeChild(topbar);
}

window.onload = function() {
    swaggerRender(getService());

    window.addEventListener("hashchange", function () {
        swaggerRender(getService());
    });
}
