<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('DELETE');
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

        // Set ID to delete
        $user->user_id = $data->user_id;


        // Update post
        if($user->deleteUser()) {
            echo json_encode(
                array('message' => 'User Deleted')
            );
        } else {
            echo json_encode(
                array('message' => 'User Not Deleted')
            );
        }
    }
