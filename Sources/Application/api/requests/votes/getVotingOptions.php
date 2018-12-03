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
    $vote->voting_id = isset($_GET['id']) ? $_GET['id'] : die();
    $result = $vote->getVotingOptions();
    $rowCount = $result->rowCount();

    if($rowCount > 0) {
        $jsonData = array();
        $jsonData['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            // preparing an array to convert it to json
            $item = array(
                'voptions_id' => $row['voptions_id'],
                'voptions_name' => $row['name'],
            );

            array_push($jsonData['data'], $item);
        }

        echo json_encode($jsonData);

    } else {
        echo json_encode(array('message' => 'No voptions Found!'));
    }
    