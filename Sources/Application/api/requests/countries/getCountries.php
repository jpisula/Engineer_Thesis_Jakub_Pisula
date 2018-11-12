<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Includes
include_once __DIR__ . '/../../config/Database';
include_once __DIR__ . '/../../models/Country.php';

$database = new Database();
$db = $database->connect();

$country = new Country($db);
$result = $country->getAllCountries();
$rowCount = $result->rowCount();

if($rowCount > 0) {
    $jsonData = array();
    $jsonData['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        // preparing an array to convert it to json
        $user_item = array(
            'country_id' => $row['country_id'],
            'country_name' => $row['country_name'],
        );

        array_push($jsonData['data'], $user_item);
    }

    echo json_encode($jsonData);

} else {
    echo json_encode(array('message' => 'No Countries Found!'));
}
?>