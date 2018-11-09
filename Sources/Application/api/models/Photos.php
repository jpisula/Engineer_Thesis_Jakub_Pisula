<?php
require_once(__DIR__ . "/../config/Database");
define ('SITE_ROOT', realpath(dirname(__FILE__)));


class Photo {

    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    // Photos properties
    public $photo_id;
    public $photo_path;
    public $article_id;
    public $event_id;

    /**
     * @desc Photos constructor.
     * @param $db The database variable
     */
    function __construct($db) {
        $this->conn = $db;
    }

    public function addArticlePhoto()
    {
        try {
            if(!isset($_FILES["user_image"]["tmp_name"])) return false;
            if (is_uploaded_file($_FILES["user_image"]["tmp_name"])) {
                $tmp_file = $_FILES["user_image"]["tmp_name"];
                $img_name = $_FILES["user_image"]["name"];
                $this->photo_path = SITE_ROOT . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR . "Articles" . DIRECTORY_SEPARATOR . $this->article_id . "_" . $img_name;

                $query = 'INSERT INTO Photos 
                  SET
                    photo_path = :photo_path,
                    article_id = :article_id';

                $stmt = $this->conn->prepare($query);

                // Clean data
                $this->photo_path = htmlspecialchars(strip_tags($this->photo_path));
                $this->article_id = htmlspecialchars(strip_tags($this->article_id));

                // Binding data
                $stmt->bindParam(':photo_path', $this->photo_path);
                $stmt->bindParam(':article_id', $this->article_id);

                if ($stmt->execute()) {
                    if (move_uploaded_file($tmp_file, $this->photo_path)) {
                        $this->findNewPhoto();
                        return true;
                    } else return false;
                } else return false;
            } else return false;
        } catch (Exception $e) {
            return false;
        }
    }

    private function findNewPhoto(){
        $query = 'SELECT photo_id FROM Photos WHERE photo_path = ?';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Binding data
        $stmt->bindParam(1, $this->photo_path);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->photo_id = $row['photo_id'];
    }

    public function deleteArticlePhotos(){
        $query = 'SELECT photo_path FROM Photos WHERE article_id = ?';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Binding data
        $stmt->bindParam(1, $this->article_id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->photo_path = $row['photo_path'];
        if (is_file($this->photo_path)){
            unlink($this->photo_path);
        }

    }
}