<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('GET');

    require_once('./../../config/authentication.php');
    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Votes.php';

    $database = new Database();
    $db = $database->connect();

    $vote = new Votes($db);
    $vote->voptions_id = isset($_GET['id']) ? $_GET['id'] : die();
    $result = $vote->getVotesCount();
    $arr = array(
        'voteCount' => $vote->votesCount
    );

    print_r(json_encode($arr));