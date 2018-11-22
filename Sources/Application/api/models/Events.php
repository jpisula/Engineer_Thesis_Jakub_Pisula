<?php
require_once(__DIR__ . "/../config/Database");

class Event {
    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    // Event properties
    public $event_id;
    public $event_name;
    public $start_time;
    public $end_time;
    public $create_date;
    public $address_id;
    public $street;
    public $house_num;
    public $apart_num;
    public $city_id;
    public $city_name;
    public $user_id;
    public $login;
    public $text_id;
    public $text_short;
    public $text;
    public $photo_path;


    /**
    * @desc Event constructor.
    * @param $db The database variable
    */
    function __construct($db) {
        $this->conn = $db;
    }

    function getAllEvents() {
        $query = 'SELECT e.event_id, event_name, start_time, end_time, create_date, a.street, a.house_num, a.apart_num, c.city_name,
        u.login, t.text_short, t.text, p.photo_path, e.active FROM Events e
        JOIN Addresses a on a.address_id = e.address_id
        JOIN Cities c on c.city_id = a.city_id
        JOIN Users u on u.user_id = e.user_id
        JOIN Texts t on t.text_id = e.text_id
        LEFT JOIN Photos p on p.event_id = e.event_id';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }

    function getEventById() {
        $query = 'SELECT e.event_id, event_name, start_time, end_time, create_date, a.street, a.house_num, a.apart_num, c.city_name,
        u.login, u.user_id, t.text, p.photo_path, e.active FROM Events e
        JOIN Addresses a on a.address_id = e.address_id
        JOIN Cities c on c.city_id = a.city_id
        JOIN Users u on u.user_id = e.user_id
        JOIN Texts t on t.text_id = e.text_id
        LEFT JOIN Photos p on p.event_id = e.event_id
        WHERE e.event_id = ?';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->event_id);
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->event_name = $row['event_name'];
        $this->start_time = $row['start_time'];
        $this->end_time = $row['end_time'];
        $this->street = $row['street'];
        $this->house_num = $row['house_num'];
        $this->apart_num = $row['apart_num'];
        $this->city_name = $row['city_name'];
        $this->login = $row['login'];
        $this->user_id = $row['user_id'];
        $this->text = $row['text'];
        $this->photo_path = $row['photo_path'];
    }

    function getEventsByCity() {
        $query = 'SELECT e.event_id, event_name, start_time, end_time, create_date, a.street, a.house_num, a.apart_num, c.city_name,
        u.login, t.text_short, t.text, p.photo_path, e.active FROM Events e
        JOIN Addresses a on a.address_id = e.address_id
        JOIN Cities c on c.city_id = a.city_id
        JOIN Users u on u.user_id = e.user_id
        JOIN Texts t on t.text_id = e.text_id
        LEFT JOIN Photos p on p.event_id = e.event_id
        WHERE c.city_name = ?';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->city_name);
        // Execute query
        $stmt->execute();
        return $stmt;
    }

    function getActiveEvents() {
        $query = 'SELECT e.event_id, event_name, start_time, 
        u.login, t.text_short, p.photo_path FROM Events e
        JOIN Addresses a on a.address_id = e.address_id
        JOIN Cities c on c.city_id = a.city_id
        JOIN Users u on u.user_id = e.user_id
        JOIN Texts t on t.text_id = e.text_id
        LEFT JOIN Photos p on p.event_id = e.event_id
        WHERE e.active = 1
        ORDER BY start_time DESC';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }

    function addEvent() {
        $query = 'INSERT INTO Events 
                  SET
                    event_name = :event_name, 
                    start_time = :start_time,
                    end_time = :end_time,
                    create_date = NOW(),
                    address_id = :address_id,
                    text_id = :text_id,
                    user_id = :user_id,
                    active = 1';

        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->event_name = htmlspecialchars(strip_tags($this->event_name));
        $this->start_time = htmlspecialchars(strip_tags($this->start_time));
        $this->end_time = htmlspecialchars(strip_tags($this->end_time));
        $this->address_id = htmlspecialchars(strip_tags($this->address_id));
        $this->text_id = htmlspecialchars(strip_tags($this->text_id));
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));


        // Binding data
        $stmt->bindParam(':event_name', $this->event_name);
        $stmt->bindParam(':start_time', $this->start_time);
        $stmt->bindParam(':end_time', $this->end_time);
        $stmt->bindParam(':address_id', $this->address_id);
        $stmt->bindParam(':text_id', $this->text_id);
        $stmt->bindParam(':user_id', $this->user_id);

        if ($stmt->execute()) {
            $this->findNewEvent();
            return true;
        }
        else return false;
    }

