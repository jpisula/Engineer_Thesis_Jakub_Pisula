<?php
function getHeader($method) {

    if($method == 'GET') {
        header('Access-Control-Allow-Origin: https://localhost:3000');
        header('Access-Control-Allow-Credentials: true');
        header('Content-Type: application/json');        
    } else if($method == 'POST') { 
        header('Access-Control-Allow-Origin: https://localhost:3000');
        header('Access-Control-Allow-Credentials: true');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
    } else if($method == 'PUT') {
        header('Access-Control-Allow-Origin: https://localhost:3000');
        header('Access-Control-Allow-Credentials: true');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: PUT');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');        
    } else if($method == 'DELETE') {
        header('Access-Control-Allow-Origin: https://localhost:3000');
        header('Access-Control-Allow-Credentials: true');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: DELETE');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    }

}