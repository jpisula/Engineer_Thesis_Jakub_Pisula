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

  
  function loadUserData(user_id) {
    $.get("http://localhost/api/requests/users/getUserById?id="+user_id, function(data) {
        let html = `<table>
        <tr><th></th><th></th></tr>
        <tr>
            <td>User id</td>
            <td>`+ data.user_id +`</td>
            </tr>
            <tr>
            <td>User Login</td> 
            <td>`+ data.login +`</td>
            </tr>
            <td>Email</td>
            <td>`+ data.email +`</td>
            </tr>
            <tr>
            <td>Age</td> 
            <td>`+ data.age +`</td>
            </tr>
            <td>Gender</td>
            <td>`+ data.gender +`</td>
            </tr>
            <tr>
            <td>Country</td> 
            <td>`+ data.country_name +`</td>
            </tr>
            <td>Role</td>
            <td>`+ data.role_name +`</td>
            </tr>
            <tr>
            <td>Registration Date</td> 
            <td>`+ data.registration_date +`</td>
            </tr>
        </tr>
        
        </table>`;
        document.getElementById("user_data").innerHTML = html;
        
    });
  }

  function loadFormUserData(user_id) {
    $.get("http://localhost/api/requests/users/getUserById?id="+user_id, function(data) {
        let html = `<form id="datachange">
        Age:<br>
        <input type="number" name="age" id="age" value="`+data.age+`"><br>
        Gender:<br>
        <select name="gender" id="gender" value="`+data.gender+`">
            <option value="M">Mężczyzna</option>
            <option value="K">Kobieta</option>
        </select><br>
        Country:<br>
        <select name="country" id="country" value="`+data.country_name+`">
            <option value="Poland">Polska</option>
            <option value="Germany">Niemcy</option>
            <option value="England">Anglia</option>
            <option value="USA">USA</option>
        </select><br>
        <button type="button" onclick="changeUserData(`+user_id+`)">Zaktualizuj dane</button>
        </form>`;
        document.getElementById("user_data_change").innerHTML = html;
        
    });
  }

  function changeUserData(user_id) {
    var data={
        "user_id": user_id,
        "age": $('#age').val(),
        "gender": $('#gender').val(),
        "country_name": $('#country').val(),
    }
    console.log(data);
    $.ajax({
        type: 'PUT',
        url: 'http://localhost/api/requests/users/updateData.php',
        data: JSON.stringify(data),
    success: function(response) {
    //success message mybe...
        location.reload();
    }, error: function(response) {
        console.log(response);
    }
    }); 
  }

  function changeUserPassword(user_id) {
      console.log(user_id);
    if($('#newPsw').val() != $('#valNewPsw').val()){
        document.getElementById("info").innerHTML = '<p>Podano różne nowe hasła!</p>'
    } else {
        let data = {
            "user_id" : user_id,
            "password" : $('#newPsw').val(),
            "valPassword" : $('#oldPsw').val()
        }
        $.ajax({
            type: 'PUT',
            url: 'http://localhost/api/requests/users/changePassword.php',
            data: JSON.stringify(data),
        success: function(response) {
        //success message mybe...
            location.reload();
        }, error: function(response) {
            console.log(response);
        }
        }); 

    }
  }


  /*
  // function signInFB(data) {
  //   console.log(data);    
  //   $.ajax({
  //       type: "POST",
  //       url: 'http://localhost/api/requests/users/signInByFacebook.php',
  //       data: JSON.stringify(data),
  //   success: function(response) {
  //   //success message mybe...
  //       console.log(response);
  //       document.getElementById("fblogin").innerHTML = "<h4> Hello! "+ data.login +"</h4>";
  //   }, error: function(response) {
  //       console.log("err");
  //       console.log(response);
  //   }
  //   }); 
  // }


  // FACEBOOK API
  // window.fbAsyncInit = function() {

  //       FB.init({
  //         appId      : '705813459793714',
  //         cookie     : true,
  //         xfbml      : true,
  //         version    : 'v2.8'
  //       });
  //       FB.getLoginStatus(function(response) {
  //           statusChangeCallback(response);
  //       });
  //     };

  //     (function(d, s, id){
  //        var js, fjs = d.getElementsByTagName(s)[0];
  //        if (d.getElementById(id)) {return;}
  //        js = d.createElement(s); js.id = id;
  //        js.src = "//connect.facebook.net/en_US/sdk.js";
  //        fjs.parentNode.insertBefore(js, fjs);
  //      }(document, 'script', 'facebook-jssdk'));

  //      function statusChangeCallback(response){
  //        if(response.status === 'connected'){
  //          console.log('Logged in.');
  //          testAPI();
  //        } else {
  //          console.log('Not authenticated');
  //        }
  //      }

  //     function checkLoginState() {
  //       FB.getLoginStatus(function(response) {
  //         statusChangeCallback(response);
  //       });
  //     }

  //     function testAPI(){
  //       FB.api('/me?fields=name,email,birthday,gender,location{location{country}}', function(response){
  //         if(response && !response.error){
  //           let birthDate;
  //           let country;
  //           let gender;

  //           if(response.birthday) {
  //             birthDate = new Date(response.birthday);
  //             birthDate = birthDate.getFullYear();
  //           } else {
  //             birthDate = 2000;
  //           }

  //           if(!response.location.location.country) {
  //             country = 'Poland';
  //           }
  //           else{
  //             country = response.location.location.country;
  //           }

  //           if(!response.gender) {
  //             gender = 'U'; //Unspecified
  //           }
  //           else if(response.gender == "male"){
  //             gender = 'M';
  //           } else {
  //             gender = "K";
  //           }
            
  //           let data = {
  //             "login" : response.name,
  //             "user_fb_id" : response.id,
  //             "email" : response.email,
  //             "age" : (new Date).getFullYear() - birthDate,
  //             "country" : country,
  //             "gender" : gender
  //           };
  //           signInFB(data);
  //         }               
  //       });

      
        
  //       //checkLoginState();
  //     }

      ///////////////////////////////////////
*/

