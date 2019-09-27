<?php

class Server
{
    private $urlPath;
    private $parsedPath;
    private $fileExtension;
    private $fileHashPresent = false;
    private $fileRules = [
        "js" => [
            "cacheTime" => 86400, // 1 day
            "contentType" => "application/javascript"
        ],
        "css" => [
            "cacheTime" => 86400, // 1 day
            "contentType" => "text/css"
        ],
        "png" => [
            "cacheTime" => 604800, // 1 week
            "contentType" => "image/png"
        ],
        "jpg" => [
            "cacheTime" => 604800, // 1 week
            "contentType" => "image/jpeg"
        ],
        "txt" => [
            "cacheTime" => 60, // 1 minute
            "contentType" => "text/plain"
        ],
        "pdf" => [
            "cacheTime" => 3600, // 1 hour
            "contentType" => "application/pdf"
        ],
        "csv" => [
            "cacheTime" => 60, // 1 minute
            "contentType" => "text/csv"
        ],
        "py" => [
            "cacheTime" => 60, // 1 minute
            "contentType" => "text/x-python"
        ]
    ];

    public function __construct($urlPath)
    {
        $this->urlPath = $urlPath;
    }
    
    private function parsePath()
    {
        $this->urlPath = ltrim($this->urlPath, '/');
        $path = "/var/www/{$this->urlPath}";
        $pathInfo = pathinfo($path);

        if (preg_match('^(.*)\.([0-9a-z]*)\.(js|css|png|jpe?g)^', $path, $matches)) {
            $this->fileHashPresent = true;
            $this->parsedPath = "{$matches[1]}.{$matches[3]}";
        } else {
            $this->parsedPath = "{$pathInfo['dirname']}/{$pathInfo['filename']}.{$pathInfo['extension']}";
        }

        $this->fileExtension = $pathInfo['extension'];
    }

    private function fileExists()
    {
        $fileExists = file_exists($this->parsedPath);

        return $fileExists;
    }

    private function fileIsAllowed()
    {
        $fileIsAllowed = array_key_exists($this->fileExtension, $this->fileRules);

        return $fileIsAllowed;
    }

    private function cacheHeaders()
    {
        if ($this->fileHashPresent) {
            $cacheHeaders = 'Cache-Control: max-age=31536000, immutable';
        } else {
            $cacheHeaders = "Cache-Control: max-age={$this->fileRules[$this->fileExtension]['cacheTime']}, must-revalidate";
        }

        return $cacheHeaders;
    }

    private function contentTypeHeaders()
    {
        $contentTypeHeaders = "Content-Type: {$this->fileRules[$this->fileExtension]['contentType']}";
        
        return $contentTypeHeaders;
    }

    private function fileContent()
    {
        $fileContent = file_get_contents($this->parsedPath);
        
        return $fileContent;
    }

    public function start()
    {
        $this->parsePath();

        if (!$this->fileIsAllowed() || !$this->fileExists()) {
            return false;
        }

        $cacheHeaders = $this->cacheHeaders();
        $contentTypeHeaders = $this->contentTypeHeaders();
        $fileContent = $this->fileContent();
        
        return (object) [
            "cacheHeaders" => $cacheHeaders,
            "contentTypeHeaders" => $contentTypeHeaders,
            "fileContent" => $fileContent
        ];
    }
}
