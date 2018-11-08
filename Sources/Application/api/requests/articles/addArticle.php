<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Articles.php';
    include_once __DIR__ . '/../../models/Texts.php';
    include_once __DIR__ . '/../../models/Photos.php';

    $database = new Database();
    $db = $database->connect();

    $article = new Article($db);
    $text = new Text($db);
    $photo = new Photo($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $article->title = $_POST['title'];
    $article->author_id = $_POST['user_id'];
    $text->text = $_POST['text'];
    $text->text_short = $_POST['text_short'];
    if($text->addNewText()) {
        $article->text_id = $text->text_id;
        if($article->addArticle()){
            $photo->article_id = $article->article_id;
            if($photo->addArticlePhoto()){
                echo json_encode(
                    array('message' => 'Article Added With Photo!')
                );
            } else {
                echo json_encode(
                    array('message' => 'Article Added Without Photo!')
                );
            }
        } else {
            echo json_encode(
                array('message' => 'Article Not Added!')
            );
        }
    } else {
        echo json_encode(
            array('message' => 'Article Not Added!')
        );
    }
?>