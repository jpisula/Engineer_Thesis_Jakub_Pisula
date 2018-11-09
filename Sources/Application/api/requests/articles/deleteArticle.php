<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Articles.php';
    include_once __DIR__ . '/../../models/Photos.php';

    $database = new Database();
    $db = $database->connect();

    $article = new Article($db);
    $photo = new Photo($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    // Set ID to delete
    $article->article_id = $data->article_id;
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
?>