<?php
    // Headers
    header('Access-Control-Allow-Origin: https://localhost:3000');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Users.php';

    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    // Get ID
    $user->user_id = isset($_GET['id']) ? $_GET['id'] : die();
    $user->getUserById();

    $user_arr = array(
        'user_id' => $user->user_id,
        'login' => $user->login,
        'email' => $user->email,
        'email_validate' => $user->email_validate,
        'age' => $user->age,
        'gender' => $user->gender,
        'logged_in' => $user->logged_in,
        'registration_date' => $user->registration_date,
        'role_name' => $user->role_name,
        'country_name' => $user->country_name
    );

    print_r(json_encode($user_arr));
?>