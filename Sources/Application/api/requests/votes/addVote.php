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

        $vote->voting_id = $_POST['voting_id'];
        $vote->voptions_id = $_POST['voptions_id'];
        $vote->user_id = $_POST['user_id'];


        if($vote->addVote()){
            echo json_encode(
                array('message' => 'Vote Added!')
            );
        } else {
            echo json_encode(
                array('message' => 'Vote Not Added!')
            );
        }
    }