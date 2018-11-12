<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Events.php';

    $database = new Database();
    $db = $database->connect();

    $event = new Event($db);
    $event->city_name = $_GET['city_name'];
    $result = $event->getEventsByCity();
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
                'start_time' => $row['start_time'],
                'end_time' => $row['end_time'],
                'create_date' => $row['create_date'],
                'street' => $row['street'],
                'house_num' => $row['house_num'],
                'apart_num' => $row['apart_num'],
                'city_name' => $row['city_name'],
                'login' => $row['login'],
                'text_short' => $row['text_short'],
                'text' => $row['text'],
                'photo_path' => $row['photo_path'],
                'active' => $row['active']
            );

            array_push($jsonData['data'], $event_item);
        }

        echo json_encode($jsonData);

    } else {
        echo json_encode(array('message' => 'No Events Found!'));
    }