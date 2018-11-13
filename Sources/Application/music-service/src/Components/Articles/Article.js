import React from 'react';
import './article.css'

export class Article extends React.Component{

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
            console.log(article);
            let path;
            if(article.photo_path !== null) {
                path = "http://localhost/api/uploads/Articles/46_ja.jpg";
            } else{
                path = "";
            }

            return (
                <div className="card">
                    <div><img className="card-img-top" src={article.photo_path} alt=""></img></div>
                    <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">{article.text_short}</p>
                    </div>             
                    <div className="card-body">
                        <a href="#" className="card-link">Czytaj dalej</a>
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