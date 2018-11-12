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
                                              ORDER BY create_date desc 
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

    public function getAllUserArticles() {
        $query = 'SELECT a.article_id, u.user_id, u.login, title, t.text_short, p.photo_path, create_date
                  FROM Articles a JOIN users u on u.user_id = a.author_id
                  JOIN Texts t on t.text_id = a.text_id
                  LEFT JOIN Photos p on p.article_id = a.article_id
                  WHERE a.author_id = ?';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->author_id);
        // Execute query
        $stmt->execute();
        return $stmt;
    }

    public function editArticle() {
        $query = 'UPDATE Articles SET title=:title
                            WHERE article_id = :id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->article_id);
        $stmt->bindParam(':title', $this->title);

        if ($stmt->execute()) {
            $query = 'SELECT text_id FROM Articles WHERE article_id = :id';

            // Prepare statement
            $stmt = $this->conn->prepare($query);
            // Binding data
            $stmt->bindParam(':id', $this->article_id);
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
            if ($stmt->execute()) return true;
            else return false;
        }
        else return false;
    }

    public function deleteArticle() {
        $query = 'SELECT text_id FROM Articles WHERE article_id = :id';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Binding data
        $stmt->bindParam(':id', $this->article_id);
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->text_id = $row['text_id'];

        $query = 'DELETE FROM Articles WHERE article_id = :id';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Clean data
        $this->article_id = htmlspecialchars(strip_tags($this->article_id));
        // Bind data
        $stmt->bindParam(':id', $this->article_id);
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
                $query = 'DELETE FROM Photos WHERE article_id = :id';
                // Prepare statement
                $stmt = $this->conn->prepare($query);
                // Clean data
                $this->article_id = htmlspecialchars(strip_tags($this->article_id));
                // Bind data
                $stmt->bindParam(':id', $this->article_id);
                // Execute query
                $stmt->execute();
                return true;
            }
            else return false;
        }
        else return false;
    }

}