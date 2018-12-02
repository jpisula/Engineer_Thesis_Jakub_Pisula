import React from 'react';
import './toolbarStyle.css';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { Login } from '../Login/Login';
import { Register } from '../Registration/Register';


export class Toolbar extends React.Component {

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


  logout(){
    const {session} = this.state;
    axios('http://localhost/api/config/session_end.php', {
        method: "post",
        withCredentials: true,
        credentials: 'include',
        origin: 'http://localhost',
		    crossdomain: true,
       
    }) .then(function() {
      let data= {
        user_id : session.user_id,
        state: "false"
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
    });
  }

    render(){
        const {session} = this.state;
        if(session.error_code === 1) {
            return (
                <div>
                 <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                  <div className="container">     
                    <Link className="navbar-brand" to="/">MyMusic</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                      <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                          <Link to="/articles" className="nav-link">Artykuły <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Głosowania</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/events" className="nav-link">Wydarzenia</Link>
                        </li>
                      </ul>
                      <ul className="navbar-nav">
                          <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Zarejestruj sie!
                          </a>
                          <ul className="dropdown-menu dropdown-lr dropdown-menu-right" role="menu">
                            <Register />
                          </ul>
                        </li>
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Zaloguj
                          </a>
                          <ul className="dropdown-menu dropdown-lr dropdown-menu-right" role="menu">
                            <Login prop={this.props} />
                          </ul>
                        </li>
                      </ul>
                    </div>
                    </div>
                  </nav>
                </div>
              );
        } else {
            return (
                <div>
                 <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                  <div className="container">     
                    <Link className="navbar-brand" to="/">MyMusic</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                      <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                          <Link to="/articles" className="nav-link">Artykuły <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Głosowania</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/events" className="nav-link">Wydarzenia</Link>
                        </li>
                      </ul>
                      <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <button type="button" onClick={this.logout.bind(this)} className="btn btn-secondary">Wyloguj</button>
                        </li>
                      </ul>
                    </div>
                    </div>
                  </nav>
                </div>
            );
        }
    
    } 

}