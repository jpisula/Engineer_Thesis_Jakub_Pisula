<?php
function getHeader($method) {
    if(isset($_SERVER['HTTP_ORIGIN'])) {
        $http_origin = $_SERVER['HTTP_ORIGIN'];
    } else $http_origin = '';
    if ($http_origin == "https://localhost:3000" || $http_origin == "http://localhost:19002/")
    {
        header("Access-Control-Allow-Origin: $http_origin");
    }

    if($method == 'GET') {
        header('Access-Control-Allow-Credentials: true');
        header('Content-Type: application/json');        
    } else if($method == 'POST') {
        header('Access-Control-Allow-Credentials: true');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
    } else if($method == 'PUT') {
        header('Access-Control-Allow-Credentials: true');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: PUT');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');        
    } else if($method == 'DELETE') {
        header('Access-Control-Allow-Credentials: true');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: DELETE');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    }

}