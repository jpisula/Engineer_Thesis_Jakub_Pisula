<?php
require_once(__DIR__ . "/../config/Database");

/**
 * Class Addresses This class is a controller of the addresses table in the database
 */
class Address {
    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    // Address properties
    public $address_id;
    public $street;
    public $house_num;
    public $apart_num;
    public $city_id;
    public $city_name;

    /**
     * @desc Address constructor.
     * @param $db The database variable
     */
    function __construct($db) {
        $this->conn = $db;
    }

    function addAddress() {
        $query = 'INSERT INTO Addresses 
                  SET
                    street = :street, 
                    house_num = :house_num,
                    apart_num = :apart_num,
                    city_id = :city_id';

        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->street = htmlspecialchars(strip_tags($this->street));
        $this->house_num = htmlspecialchars(strip_tags($this->house_num));
        $this->apart_num = htmlspecialchars(strip_tags($this->apart_num));
        $this->city_id = htmlspecialchars(strip_tags($this->city_id));

        // Binding data
        $stmt->bindParam(':street', $this->street);
        $stmt->bindParam(':house_num', $this->house_num);
        $stmt->bindParam(':apart_num', $this->apart_num);
        $stmt->bindParam(':city_id', $this->city_id);

        if ($stmt->execute()) {
            $this->findNewAddress();
            return true;
        }
        else return false;
    }

    private function findNewAddress(){
        $query = 'SELECT address_id FROM Addresses WHERE  street = :street AND house_num = :house_num AND apart_num = :apart_num AND city_id = :city_id';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Binding data
        $stmt->bindParam(':street', $this->street);
        $stmt->bindParam(':house_num', $this->house_num);
        $stmt->bindParam(':apart_num', $this->apart_num);
        $stmt->bindParam(':city_id', $this->city_id);
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->address_id = $row['address_id'];
    }

    public function deleteAddress() {
        $query = 'DELETE FROM Addresses WHERE address_id = :id';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Clean data
        $this->address_id = htmlspecialchars(strip_tags($this->address_id));
        // Bind data
        $stmt->bindParam(':id', $this->address_id);
        // Execute query
        if($stmt->execute()) return true;
        else return false;
    }
}