<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="pl">

<head>
  <meta charset="UTF-8">
  <title>Engineer Thesis</title>
  <link rel="stylesheet" type="text/css" href="index.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

</head>

<body>
<div id="fb-root"></div>


  <div id="container">
    <h1>Gotowe funkcjonalności:</h1>
    <div id="list">
      <ol>
        <li><a href="./web/pages/registration.html">Rejestracja</a></li>
        <li>Logowanie <br>
          <?php 
          if( isset($_SESSION['user_id']) ){
            echo $_SESSION['user_id'] . ' <br>' . $_SESSION['role'] .'
            <br> <button type="button" onclick="logout()">Log out!</button> <br>';
          } else echo ' 
            <form id="signin">
              Login:<br>
              <input type="text" name="login" id="login"><br><br>
              Password:<br>
              <input type="password" name="password" id="password"><br><br>
              <button type="button" onclick="signin()">Sign In!</button>
            </form>';
          ?>

        </li>
        <li>Logowanie z Facebookiem <br>
      <?php 
          if( isset($_SESSION['user_id']) ){
            echo $_SESSION['user_id'] . ' <br>' . $_SESSION['role'] .'
            <br> <button type="button" onclick="fbLogout()">Log out!</button> <br>';
          } else echo 
          ' 
          <fb:login-button
          id="fb-btn"
          scope="public_profile,email,user_birthday,user_gender,user_location"
          onlogin="checkLoginState();">
          </fb:login-button>';
          ?>

          <div id="fblogin"></div>
        </li>
        <li>Podgląd danych profilu <br>
          
        </li>
      </ol>

    </div>
  </div>

<script src="./index.js"></script>
<script>
    function logout() {
      <?php 
      session_destroy();
      ?>
      console.log("reload Xd");
      location.reload();
      
    }

  function fbLogout(){
    FB.logout(function(response){
      location.reload();
    });
  }
</script>
</body>

</html>