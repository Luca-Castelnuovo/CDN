<?php

header('Content-Type: application/javascript');

$track_subdomains;
$exclude_outlinks;

if (!isset($_GET['site_id']) || empty($_GET['site_id'])) {
    echo 'alert("please specify an site_id")';
    exit;
}

if (isset($_GET['track_subdomains']) && !empty($_GET['track_subdomains'])) {
    $track_subdomains = "_paq.push(['setDomains', '*.{$_GET['track_subdomains']}']);";
    $exclude_outlinks = "_paq(['setDomains', ['*.{$_GET['track_subdomains']}']]);";
}

$output = <<<JS
    var _paq = window._paq || [];

    {$track_subdomains}
    {$exclude_outlinks}

    _paq.push(['setDownloadClasses', "track-download"]); // Download links have to have an 'track-download' class
    _paq.push(['setLinkClasses', "track-external"]); // External links have to have an 'track-external' class
    _paq.push(['setIgnoreClasses', "track-disabled"]); // Links with this class wont be tracked (e.g. testing)

    _paq.push(["trackPageView"]);

    _paq.push(["enableLinkTracking"]);
    _paq.push(['enableHeartBeatTimer']);

    (function() {
      var u = "https://analytics.lucacastelnuovo.nl/";
      _paq.push(["setTrackerUrl", u + "matomo.php"]);
      _paq.push(["setSiteId", {$_GET['site_id']}]);
      var d = document,
        g = d.createElement("script"),
        s = d.getElementsByTagName("script")[0];
      g.type = "text/javascript";
      g.async = true;
      g.defer = true;
      g.src = u + "matomo.js";
      s.parentNode.insertBefore(g, s);
    })();
JS;

echo preg_replace("/\r|\n| /", '', $output);
