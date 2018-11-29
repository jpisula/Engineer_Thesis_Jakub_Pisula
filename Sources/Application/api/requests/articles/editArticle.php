<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('PUT');

    require_once('./../../config/authentication.php');
    if(auth('Journalist') || auth('Admin')) {
        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Articles.php';

        $database = new Database();
        $db = $database->connect();

        $article = new Article($db);

        // Get raw posted data
        $data = json_decode(file_get_contents("php://input"));
        // Set ID to update
        $article->article_id = $data->article_id;

        //data to update
        $article->title = $data->title;
        $article->text = $data->text;
        $article->text_short = $data->text_short;

        // Update post
        if($article->editArticle()) {
            echo json_encode(
                array('message' => 'Article Updated')
            );
        } else {
            echo json_encode(
                array('message' => 'Article Not Updated')
            );
        }
    }