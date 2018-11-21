import React from 'react';
import axios from 'axios';
import { Toolbar } from '../Toolbar/Toolbar';
import { ProfileData } from './ProfileData';
import { UpdateUserData } from './UpdateUserData';
import { ChangePassword } from './ChangePAssword';
import { DeleteProfile } from './DeleteProfile';
import { Link } from 'react-router-dom';


export default class Profile extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          user: null,
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

        axios('http://localhost/api/requests/users/getUserById?id='+ this.props.match.params.user_id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
                crossdomain: true,  
        }) .then((resp) => {
            this.setState({user: resp.data});
        });

      }

    
      render() {
        const { session, isLoading, user } = this.state;
        // console.log(user);
        // session loading
       
        if (isLoading) {
          return <p>Loading ...</p>;
        } else if(session !== null){
          //session not set (user not logged)
          if(session.error_code === 0) {
              if(user) {
                if(session.user_id !== user.user_id) {
                    return null;
               }
               let adminPanel = null;
               if(session.role === "Admin") {
                    adminPanel = (
                        <Link to="/AdminPanel">Panel Administracyjny</Link>
                    );
               }
                return (
                    <div>                      
                        <Toolbar {...session} />
                      
                        <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card profile-card">
                                            <div className="card-header">
                                                Zarządzaj swoim kontem:
                                            </div>
                                            <div className="card-body">
                                                <ProfileData {...user}/>
                                                <UpdateUserData {...user} />
                                                <ChangePassword {...user} />
                                                <DeleteProfile {...user} prop={this.props} />
                                                {adminPanel}
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                        </div>
                    </div>
                );
              } else 
                return null;
            
          } else
          //session set (user logged)
          if(session.error_code === 1){
            return (
                <div>
                    {this.props.history.push('/')}
                </div>
                
                ); 
          }
        } else return <p>Loading ...</p>;
        return null;
      }

    
}