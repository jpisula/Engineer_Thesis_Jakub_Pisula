<?php
require_once(__DIR__ . "/../config/Database");

class Votes {

    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    // Photos properties
    public $votes_id;
    public $user_id;
    public $votesCount;

    public $voting_id;
    public $start_date;
    public $end_date;
    public $active;

    public $vtype_id;
    public $vtype_name;

    public $voptions_id;
    public $voptions_name;


    /**
     * @desc Photos constructor.
     * @param $db The database variable
     */
    function __construct($db) {
        $this->conn = $db;
    }

    public function addVotingOption() {
        $query = 'INSERT INTO voting_options
                  SET
                  name = :name,
                  voting_id = :voting_id';
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->voptions_name = htmlspecialchars(strip_tags($this->voptions_name));
        $this->voting_id = htmlspecialchars(strip_tags($this->voting_id));


        // Binding data
        $stmt->bindParam(':name', $this->voptions_name);
        $stmt->bindParam(':voting_id', $this->voting_id);

        if ($stmt->execute()) {
            return true;
        }
        else return false;
    }

    public function addVoting(){
        $query = 'INSERT INTO votings 
                  SET
                    start_date = :start_date, 
                    end_date = :end_date,
                    active = 0,
                    vtype_id = :vtype_id';

        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->start_date = htmlspecialchars(strip_tags($this->start_date));
        $this->end_date = htmlspecialchars(strip_tags($this->end_date));      
        $this->vtype_id = htmlspecialchars(strip_tags($this->vtype_id));      
        
        $stmt->bindParam(':start_date', $this->start_date);
        $stmt->bindParam(':end_date', $this->end_date);
        $stmt->bindParam(':vtype_id', $this->vtype_id);

        if ($stmt->execute()) {
            return true;
        }
        else return false;
    }

    public function setActiveVoting() {
        if($this->active == 1) {
            $query = 'UPDATE votings SET active = 1 WHERE voting_id = :voting_id';
        } else {
            $query = 'UPDATE votings SET active = 0 WHERE voting_id = :voting_id';
        }

        $stmt = $this->conn->prepare($query);     

        $this->voting_id = htmlspecialchars(strip_tags($this->voting_id));     

        $stmt->bindParam(':voting_id', $this->voting_id);

        if ($stmt->execute()) {
        return true;
        }
        else return false;
    }

    public function addVote() {
        $query = 'SELECT COUNT(votes_id), votes_id FROM votes
                  WHERE voting_id = :voting_id AND user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':voting_id', $this->voting_id);
        $stmt->bindParam(':user_id', $this->user_id);

        // Execute query
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row['COUNT(votes_id)'] == 1) {
            $query = 'DELETE FROM Votes WHERE votes_id = ?';
            // Prepare statement
            $stmt = $this->conn->prepare($query);
            // Bind data
            $stmt->bindParam(1, $row['votes_id']);
            // Execute query
            $stmt->execute();

        }
        $query = 'INSERT INTO votes 
        SET
          voting_id = :voting_id, 
          voptions_id = :voptions_id,
          user_id = :user_id';

        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->voting_id = htmlspecialchars(strip_tags($this->voting_id));
        $this->voptions_id = htmlspecialchars(strip_tags($this->voptions_id));
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));

        $stmt->bindParam(':voting_id', $this->voting_id);
        $stmt->bindParam(':voptions_id', $this->voptions_id);
        $stmt->bindParam(':user_id', $this->user_id);

        if ($stmt->execute()) {
            return true;
        } else return false;

    }

    public function getAdminVotings() {
        $query = 'SELECT * FROM votings v
        JOIN voting_types vt on vt.vtype_id = v.vtype_id
        WHERE end_date > NOW() OR active = 1';
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }

    public function getActiveVotings() {
        $query = 'SELECT v.voting_id, vt.name FROM Votings v
        JOIN voting_types vt on vt.vtype_id = v.vtype_id
        WHERE v.active = 1';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }

    public function getVotingOptions() {
        $query = 'SELECT voptions_id, name FROM voting_options       
        WHERE voting_id = ?';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->voting_id);
        // Execute query
        $stmt->execute();
        return $stmt;
    }

    public function getVotesCount() {
        $query = 'SELECT COUNT(votes_id) FROM votes
                  WHERE voptions_id = ?';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->voptions_id);
        // Execute query
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->votesCount = $row['COUNT(votes_id)'];
    }

    public function getUserVote(){
        $query = 'SELECT vo.voptions_id, COUNT(vo.voptions_id) FROM voting_options vo
        JOIN votes v on v.voptions_id = vo.voptions_id      
        WHERE v.user_id = :user_id AND v.voting_id = :voting_id';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':voting_id', $this->voting_id);
        // Execute query
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->votesCount = $row['COUNT(vo.voptions_id)'];
        $this->voptions_id = $row['voptions_id'];
    }

    public function deleteVote() {
        $query = 'DELETE FROM Votes WHERE user_id = :user_id AND voptions_id = :voptions_id';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Bind data
        $stmt->bindParam('user_id', $this->user_id);
        $stmt->bindParam('voptions_id', $this->voptions_id);
        // Execute query
        if($stmt->execute()) return true;
        else return false;
    }

    public function deleteVotingOption() {
        $query = 'DELETE FROM voting_options WHERE voptions_id = ?';
        $stmt = $this->conn->prepare($query);
        // Bind data
        $stmt->bindParam(1, $this->voptions_id);
        if($stmt->execute()) {
            $query = 'DELETE FROM votes WHERE voptions_id = ?';
            $stmt = $this->conn->prepare($query);
            // Bind data
            $stmt->bindParam(1, $this->voptions_id);
            if($stmt->execute()) return true;
            else return false;
        }
        else return false;
    }
}