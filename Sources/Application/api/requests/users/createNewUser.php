<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('PUT');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Users.php';

    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $user->login = $data->login;
    $user->password = $data->password;
    $user->age = $data->age;
    $user->gender = $data->gender;
    $user->country_name = $data->country;
    $user->email = $data->email;

    if($user->createNewUser()){
        echo json_encode(
            array('message' => 'User Added!',
                  'done' => 1)
        );
    } else {
        echo json_encode(
            array('message' => 'User Not Added!',
                  'done' => 0)
        );
    }
?>