<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('GET');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Votes.php';

    $database = new Database();
    $db = $database->connect();

    $vote = new Votes($db);
    $vote->start_date = $_GET['start_date'];
    $vote->vtype_id = $_GET['vtype_id'];

    if($vote->getVictory()) {
        $arr = array(
            'name' => $vote->voptions_name
        );
    } else {
        $arr = array(
            'name' => 'Brak zwycięzcy.'
        );
    }


    print_r(json_encode($arr));