<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('DELETE');
    require_once('./../../config/authentication.php');
    if(auth('')) {

        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Votes.php';

        $database = new Database();
        $db = $database->connect();

        $vote = new Votes($db);

        $vote->votes_id = $_POST['votes_id'];


        // Update post
        if($vote->deleteVote()) {
            echo json_encode(
                array('message' => 'Vote Deleted')
            );
        } else {
            echo json_encode(
                array('message' => 'Vote Not Deleted')
            );
        }
    }