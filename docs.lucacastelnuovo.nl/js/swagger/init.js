function getService() {
    let hash = window.location.hash.substr(1).replace(/^\/|\/$/g, '');

    if (hash.length) {
        return hash;
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
