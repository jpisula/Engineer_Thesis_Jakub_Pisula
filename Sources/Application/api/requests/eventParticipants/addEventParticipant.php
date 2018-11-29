<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('POST');
    require_once('./../../config/authentication.php');
    if(auth('')) {

        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/EventParticipants.php';

        $database = new Database();
        $db = $database->connect();

        $eventParticipant = new EventParticipant($db);

        $eventParticipant->event_id = $_POST['event_id'];
        $eventParticipant->user_id = $_POST['user_id'];


        if($eventParticipant->addEventParticipant()){
            echo json_encode(
                array('message' => 'Event Participant Added!')
            );
        } else {
            echo json_encode(
                array('message' => 'Event Participant Not Added!')
            );
        }
    }