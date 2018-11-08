function roleCheck() {
    $.get("http://localhost/api/config/getSession.php", function(data) {
        if(data.user_id) {
            if(data.role === "Admin") {
                const html = data.user_id + `<br>` + data.role;
                document.getElementById("roleCheck").innerHTML = html;
                loadPage(data.user_id);
            } else {
                const html = 
                `<p>Musisz być administratorem, aby móc przejśc do panelu administratora</p>
                <button type="button" onclick="logout(`+data.user_id+`)">Log out!</button>`;
                document.getElementById("roleCheck").innerHTML = html;
            }
        } else {
            const html= `
            <form id="signin">
                Login:<br>
                <input type="text" name="login" id="login"><br><br>
                Password:<br>
                <input type="password" name="password" id="password"><br><br>
                <button type="button" onclick="signin()">Sign In!</button>
            </form>`;
            document.getElementById("roleCheck").innerHTML = html;
        }
    }); 
}

function loadPage(user_id){
    let html = `
    <br> <button type="button" onclick="logout(`+user_id+`)">Log out!</button> <br>
    Można działać <br> <br>
    <div id="list">
    <ol>
        <li>Podgląd wszystkich użytkowników<br>
        <div id="showAllUsers"></div>`;
    
    html+= `
        </li><br> 
        <li>Edycja danych użytkowników<br>
        <div id="changeUserData"></div>`;
    
    html+= `
        </li><br> 
            <li>Zmień rolę użytkownika<br>
                <div id="changeUserRole"></div>`;
    
    html+=`
        </li><br> 
            <li>Usuń użytkownika<br>
                <div id="deleteUser"></div>`;
    
    html+=`
        </li><br> 
        </ol>
    </div>`;
    document.getElementById("adminPage").innerHTML=html;
    showAllUsers();
    loadChangeUserData();
    loadChangeUserRole();
    loadDeleteUser();
}

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

  function showAllUsers(){
      $.get("http://localhost/api/requests/users/getAllUsers.php", function(data) {
          let html = `
          <table>
            <tr>
            <th>user_id</th>
            <th>user_fb_id</th>
            <th>user_spotify_id</th>
            <th>login</th>
            <th>email</th>
            <th>email validation</th>
            <th>wiek</th>
            <th>płeć</th>
            <th>państwo</th>
            <th>logged_in</th>
            <th>Data rejestracji</th>
            <th>Rola</th>
            </tr>
            `;
          data.data.forEach(element => {
              html += `
              <tr>
              <td>`+ element.user_id +`</td>
              <td>`+ element.user_fb_id +`</td>
              <td>`+ element.user_spotify_id +`</td>
              <td>`+ element.login +`</td>
              <td>`+ element.email +`</td>
              <td>`+ element.email_validate +`</td>
              <td>`+ element.age +`</td>
              <td>`+ element.gender +`</td>
              <td>`+ element.country_name +`</td>
              <td>`+ element.logged_in +`</td>
              <td>`+ element.registration_date +`</td>
              <td>`+ element.role_name +`</td>
            </tr>`;
          });
        html += `</table>`;
        document.getElementById("showAllUsers").innerHTML = html;
    });
  }

  function loadChangeUserData() {
      let html = `<p> Podaj id użytkownika, któremu chcesz zmienić dane: </p>
            <input type="number" name="id" id="id"><br>
            <button type="button" onclick="loadchangeUserDataForm()">Zaktualizuj dane</button>`;
      document.getElementById("changeUserData").innerHTML = html;
  }

  function loadchangeUserDataForm() {
      user_id = $('#id').val();
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
            document.getElementById("changeUserData").innerHTML = html;
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

  function loadChangeUserRole() {
    let html = `<p> Podaj id użytkownika, któremu chcesz zmienić role: </p>
    <input type="number" name="role_userid" id="role_userid"><br>
    <button type="button" onclick="loadchangeUserRoleForm()">Zmień role</button>`;
    document.getElementById("changeUserRole").innerHTML = html;
  }

  function loadchangeUserRoleForm() {
    user_id = $('#role_userid').val();
  $.get("http://localhost/api/requests/roles/getAllRoles.php", function(data) {
    $.get("http://localhost/api/requests/users/getUserById?id="+user_id, function(userdata) {
        let html = `<p>Zmiana roli użytkownika ` + userdata.login + `: </p>
        <select name="user_role" id="user_role">`;
            
            data.data.forEach(element => {
                if(element.role_name == userdata.role_name){
                    html+=`<option value="`+ element.role_name +`" selected=true>`+ element.role_name +`</option>`;
                } else {
                    html+=`<option value="`+ element.role_name +`">`+ element.role_name +`</option>`;
                }
            });
        html += `</select>
        <button type="button" onclick="changeUserRole(`+user_id+`)">Zmień role</button>`;
      
        document.getElementById("changeUserRole").innerHTML = html;     
    });     
  });
}

   function changeUserRole(user_id){
    var data={
        "user_id": user_id,
        "role": $('#user_role').val()
    }
    $.ajax({
        type: 'PUT',
        url: 'http://localhost/api/requests/users/changeRole.php',
        data: JSON.stringify(data),
    success: function(response) {
    //success message mybe...
        location.reload();
    }, error: function(response) {
        console.log(response);
    }
    }); 
   }

   function loadDeleteUser() {
    let html = `<p> Podaj id użytkownika do usunięcia: </p>
    <input type="number" name="del_userid" id="del_userid"><br>
    <button type="button" onclick="deleteUser()">Usuń</button>`;
    document.getElementById("deleteUser").innerHTML = html;
   }

   function deleteUser(){
    var data={
        "user_id": $('#del_userid').val()
    }
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost/api/requests/users/deleteUser.php',
        data: JSON.stringify(data),
    success: function(response) {
    //success message mybe...
        location.reload();
    }, error: function(response) {
        console.log(response);
    }
    }); 
   }