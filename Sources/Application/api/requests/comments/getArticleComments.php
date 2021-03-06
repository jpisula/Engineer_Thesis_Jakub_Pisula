<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('GET');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Comments.php';

    $database = new Database();
    $db = $database->connect();

    $comment = new Comment($db);

    // Get ID
    $comment->article_id = isset($_GET['id']) ? $_GET['id'] : die();


    $result = $comment->getArticleComments();
    $rowCount = $result->rowCount();

    if($rowCount > 0) {
        $jsonData = array();
        $jsonData['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            // preparing an array to convert it to json
            $comm_item = array(
                'comment_id' => $row['comment_id'],
                'user_id' => $row['user_id'],
                'login' => $row['login'],
                'text' => $row['text'],
                'create_date' => $row['create_date']
            );

            array_push($jsonData['data'], $comm_item);
        }

        echo json_encode($jsonData);

    } else {
        echo json_encode(array('message' => 'No Comments Found!',
                                'code' => 0));
    }
?>