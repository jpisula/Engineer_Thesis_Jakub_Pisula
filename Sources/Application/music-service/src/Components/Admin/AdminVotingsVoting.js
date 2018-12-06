import React from 'react';
import axios from 'axios';
import { VotesCount } from '../Votings/VotesCount';
import './styles.css';
import './contStyles.css';

export class AdminVotingsVoting extends React.Component {
    constructor(props) {
        super(props)

        this.state= {
            voting_id : this.props.id,
            vopts : null
        }
    }

    componentDidMount() {   
        axios('http://localhost/api/requests/votes/getVotingOptions.php?id='+this.props.id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then((resp) => {
            this.setState({vopts: resp.data});
        });   
    }

    deleteOption(id) {
        let data = new FormData();
        data.append('voptions_id', id);
        
        axios('http://localhost/api/requests/votes/deleteVotingOption.php', {
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

    addOption(){
        let data = new FormData();
        data.append('voptions_name', this.refs["option"].value);
        data.append('voting_id', this.props.id);
        axios('http://localhost/api/requests/votes/addVotingOption.php', {
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
        const {vopts} = this.state;
        console.log(vopts);
        if(vopts !== null) {
            let voptsList = null;
            if(vopts.data !== 0) {
                voptsList = vopts.data.map((opt) => {
                    return(
                        <div className="card karta" key={opt.voptions_id}>
                            <div className="card-body">
                                <p>{opt.voptions_name}   :   <VotesCount id={opt.voptions_id}/></p>
                                <button type="button" className="close" onClick={this.deleteOption.bind(this, opt.voptions_id)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    );
                });
            }

            return (
                <div>
                    {voptsList}
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Dodaj nową opcję:
                                        <input type="text" ref="option" className="form-control"></input>
                                    </label>
                                    <button type="button" className="przycisk btn btn-success" onClick={this.addOption.bind(this)}>Dodaj</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}
