<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('POST');
    require_once('./../../config/authentication.php');
    if(auth('')) {

        // Includes
        include_once __DIR__ . '/../../config/Database';

        include_once __DIR__ . '/../../models/Events.php';
        include_once __DIR__ . '/../../models/City.php';
        include_once __DIR__ . '/../../models/Addresses.php';
        include_once __DIR__ . '/../../models/EventParticipants.php';
        include_once __DIR__ . '/../../models/Texts.php';
        include_once __DIR__ . '/../../models/Photos.php';

        $database = new Database();
        $db = $database->connect();

        $event = new Event($db);
        $city = new City($db);
        $address = new Address($db);
        $text = new Text($db);
        $eventParticipant = new EventParticipant($db);
        $photo = new Photo($db);

        $event->user_id = $_POST['user_id'];
        $event->event_name = $_POST['event_name'];
        $event->start_time = $_POST['start_time'];
        $event->end_time = $_POST['end_time'];
        $address->street = $_POST['street'];
        $address->house_num = $_POST['house_num'];
        $address->apart_num = $_POST['apart_num'];
        $city->city_name = $_POST['city_name'];
        $text->text = $_POST['text'];
        $text->text_short = $_POST['text_short'];

        $city->addNewCity();
        $address->city_id = $city->city_id;
        $address->addAddress();
        $event->address_id = $address->address_id;
        $text->addNewText();
        $event->text_id = $text->text_id;
        if($event->addEvent()) {
            $photo->event_id = $event->event_id;
            $eventParticipant->event_id = $event->event_id;
            $eventParticipant->user_id = $event->user_id;
            $eventParticipant->addEventParticipant();
            if ($photo->addEventPhoto()) {
                echo json_encode(
                    array('message' => 'Event Added With Photo!')
                );
            } else {
                echo json_encode(
                    array('message' => 'Event Added Without Photo!')
                );
            }

        } else {
            echo json_encode(
                array('message' => 'Event Not Added!')
            );
        }
    }

