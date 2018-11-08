<?php
require_once(__DIR__ . "/../config/Database");

/**
 * Class Country Used for operations on the countries table.
 */
class Country {


    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    // Users properties
    public $country_id;
    public $country_name;


    /**
     * @desc Roles constructor.
     * @param $db The database variable
     */
    function __construct($db) {
        $this->conn = $db;
    }

    /**
     * @desc Method that select all countries from database.
     * @return mixed Results from database
     */
    public function getAllCountries() {
        $query = 'SELECT country_id, country_name FROM countries';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }


}
?>