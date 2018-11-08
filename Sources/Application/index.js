function loadPage(){
    let html = `
    <h1>Gotowe funkcjonalności:</h1>
    <div id="list">
      <ol>
        <li><a href="./web/pages/registration.html">Rejestracja</a></li><br>

        <li>Logowanie <br>
          <div id="signIn"> </div>   
        </li> <br>    

        <li>Podgląd danych profilu <br>
          <div id="prevUserData"></div>
        </li><br>

        <li> Edycja danych użytkownika <br>
          <div id="changeData"></div>
        </li><br>

        <li> Zmiana hasła użytkownika <br>
          <div id="changePassword"></div>
        </li><br>

        <li> Usuwanie konta <br>
          <div id="deleteAcc"></div>
        </li><br>

        <li> Panel administratora <br>
          <div id="adminPanel"></div>
        </li><br>

      </ol>

    </div>`;
    document.getElementById("page").innerHTML = html;
    signIn();
    prevUserData();
    changeData();
    changePassword();
    deleteAccBtn();
    adminPanel();
}

function signIn() {
    $.get("http://localhost/api/config/getSession.php", function(data) {
        if(data.user_id) {
            const html = 
            data.user_id +` <br> `+ data.role +`
            <br> <button type="button" onclick="logout(`+data.user_id+`)">Log out!</button> <br>`;
            document.getElementById("signIn").innerHTML = html;
        } else {
            const html= `
            <form id="signin">
              Login:<br>
              <input type="text" name="login" id="login"><br><br>
              Password:<br>
              <input type="password" name="password" id="password"><br><br>
              <button type="button" onclick="logIn()">Zaloguj</button>
            </form>`;
            document.getElementById("signIn").innerHTML = html;
        }
    }); 
}

function logIn() {
    var data={
        "login": $('#login').val(),
        "password": $('#password').val(),
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost/api/requests/users/signIn.php',
        data: JSON.stringify(data),
    success: function(response) {
        location.reload();
    }, error: function(response) {
        console.log(response);
    }
    }); 
}


function logout(user_id) {
    $.ajax({
            type: "POST",
            url: 'http://localhost/api/config/session_end.php',
            data: "",
        success: function() {
            let data = {
                "user_id": user_id,
                "state": false
            }
            $.ajax({
                type: "POST",
                url: 'http://localhost/api/requests/users/setLoggedIn.php',
                data: JSON.stringify(data),
            success: function() {
                location.reload(true); 
            }, 
            error: function(error) {
                console.log(error);
            }
            });
        }, 
        error: function(error) {
            console.log(error);
        }
    });
}

function prevUserData(){
    $.get("http://localhost/api/config/getSession.php", function(data) {
        if(data.user_id) {
            const html = 
            `<div id="user_data"></div>`;
            document.getElementById("prevUserData").innerHTML = html;
            loadUserData(data.user_id);
        } else {
            const html= `
            <p>Użytkownik niezalogowany.</p>`;
            document.getElementById("prevUserData").innerHTML = html;
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

function changeData() {
    $.get("http://localhost/api/config/getSession.php", function(data) {
        if(data.user_id) {
            const html = 
            `<div id="user_data_change"></div>`;
            document.getElementById("changeData").innerHTML = html;
            loadFormUserData(data.user_id);
        } else {
            const html= `
            <p>Użytkownik niezalogowany.</p>`;
            document.getElementById("changeData").innerHTML = html;
        }
    }); 
}

function loadFormUserData(user_id) {
    $.get("http://localhost/api/requests/users/getUserById?id="+user_id, function(data) {
        $.get("http://localhost/api/requests/countries/getCountries.php", function(cdata) {
            let select = `
            <select name="country" id="country" value="`+data.country_name+`">`;
                cdata.data.forEach(element => {
                    if(element.country_name == data.country_name){
                        select+=`<option value="`+ element.country_name +`" selected=true>`+ element.country_name +`</option>`;
                    } else {
                        select+=`<option value="`+ element.country_name +`">`+ element.country_name +`</option>`;
                    }
                });
                select += `</select>`;

            let html = `<form id="datachange">
            Age:<br>
            <input type="number" name="age" id="age" value="`+data.age+`"><br>
            Gender:<br>
            <select name="gender" id="gender" value="`+data.gender+`">
                <option value="M">Mężczyzna</option>
                <option value="K">Kobieta</option>
            </select><br>
            Country:<br>`+ select +`
            <br>
            <button type="button" onclick="changeUserData(`+user_id+`)">Zaktualizuj dane</button>
            </form>`;
            document.getElementById("user_data_change").innerHTML = html;
        });  
    });
}

function changeUserData(user_id) {
    var data={
        "user_id": user_id,
        "age": $('#age').val(),
        "gender": $('#gender').val(),
        "country_name": $('#country').val(),
    }
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

function changePassword() {
    $.get("http://localhost/api/config/getSession.php", function(data) {
        if(data.user_id) {
            const html = 
            `<form id="passwordchange">
            Podaj stare hasło:<br>
            <input type="password" name="oldPsw" id="oldPsw"><br>
            Podaj nowe hasło:<br>
            <input type="password" name="newPsw" id="newPsw"><br>
            Potwierdź nowe hasło:<br>
            <input type="password" name="valNewPsw" id="valNewPsw"><br>
            <button type="button" onclick="changeUserPassword(`+data.user_id+`)">Zmień hasło</button>
            </form>
            <div id="info"></div>`;
            document.getElementById("changePassword").innerHTML = html;
        } else {
            const html= `
            <p>Użytkownik niezalogowany.</p>`;
            document.getElementById("changePassword").innerHTML = html;
        }
    }); 
}

function changeUserPassword(user_id) {
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

function deleteAccBtn(){
    $.get("http://localhost/api/config/getSession.php", function(data) {
        if(data.user_id) {
            const html = 
            `<button type="button" onclick="deleteAcc(`+data.user_id+`)">Usuń konto</button>`;
            document.getElementById("deleteAcc").innerHTML = html;
        } else {
            const html= `
            <p>Użytkownik niezalogowany.</p>`;
            document.getElementById("deleteAcc").innerHTML = html;
        }
    }); 
}

function deleteAcc(user_id) {
    let data = {
        "user_id" : user_id
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost/api/requests/users/deleteUser.php',
        data: JSON.stringify(data),
    success: function() {
        $.ajax({
            type: "POST",
            url: 'http://localhost/api/config/session_end.php',
            data: "",
        success: function() {
           location.reload();
        }, 
        error: function(error) {
            console.log(error);
        }
    });
    }, error: function(response) {
        console.log(response);
    }
    }); 
}

function adminPanel(){
    $.get("http://localhost/api/config/getSession.php", function(data) {
        if(data.user_id) {
            if(data.role === "Admin") {
                const html = 
                `<a href="./web/admin/admin.html">Panel administratora</a>`;
                document.getElementById("adminPanel").innerHTML = html;
            } else {
                const html = 
                `<p>Musisz być administratorem, aby móc przejśc do panelu administratora</p>`;
                document.getElementById("adminPanel").innerHTML = html;
            }
        } else {
            const html= `
            <p>Użytkownik niezalogowany.</p>`;
            document.getElementById("adminPanel").innerHTML = html;
        }
    }); 
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

