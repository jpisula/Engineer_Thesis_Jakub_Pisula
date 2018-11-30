import React from 'react';
import { Link } from 'react-router-dom';

export class UserArticlesList extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          articles: props
        };
      }

    render() {
        const {articles} = this.state;
        let articlesList = articles.data.map(function(article){    
            let article_path = "/article/"+article.article_id;
            let edit_path = "/article-edit/"+article.article_id;
            let date = new Date(article.create_date);
            let create = date.getFullYear() + "/" + ((date.getMonth() < 10) ? "0" + date.getMonth() : date.getMonth()) + "/" + ((date.getDay() < 10) ? "0" + date.getDay() : date.getDay());
            return (
                <div className="card article-card" key={article.article_id}>
                <div className="card-body">
                    <Link to={article_path} className="card-title">{article.title}</Link>
                    <p>Utworzono: <span className="float-right">{create}</span></p>
                    <span className="float-right"><Link to={edit_path} className="fas fa-edit"></Link></span>
                </div>
                </div>
            );
          })
        
        return (
            <div>
                <div className="card">
                <div className="card-header">
                    Artykuły
                </div>
                <div className="card-body">
                    {articlesList}
                </div>
                </div>
            </div>  
        );
    }
}