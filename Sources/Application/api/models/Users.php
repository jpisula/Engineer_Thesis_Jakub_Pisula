<?php
require_once(__DIR__ . "/../config/Database");

/**
 * Class User Used for operations on the user table.
 */
class User {

    /**
     * @var DB Variable to connect to the database
     */
    private $conn;

    // Users properties
    public $user_id;
    public $user_fb_id;
    public $user_spotify_id;
    public $login;
    public $password;
    public $email;
    public $email_validate;
    public $age;
    public $gender;
    public $logged_in;
    public $registration_date;
    public $role_id;
    public $role_name;
    public $country_id;
    public $country_name;
    public $valPassword;

    /**
     * @desc Users constructor.
     * @param $db The database variable
     */
    function __construct($db) {
        $this->conn = $db;
    }

    /**
     * @desc Method that select all users from database.
     * @return mixed Results from database
     */
    public function getAllUsers() {
        $query = 'SELECT user_id, user_fb_id, user_spotify_id, login, email, email_validate,
                                                  age, gender, logged_in, registration_date,  
                                                  role_name, country_name FROM Users u
                                              JOIN Roles r on u.role_id = r.role_id
                                              JOIN Countries c on c.country_id = u.country_id
                                              ORDER BY user_id';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }

    /**
     * @desc Method that select user by login.
     */
    public function getUserByLogin(){
        $query = 'SELECT user_id, password, email, email_validate, age, gender, logged_in, registration_date,  
                                                  role_name, country_name FROM Users u
                                              JOIN Roles r on u.role_id = r.role_id
                                              JOIN Countries c on c.country_id = u.country_id
                                              WHERE login = ?';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->login);
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->user_id = $row['user_id'];
        $this->password = $row['password'];
        $this->age = $row['age'];
        $this->gender = $row['gender'];
        $this->logged_in = $row['logged_in'];
        $this->registration_date = $row['registration_date'];
        $this->role_name = $row['role_name'];
        $this->country_name = $row['country_name'];
        $this->email = $row['email'];
        $this->email_validate = $row['email_validate'];
    }

    /**
     * @desc Method that select user by id.
     */
    public function getUserById() {
        $query = 'SELECT user_id, login, email, email_validate, age, gender, logged_in, registration_date,  
                                                  role_name, country_name FROM Users u
                                              JOIN Roles r on u.role_id = r.role_id
                                              JOIN Countries c on c.country_id = u.country_id
                                              WHERE user_id = ?';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->user_id);
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->age = $row['age'];
        $this->gender = $row['gender'];
        $this->login = $row['login'];
        $this->logged_in = $row['logged_in'];
        $this->registration_date = $row['registration_date'];
        $this->role_name = $row['role_name'];
        $this->country_name = $row['country_name'];
        $this->email = $row['email'];
        $this->email_validate = $row['email_validate'];
    }

    /**
     * @desc Method to check is login already used.
     * @return bool Value gives information that login is available or not.
     */
    public function isLoginUsed() {
        $query = 'SELECT COUNT(user_id) FROM Users WHERE login=?';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->login);
        $stmt->execute();
        $score = $stmt->fetch(PDO::FETCH_ASSOC);
        if($score['COUNT(user_id)'] == 0) return false;
        else return true;
    }

