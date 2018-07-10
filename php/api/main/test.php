<?php

$url = 'https://google.com';
$data = ['var' => 'value', 'var1' => 'value1'];
echo sprintf("%s?%s", $url, http_build_query($data));

// if ($result->num_rows > 0) {
//     while ($row = $rows) {
//         //do soimething
//     }
// }
