<?php
require_once(__DIR__ . "/../config/Database");

class Text {

    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    // Photos properties
    public $text_id;
    public $text;
    public $text_short;

    /**
     * @desc Texts constructor.
     * @param $db The database variable
     */
    function __construct($db) {
        $this->conn = $db;
    }

    public function addNewText(){
        $query = 'INSERT INTO Texts 
                  SET
                    text = :text,
                    text_short = :text_short';

        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->text = htmlspecialchars(strip_tags($this->text));
        $this->text_short = htmlspecialchars(strip_tags($this->text_short));

        // Binding data
        $stmt->bindParam(':text', $this->text);
        $stmt->bindParam(':text_short', $this->text_short);

        if ($stmt->execute()) {
            $this->findNewText();
            return true;
        }
        else return false;
    }

    private function findNewText() {
        $query = 'SELECT text_id FROM Texts WHERE text = :text AND text_short = :text_short';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Binding data
        $stmt->bindParam(':text', $this->text);
        $stmt->bindParam(':text_short', $this->text_short);
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->text_id = $row['text_id'];
    }

}