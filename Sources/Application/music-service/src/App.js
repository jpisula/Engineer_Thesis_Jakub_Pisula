import React, { Component } from 'react';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Logged } from './Components/Body/logged';
import { NotLogged } from './Components/Body/notlogged';

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

    fetch('http://localhost/api/config/getSession.php')
      .then(response => response.json())
      .then(session => this.setState({ session, isLoading: false }));
  }

  render() {
    const { session, isLoading } = this.state;

    // session loading
    if (isLoading) {
      return <p>Loading ...</p>;
    } else if(session !== null){
      //session not set (user not logged)
      if(session.error_code === 1) {
        return (
          <NotLogged {...session}/>
        );
      } else
      //session set (user logged)
      if(session.error_code === 0){
        return (
          <Logged session={session}/>
        );
      }
    } else return <p>Loading ...</p>;
  }
}

export default App;

