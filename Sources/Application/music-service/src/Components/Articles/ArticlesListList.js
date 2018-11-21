import React from 'react';
import './article.css';
import { Link } from 'react-router-dom';


export default class ArticlesListList extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          articles: props
        };
      }

    render() {
        const {articles} = this.state;
        let articlesList = articles.data.map(function(article){
            let article_text = article.text.substring(0,200) + '...';      
            let article_path = "/article/"+article.article_id;
            return (
                <div className="card article-card" key={article.article_id}>
                <div className="card-body">
                    <span className="article-author">Autor: {article.login}</span>
                    <span className="article-date float-right">Data: {article.create_date}</span>
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article_text}</p>
                    <Link to={article_path} className="card-link">Czytaj dalej</Link>
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