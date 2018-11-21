import React from 'react';
import axios from 'axios';

export class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.user_id = props.user_id;
        

        this.state = {
            user: props,
            isUserFb: null
        };
    }   

    componentDidMount() {    
        axios('http://localhost/api/requests/users/isUserFb?id='+this.user_id, {
          method: "get",
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
          crossdomain: true,  
        }) .then((resp) => {
            this.setState({isUserFb: resp.data});
        });

      }

    changePassword(e){
        e.preventDefault();
        
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }
        console.log(formData);
        if(formData.newPassword !== formData.valNewPassword) {
            document.getElementById("pass-err").innerHTML = '<p>Nowe hasła musza być takie same!</p>';
            return null;
        }
        
        let data = {
            user_id: this.user_id,
            valPassword: formData.password,
            password: formData.newPassword,
        };

        axios('http://localhost/api/requests/users/changePassword.php', {
          method: "post",
          data: JSON.stringify(data),
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
          crossdomain: true,        
        }) .then(function(resp) {
            window.location.reload();
        });
    }

    render() {
        const {user, isUserFb} = this.state;

        if(isUserFb === 1 && isUserFb != null){
            return null;
        } else {
            return (
                <div className="card profilePanel-card">
                    <div className="card-header">
                        Zmień hasło:
                    </div>
                    <div className="card-body">
                        <form id="ajax-changePassword-form" method="post" role="form" onSubmit={this.changePassword.bind(this)} autoComplete="off">
                        <div className="form-group">
                            <label>Podaj stare hasło
                            <input type="password" name="password" required={true} id="password" tabIndex="1" className="form-control" placeholder="Hasło" ref="password" autoComplete="off"></input>
                            </label>
                        </div>  
                        <div className="form-group">
                            <label>Podaj nowe hasło
                            <input type="password" name="newPassword" required={true} id="newPassword" tabIndex="2" className="form-control" placeholder="Stare hasło" ref="newPassword" autoComplete="off"></input>
                            </label>
                        </div>  
                        <div className="form-group">
                        <label>Powtórz nowe hasło
                        <input type="password" name="valNewPassword" required={true} id="valNewPassword" tabIndex="3" className="form-control" placeholder="Stare hasło" ref="valNewPassword" autoComplete="off"></input>
                        </label>
                        </div>     
                        <div id="pass-err"></div>       
                        <input type="submit" name="submit" id="changePass-submit" tabIndex="4" className="btn btn-info updateDataBtn" value="Zmień hasło"></input>                      
                    </form>
                    </div>
                </div>
            );
        }
    }
}