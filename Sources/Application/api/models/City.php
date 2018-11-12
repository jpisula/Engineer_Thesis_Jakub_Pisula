<?php
require_once(__DIR__ . "/../config/Database");

class City {

    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    public $city_id;
    public $city_name;
    public $city_name_new;

    /**
     * @desc Articles constructor.
     * @param $db The database variable
     */
    function __construct($db) {
        $this->conn = $db;
    }

    function getAllCities(){
        $query = 'SELECT city_id, city_name FROM Cities';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }

    function addNewCity() {
        $query = 'SELECT COUNT(city_id), city_id FROM Cities WHERE city_name = ?';
        $stmt = $this->conn->prepare($query);
        $stmt->bindPAram(1, $this->city_name);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $count = $row['COUNT(city_id)'];
        if($count != 0) {
            $this->city_id = $row['city_id'];
        } else {
            $query = 'Insert INTO Cities SET city_name=?';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->city_name);
            if($stmt->execute()) {
                $query = 'SELECT city_id FROM Cities WHERE city_name = ?';
                $stmt = $this->conn->prepare($query);
                $stmt->bindPAram(1, $this->city_name);
                $stmt->execute();
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->city_id = $row['city_id'];
                return true;
            }
            else return false;
        }
    }

}
