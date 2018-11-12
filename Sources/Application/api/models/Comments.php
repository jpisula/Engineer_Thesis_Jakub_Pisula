<?php
require_once(__DIR__ . "/../config/Database");

/**
 * Class Comment Used for operations on the countries table.
 */
class Comment {
    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    // Comments properties
    public $comment_id;
    public $article_id;
    public $event_id;
    public $user_id;
    public $create_date;
    public $text;


    /**
     * @desc Roles constructor.
     * @param $db The database variable
     */
    function __construct($db) {
        $this->conn = $db;
    }

    function getArticleComments(){
        $query = 'SELECT comment_id, c.user_id, u.login, text, create_date FROM
                  Comments c JOIN Users u on c.user_id = u.user_id WHERE article_id = ?
                  ORDER BY create_date DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->article_id);
        $stmt->execute();
        return $stmt;
    }

    function getEventComments(){
        $query = 'SELECT comment_id, c.user_id, u.login, text, create_date FROM
                  Comments c JOIN Users u on c.user_id = u.user_id WHERE event_id = ?
                  ORDER BY create_date DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->event_id);
        $stmt->execute();
        return $stmt;
    }

    function addArticleComment(){
        $query = 'INSERT INTO Comments SET
                  article_id = :article_id,
                  user_id = :user_id,
                  text = :text,
                  create_date = NOW()';
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->article_id = htmlspecialchars(strip_tags($this->article_id));
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->text = htmlspecialchars(strip_tags($this->text));

        $stmt->bindParam(":article_id", $this->article_id);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":text", $this->text);

        if ($stmt->execute()) return true;
        else return false;
    }

    function addEventComment(){
        $query = 'INSERT INTO Comments SET
                  event_id = :event_id,
                  user_id = :user_id,
                  text = :text,
                  create_date = NOW()';
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->event_id = htmlspecialchars(strip_tags($this->event_id));
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->text = htmlspecialchars(strip_tags($this->text));

        $stmt->bindParam(":event_id", $this->event_id);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":text", $this->text);

        if ($stmt->execute()) return true;
        else return false;
    }

    function deleteComment(){
        $query = 'DELETE FROM Comments WHERE comment_id = ?';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->comment_id);
        $stmt->execute();
        return $stmt;
    }

}