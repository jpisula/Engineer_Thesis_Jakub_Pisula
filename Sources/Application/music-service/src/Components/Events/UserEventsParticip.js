import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export class UserEventsParticip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events : null,
            session: this.props,
        }
    }

    componentDidMount() {
        axios('http://localhost/api/requests/events/getUserEventsParticip.php?id='+this.props.user_id, {
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
        if(events!==null) {
            if(events.data[0].event_id !== 0){
            let eventList = events.data.map((event) => {
                let event_path = '/event/' + event.event_id;
                return (
                    <div className="card" key={event.event_id}>
                        <div className="card-body">
                        <Link to={event_path}> <h5>{event.event_name}</h5> </Link>
                        <p>Start: <span className="float-right">{event.start_time}</span></p>                      
                        </div>
                    </div>
                    
                );
            });

            return (
                <div className="card">
                    <div className="card-header">
                        Twoje wydarzenia
                    </div>
                    <div className="card-body">
                        {eventList}
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
                        <p>Nie jesteś zapisany do żadnego wydarzenia!</p>
                    </div>
                </div>
            );
        } else return null;
    }
}