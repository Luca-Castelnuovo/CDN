<?php

require '../include.php';

if(!isset($_GET['path']) || empty($_GET['path'])) {
	echo <<<HTML
	<h1>CDN src generator</h1>
	<form>
	    <label for="path">File Path:</label>
	    <input type="text" id="path" name="path" placeholder="(e.g. /demo.com/js/index.js)" />
	    <input type="submit" value="Generate SRC">
	</form>
HTML;
	exit();
}

echo cdnPath($_GET['path']);