    private function findNewEvent(){
        $query = 'SELECT event_id FROM Events WHERE  event_name = :event_name AND text_id = :text_id AND user_id = :user_id AND address_id = :address_id';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Binding data
        $stmt->bindParam(':event_name', $this->event_name);
        $stmt->bindParam(':text_id', $this->text_id);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':address_id', $this->address_id);
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->event_id = $row['event_id'];
    }

    public function deleteEvent() {
        $query = 'SELECT text_id FROM Events WHERE event_id = :id';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Binding data
        $stmt->bindParam(':id', $this->event_id);
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->text_id = $row['text_id'];

        $query = 'DELETE FROM Events WHERE event_id = :id';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Clean data
        $this->event_id = htmlspecialchars(strip_tags($this->event_id));
        // Bind data
        $stmt->bindParam(':id', $this->event_id);
        // Execute query

        if($stmt->execute()) {
            $query = 'DELETE FROM Texts WHERE text_id = :id';
            // Prepare statement
            $stmt = $this->conn->prepare($query);
            // Clean data
            $this->text_id = htmlspecialchars(strip_tags($this->text_id));
            // Bind data
            $stmt->bindParam(':id', $this->text_id);
            // Execute query
            if($stmt->execute()) {
                $query = 'DELETE FROM Photos WHERE event_id = :id';
                // Prepare statement
                $stmt = $this->conn->prepare($query);
                // Clean data
                $this->event_id = htmlspecialchars(strip_tags($this->event_id));
                // Bind data
                $stmt->bindParam(':id', $this->event_id);
                if($stmt->execute()){
                    $query = 'DELETE FROM event_participants WHERE event_id = :id';
                    // Prepare statement
                    $stmt = $this->conn->prepare($query);
                    // Clean data
                    $this->event_id = htmlspecialchars(strip_tags($this->event_id));
                    // Bind data
                    $stmt->bindParam(':id', $this->event_id);
                    // Execute query
                    $stmt->execute();
                    return true;
                }
                else return false;

            }
            else return false;
        }
        else return false;
    }

    public function getAddressId()
    {
        $query = 'SELECT address_id FROM Events WHERE  event_id = ?';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Binding data
        $stmt->bindParam(1, $this->event_id);
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->address_id = $row['address_id'];
    }

    public function editEvent(){
        $query = 'UPDATE Events SET event_name = :event_name, start_time = :start_time, end_time = :end_time
                            WHERE event_id = :id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->event_id);
        $stmt->bindParam(':event_name', $this->event_name);
        $stmt->bindParam(':start_time', $this->start_time);
        $stmt->bindParam(':end_time', $this->end_time);


        if ($stmt->execute()) {
            $query = 'SELECT text_id, address_id FROM Events WHERE event_id = :id';

            // Prepare statement
            $stmt = $this->conn->prepare($query);
            // Binding data
            $stmt->bindParam(':id', $this->event_id);
            // Execute query
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->text_id = $row['text_id'];

            $query = 'UPDATE Texts SET text=:text, text_short=:text_short
                            WHERE text_id = :id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->text_id);
            $stmt->bindParam(':text_short', $this->text_short);
            $stmt->bindParam(':text', $this->text);
            if ($stmt->execute()) {
                $this->address_id = $row['address_id'];
                $query = 'UPDATE Addresses SET street=:street, house_num=:house_num, apart_num = :apart_num
                            WHERE address_id = :id';
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':id', $this->address_id);
                $stmt->bindParam(':street', $this->street);
                $stmt->bindParam(':house_num', $this->house_num);
                $stmt->bindParam(':apart_num', $this->apart_num);
                if($stmt->execute()) return true;
                else return false;
            }
            else return false;
        }
        else return false;
    }

}