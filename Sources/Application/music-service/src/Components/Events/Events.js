import React from 'react';
import axios from 'axios';
import './eventsStyle.css';
import { Toolbar } from '../Toolbar/Toolbar';
import { Link } from 'react-router-dom';
import { ProfilePanel } from '../Profile/ProfilePanel';
import { Votings } from '../Votings/Votings';
import { UserEvents } from './UserEvents';
import { UserEventsParticip } from './UserEventsParticip';

export class Events extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events : null,
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

        axios('http://localhost/api/requests/events/getActiveEvents.php', {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
                crossdomain: true,  
        }) .then((resp) => {
            this.setState({events: resp.data});
        });

      }

    render() {
        const {session, events} = this.state;
        if(session && events) {
            let eventsList = events.data.map((event) => {
                let date = new Date(event.start_time);
                let month = (date.getMonth() + 1) <13 ? (date.getMonth() + 1) : 1;
                date = date.getDate() + '/' + month + '/' + date.getFullYear();
                let event_path = '/event/'+event.event_id;
                return (
                    <div className="card" key={event.event_id}>
                        <div className="card-body">
                            <h3 className="card-title">{event.event_name}</h3>
                            <p>Dodane przez: {event.login}</p>
                            <p>Data wydarzenia: {date}</p>                
                            <p className="card-text">Opis:</p>
                            <p className="card-text">{event.text_short}</p>
                            <Link to={event_path} className="btn btn-outline-info float-right">Zobacz wydarzenie</Link>
                        </div>                        
                    </div>
                );
            });
            if(session.error_code === 1){
                return (
                    <div>                      
                        <Toolbar {...session} />
                      
                        <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card events-card">
                                            <div className="card-header">
                                                Wszystkie wydarzenia
                                            </div>
                                            <div className="card-body">
                                                {eventsList}
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
                        <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-1 col-md-1"></div>
                                    <div className="user-profile col-lg-3 col-md-3 col-sm-12">
                                        <ProfilePanel {...session} />
                                        <UserEventsParticip {...session} />
                                        <UserEvents {...session} />
                                        <Votings {...session} />
                                    </div>  
                                    <div className="content col-lg-7 col-md-7 col-sm-12">
                                        <div className="card events-card">
                                            <div className="card-header">
                                                Wszystkie wydarzenia
                                            </div>
                                            <div className="card-body">
                                                {eventsList}
                                            </div>
                                        </div>                                                           
                                    </div>      
                                </div>
                        </div>
                    </div>

                );
            }
            
        } else {
            return null;
        }        

    }
}