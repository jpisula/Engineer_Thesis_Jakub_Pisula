<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

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
    $user->logged_in = $data->state;

    // Update post
    if($user->setLoggedIn()) {
        echo json_encode(
            array('message' => 'Logged In Status Changed')
        );
    } else {
        echo json_encode(
            array('message' => 'Logged In Status Not Changed')
        );
    }
?>