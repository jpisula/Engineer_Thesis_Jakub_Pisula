<?php 
    class Router {

        //konstruktor
        function __construct() {

        }

        // funkcja obsługująca metody get i post, zwraca 
        // wartość requesta oraz metodę
        public function Get($property_name) {
            if(isset($_GET[$property_name])) {
                $res['method'] = 'GET';
                $res['value'] = $_GET[$property_name];

                return $res;
            }

            if(isset($_POST[$property_name])) {
                $res['method'] = 'POST';
                $res['value'] = $_POST[$property_name];

                return $res;
            }

            return false;
        }
    }
?>