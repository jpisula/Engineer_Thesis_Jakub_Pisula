import React from 'react';
import { Articles } from '../Articles/Articles';
import { Toolbar } from '../Toolbar/Toolbar';

export class Body extends React.Component {

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
                <Toolbar {...session} />
                <div className="container">
                    <div className="content">
                        <Articles {...session}/>
                    </div>      
                </div>
            </div>
        );
    }
}