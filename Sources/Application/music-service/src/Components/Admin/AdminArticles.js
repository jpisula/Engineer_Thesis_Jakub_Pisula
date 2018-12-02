import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export class AdminArticles extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            articles: null
          };
    }


    componentDidMount() {   
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

    deleteArticle(art_id) {
        let data = new FormData();
        data.append('article_id', art_id);
        axios('http://localhost/api/requests/articles/deleteArticle.php', {
            method: "post",
            data: data,
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then(() => {
            document.location.reload();
        });
    }

    render() {
        const {articles} = this.state;
        if(articles !== null) {
            let artList = articles.data.map((article) => {
                let regdate = new Date(article.create_date);
                let date = regdate.getFullYear() + "-" + ((regdate.getMonth() < 10) ? "0"+regdate.getMonth() : regdate.getMonth()) + "-" + ((regdate.getDay() < 10) ? "0"+regdate.getDay() : regdate.getDay())
                let edit_path = "/article-edit/"+article.article_id;
                let art_path = "/article/" + article.article_id;
                return (
                    <tr key={article.article_id}>
                    <td>{article.article_id}</td>
                    <td><Link to={art_path}>{article.title}</Link></td>
                    <td>{article.login}</td>
                    <td>{date}</td>
                    <td><Link to={edit_path} className="fas fa-edit"></Link>
                        <button type="button" className="close" onClick={this.deleteArticle.bind(this, article.article_id)} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </td>
                </tr>
                );
            });
            return (
                <div>
                    <div className="card cardd">
                        <div className="card-header">
                            Lista artykułów
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>tytuł</th>
                                        <th>autor</th>
                                        <th>data dodania</th>            
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {artList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );

        } else return null;
    }
}