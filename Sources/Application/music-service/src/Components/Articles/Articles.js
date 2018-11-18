import React from 'react';
import { ArticleTile } from './ArticleTile';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './article.css';

export class Articles extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            articles: [ { data: [] } ],
            isLoading: false,
            session: this.props.session
          };
    }

    componentDidMount() {
    
        axios('http://localhost/api/requests/articles/getRecentArticles.php', {
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
        const { session, articles, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading ...</p>;
        } else {
            if(articles.data){
                let articlesList = articles.data.map(function(article){
                    return (
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4" key={article.article_id}>
                            <ArticleTile {...article} {...session} />
                        </div>
                    );
                  })
            
                return (
                    <div className="card article-list-card">
                    <div className="card-header">
                        Ostatnie artykuły
                    </div>
                    <div className="card-body">
                    <div id="artykuly" className="row">                      
                        {articlesList}
                    </div>
                        <h5 className="link float-right"><Link className="link" to="/">Zobacz wszystkie artykuły</Link></h5>
                        </div>
                    </div>
                );
            } else {
                return <p>Loading ...</p>;
            }
        }
    }
}