<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

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
    $user->sex = $data->sex;
    $user->country_name = $data->country;
    $user->email = $data->email;

    if($user->createNewUser()){
        echo json_encode(
            array('message' => 'User Added!')
        );
    } else {
        echo json_encode(
            array('message' => 'User Not Added!')
        );
    }
?>