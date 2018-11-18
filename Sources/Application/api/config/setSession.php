<?php
    // Headers
    header('Access-Control-Allow-Origin: https://localhost:3000');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

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
