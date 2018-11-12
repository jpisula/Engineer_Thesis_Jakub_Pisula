import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link active" href="#">Wiadomości</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Głosowania</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Artysta miesiąca</a>
            <a className="dropdown-item" href="#">Utwór dnia</a>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Wydarzenia</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Spotify</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Logowanie</a>
        </li>
      </ul>
    );
  }
}

export default Navbar;