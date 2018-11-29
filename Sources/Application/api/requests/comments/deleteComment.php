<?php
    // Headers
    require_once('./../../config/header.php');
    getHeader('DLETE');
    require_once('./../../config/authentication.php');
    if(auth('')) {
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
    }