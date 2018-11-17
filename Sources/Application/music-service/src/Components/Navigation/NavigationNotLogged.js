import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

export class NavigationNotLogged extends React.Component {

    render(){
    return (
      <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">     
          <a className="navbar-brand"><Link to="/">MyMusic</Link></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#artykuly"><Link to="/#artykuly">Artykuły <span className="sr-only">(current)</span></Link></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#glosowania">Głosowania</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#wydarzenia">Wydarzenia</a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Zaloguj
                </a>
                <ul class="dropdown-menu dropdown-lr dropdown-menu-right" role="menu">
            <div class="col-lg-12">
              <div class="text-center">
                <h4><b>Logowanie</b></h4></div>
              <form id="ajax-login-form" method="post" role="form" autocomplete="off">
                <div class="form-group">
                  <label for="username">Login</label>
                  <input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Login" value="" autocomplete="off"></input>
                </div>

                <div class="form-group">
                  <label for="password">Hasło</label>
                  <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Hasło" autocomplete="off"></input>
                </div>

                <div class="form-group">
                  <button type="button" class="btn btn-success">Zaloguj</button>
                </div>

               
                
              </form>
            </div>
          </ul>
              </li>
            </ul>
          </div>
          </div>
        </nav>
      </div>
    );
    }
}