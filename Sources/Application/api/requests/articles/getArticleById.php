<?php
// Headers
header('Access-Control-Allow-Origin: https://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Includes
include_once __DIR__ . '/../../config/Database';
include_once __DIR__ . '/../../models/Articles.php';

$database = new Database();
$db = $database->connect();

$article = new Article($db);

// Get ID
$article->article_id = isset($_GET['id']) ? $_GET['id'] : die();
$article->getArticleById();

$user_arr = array(
    'article_id' => $article->article_id,
    'title' => $article->title,
    'create_date' => $article->create_date,
    'author_login' => $article->author_login,
    'photo_path' => $article->photo_path,
    'text' => $article->text
);

print_r(json_encode($user_arr));