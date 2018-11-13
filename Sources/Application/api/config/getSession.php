<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
session_start();
if(isset($_SESSION['user_id'])) {

    $data = array();
    $data['user_id'] = $_SESSION['user_id'];
    $data['role'] = $_SESSION['role'];
    $data['error_code'] = 0;
    echo json_encode($data);
} else {
    echo json_encode(
        array('message' => 'Session Not Set',
        'error_code' => 1)
    );
}
?>