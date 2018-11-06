<?php
require_once(__DIR__ . "/../config/Database");

/**
 * Class Roles Used for operations on the roles table.
 */
class Role {


    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    // Users properties
    public $role_id;
    public $role_name;


    /**
     * @desc Roles constructor.
     * @param $db The database variable
     */
    function __construct($db) {
        $this->conn = $db;
    }

    /**
     * @desc Method that select all roles from database.
     * @return mixed Results from database
     */
    public function getAllRoles() {
        $query = 'SELECT role_id, role_name FROM roles';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }


}
?>