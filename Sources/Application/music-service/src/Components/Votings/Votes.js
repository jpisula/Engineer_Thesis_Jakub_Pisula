import React from 'react';
import axios from 'axios';
import { ProfilePanel } from '../Profile/ProfilePanel';
import { Toolbar } from '../Toolbar/Toolbar';
import { VotingList } from './VotingList';

export class Votes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            votings : null,
            session: null,
        }
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

    render() {
        const {session} = this.state;
        if (session !== null) {
            if(session.error_code === 0) {
                return (
                    <div>
                    <Toolbar {...session} />
                    <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-1 col-md-1"></div>
                                <div className="user-profile col-lg-3 col-md-3 col-sm-12">
                                    <ProfilePanel {...session} />
                                </div>  
                                <div className="content col-lg-7 col-md-7 col-sm-12">
                                    <div className="card events-card">
                                        <div className="card-header">
                                            Aktualne głosowania
                                        </div>
                                        <div className="card-body">
                                            <VotingList {...session} />
                                        </div>
                                    </div>                                                           
                                </div>      
                            </div>
                    </div>
                </div>
                );
            } else {
                return (
                    <div>                      
                        <Toolbar {...session} />
                      
                        <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card events-card">
                                            <div className="card-header">
                                                Aktualne głosowania
                                            </div>
                                            <div className="card-body">
                                                <VotingList {...session} />
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                        </div>
                    </div>
                );
            }
        } else return null;
    }
}