function getService() {
    let service = window.location.hash.substr(1).replace(/^\/|\/$/g, '');

    if (!service.length) {
        location.replace('/');
    }

    if (service.includes(encodeURIComponent('https://')) || service.includes('https://')) {
        return decodeURIComponent(service);
    } else {
        return service + '.json';
    }
}

function swaggerRender(service) {
    M.Sidenav.getInstance(document.querySelector(".sidenav")).close();

    let ui = SwaggerUIBundle({
        url: service,
        dom_id: '#swagger-ui',

        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],

        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],

        layout: "StandaloneLayout"
    })

    ui.initOAuth({
        clientId: "7b90a348c7ff3d30f0f757113d92d34c",
        appName: "Test OAuth2.0",
        scopeSeparator: ",",
    })

    window.ui = ui

    let topbar = document.querySelector('.topbar');
    topbar.parentNode.removeChild(topbar);
}

window.onload = function() {
    swaggerRender(getService());

    window.addEventListener("hashchange", function() {
        swaggerRender(getService());
    });
}
