<?php session_start() ?>
<!DOCTYPE html>
<html lang="pl">

<head>
  <meta charset="UTF-8">
  <title>Engineer Thesis</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

  <style>
  table {
    font-size: 12px;
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
  }

  td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
  }

  tr:nth-child(even) {
      background-color: #dddddd;
  }
  </style>
</head>
<body>
<script src="./admin.js"></script>
<?php 
  if(!isset($_SESSION['user_id'])) {
    echo ' 
    <form id="signin">
      Login:<br>
      <input type="text" name="login" id="login"><br><br>
      Password:<br>
      <input type="password" name="password" id="password"><br><br>
      <button type="button" onclick="signin()">Sign In!</button>
    </form>';
  } else{
    if($_SESSION['role'] == "Admin") {
      $html = $_SESSION['user_id'] . ' <br>' . $_SESSION['role'] .'
              <br> <button type="button" onclick="logout()">Log out!</button> <br>
              Można działać <br> <br>
      <div id="list">
        <ol>
          <li>Podgląd wszystkich użytkowników<br>
            <div id="showAllUsers"></div>
      ';
      echo $html; ?>
      <script>
        showAllUsers();
      </script>
      <?php
       $html = '
          </li><br> 
          <li>Edycja danych użytkowników<br>
            <div id="changeUserData"></div>';
        echo $html; ?>
      <script>
        loadChangeUserData();
      </script>
      <?php
       $html = '
          </li><br> 
          <li>Zmień rolę użytkownika<br>
            <div id="changeUserRole"></div>';
        echo $html; ?>
      <script>
        loadChangeUserRole();
      </script>
      <?php
       $html = '
          </li><br> 
          <li>Usuń użytkownika<br>
            <div id="deleteUser"></div>';
        echo $html; ?>
      <script>
        loadDeleteUser();
      </script>
      <?php  
        $html= '
          </li><br> 
        </ol>
      </div>
      ';
      echo $html;

    } else {
      echo '<h5>Musisz posiadać uprawnienia administratora!</h5>';
      session_destroy();
    }
}
  ?>

</body>