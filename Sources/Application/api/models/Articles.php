<?php
require_once(__DIR__ . "/../config/Database");

class Article {

    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    // Articles properties
    public $article_id;
    public $title;
    public $create_date;
    public $author_id;
    public $author_login;
    public $photo_id;
    public $photo_path;
    public $text_id;
    public $text_short;
    public $text;

    /**
     * @desc Articles constructor.
     * @param $db The database variable
     */
    function __construct($db) {
        $this->conn = $db;
    }

    public function getRecentArticles() {
        $query = 'SELECT a.article_id, title, create_date, u.login,
                                                  p.photo_path, t.text_short FROM Articles a
                                              JOIN Users u on u.user_id = a.author_id
                                              LEFT JOIN Photos p on p.article_id = a.article_id
                                              JOIN Texts t on t.text_id = a.text_id
                                              ORDER BY create_date
                                              LIMIT 6';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }

    public function getArticleById() {
        $query = 'SELECT title, create_date, u.login,  p.photo_path, t.text FROM Articles a
                                              JOIN Users u on u.user_id = a.author_id
                                              LEFT JOIN Photos p on p.article_id = a.article_id
                                              JOIN Texts t on t.text_id = a.text_id
                                              WHERE a.article_id = ?';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->article_id);
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->title = $row['title'];
        $this->create_date = $row['create_date'];
        $this->author_login = $row['login'];
        $this->photo_path = $row['photo_path'];
        $this->text = $row['text'];
    }

    public function addArticle() {
        $query = 'INSERT INTO Articles 
                  SET
                    title = :title, 
                    create_date = NOW(),
                    author_id = :author_id,
                    text_id = :text_id';

        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->create_date = htmlspecialchars(strip_tags($this->create_date));
        $this->author_id = htmlspecialchars(strip_tags($this->author_id));
        $this->text_id = htmlspecialchars(strip_tags($this->text_id));

        // Binding data
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':author_id', $this->author_id);
        $stmt->bindParam(':text_id', $this->text_id);

        if ($stmt->execute()) {
            $this->findNewArticle();
            return true;
        }
        else return false;
    }

    private function findNewArticle(){
        $query = 'SELECT article_id FROM Articles WHERE  title = :title AND author_id = :author_id AND text_id = :text_id';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Binding data
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':author_id', $this->author_id);
        $stmt->bindParam(':text_id', $this->text_id);
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->article_id = $row['article_id'];
    }

}