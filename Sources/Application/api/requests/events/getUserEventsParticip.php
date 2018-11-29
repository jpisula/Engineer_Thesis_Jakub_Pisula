<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('GET');
    require_once('./../../config/authentication.php');
    if(auth('')) {

        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Events.php';

        $database = new Database();
        $db = $database->connect();

        $event = new Event($db);
        $event->user_id = $_GET['id'];
        $result = $event->getUserEventsParticip();
        $rowCount = $result->rowCount();

        if($rowCount > 0) {
            $jsonData = array();
            $jsonData['data'] = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                // preparing an array to convert it to json
                $event_item = array(
                    'event_id' => $row['event_id'],
                    'event_name' => $row['event_name'],
                    'start_time' => $row['start_time']
                );

                array_push($jsonData['data'], $event_item);
            }

            echo json_encode($jsonData);

        } else {
            echo json_encode(null);
        }
    }