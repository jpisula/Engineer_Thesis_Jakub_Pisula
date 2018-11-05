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


  
  function signInFB(data) {
    console.log(data);    
    $.ajax({
        type: "POST",
        url: 'http://localhost/api/requests/users/signInByFacebook.php',
        data: JSON.stringify(data),
    success: function(response) {
    //success message mybe...
        console.log(response);
        document.getElementById("fblogin").innerHTML = "<h4> Hello! "+ data.login +"</h4>";
    }, error: function(response) {
        console.log("err");
        console.log(response);
    }
    }); 
  }


  // FACEBOOK API
  window.fbAsyncInit = function() {

        FB.init({
          appId      : '705813459793714',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.8'
        });
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

       function statusChangeCallback(response){
         if(response.status === 'connected'){
           console.log('Logged in.');
           testAPI();
         } else {
           console.log('Not authenticated');
         }
       }

      function checkLoginState() {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      }

      function testAPI(){
        FB.api('/me?fields=name,email,birthday,gender,location{location{country}}', function(response){
          if(response && !response.error){
            let birthDate;
            let country;
            let gender;

            if(response.birthday) {
              birthDate = new Date(response.birthday);
              birthDate = birthDate.getFullYear();
            } else {
              birthDate = 2000;
            }

            if(!response.location.location.country) {
              country = 'Poland';
            }
            else{
              country = response.location.location.country;
            }

            if(!response.gender) {
              gender = 'U'; //Unspecified
            }
            else if(response.gender == "male"){
              gender = 'M';
            } else {
              gender = "K";
            }
            
            let data = {
              "login" : response.name,
              "user_fb_id" : response.id,
              "email" : response.email,
              "age" : (new Date).getFullYear() - birthDate,
              "country" : country,
              "gender" : gender
            };
            signInFB(data);
          }               
        });

      
        
        //checkLoginState();
      }

      ///////////////////////////////////////


