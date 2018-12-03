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

        $vote->voptions_name = $_POST['voptions_name'];
        $vote->voting_id = $_POST['voting_id'];


        if($vote->addVotingOption()){
            echo json_encode(
                array('message' => 'Voting Option Added!')
            );
        } else {
            echo json_encode(
                array('message' => 'Voting Option Not Added!')
            );
        }
    }