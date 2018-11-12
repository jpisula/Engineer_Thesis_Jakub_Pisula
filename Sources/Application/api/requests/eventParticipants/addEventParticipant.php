<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

// Includes
include_once __DIR__ . '/../../config/Database';
include_once __DIR__ . '/../../models/EventParticipants.php';

$database = new Database();
$db = $database->connect();

$eventParticipant = new EventParticipant($db);

$eventParticipant->event_id = $_POST['event_id'];
$eventParticipant->user_id = $_POST['user_id'];


if($eventParticipant->addEventParticipant()){
    echo json_encode(
        array('message' => 'Event Participant Added!')
    );
} else {
    echo json_encode(
        array('message' => 'Event Participant Not Added!')
    );
}
?>