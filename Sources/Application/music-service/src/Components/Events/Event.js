import React from 'react';
import axios from 'axios';
import './eventsStyle.css';
import { Toolbar } from '../Toolbar/Toolbar';
import { ProfilePanel } from '../Profile/ProfilePanel';
import { Votings } from '../Votings/Votings';
import { EventComments } from '../Comments/EventComments';

export class Event extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
          event: [ { data: [] } ],
          session: null
        };
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

        axios('http://localhost/api/requests/events/getEventById?id='+this.props.match.params.id, {
          method: "get",
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
          crossdomain: true,  
      }) .then((resp) => {
          this.setState({event: resp.data});
      });

      }

      render() {
          const {event, session} = this.state;
          
          if(session !== null){
            //session not set (user not logged)
            if(session.error_code === 1) {
              let event_id = event.event_id;
              if(event_id){
                return (
                  //not logged
                  <div>
                    <Toolbar {...session} />
                    <div className="container">
                      <div className="content">
                          <div className="row">
                              <div className="col-sm-12">
                                  <div className="card event-card">
                                  <div className="card-body">
                                    <h3>{event.event_name}</h3>
                                    <img className="img-fluid rounded image" src="http://localhost/api/uploads/Articles/1.jpg"></img>
                                    <p className="lead"><span className="index">Stworzone przez:</span> {event.login}</p>
                                    <p><span className="index">Opis wydarzenia:</span></p>                                   
                                    <p className="event-text">{event.text}</p>
                                    <p><span className="index">START:</span> {event.start_time}</p>
                                    <p><span className="index">KONIEC:</span> {event.end_time}</p>
                                    <p><span className="index">MIASTO:</span> {event.city_name}</p>                           
                                  </div>
                                  </div>
                                    <EventComments session={session} event_id={event.event_id} />
                                  </div>
                          </div>
                      </div>      
                  </div>
                </div>
                );
              } else return null;
            } else if(session.error_code === 0){
              let event_id = event.event_id;
              let address = event.street + " " + event.house_num + ((event.apart_num!=null) ? "/"+event.apart_num : " ");
              if(event_id) {
                return ( 
                  <div>
                    <Toolbar {...session} />
                    <div className="container-fluid">
                              <div className="row">
                                  <div className="col-lg-1 col-md-1"></div>
                                  <div className="user-profile col-lg-3 col-md-3 col-sm-12">
                                      <ProfilePanel {...session} />
                                      <Votings {...session}/>
                                  </div>  
                                  <div className="content col-lg-7 col-md-7 col-sm-12">
                                    <div className="card event-card">
                                    <div className="card-body">
                                        <h3>{event.event_name}</h3>
                                        <img className="img-fluid rounded image" src="http://localhost/api/uploads/Articles/1.jpg"></img>
                                        <p className="lead"><span className="index">Stworzone przez:</span> {event.login}</p>
                                        <p><span className="index">Opis wydarzenia:</span></p>                                   
                                        <p className="event-text">{event.text}</p>
                                        <p><span className="index">START:</span> {event.start_time}</p>
                                        <p><span className="index">KONIEC:</span> {event.end_time}</p>
                                        <p><span className="index">MIASTO:</span> {event.city_name}</p> 
                                        <p><span className="index">ADRES:</span> {address}</p>                          
                                    </div>
                                    </div>
                                        <EventComments session={session} event_id={event.event_id} />
                                                            
                                  </div>      
                              </div>
                          </div>
                  </div>
                    //logged
                  );
              } else return null;
              
            }
          } else return null;
      }
}