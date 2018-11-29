<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('PUT');

    require_once('./../../config/authentication.php');
    if(auth('Journalist') || auth('Admin')) {
        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Events.php';

        $database = new Database();
        $db = $database->connect();

        $event = new Event($db);

        // Set ID to update
        $event->event_id = $_POST['event_id'];

        //data to update
        $event->event_name = $_POST['event_name'];
        $event->start_time = $_POST['start_time'];
        $event->end_time = $_POST['end_time'];
        $event->street = $_POST['street'];
        $event->house_num = $_POST['house_num'];
        $event->apart_num = $_POST['apart_num'];
        $event->text = $_POST['text'];
        $event->text_short = $_POST['text_short'];

        // Update post
        if($event->editEvent()) {
            echo json_encode(
                array('message' => 'Event Updated')
            );
        } else {
            echo json_encode(
                array('message' => 'Event Not Updated')
            );
        }

    }