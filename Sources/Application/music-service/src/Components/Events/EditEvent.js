import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import './eventsStyle.css';
import { ProfilePanel } from '../Profile/ProfilePanel';
import { Toolbar } from '../Toolbar/Toolbar';
import { UserEvents } from './UserEvents';

export class EditEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          session: null,
          event: null
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

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    updateEvent(){
        let data = new FormData();
        for (const field in this.refs) {
          data.append(field, this.refs[field].value);
        }
        data.append('event_id', this.props.match.params.id);
        
        axios('http://localhost/api/requests/events/editEvent.php', {
            method: "post",
            data: data,
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then(() => {
            this.props.history.push('/events');
        });
    }

    deleteEvent() {
        let data = new FormData();
        data.append('event_id', this.props.match.params.id);
        axios('http://localhost/api/requests/events/deleteEvent.php', {
            method: "post",
            data: data,
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then(() => {
            this.props.history.push('/events');
        });
    }

    render() {
        const {session, event} = this.state;
        if(session !== null) {

            if(session.error_code === 0 && event !== null) {

                return (
                <div>
                  <Toolbar {...session} />
                  <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-1 col-md-1"></div>
                                <div className="user-profile col-lg-3 col-md-3 col-sm-12">
                                    <ProfilePanel {...session} />
                                    <UserEvents {...session} />
                                </div>  
                                <div className="content col-lg-7 col-md-7 col-sm-12">
                                    <div className="card event-card">
                                    <div className="card-header">
                                        Edycja wydarzenia
                                    </div>
                                    <div className="card-body">
                                     
                                     <form>
                                         <div className="form-group">
                                         <label>Nazwa wydarzenia:
                                             <input className="form-control" ref="event_name" defaultValue={event.event_name} required></input>
                                         </label>
                                         </div>
                                         <div className="form-row">
                                            <div className="form-group">
                                            <label>Data i godzina rozpoczecia: <br></br>
                                                <input type="datetime-local" className="form-control" ref="start_time" defaultValue={event.start_time.replace(" ","T")} required></input>
                                            </label>
                                            </div>
                                            <div className="form-group">
                                            <label>Data i godzina zakończenia: <br></br>
                                                <input type="datetime-local" className="form-control float-left" ref="end_time" defaultValue={event.end_time.replace(" ","T")} required></input>
                                            </label>
                                            </div>           
                                         </div>                                                                
                                         <div className="form-group">
                                         <label>Ulica:
                                             <input className="form-control" ref="street" defaultValue={event.street} required></input>
                                         </label>
                                         </div>
                                         <div className="form-row">
                                            <div className="form-group col-md-6">
                                            <label>Numer domu:<br></br>
                                                <input className="form-control" ref="house_num" defaultValue={event.house_num} required></input>
                                            </label>
                                            </div>
                                            <div className="form-group col-md-6">
                                            <label>Numer mieszkania:<br></br>
                                                <input className="form-control" ref="apart_num" defaultValue={event.apart_num} required></input>
                                            </label>
                                            </div>
                                         </div>   
                                         <div className="form-group">
                                         <label>Rozszerzony opis:
                                             <textarea className="form-control" rows="15" ref="text" defaultValue={event.text} required></textarea>
                                         </label>
                                         </div>                                                                      
                                     </form>
                                     <button className="JoinBtn btn btn-info" onClick={this.updateEvent.bind(this, session.user_id)}>Zaktualizuj wydarzenie</button>
                                     <button className="JoinBtn btn btn-danger" onClick={this.deleteEvent.bind(this)}>Usuń wydarzenie</button>

                                    </div>
                                    </div>  
                                                          
                                </div>      
                            </div>
                        </div>
                </div>
                );
            } else return null;

        } else return null;
    }
}