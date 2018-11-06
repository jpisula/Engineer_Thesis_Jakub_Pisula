<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Roles.php';

    $database = new Database();
    $db = $database->connect();

    $role = new Role($db);
    $result = $role->getAllRoles();
    $rowCount = $result->rowCount();

    if($rowCount > 0) {
        $jsonData = array();
        $jsonData['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            // preparing an array to convert it to json
            $user_item = array(
                'role_id' => $row['role_id'],
                'role_name' => $row['role_name'],
            );

            array_push($jsonData['data'], $user_item);
        }

        echo json_encode($jsonData);

    } else {
        echo json_encode(array('message' => 'No Roles Found!'));
    }
?>