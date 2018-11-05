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
<script src="./index.js"></script>
<!-- <div id="fb-root"></div> -->


  <div id="container">
    <h1>Gotowe funkcjonalności:</h1>
    <div id="list">
      <ol>
        <li><a href="./web/pages/registration.html">Rejestracja</a></li><br>
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

        </li> <br>
        <!-- <li>Logowanie z Facebookiem <br>
      <?php 
          // if( isset($_SESSION['user_id']) ){
          //   echo $_SESSION['user_id'] . ' <br>' . $_SESSION['role'] .'
          //   <br> <button type="button" onclick="fbLogout()">Log out!</button> <br>';
          // } else echo 
          // ' 
          // <fb:login-button
          // id="fb-btn"
          // scope="public_profile,email,user_birthday,user_gender,user_location"
          // onlogin="checkLoginState();">
          // </fb:login-button>';
          ?>

          <div id="fblogin"></div>
        </li> -->
        <li>Podgląd danych profilu <br>
          <?php if(isset($_SESSION['user_id'])){
            echo '<div id="user_data"></div>'; ?>
            <script>
            let user_id = <?php echo $_SESSION['user_id'] ?>;
            loadUserData(user_id);
            </script>
            <?php
          } else echo '<p>Użytkownik niezalogowany.</p>';
          ?>
        </li><br>
        <li> Edycja danych użytkownika <br>
          <?php if(isset($_SESSION['user_id'])){
            echo '<div id="user_data_change"></div>'; ?>
            <script>
            loadFormUserData(user_id);
            </script>
            <?php
          } else echo '<p>Użytkownik niezalogowany.</p>';
          ?>
        </li><br>
        <li> Zmiana hasła użytkownika <br>
          <?php if(isset($_SESSION['user_id'])){
            echo '<form id="passwordchange">
            Podaj stare hasło:<br>
            <input type="password" name="oldPsw" id="oldPsw"><br>
            Podaj nowe hasło:<br>
            <input type="password" name="newPsw" id="newPsw"><br>
            Potwierdź nowe hasło:<br>
            <input type="password" name="valNewPsw" id="valNewPsw"><br>
            <button type="button" onclick="changeUserPassword('.$_SESSION['user_id'].')">Zmień hasło</button>
            </form>
            <div id="info"></div>'; ?>
            
            <?php
          } else echo '<p>Użytkownik niezalogowany.</p>';
          ?>
        </li><br>
        <li> Panel administratora <br>
          <?php if(isset($_SESSION['role'])){
            if($_SESSION['role'] === "Admin"){
              echo '<a href="./web/pages/admin.php">Panel administratora</a>';
            } else echo '<p>Musisz być administratorem, aby móc przejśc do panelu administratora</p>';
          } else echo '<p>Użytkownik niezalogowany.</p>';
          ?>
        </li><br>
      </ol>

    </div>
  </div>


<script>


    

  // function fbLogout(){
  //   FB.logout(function(response){
  //     location.reload(true);
  //   });
  // }
</script>
</body>

</html>