import React from 'react';
import { Articles } from '../Articles/Articles';
import './notlogged.css';
import { NavigationNotLogged } from '../Navigation/NavigationNotLogged';

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
            <div>
                <NavigationNotLogged />
                <div className="container">
                    <div className="content">
                        <Articles />
                    </div>      
                </div>
            </div>
        );
    }
}