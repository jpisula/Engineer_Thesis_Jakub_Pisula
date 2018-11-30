import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

export class Login extends React.Component {
    constructor(props) {
        super(props);
    
    
        this.state = {
          session: props,
          user: {}
        };
    
        this.user = {
            user_fb_id: null,
            login: null,
            email: null,
            gender: null,
            age: null,
            country: null
        };
    
      }

    logIn(e) {
        e.preventDefault();
        
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }
        axios('http://localhost/api/requests/users/signIn.php', {
          method: "post",
          data: JSON.stringify(formData),
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
              crossdomain: true,
         
        }) .then(function(resp) {
          if(resp.data.done === 1){
            let data= {
              user_id : resp.data.user_id,
              state: "true"
            }
            axios('http://localhost/api/requests/users/setLoggedIn.php', {
              method: "post",
              data: JSON.stringify(data),
              withCredentials: true,
              credentials: 'include',
              origin: 'http://localhost',
              crossdomain: true,
              
            }) .then(function() {
                window.location.reload();
            });
          }
          else {
            document.getElementById("loginInfo").innerHTML = '<p className="loginInfo">Podano niepoprawny login i/lub hasło</p>'
          } 
        });
  
    }

    responseFacebook(response) {
    
        let date = new Date();
        let birthDate = new Date(response.birthday);
        date = date.getFullYear() - birthDate.getFullYear();
    
        let location = response.location;
        let loc = location.location;
        let country = loc.country;
    
        let usr = {
          user_fb_id: response.id,
          login: response.name,
          email: response.email,
          gender: (response.gender === "male") ? "M" : "K",
          age: date,
          country: (country === "Poland") ? "Polska" : country
        };
        this.user = usr;
      }
    
      logInFb() {
        let data = this.user;
    
        axios('http://localhost/api/requests/users/signInByFacebook.php', {
            method: 'POST',
            data: JSON.stringify(data),
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,
        }).then((resp) => {
            window.location.reload()   
        })
      }

    render(){
        return(
            <div className="col-lg-12" id="dropForm">
                        <div className="text-center">
                          <h4><b>Logowanie</b></h4></div>
                        <form id="ajax-login-form" method="post" role="form" onSubmit={this.logIn.bind(this)} autoComplete="off">
                          <div className="form-group">
                            <label>Login
                            <input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Login" ref="login" autoComplete="off"></input>                           
                            </label>               
                          </div>
          
                          <div className="form-group">
                            <label>Hasło
                            <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Hasło" ref="password" autoComplete="off"></input>
                            </label>
                          </div>
          
                          <div className="form-group">
                            <div id="loginInfo"></div>
                            <input type="submit" name="submit" id="submit" tabIndex="3" className="btn btn-success loginBtn" value="Zaloguj"></input>
                            <FacebookLogin
                            appId="705813459793714"
                            autoLoad={true}
                            fields="name,email,birthday,gender,location{location}"
                            scope="public_profile,user_birthday,user_gender, user_location"
                            callback={this.responseFacebook.bind(this)}
                            onClick={this.logInFb.bind(this)} 
                            cssClass="facebook-button"
                            icon={<i className="fa fa-facebook"></i>}   
                            textButton = "&nbsp;&nbsp;Sign In with Facebook"
                            />
                          </div>                   
                        </form>
                    </div>
        );
    }
}