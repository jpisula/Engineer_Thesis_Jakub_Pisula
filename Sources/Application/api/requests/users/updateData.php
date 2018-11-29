<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('POST');
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
        $user->age = $data->age;
        $user->gender = $data->gender;
        $user->country_name = $data->country_name;

        // Update post
        if($user->updateData()) {
            echo json_encode(
                array('message' => 'Data Changed')
            );
        } else {
            echo json_encode(
                array('message' => 'Data Not Changed')
            );
        }
    }