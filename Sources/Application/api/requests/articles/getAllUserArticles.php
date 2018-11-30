<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('GET');
    require_once('./../../config/authentication.php');
    if(auth('Journalist&Admin')) {

        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Articles.php';

        $database = new Database();
        $db = $database->connect();

        $article = new Article($db);
        $article->author_id = isset($_GET['id']) ? $_GET['id'] : die();
        $result = $article->getAllUserArticles();
        $rowCount = $result->rowCount();

        if($rowCount > 0) {
            $jsonData = array();
            $jsonData['data'] = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                // preparing an array to convert it to json
                $user_item = array(
                    'article_id' => $row['article_id'],
                    'author_id' => $row['user_id'],
                    'author_login' => $row['login'],
                    'title' => $row['title'],
                    'text_short' => $row['text_short'],
                    'photo_path' => $row['photo_path'],
                    'create_date' => $row['create_date'],
                );

                array_push($jsonData['data'], $user_item);
            }

            echo json_encode($jsonData);

        } else {
            echo json_encode(array('message' => 'No Articles Found!',
                                    'error' => 1));
        }

    }