<?php
    $from = "emailtest@YOURDOMAIN";
    $to = "hujwt@slipry.net";
    $subject = "PHP Mail Test script";
    $message = "This is a test to check the PHP Mail functionality";
    $headers = "From:" . $from;
    mail($to, $subject, $message, $headers);
