import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./styles.css";
import { AdminUsers } from './AdminUsers';

export class AdminPanel extends React.Component {
    constructor(props) {
        super(props);

    
        this.state = {
          session: null
        };
      }
    
      componentDidMount() {
        axios('http://localhost/api/config/getSession.php', {
          method: "get",
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
          crossdomain: true,  
        }) .then((resp) => {
            this.setState({session: resp.data});
        });
      }

    render () {
        const {session} = this.state;
        if(session !== null) {
            if(session.role === "Admin") {
                return (
                    <div>
                        <div className="sidenav">
                            <h1 className="h1adm">MyMusic</h1>
                            <h2 className="h2adm">Admin panel</h2>
                            <Link to="/adminPanel" className="linkk activee">Użytkownicy</Link>
                            <Link to="/adminPanel-articles" className="linkk">Artykuły</Link>
                            <Link to="/adminPanel-events" className="linkk">Wydarzenia</Link>
                            <Link to="/adminPanel-votings" className="linkk">Głosowania</Link>
                            <Link to="/" className="linkk">Przejdź do strony</Link>
                        </div>
                        <div className="main">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <AdminUsers />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            } else {
                return (
                    <div>
                        {this.props.history.push('/')}
                    </div>
                    
                    ); 
            }

        } return null;
        
    }
}