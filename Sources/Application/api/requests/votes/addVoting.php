<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('POST');

    require_once('./../../config/authentication.php');
    if(auth("Journalist&Admin")) {

        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Votes.php';

        $database = new Database();
        $db = $database->connect();

        $vote = new Votes($db);

        $vote->start_date = $_POST['start_date'];
        $vote->end_date = $_POST['end_date'];
        $vote->vtype_id = $_POST['vtype_id'];


        if($vote->addVoting()){
            echo json_encode(
                array('message' => 'Voting Added!')
            );
        } else {
            echo json_encode(
                array('message' => 'Voting Not Added!')
            );
        }
    }
