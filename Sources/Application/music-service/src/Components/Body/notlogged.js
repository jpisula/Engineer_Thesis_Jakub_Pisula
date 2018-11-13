import React from 'react';
import { Articles } from '../Articles/Articles';
import './notlogged.css';

export class NotLogged extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            session: props,
            isLoading: false,
          };
    }

    render(){
        const {session} = this.state;
        return (
            <div className="container">
                <Articles />
            </div>
        );
    }
}