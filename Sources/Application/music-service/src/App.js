import React, { Component } from 'react';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Body } from './Components/Body/body';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      session: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios('http://localhost/api/config/getSession.php', {
        method: "get",
        withCredentials: true,
        credentials: 'include',
        origin: 'http://localhost',
		    crossdomain: true,  
    }) .then((resp) => {
        this.setState({session: resp.data, isLoading: false});
    });

    // fetch('http://localhost/api/config/getSession.php')
    //   .then(response => response.json())
    //   .then(session => this.setState({ session, isLoading: false }));
  }

  render() {
    const { session, isLoading } = this.state;
    // session loading
    if (isLoading) {
      return <p>Loading ...</p>;
    } else {
      if(session) {
        return <Body {...session}/>;
      } else {
        return <p>Loading ...</p>;
      }
    }
  }
}

export default App;