    /**
     * @desc Method to login into service.
     * @return int state of singing in: 0 -> logged in; 1 -> wrong password; 2 -> wrong login
     */
    public function singIn() {
        if($this->isLoginUsed()){
            $this->getUserByLogin();
            $query = 'SELECT SHA1(?) as password';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->valPassword);
            $stmt->execute();
            $validatePassword = $stmt->fetch(PDO::FETCH_ASSOC);
            $validatePassword = $validatePassword['password'];
            if($validatePassword === $this->password) {
                $this->logged_in = 1;
                $this->setLoggedIn();
                return 0;
            }
            else return 1;
        } else return 2;
    }

    private function isFacebookUserInDB() {
        $query = 'SELECT COUNT(user_id), user_id, role_name FROM Users u JOIN Roles r on u.role_id = r.role_id WHERE u.user_fb_id = ?';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->user_fb_id);
        if($stmt->execute()) {
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            if($data['COUNT(user_id)'] != 0) {
                $this->user_id = $data['user_id'];
                $this->role_name = $data['role_name'];
                return true;
            } else return false;
        } else return false;
    }

    private function createNewFbUser() {
        if(!$this->isLoginUsed()) {
            $query = 'INSERT INTO Users 
                  SET
                    login = :login, 
                    user_fb_id = :fb_id,
                    email = :email,
                    email_validate = 1,
                    age = :age, 
                    gender = :gender,
                    logged_in = 1, 
                    registration_date = NOW(), 
                    role_id = (SELECT role_id FROM Roles WHERE role_name = :role),
                    country_id = (SELECT country_id FROM Countries WHERE country_name = :country) ';

            $stmt = $this->conn->prepare($query);

            // Clean data
            $this->login = htmlspecialchars(strip_tags($this->login));
            $this->user_fb_id = htmlspecialchars(strip_tags($this->user_fb_id));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->email_validate = htmlspecialchars(strip_tags($this->email_validate));
            $this->age = htmlspecialchars(strip_tags($this->age));
            $this->gender = htmlspecialchars(strip_tags($this->gender));
            $this->logged_in = htmlspecialchars(strip_tags($this->logged_in));
            $this->role_id = htmlspecialchars(strip_tags($this->role_id));
            $this->country_id = htmlspecialchars(strip_tags($this->country_id));

            $this->role_name= 'User';
            // Binding data
            $stmt->bindParam(':login', $this->login);
            $stmt->bindParam(':fb_id', $this->user_fb_id);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':age', $this->age);
            $stmt->bindParam(':gender', $this->gender);
            $stmt->bindParam(':role', $this->role_name);
            $stmt->bindParam(':country', $this->country_name);

            if ($stmt->execute()) return true;
            else return false;
        }
        return false;
    }

    public function signInByFacebook() {
        if(!$this->isFacebookUserInDB()) {
            if($this->createNewFbUser()) {
                return $this->isFacebookUserInDB();
            } else return false;
        } return true;
    }

    /**
     * @desc Method that creates new user.
     * @return bool Is this operation is done properly?
     */
    public function createNewUser(){
        if(!$this->isLoginUsed()) {
            $query = 'INSERT INTO Users 
                  SET
                    login = :login, 
                    password = SHA1(:password),
                    email = :email,
                    email_validate = 0,
                    age = :age, 
                    gender = :gender,
                    logged_in = 0, 
                    registration_date = NOW(), 
                    role_id = (SELECT role_id FROM Roles WHERE role_name = :role),
                    country_id = (SELECT country_id FROM Countries WHERE country_name = :country) ';

            $stmt = $this->conn->prepare($query);

            // Clean data
            $this->login = htmlspecialchars(strip_tags($this->login));
            $this->password = htmlspecialchars(strip_tags($this->password));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->email_validate = htmlspecialchars(strip_tags($this->email_validate));
            $this->age = htmlspecialchars(strip_tags($this->age));
            $this->gender = htmlspecialchars(strip_tags($this->gender));
            $this->logged_in = htmlspecialchars(strip_tags($this->logged_in));
            $this->role_id = htmlspecialchars(strip_tags($this->role_id));
            $this->country_id = htmlspecialchars(strip_tags($this->country_id));

            $this->role_name= 'User';
            // Binding data
            $stmt->bindParam(':login', $this->login);
            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':age', $this->age);
            $stmt->bindParam(':gender', $this->gender);
            $stmt->bindParam(':role', $this->role_name);
            $stmt->bindParam(':country', $this->country_name);

            if ($stmt->execute()) return true;
            else return false;
        }
        return false;

    }

    /**
     * @desc Method to change password of the user.
     * @return bool Is this operation is done properly?
     */
    public function changePassword(){
        $query = 'SELECT password FROM Users WHERE user_id = ?';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();
        $currentPassword = $stmt->fetch(PDO::FETCH_ASSOC);
        $currentPassword = $currentPassword['password'];

        $query = 'SELECT SHA1(?) as password';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->valPassword);
        $stmt->execute();
        $validatePassword = $stmt->fetch(PDO::FETCH_ASSOC);
        $validatePassword = $validatePassword['password'];


        if($currentPassword === $validatePassword) {
            $query = 'UPDATE Users SET password=SHA1(:password) WHERE user_id = :id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':id', $this->user_id);
            if ($stmt->execute()) return true;
            else return false;
        } else {
            return false;
        }
    }

    /**
     * @desc Method that updates data of the user.
     * @return bool Is this operation is done properly?
     */
    public function updateData(){
        $query = 'UPDATE Users SET age=:age, gender=:gender, 
                            country_id=(SELECT country_id FROM Countries WHERE country_name = :country)
                            WHERE user_id = :id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':age', $this->age);
        $stmt->bindParam(':gender', $this->gender);
        $stmt->bindParam(':country', $this->country_name);
        $stmt->bindParam(':id', $this->user_id);

        if ($stmt->execute()) return true;
        else return false;
    }

    /**
     * @desc Method that sets user's logged in status.
     * @return bool Is this operation is done properly?
     */
    public function setLoggedIn(){
        if($this->logged_in == 1) {
            $query = 'UPDATE Users SET logged_in=1 WHERE user_id=:id';
        } else {
            $query = 'UPDATE Users SET logged_in=0 WHERE user_id=:id';
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->user_id);
        if ($stmt->execute()) return true;
        else return false;
    }

    /**
     * @desc Method that changes role of the user.
     * @return bool Is this operation is done properly?
     */
    public function changeRole() {
        $query = 'UPDATE Users SET role_id=(SELECT role_id FROM Roles WHERE role_name=:role) WHERE user_id=:id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->user_id);
        $stmt->bindParam(':role', $this->role_name);
        if ($stmt->execute()) return true;
        else return false;
    }

    /**
     * @desc Method that deletes the uder form the database.
     * @return bool Is this operation is done properly?
     */
    public function deleteUser() {
        $query = 'DELETE FROM Users WHERE user_id = :id';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Clean data
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        // Bind data
        $stmt->bindParam(':id', $this->user_id);
        // Execute query
        if($stmt->execute()) return true;
        else return false;
    }


}
?>