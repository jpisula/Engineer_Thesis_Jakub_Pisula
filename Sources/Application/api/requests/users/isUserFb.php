<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('GET');
    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Users.php';

    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    // Get ID
    $user->user_id = isset($_GET['id']) ? $_GET['id'] : die();

    if($user->isUserFb()) {
        echo 1;
    } else echo 0;
