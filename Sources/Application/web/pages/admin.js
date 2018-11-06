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
        document.getElementById("changeUserData").innerHTML = html;
        
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