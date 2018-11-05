function signin() {
    var data={
        "login": $('#login').val(),
        "password": $('#password').val(),
    }
    console.log(data);
    $.ajax({
        type: "POST",
        url: 'http://localhost/api/requests/users/signIn.php',
        data: JSON.stringify(data),
    success: function() {
    //success message mybe...
        console.log("hurra");
        location.reload();
    }, error: function() {
        console.log("baad");
    }
    }); 

  }

  function logout() {
    $.ajax({
              type: "POST",
              url: 'http://localhost/api/config/session_end.php',
              data: "",
          success: function(response) {
              location.reload(true);
          }, error: function(error) {
              console.log(error);
          }
          });
  }