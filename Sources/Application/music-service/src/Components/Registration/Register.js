import React from 'react';
import axios from 'axios';

export class Register extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          countries: null,
        };
      }
    
      componentDidMount() {
        this.setState({ isLoading: true });
    
        axios('http://localhost/api/requests/countries/getCountries.php', {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
                crossdomain: true,  
        }) .then((resp) => {
            this.setState({countries: resp.data});
        });
    
      }

    register(e){
        e.preventDefault();
        
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }
        if(formData.password !== formData.passwordVal) {
            document.getElementById("reg-error").innerHTML = '<p className="loginInfo">Hasła muszą być takie same!</p>'
        } else {
            let data = {
                login: formData.login,
                password: formData.password,
                email: formData.email,
                age: formData.age,
                gender: formData.gender,
                country: formData.country
            }
            
            axios('http://localhost/api/requests/users/CreateNewUser.php', {
            method: "post",
            data: JSON.stringify(data),
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
                crossdomain: true,
            
            }) .then(function(resp) {
            if(resp.data.done === 1){
                window.location.reload();
            }
            else {
                document.getElementById("reg-error2").innerHTML = '<p className="loginInfo">UPS! Coś poszło nie tak! Spróbuj podać inny login/email</p>'
            } 
            });
  
    
        }
    }

    render(){
        const { countries } = this.state;
        if(countries) {
            let countrySelect = countries.data.map(function(country){
                return(<option value={country.country_name} key={country.country_id}> {country.country_name} </option>)
            });

            return (
                <div className="col-lg-12" id="dropForm">
                <div className="text-center">
                <h4><b>Rejestracja</b></h4></div>
                <form id="ajax-register-form" method="post" role="form" onSubmit={this.register.bind(this)} autoComplete="off">
                <div className="form-group">
                <label>Login
                <input type="text" name="username" id="reg-username" required={true} tabIndex="1" className="form-control" placeholder="Login" ref="login" autoComplete="off"></input>                           
                </label>               
                </div>   
                <div className="form-group">
                <label>E-mail
                <input type="email" name="email" id="email" required={true} tabIndex="2" className="form-control" placeholder="E-mail" ref="email" autoComplete="off"></input>
                </label>
                </div>
                <div className="form-group">
                <label>Hasło
                <input type="password" name="password" required={true} id="reg-password" tabIndex="3" className="form-control" placeholder="Hasło" ref="password" autoComplete="off"></input>
                </label>
                </div>
                <div className="form-group">
                <label>Powtórz hasło
                <input type="password" name="password" required={true} id="reg-passwordVal" tabIndex="4" className="form-control" placeholder="Powtórz hasło" ref="passwordVal" autoComplete="off"></input>
                </label>
                <div id="reg-error"></div>  
                </div>  
                <div className="form-group">
                <label>Wiek
                <input type="number" name="age" required={true} id="age" tabIndex="6" className="form-control" placeholder="Wiek" ref="age" autoComplete="off"></input>
                </label>
                </div>  
                <div className="form-group">
                <label>Płeć<br></br>
                <select name="gender" ref="gender" tabIndex="7" id="gender">
                                <option value="M">Mężczyzna</option>
                                <option value="K">Kobieta</option>
                            </select>
                </label>
                </div>   
                <div className="form-group">
                <label>Państwo<br></br>
                <select name="country" ref="country" tabIndex="8" id="country">
                                {countrySelect}
                            </select>
                </label>
                </div>    
                <div id="reg-error2"></div>            
                <input type="submit" name="submit" id="reg-submit" tabIndex="9" className="btn btn-info registerBtn" value="Zarejestruj"></input>
            
            
                
            </form>
            </div>
            );
        } else {
            return null;
        }
    }
}