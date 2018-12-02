import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export class AdminEvents extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            events: null
          };
    }


    componentDidMount() {   
        axios('http://localhost/api/requests/events/getAllEvents.php', {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then((resp) => {
            this.setState({events: resp.data});
        });   
    }

    deleteArticle(eve_id) {
        let data = new FormData();
        data.append('event_id', eve_id);
        axios('http://localhost/api/requests/events/deleteEvent.php', {
            method: "post",
            data: data,
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then(() => {
            document.location.reload();
        });
    }

    render() {
        const {events} = this.state;
        if(events !== null) {
            let eveList = events.data.map((event) => {
                let regdate = new Date(event.create_date);
                let date = regdate.getFullYear() + "-" + ((regdate.getMonth() < 10) ? "0"+regdate.getMonth() : regdate.getMonth()) + "-" + ((regdate.getDay() < 10) ? "0"+regdate.getDay() : regdate.getDay());
                regdate = new Date(event.start_time);
                let sdate = regdate.getFullYear() + "-" + ((regdate.getMonth() < 10) ? "0"+regdate.getMonth() : regdate.getMonth()) + "-" + ((regdate.getDay() < 10) ? "0"+regdate.getDay() : regdate.getDay());
                let edit_path = "/event-edit/"+event.event_id;
                let eve = "/event/" + event.event_id;
                return (
                    <tr key={event.event_id}>
                    <td>{event.event_id}</td>
                    <td><Link to={eve}>{event.event_name}</Link></td>
                    <td>{sdate}</td>
                    <td>{event.login}</td>
                    <td>{date}</td>
                    <td>{event.active}</td>
                    <td><Link to={edit_path} className="fas fa-edit"></Link>
                        <button type="button" className="close" onClick={this.deleteArticle.bind(this, event.event_id)} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </td>
                </tr>
                );
            });
            return (
                <div>
                    <div className="card cardd">
                        <div className="card-header">
                            Lista wydarzeń
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>nazwa</th>
                                        <th>start</th>
                                        <th>autor</th>
                                        <th>data dodania</th>                                       
                                        <th>aktywny</th>           
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eveList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );

        } else return null;
    }
}