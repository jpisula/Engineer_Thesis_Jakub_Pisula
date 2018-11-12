<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Includes
    include_once __DIR__ . '/../../config/Database';
    include_once __DIR__ . '/../../models/Comments.php';

    $database = new Database();
    $db = $database->connect();

    $comment = new Comment($db);

    // Set ID to delete
    $comment->comment_id = $_POST['comment_id'];

    // Update post
    if($comment->deleteComment()) {
        echo json_encode(
            array('message' => 'Comment Deleted')
        );
    } else {
        echo json_encode(
            array('message' => 'Comment Not Deleted')
        );
    }
?>