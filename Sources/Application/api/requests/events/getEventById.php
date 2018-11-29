<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('GET');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Events.php';

    $database = new Database();
    $db = $database->connect();

    $event = new Event($db);

    // Get ID
    $event->event_id = isset($_GET['id']) ? $_GET['id'] : die();
    $event->getEventById();

    $arr = array(
        'event_id' => $event->event_id,
        'event_name' => $event->event_name,
        'start_time' => $event->start_time,
        'end_time' => $event->end_time,
        'street' => $event->street,
        'house_num' => $event->house_num,
        'apart_num' => $event->apart_num,
        'city_name' => $event->city_name,
        'login' => $event->login,
        'user_id' => $event->user_id,
        'text' => $event->text,
        'photo_path' => $event->photo_path,
        'usersNum' => $event->usersNum
    );

    print_r(json_encode($arr));