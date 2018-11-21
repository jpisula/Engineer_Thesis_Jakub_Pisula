<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Users.php';

    $database = new Database();
    $db = $database->connect();

    $user = new User($db);
    $result = $user->getAllUsers();
    $rowCount = $result->rowCount();

    if($rowCount > 0) {
        $jsonData = array();
        $jsonData['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            // preparing an array to convert it to json
            $user_item = array(
                'user_id' => $row['user_id'],
                'user_fb_id' => $row['user_fb_id'],
                'user_spotify_id' => $row['user_spotify_id'],
                'login' => $row['login'],
                'email' => $row['email'],
                'email_validate' => $row['email_validate'],
                'age' => $row['age'],
                'gender' => $row['gender'],
                'logged_in' => $row['logged_in'],
                'registration_date' => $row['registration_date'],
                'role_name' => $row['role_name'],
                'country_name' => $row['country_name']
            );

            array_push($jsonData['data'], $user_item);
        }

        echo json_encode($jsonData);

    } else {
        echo json_encode(array('message' => 'No Users Found!'));
    }
