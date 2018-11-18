import React from 'react';
import axios from 'axios';
import "./profilepanel.css";
import { Link } from 'react-router-dom';

export class ProfilePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session: props,
            user: {}
          };
    }

    componentDidMount() {
    
        axios('http://localhost/api/requests/users/getUserById?id='+this.props.user_id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
                crossdomain: true,  
        }) .then((resp) => {
            this.setState({user: resp.data});
        });
    
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
                    <button type="button" className="btn btn-outline-secondary">Szczegóły profilu</button>
                    <button type="button" className="btn btn-outline-secondary">Twoje wydarzenia</button>
                    
                </div>
            </div>
        );
    }
}