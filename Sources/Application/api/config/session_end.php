<?php
        // Headers
        require_once('header.php');
        getHeader('POST');

    session_start();
    session_destroy();
    echo json_encode(
        array('message' => 'Session Ended')
    );
?>