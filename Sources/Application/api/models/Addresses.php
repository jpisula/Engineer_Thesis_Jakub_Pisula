<?php
require_once(__DIR__ . "/../config/Database");

/**
 * Class Addresses This class is a controller of the addresses table in the database
 */
class Address
{
    /**
     * @var DB Variable to connect to the database
     */
    private $DB;

    /**
     * Addresses constructor.
     * @param $db The database variable.
     */
    function __construct($db) {
        $this->DB = $db;
    }

    /**
     * Method that gives all addresses in the database
     * @return false|string
     */
    public function getAddresses() {
        $jsonData = array();
        $result = $this->DB->doQuery("SELECT * FROM Addresses a
                                              JOIN Cities c on a.city_id = c.city_id");

        while($row = $result->fetch()){
            // preparing an array to convert it to json
            $jsonData[] = array(
                'address_id' => $row['address_id'],
                'street' => $row['street'],
                'house_num' => $row['house_num'],
                'apart_num' => $row['apart_num'],
                'city' => $row['name']
            );
        }
        // json_encode - function that returns a string with the JSON representation of the supplied value
        return json_encode($jsonData);
    }

    /**
     * Method that gives an address searched by its id
     * @param $id The id of the address to find.
     * @return false|string
     */
    public function getAddressById($id) {
        $jsonData = array();
        $result = $this->DB->doQuery("SELECT * FROM Addresses
                                              JOIN Cities c on a.city_id = c.city_id
                                            WHERE address_id = $id");
        $row = $result->fetch();
        // preparing an array to convert it to json
        $jsonData[] = array(
            'address_id' => $row['address_id'],
            'street' => $row['street'],
            'house_num' => $row['house_num'],
            'apart_num' => $row['apart_num'],
            'city' => $row['name']
        );
        // json_encode - function that returns a string with the JSON representation of the supplied value
        return json_encode($jsonData);
    }

    /**
     * Method that gives all addresses searched by city name
     * @param $name The name of the city where we are looking for events;
     * @return false|string
     */
    public function getAddressesByCityName($name) {
        $jsonData = array();
        $result = $this->DB->doQuery("SELECT * FROM Addresses
                                              JOIN Cities c on a.name = c.name
                                            WHERE name = '$name'");

        while($row = $result->fetch()){
            // preparing an array to convert it to json
            $jsonData[] = array(
                'address_id' => $row['address_id'],
                'street' => $row['street'],
                'house_num' => $row['house_num'],
                'apart_num' => $row['apart_num'],
                'city' => $row['name']
            );
        }
        // json_encode - function that returns a string with the JSON representation of the supplied value
        return json_encode($jsonData);
    }

    /**
     * Method that allows to change address
     * @param $id Id of the Address
     * @param $street
     * @param $house_num
     * @param $apart_num
     * @param $city_name
     * @return bool
     */
    public function changeAddress($id, $street, $house_num, $apart_num, $city_name) {
        $this->DB->doQuery("UPDATE Addresses SET street='$street', house_num='$house_num', apart_num='$apart_num', 
                                              city_id=(SELECT city_id FROM Cities WHERE name = '$city_name') WHERE address_id = '$id'");
        return true;
    }

    /**
     * MEthod that allows you to add new address to database
     * @param $street
     * @param $house_num
     * @param $apart_num
     * @param $city_name
     * @return bool
     */
    public function addAddress($street, $house_num, $apart_num, $city_name) {
        $this->DB->doQuery("INSERT INTO Addresses (street, house_num, apart_num, city_id) VALUES ('$street', '$house_num', '$apart_num', 
                          (SELECT city_id FROM Cities WHERE name = '$city_name'))");
        return true;
    }

}

?>