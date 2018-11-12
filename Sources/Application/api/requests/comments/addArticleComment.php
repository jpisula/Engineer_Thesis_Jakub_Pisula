<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Comments.php';

    $database = new Database();
    $db = $database->connect();

    $comment = new Comment($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $comment->article_id = $_POST['article_id'];
    $comment->user_id = $_POST['user_id'];
    $comment->text = $_POST['text'];


    if($comment->addArticleComment()){
        echo json_encode(
            array('message' => 'Comment Added!')
        );
    } else {
        echo json_encode(
            array('message' => 'Comment Not Added!')
        );
    }
?>