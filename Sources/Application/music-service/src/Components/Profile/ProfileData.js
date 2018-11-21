import React from 'react';
import axios from 'axios';
import "./profilepanel.css";

export class ProfileData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props,
          };
    }

    render() {
        const { user } = this.state;
        let reg_date = new Date(user.registration_date);
        reg_date = reg_date.getDate() + '/' + reg_date.getMonth() + '/' + reg_date.getFullYear();
        return (
            <div className="card profilePanel-card">
                <div className="card-header">
                    Twój profil:
                </div>
                <div className="card-body">
                    <label> Login:
                        <p>{user.login}</p>
                    </label>
                    <label> E-mail:
                        <p>{user.email}</p>
                    </label>
                    <label> Wiek:
                        <p>{user.age}</p>
                    </label>
                    <label> Płeć:
                        <p>{(user.gender === "M") ? "Mężczyzna" : "Kobieta"}</p>
                    </label>
                    <label> Państwo:
                        <p>{user.country_name}</p>
                    </label>
                    <label> Zarejestrowano:
                        <p>{reg_date}</p>
                    </label>
                    
                </div>
            </div>
        );
    }
}