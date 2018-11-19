import React from 'react';
import axios from 'axios';
import './voting.css';

export class Votings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            session: props
          };
    }
    render() {
        const {session} = this.state;
        let link = null;
        if(session.error_code === 0) {
            link = (<button type="button" className="btn btn-outline-secondary">Głosuj!</button>);
        }
        return (
            <div className="card voting-card">
                <div className="card-header">
                    Wyniki głosowań
                </div>
                <div className="card-body">
                    <label><span>Artysta miesiąca:</span>
                    <p>Adele</p>
                    </label>
                    <label><span>Utwór dnia:</span>
                    <p>Why Don't We - Something Different</p>
                    </label>                   
                    {link}
                </div>
            </div>
        );
    }
}