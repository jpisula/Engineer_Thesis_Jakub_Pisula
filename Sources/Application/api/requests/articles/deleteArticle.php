<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('DELETE');
    require_once('./../../config/authentication.php');
    if(auth('Journalist&Admin')) {
        // Includes
        include_once __DIR__ . '/../../config/Database';
        include_once __DIR__ . '/../../models/Articles.php';
        include_once __DIR__ . '/../../models/Photos.php';

        $database = new Database();
        $db = $database->connect();

        $article = new Article($db);
        $photo = new Photo($db);


        // Set ID to delete
        $article->article_id = $_POST['article_id'];
        $photo->article_id = $article->article_id;


        // Update post
        $photo->deleteArticlePhotos();
        if($article->deleteArticle()) {
            echo json_encode(
                array('message' => 'Article Deleted')
            );
        } else {
            echo json_encode(
                array('message' => 'Article Not Deleted')
            );
        }
    }