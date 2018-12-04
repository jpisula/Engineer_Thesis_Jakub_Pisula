import React from 'react';
import axios from 'axios';
import { VotesCount } from './VotesCount';

export class Voting extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);


        this.state = {
            session: props.session,
            voting : props.voting,
            votingOptions: null
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
        });

    }

    addVote(option) {
        console.log(option);
    }

    render() {
        const {session, voting, votingOptions} = this.state;

        if(votingOptions !== null) {
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
                    console.log(votingOptions);
                    votingOpts = votingOptions.data.map((option) => {
                        return (
                            <div className="card" key={option.voptions_id}>
                                <div className="card-body">                    
                                    <button className="btn btn-outline-success butonecz" onClick={this.addVote.bind(this,option.voptions_id)}>{option.voptions_name}  :  <VotesCount {...option.voptions_id}/></button>
                                </div>
                            </div>
                        );
                    });
                } else {
                    votingOpts = votingOptions.data.map((option) => {
                        return (
                            <div className="card">
                                <div className="card-body">
                                    <p>{option.voptions_name} : <VotesCount {...option.voptions_id} /></p>
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