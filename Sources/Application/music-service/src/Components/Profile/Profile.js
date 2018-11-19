import React from 'react';
import axios from 'axios';
import { Toolbar } from '../Toolbar/Toolbar';
import { ProfilePanel } from '../Profile/ProfilePanel';
import { Comment } from '../Comments/Comment';


export default class Profile extends React.Component{

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

      }
    
      render() {
        const { session, isLoading, article } = this.state;
        console.log(session);
        // session loading
        if (isLoading) {
          return <p>Loading ...</p>;
        } else if(session !== null){
          //session not set (user not logged)
          if(session.error_code === 0) {
            return (
                <div>
                    <Toolbar {...session} />
                    <ProfilePanel {...session}/>
                </div>
            );
          } else
          //session set (user logged)
          if(session.error_code === 1){
            return (
                <div>
                    <Toolbar {...session} />
                    <p>Nie masz uprawnień.</p>
                </div>          
            );
          }
        } else return <p>Loading ...</p>;
      }
    
}