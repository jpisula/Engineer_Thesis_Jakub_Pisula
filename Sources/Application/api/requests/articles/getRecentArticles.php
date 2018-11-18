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
$result = $article->getRecentArticles();
$rowCount = $result->rowCount();

if($rowCount > 0) {
    $jsonData = array();
    $jsonData['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        // preparing an array to convert it to json
        $user_item = array(
            'article_id' => $row['article_id'],
            'title' => $row['title'],
            'create_date' => $row['create_date'],
            'login' => $row['login'],
            'photo_path' => $row['photo_path'],
            'article_id' => $row['article_id'],
            'text' => $row['text'],
        );

        array_push($jsonData['data'], $user_item);
    }

    echo json_encode($jsonData);

} else {
    echo json_encode(array('message' => 'No Articles Found!'));
}
?>