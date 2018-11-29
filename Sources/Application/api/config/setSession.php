<?php
    // Headers
    require_once('header.php');
    getHeader('POST');

    session_start();
    if(!isset($_SESSION['user_id'])) {
        $data = json_decode(file_get_contents("php://input"));
        $_SESSION['user_id'] = $data->user_id;
        $_SESSION['role'] = $data->role;
        echo 1;
    } else {
        echo json_encode(
            array('message' => 'Session initialized',
                  'error_code' => 1)
        );
    }
