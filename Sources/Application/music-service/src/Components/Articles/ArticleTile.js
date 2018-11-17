import React from 'react';
import { Link } from 'react-router-dom';
import './articletile.css'

export class ArticleTile extends React.Component{

    constructor(props){
        super(props);
        // console.log(props);
        this.state = {
            article: props,
          };
    }

    render(){
        const { article, isLoading } = this.state;

        if(article) {
            let article_text = article.text.substring(0,200) + '...';
           
            let article_path = "/article/"+article.article_id;
            return (
                <div className="card">
                    <div><img className="card-img-top" src="http://localhost/api/uploads/Articles/1.jpg" alt=""></img></div>
                    <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">{article_text}</p>
                    </div>             
                    <div className="card-body">
                        <Link className="card-link" to={article_path}>Czytaj dalej</Link>
                    </div>
                </div>
            );
        } else {
            return (
            <p> hahaha</p>
            );
        }
        
    }
}