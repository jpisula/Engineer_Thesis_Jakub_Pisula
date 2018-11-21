import React from 'react';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'

export class DeleteProfile extends React.Component {
    constructor(props) {
        super(props);

        this.user_id = props.user_id;
        

        this.state = {
            user: props.user_id,
            countries: null
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

    deleteProfile(e){
        e.preventDefault();
        let history= this.props.prop.history;
        
        let data = {
            user_id: this.user_id,
        };

        axios('http://localhost/api/requests/users/deleteUser.php', {
          method: "post",
          data: JSON.stringify(data),
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
          crossdomain: true,        
        }) .then(function() {
            
            axios('http://localhost/api/config/session_end.php', {
                method: "post",
                withCredentials: true,
                credentials: 'include',
                origin: 'http://localhost',
                crossdomain: true,        
            }) .then(function() {
                history.push('/');
            });
        });
    }

    render() {      
        return (
            <div className="card profilePanel-card">
                <div className="card-header">
                    Usuń konto:
                </div>
                <div className="card-body">
                    <button type="button" className="btn btn-danger updateDataBtn" onClick={this.deleteProfile.bind(this)}>Usuń profil</button>
                </div>
            </div>
        );
        
    }
}