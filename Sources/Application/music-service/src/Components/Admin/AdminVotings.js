import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { AdminVotingsVoting } from './AdminVotingsVoting';
import './styles.css';
import './contStyles.css';

export class AdminVotings extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            votings: null
          };
    }

    componentDidMount() {   
        axios('http://localhost/api/requests/votes/getAdminVotings.php', {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then((resp) => {
            this.setState({votings: resp.data});
        });   
    }

    disActive(id) {
        let data = new FormData();
        data.append('voting_id', id);
        data.append('active', 0);
        
        axios('http://localhost/api/requests/votes/setActiveVoting.php', {
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

    setActive(id) {
        let data = new FormData();
        data.append('voting_id', id);
        data.append('active', 1);
        
        axios('http://localhost/api/requests/votes/setActiveVoting.php', {
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

    render(){
        const {votings} = this.state;

        if(votings !== null) {
            let votingsList = votings.data.map((voting) => {
                let button = null;
                if (voting.active === '1') {
                    button = (
                        <button className="przycisk btn btn-success" onClick={this.disActive.bind(this, voting.voting_id)}>Dezaktywuj</button>
                    );
                } else {
                    button = (
                        <button className="przycisk btn btn-danger" onClick={this.setActive.bind(this, voting.voting_id)}>Aktywuj</button>
                    );
                }
                
                return (
                    <div className="card" key={voting.voting_id}>
                        <div className="card-body">
                            <p>Głosowanie {voting.active === '1' ? "aktywne" : "nieaktywne"}</p>
                            <h5>{voting.voting_name}</h5>
                            <p>START: {voting.start}</p>
                            <p>KONIEC: {voting.end}</p>
                            <p>Opcje:</p>
                            <AdminVotingsVoting id={voting.voting_id} />
                            {button}
                        </div>
                    </div>
                );
            });

            return (
                <div>
                    <div className="card">
                        <div className="card-header">
                            Głosowania:
                        </div>
                        <div className="card-body">
                            {votingsList}
                        </div>
                    </div>
                </div>
            )
        }
        return null;
    }

}