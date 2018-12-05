import React from 'react';
import axios from 'axios';
import { VotesCount } from './VotesCount';

export class Voting extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            session: props.session,
            voting : props.voting,
            votingOptions: null,
            userVote: null
        }
    }

    componentDidMount() {
        axios('http://localhost/api/requests/votes/getVotingOptions.php?id='+this.props.voting.voting_id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then((resp) => {         
            this.setState({votingOptions: resp.data});
            axios('http://localhost/api/requests/votes/getUserVote.php?id='+this.props.voting.voting_id, {
                method: "get",
                withCredentials: true,
                credentials: 'include',
                origin: 'http://localhost',
                crossdomain: true,  
            }) .then((resp) => {
                this.setState({userVote: resp.data});
            });
        });

    }

    addVote(option) {
        let data = new FormData();
        data.append('voting_id', this.props.voting.voting_id);
        data.append('user_id', this.props.session.user_id);
        data.append('voptions_id', option);
        
        axios('http://localhost/api/requests/votes/addVote.php', {
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

    deleteVote(option) {
        let data = new FormData();
        data.append('voptions_id', option);
        data.append('user_id', this.props.session.user_id);
        
        axios('http://localhost/api/requests/votes/deleteVote.php', {
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
        const {session, voting, votingOptions, userVote} = this.state;

        if(votingOptions !== null && userVote !== null) {
            let votingOpts = null;
            if(votingOptions.data === 0) {
                votingOpts = (
                    <div className="card">
                        <div className="card-body">
                            <p>Brak opcji do głosowania. Zgłoś to administracji strony.</p>
                        </div>
                    </div>
                );
            } else {
                
                if(session.error_code === 0) {
                    votingOpts = votingOptions.data.map((option) => {                    
                        if (userVote.voption_id === option.voptions_id){
                            return (
                                <div className="card" key={option.voptions_id}>
                                    <div className="card-body">                    
                                        <button className="btn btn-outline-primary butonecz" onClick={this.deleteVote.bind(this,option.voptions_id)}>{option.voptions_name}  :  <VotesCount id={option.voptions_id}/></button>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div className="card" key={option.voptions_id}>
                                    <div className="card-body">                    
                                        <button className="btn btn-outline-success butonecz" onClick={this.addVote.bind(this,option.voptions_id)}>{option.voptions_name}  :  <VotesCount id={option.voptions_id}/></button>
                                    </div>
                                </div>
                            );
                        }
                    });
                } else {
                    votingOpts = votingOptions.data.map((option) => {                   
                        return (
                            <div className="card" key={option.voptions_id}>
                                <div className="card-body">
                                    <p>{option.voptions_name} : <VotesCount id={option.voptions_id} /></p>
                                    <p>Aby zagłosować musisz być zalogowany.</p>
                                </div>
                            </div>
                        );
                    });
                }
            }
            
            return (
                <div className="card">
                    <div className="card-header">
                        {voting.voting_name}
                    </div>
                    <div className="card-body">
                        {votingOpts}
                    </div>
                </div>
            );
        } else return null;
    }
}