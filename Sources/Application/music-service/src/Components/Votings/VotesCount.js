import React from 'react';
import axios from 'axios';

export class VotesCount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            votingOption_id: props.id,
            votes: null
        }
    }

    componentDidMount() {
        axios('http://localhost/api/requests/votes/getVotesCount.php?id='+this.props.id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then((resp) => {
            this.setState({votes: resp.data});
        });

    }

    render() {
        const {votes} = this.state;
        if(votes !== null) {
            return votes.voteCount;             
        } else return null;
        
    }
}