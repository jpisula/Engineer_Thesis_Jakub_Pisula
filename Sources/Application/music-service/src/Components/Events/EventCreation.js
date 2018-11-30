import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import './eventsStyle.css';
import { ProfilePanel } from '../Profile/ProfilePanel';
import { Toolbar } from '../Toolbar/Toolbar';
import { UserEvents } from './UserEvents';

export class EventCreation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          session: null,
          selectedFile: null
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


    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    addEvent(user_id){
        let data = new FormData();
        for (const field in this.refs) {
          data.append(field, this.refs[field].value);
        }
        data.append('user_image', this.state.selectedFile);
        data.append('user_id', user_id);
        
        axios('http://localhost/api/requests/events/addEvent.php', {
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
        const {session} = this.state;
        if(session !== null) {

            if(session.error_code === 0) {
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
                                        Tworzenie wydarzenia
                                    </div>
                                    <div className="card-body">
                                     
                                     <form>
                                         <div className="form-group">
                                         <label>Nazwa wydarzenia:
                                             <input className="form-control" ref="event_name" required></input>
                                         </label>
                                         </div>
                                         <div className="form-row">
                                            <div className="form-group">
                                            <label>Data i godzina rozpoczecia: <br></br>
                                                <input type="datetime-local" className="form-control" ref="start_time" required></input>
                                            </label>
                                            </div>
                                            <div className="form-group">
                                            <label>Data i godzina zakończenia: <br></br>
                                                <input type="datetime-local" className="form-control float-left" ref="end_time" required></input>
                                            </label>
                                            </div>           
                                         </div>                                                                
                                         <div className="form-group">
                                         <label>Miasto:<br></br>
                                            <input className="form-control" ref="city_name" required></input>
                                         </label>
                                         </div>
                                         <div className="form-group">
                                         <label>Ulica:
                                             <input className="form-control" ref="street" required></input>
                                         </label>
                                         </div>
                                         <div className="form-row">
                                            <div className="form-group col-md-6">
                                            <label>Numer domu:<br></br>
                                                <input className="form-control" ref="house_num" required></input>
                                            </label>
                                            </div>
                                            <div className="form-group col-md-6">
                                            <label>Numer mieszkania:<br></br>
                                                <input className="form-control" ref="apart_num" required></input>
                                            </label>
                                            </div>
                                         </div> 
                                         <div className="form-group">
                                         <label>Krótki opis:
                                             <textarea className="form-control" rows="5" ref="text_short" required></textarea>
                                         </label>
                                         </div>  
                                         <div className="form-group">
                                         <label>Rozszerzony opis:
                                             <textarea className="form-control" rows="15" ref="text" required></textarea>
                                         </label>
                                         </div>
                                         <div className="form-group">
                                         <label>Wstaw zdjęcie wydarzenia:
                                             <input type="file" onChange={this.fileSelectedHandler} className="form-control-file" required></input>
                                         </label>
                                         </div>                                                                          
                                     </form>
                                     <button className="JoinBtn btn btn-info" onClick={this.addEvent.bind(this, session.user_id)}>Stwórz wydarzenie</button>

                                    </div>
                                    </div>  
                                                          
                                </div>      
                            </div>
                        </div>
                </div>
                );
            } else this.props.history.push('/articles');;

        } else return null;
    }
}