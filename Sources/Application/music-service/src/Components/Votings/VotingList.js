import React from 'react';
import axios from 'axios';
import { Voting } from './Voting';

export class VotingList extends React.Component {
    constructor(props) {
        super(props);
        this.vopt_id = null;

        this.state = {
            votings : null,
            session: props,
            votingOptions: null,
            votes: null
        }
    }

    componentDidMount() {
        axios('http://localhost/api/requests/votes/getActiveVotings.php', {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
                crossdomain: true,  
        }) .then((resp) => {
            this.setState({votings: resp.data});
        });
    }


    render() {
        const {session, votings} = this.state;

        if(votings !== null) {

            let list = votings.data.map((voting) => {
                return (
                    <div key={voting.voting_id}>
                        <Voting voting={voting} session={session}/>
                    </div>
                );
            });
            

            return (
                <div>
                    {list}
                </div>
            );

        } else 
            return null;
    }
}