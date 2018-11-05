<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
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
    $user->login = $data->login;

    //data to update
    $user->user_fb_id = $data->user_fb_id;
    $user->age = $data->age;
    $user->country_name = $data->country;
    $user->email = $data->email;
    $user->gender = $data->gender;

    // Update post
    $result = $user->signInByFacebook();
    if($result) {
        session_start();
        $_SESSION['user_id'] = $user->user_id;
        $_SESSION['role'] = $user->role_name;
        echo json_encode(
            array('message' => 'Signed In Via Facebook')
        );
    } else {
        echo json_encode(
            array('message' => 'Sign In Via Facebook Wrong')
        );
    }
?>