<?php
require_once(__DIR__ . "/../config/Database");

class EventParticipant {

    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    // Event participants properties
    public $event_id;
    public $event_name;
    public $user_id;
    public $login;

    /**
     * @desc Class constructor.
     * @param $db The database variable
     */
    function __construct($db) {
        $this->conn = $db;
    }

    public function getEventParticipants(){
        $query = 'SELECT e.event_id, e.event_name, u.user_id, u.login FROM Event_participants ep
                                              JOIN Events e on e.event_id = ep.event_id
                                              JOIN Users u on u.user_id = ep.user_id
                                              WHERE ep.event_id = ?';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->event_id);
        // Execute query
        $stmt->execute();
        return $stmt;
    }

    public function addEventParticipant(){
        $query = 'INSERT INTO event_participants 
                  SET
                    event_id = :event_id, 
                    user_id = :user_id';

        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->event_id = htmlspecialchars(strip_tags($this->event_id));
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));

        // Binding data
        $stmt->bindParam(':event_id', $this->event_id);
        $stmt->bindParam(':user_id', $this->user_id);

        if ($stmt->execute()) return true;
        else return false;
    }

    public function deleteEventParticipant() {
        $query = 'DELETE FROM event_participants WHERE event_id = :event_id AND user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':event_id', $this->event_id);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->execute();
        return $stmt;
    }
}