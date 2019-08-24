<?php

//If dynamic execute PHP.

class CDN
{
    private $urlPath;
    private $parsedPath;
    private $fileExtension;
    private $fileHashPresent = false;
    private $fileRules = [
        "js" => [
            "cacheTime" => 3600,
            "contentType" => "application/javascript"
        ],
        "css" => [
            "cacheTime" => 3600,
            "contentType" => "text/css"
        ],
        "png" => [
            "cacheTime" => 3600,
            "contentType" => "image/png"
        ],
        "jpg" => [
            "cacheTime" => 3600,
            "contentType" => "image/jpeg"
        ]
    ];

    public function __construct($urlPath)
    {
        $this->urlPath = $urlPath;
    }
    
    private function parsePath()
    {
        $path = "/var/www/{$this->urlPath}";
        $pathInfo = pathinfo($path);

        if (preg_match('^(.*)\.([0-9]*)\.(js|css|png|jpe?g)^', $path, $matches)) {
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

    public function outputAsset()
    {
        $this->parsePath();

        if (!$this->fileIsAllowed()) {
            return false;
        }

        if (!$this->fileExists()) {
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
