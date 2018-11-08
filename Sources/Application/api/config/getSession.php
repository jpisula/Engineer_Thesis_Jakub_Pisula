<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
session_start();
if(isset($_SESSION['user_id'])) {

    $data = array();
    $data['user_id'] = $_SESSION['user_id'];
    $data['role'] = $_SESSION['role'];
    echo json_encode($_SESSION);
} else {
    echo json_encode(
        array('message' => 'Session Not Set',
        'error_code' => 1)
    );
}
?>