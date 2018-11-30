import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export class UserEvents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events : null,
            session: this.props,
        }
    }

    componentDidMount() {
        axios('http://localhost/api/requests/events/getUserEvents.php?id='+this.props.user_id, {
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
        const {events} = this.state;
        if(events!=null) {
            let eventList = events.data.map((event) => {
                let event_path = '/event/' + event.event_id;
                let edit_path = '/event-edit/' + event.event_id;
                return (
                    <div className="card" key={event.event_id}>
                        <div className="card-body">
                        <Link to={event_path}> <h5>{event.event_name}</h5> </Link>
                        <p>Start: <span className="float-right">{event.start_time}</span></p>
                        <p>Utworzono: <span className="float-right">{event.create_date}</span></p>
                        <Link to={edit_path} className="fas fa-edit"></Link>
                        </div>
                    </div>
                    
                );
            });

            return (
                <div className="card">
                    <div className="card-header">
                        Dodane przez Ciebie wydarzenia
                    </div>
                    <div className="card-body">
                        {eventList}
                        <p>Chcesz utworzyć kolejne wydarzenia?</p>
                        <Link to='/event-creation' className="btn btn-success">Dodaj</Link>
                    </div>
                </div>
            );
        } else
        return (
            <div className="card">
                <div className="card-header">
                    Twoje wydarzenia:
                </div>
                <div className="card-body">
                    <p>Nie dodałeś jeszcze swojego wydarzenia!</p>
                    <Link to='/event-creation' className="btn btn-success">Dodaj</Link>
                </div>
            </div>
        );
    }
}