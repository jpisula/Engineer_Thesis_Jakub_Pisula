<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('DELETE');
    require_once('./../../config/authentication.php');
    if(auth('')) {

        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Events.php';
        include_once __DIR__ . '/../../models/Addresses.php';
        include_once __DIR__ . '/../../models/Photos.php';

        $database = new Database();
        $db = $database->connect();

        $event = new Event($db);
        $address = new Address($db);
        $photo = new Photo($db);

        // Set ID to delete
        $event->event_id = $_POST['event_id'];
        $photo->event_id = $_POST['event_id'];
        $event->getAddressId();
        $address->address_id = $event->address_id;


        $address->deleteAddress();
        $photo->deleteEventPhotos();
        if($event->deleteEvent()) {
            echo json_encode(
                array('message' => 'Event Deleted')
            );
        } else {
            echo json_encode(
                array('message' => 'Event Not Deleted')
            );
        }
    }
