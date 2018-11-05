<?php session_start() ?>
<!DOCTYPE html>
<html lang="pl">

<head>
  <meta charset="UTF-8">
  <title>Engineer Thesis</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

</head>
<body>
<script src="./admin.js"></script>
<?php 
          if( isset($_SESSION['user_id']) ){
              if($_SESSION['role'] != "Admin") {                 
                  echo '<h5>Musisz posiadać uprawnienia administratora!</h5>';
                  session_destroy();
              } else {
                    echo $_SESSION['user_id'] . ' <br>' . $_SESSION['role'] .'
                    <br> <button type="button" onclick="logout()">Log out!</button> <br>
                    Można działać <br>';
              }
          } else echo ' 
            <form id="signin">
              Login:<br>
              <input type="text" name="login" id="login"><br><br>
              Password:<br>
              <input type="password" name="password" id="password"><br><br>
              <button type="button" onclick="signin()">Sign In!</button>
            </form>';
          ?>

</body>