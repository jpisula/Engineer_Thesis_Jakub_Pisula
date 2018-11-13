import React from 'react';
import './logged.css';

export class Logged extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            session: null,
            isLoading: false,
          };
    }

    render(){
        return (
            <p>CHOOH</p>
        );
    }
}