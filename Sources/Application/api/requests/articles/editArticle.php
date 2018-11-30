<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('POST');

    require_once('./../../config/authentication.php');
    if(auth('Journalist&Admin')) {
        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Articles.php';

        $database = new Database();
        $db = $database->connect();

        $article = new Article($db);

        // Set ID to update
        $article->article_id = $_POST['article_id'];

        //data to update
        $article->title = $_POST['title'];
        $article->text = $_POST['text'];
        $article->text_short = "";

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