import React from 'react';
import axios from 'axios';
import './article.css';
import { UserArticlesList } from './UserArticlesList';
import { Link } from 'react-router-dom';

export class JournalistPanel extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          articles: null,
          session: this.props,
        };
    }

    componentDidMount(){
        axios('http://localhost/api/requests/articles/getAllUserArticles?id='+this.props.user_id, {
          method: "get",
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
          crossdomain: true,  
        }) .then((resp) => {
            this.setState({articles: resp.data});
        });
    }

    render(){
        const {articles, session} = this.state;
        if(articles !== null) {
            if(articles.error) {
                return (
                    <div className="card">
                        <div className="card-header">
                            Zarządzaj swoimi artykułami
                        </div>
                        <div className="card-body">
                            <p>Nie dodałeś jeszcze żadnego artykułu.</p>
                            <Link to="/article-create" className="link-btn btn btn-success">Dodaj</Link>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="card">
                        <div className="card-header">
                            Zarządzaj swoimi artykułami
                        </div>
                        <div className="card-body">
                            <UserArticlesList {...articles} />
                            <Link to="/article-creation" className="link-btn btn btn-success">Dodaj</Link>
                        </div>
                    </div>
                )
            }
        }
        return null;
    }
}