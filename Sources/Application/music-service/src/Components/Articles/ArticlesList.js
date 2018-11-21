import React from 'react';
import axios from 'axios';
import './article.css';
import { Toolbar } from '../Toolbar/Toolbar';
import { ProfilePanel } from '../Profile/ProfilePanel';
import { Link } from 'react-router-dom';
import ArticlesListList from './ArticlesListList';
import { Votings } from '../Votings/Votings';


export default class ArticlesList extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          articles: null,
          session: null,
        };
      }
    
      componentDidMount() {
    
        axios('http://localhost/api/config/getSession.php', {
          method: "get",
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
          crossdomain: true,  
        }) .then((resp) => {
            this.setState({session: resp.data});
        });

        axios('http://localhost/api/requests/articles/getAllArticles.php', {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
                crossdomain: true,  
        }) .then((resp) => {
            this.setState({articles: resp.data});
        });

      }

    
      render() {
    const { session, articles } = this.state;
       if(session && articles) {
        if(session.error_code === 1) {
            return (
                <div>
                    <Toolbar {...session}/>
                    <div className="container">
                        <div className="content">   
                            <ArticlesListList {...articles}/>   
                        </div>      
                    </div>
                </div>
            );
        } else {
            let journalist = null;
            if(session.role === "Journalist") {
                journalist = (
                    <div className="card journalistDiv">
                    <div className="card-body">
                        <Link to="/journalistPanel" className="btn btn-outline-info">Zarządzaj swoimi artykułami</Link>
                    </div>
                    </div>
                );
            }
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
                                {journalist}
                                <ArticlesListList {...articles}/>                                
                            </div>      
                        </div>
                    </div>
                </div>
            );
        }
       } else return null;
        
      }

    
}