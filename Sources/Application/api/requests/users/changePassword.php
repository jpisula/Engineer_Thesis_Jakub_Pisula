<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('PUT');

    require_once('./../../config/authentication.php');
    if(auth('')) {

        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Users.php';

        $database = new Database();
        $db = $database->connect();

        $user = new User($db);

        // Get raw posted data
        $data = json_decode(file_get_contents("php://input"));

        // Set ID to update
        $user->user_id = $data->user_id;

        //data to update
        $user->password = $data->password;
        $user->valPassword = $data->valPassword;

        // Update post
        if($user->changePassword()) {
            echo json_encode(
                array('message' => 'Password Changed')
            );
        } else {
            echo json_encode(
                array('message' => 'Password Not Changed')
            );
        }
    }