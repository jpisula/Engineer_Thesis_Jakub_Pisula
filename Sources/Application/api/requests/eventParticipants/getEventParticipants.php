<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/EventParticipants.php';

    $database = new Database();
    $db = $database->connect();

    $eventParticipant = new EventParticipant($db);
    $eventParticipant->event_id = isset($_GET['event_id']) ? $_GET['event_id'] : die();
    $result = $eventParticipant->getEventParticipants();
    $rowCount = $result->rowCount();

    if($rowCount > 0) {
        $jsonData = array();
        $jsonData['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            // preparing an array to convert it to json
            $item = array(
                'event_id' => $row['event_id'],
                'event_name' => $row['event_name'],
                'user_id' => $row['user_id'],
                'user_name' => $row['login'],
            );

            array_push($jsonData['data'], $item);
        }

        echo json_encode($jsonData);

    } else {
        echo json_encode(array('message' => 'No Event Participant Found!'));
    }
