<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('GET');

    require_once('./../../config/authentication.php');
    if(auth('')) {
        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Votes.php';

        $database = new Database();
        $db = $database->connect();

        $vote = new Votes($db);
        $result = $vote->getActiveVotings();
        $rowCount = $result->rowCount();

        if($rowCount > 0) {
            $jsonData = array();
            $jsonData['data'] = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                // preparing an array to convert it to json
                $item = array(
                    'voting_id' => $row['voting_id'],
                    'voting_name' => $row['name'],
                );

                array_push($jsonData['data'], $item);
            }

            echo json_encode($jsonData);

        } else {
            echo json_encode(array('message' => 'No Votings Found!'));
        }
    }