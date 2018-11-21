import React from 'react';
import { Articles } from '../Articles/Articles';
import { Toolbar } from '../Toolbar/Toolbar';
import { ProfilePanel } from '../Profile/ProfilePanel';
import { Votings } from '../Votings/Votings';

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
        if(session.error_code === 1) {
            return (
                <div>
                    <Toolbar {...session}/>
                    <div className="container">
                        <div className="content">
                            <Articles {...session}/>
                            <Votings {...session}/>
                        </div>      
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Toolbar {...session}/>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-1 col-md-1"></div>
                            <div className="user-profile col-lg-3 col-md-3 col-sm-12">                           
                                <ProfilePanel {...session} />
                                <Votings {...session}/>
                            </div>  
                            <div className="content col-lg-7 col-md-7 col-sm-12">
                                <Articles {...session}/>                                
                            </div>      
                        </div>
                    </div>
                </div>
            );
        }
       
    }
}