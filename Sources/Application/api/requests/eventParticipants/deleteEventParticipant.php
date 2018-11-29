<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('DELETE');

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

        // Update post
        if($eventParticipant->deleteEventParticipant()) {
            echo json_encode(
                array('message' => 'Event Participant Deleted')
            );
        } else {
            echo json_encode(
                array('message' => 'Event Participant Not Deleted')
            );
        }
    }
