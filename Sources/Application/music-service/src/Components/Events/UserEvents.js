import React from 'react';
import axios from 'axios';

export class UserEvents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events : null,
            session: this.props,
        }
    }

    componentDidMount() {
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
        console.log(session);
        console.log(events);
        return null;
    }
}