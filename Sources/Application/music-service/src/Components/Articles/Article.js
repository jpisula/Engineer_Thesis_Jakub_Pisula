import React from 'react';
import { Link } from 'react-router-dom';
import './article.css'
import { NavigationNotLogged } from './../Navigation/NavigationNotLogged'
import { CommentNotLogged } from './../Comments/commentsNotLogged';

export default class Article extends React.Component{

    constructor(props) {
        super(props);

    
        this.state = {
          article: [ { data: [] } ],
          comments: [ {data: []}],
          session: null,
          isLoading: false,
        };
      }
    
      componentDidMount() {
        this.setState({ isLoading: true });
    
        fetch('http://localhost/api/config/getSession.php')
          .then(response => response.json())
          .then(session => this.setState({ session, isLoading: false }));

          fetch('http://localhost/api/requests/articles/getArticleById?id='+this.props.match.params.id)
          .then(response => response.json())
          .then(article => this.setState({ article, isLoading: false }));
      }
    
      render() {
        const { session, isLoading, article } = this.state;
        // session loading
        if (isLoading) {
          return <p>Loading ...</p>;
        } else if(session !== null){
          //session not set (user not logged)
          if(session.error_code === 1 && article) {
            return (
              //not logged
              <div>
                <NavigationNotLogged />
                <div className="container container-notlogged">
                  <div className="content">
                      <div className="row">
                          <div className="col-sm-12">
                              <Link className="link-back" to="/">Go back!</Link>
                              <h1 className="mt-4">{article.title}</h1>
                              <p className="lead">Autor artykułu: {article.author_login}</p>
                              <p>Dodano: {article.create_date}</p>
                              <img className="img-fluid rounded image" src="http://localhost/api/uploads/Articles/1.jpg"></img>
                              <p className="article">{article.text}</p>

                              <CommentNotLogged {...session} article_id={article.article_id} />
                          </div>
                      </div>
                  </div>      
              </div>
            </div>
            );
          } else
          //session set (user logged)
          if(session.error_code === 0){
            return ( <p>Logged</p>
              //logged
            );
          }
        } else return <p>Loading ...</p>;
      }
    
}