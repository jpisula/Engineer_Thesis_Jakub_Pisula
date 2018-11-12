import React, { Component } from 'react';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Body from './Components/Body/Body';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <p>I am content</p>
        </div>
      </div>
    );
  }
}

export default App;
