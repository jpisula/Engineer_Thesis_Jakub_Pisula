import React from 'react';
import axios from 'axios';
import './contStyles.css';

export class AdminUsers extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            users: null,
            roles: null,
            user_id: null
          };
    }


    componentDidMount() {
    
        axios('http://localhost/api/requests/users/getAllUsers.php', {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then((resp) => {
            this.setState({users: resp.data});
        });

        axios('http://localhost/api/requests/roles/getAllRoles.php', {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then((resp) => {
            this.setState({roles: resp.data});
        });
    
    }

    changeRole(){
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }

        axios('http://localhost/api/requests/users/changeRole.php', {
            method: "post",
            data: JSON.stringify(formData),
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
                crossdomain: true,
            
            }) .then(function() {
                window.location.reload();
            });
    }

    deleteUser(user_id) {
        let data = {
            "user_id" : user_id
        };
        axios('http://localhost/api/requests/users/deleteUser.php', {
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

    render() {
        const{users, roles} = this.state;
        if(users !== null && roles !== null) {
            let usersList = users.data.map((user) => {
                if(user.role_name === "Admin") return null;
                let regdate = new Date(user.registration_date);
                let date = regdate.getFullYear() + "-" + ((regdate.getMonth() < 10) ? "0"+regdate.getMonth() : regdate.getMonth()) + "-" + ((regdate.getDay() < 10) ? "0"+regdate.getDay() : regdate.getDay())
                return (
                    <tr key={user.user_id}>
                        <td>{user.user_id}</td>
                        <td>{user.login}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.country_name}</td>
                        <td>{date}</td>
                        <td>{user.role_name}</td>
                        <td>{user.logged_in}</td>
                        <td><button type="button" className="close" onClick={this.deleteUser.bind(this, user.user_id)} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </td>
                    </tr>
                );
            });

            let roleOpt = roles.data.map((role) => {
                if(role.role_name === "Admin") return null;
                return (
                  <option value={role.role_name} key={role.role_id}>{role.role_name}</option>  
                );
            });

            return (
                <div>
                    <div className="card cardd">
                        <div className="card-header">
                            Zmień role użytkownika
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>id użytkownika:
                                        <input className="margin" type="number" ref="user_id"></input>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Rola:
                                        <select className="margin" ref="role">
                                            {roleOpt}
                                        </select>
                                    </label>
                                </div>
                                <button className="przycisk btn btn-outline-secondary" onClick={this.changeRole.bind(this)}>Aktualizuj</button>
                            </form>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            Lista użytkowników
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>login</th>
                                        <th>email</th>
                                        <th>wiek</th>
                                        <th>płeć</th>
                                        <th>państwo</th>
                                        <th>data rejestracji</th>
                                        <th>rola</th>
                                        <th>log</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        } else return null;
    }
}