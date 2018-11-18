<?php
    // Headers
    header('Access-Control-Allow-Origin: https://localhost:3000');
    header('Access-Control-Allow-Credentials: true');
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

    // Set ID to update
    $user->login = $data->login;

    //data to update
    $user->valPassword = $data->password;

    // Update post
$result = $user->singIn();
    if($result == 0) {
        echo json_encode(
            array('message' => 'Signed In',
                  'done' => 1)
        );
        session_start();
        $_SESSION['user_id'] = $user->user_id;
        $_SESSION['role'] = $user->role_name;
    } else if ($result == 1) {
        echo json_encode(
            array('message' => 'Password Is Wrong',
                'done' => 0)
        );
    } else {
        echo json_encode(
            array('message' => 'Login Is Wrong',
                'done' => 0)
        );
    }
?>