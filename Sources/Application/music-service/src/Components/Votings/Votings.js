import React from 'react';
import axios from 'axios';
import './voting.css';
import { Link } from 'react-router-dom';

export class Votings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            session: props,
            artist_month: null,
            songOTD: null,
          };
    }

componentDidMount() {
    let date = new Date();
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    month = month < 10 ? '0'+month : month;
    let day = date.getUTCDate() <10 ? '0' + date.getUTCDate() : date.getUTCDate();
    let month_date = year+'-'+month+'-01'+'T00:00:00';
    if(month==1) month = 12; else month++;
    if(month == 13) month = 1;
    month = month < 10 ? '0'+month : month;
    day = day - 1;
    day = day < 10 ? '0'+day : day;
    let day_date = year+'-'+month+'-'+day+'T00:00:00';

    axios('http://localhost/api/requests/votes/getVoteWinner.php?start_date='+month_date+'&vtype_id='+1, {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: 'localhost',
      crossdomain: true,  
    }) .then((resp) => {
        this.setState({artist_month: resp.data});
    });
    axios('http://localhost/api/requests/votes/getVoteWinner.php?start_date='+day_date+'&vtype_id='+2, {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: 'localhost',
      crossdomain: true,  
    }) .then((resp) => {
        this.setState({songOTD: resp.data});
    });
}

    render() {
        const {session, songOTD, artist_month} = this.state;
        let link = null;
        if(session.error_code === 0) {
            link = (<Link to="/voting" className="btn btn-outline-secondary">Głosuj!</Link>);
        }
        if(artist_month !== null && songOTD !== null) {
            return (
                <div className="card voting-card">
                    <div className="card-header">
                        Wyniki głosowań
                    </div>
                    <div className="card-body">
                        <label><span>Artysta miesiąca:</span>
                        <p>{artist_month.name}</p>
                        </label>
                        <label><span>Utwór dnia:</span>
                        <p>{songOTD.name}</p>
                        </label>                   
                        {link}
                    </div>
                </div>
            );
        } else return null;
    }
}