<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('GET');

    require_once('./../../config/authentication.php');
    if(auth("Journalist&Admin")) {
        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Votes.php';

        $database = new Database();
        $db = $database->connect();

        $vote = new Votes($db);
        if(!isset($_SESSION)) {
            session_start();
        }
        $vote->user_id = $_SESSION['user_id'];
        $vote->voting_id = isset($_GET['id']) ? $_GET['id'] : die();
        $vote->getUserVote();
        if($vote->votesCount == 0) {
            $arr = array(
                'voption_id' => 0
            );
        } else {
            $arr = array(
                'voption_id' => $vote->voptions_id
            );
        }
        print_r(json_encode($arr));
    }