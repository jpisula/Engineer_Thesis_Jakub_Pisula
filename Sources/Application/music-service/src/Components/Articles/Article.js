import React from 'react';
import './article.css'
import axios from 'axios';
import { Toolbar } from '../Toolbar/Toolbar';
import { ProfilePanel } from '../Profile/ProfilePanel';
import { Votings } from '../Votings/Votings';
import { Comments } from '../Comments/Comments';

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
    
        axios('http://localhost/api/config/getSession.php', {
          method: "get",
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
          crossdomain: true,  
        }) .then((resp) => {
            this.setState({session: resp.data, isLoading: false});
        });

        axios('http://localhost/api/requests/articles/getArticleById?id='+this.props.match.params.id, {
          method: "get",
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
          crossdomain: true,  
      }) .then((resp) => {
          this.setState({article: resp.data, isLoading: false});
      });

      }
    
      render() {
        const { session, isLoading, article } = this.state;
        // session loading
        if (isLoading) {
          return <p>Loading ...</p>;
        } else if(session !== null){
          //session not set (user not logged)
          if(session.error_code === 1) {
            let art_id = article.article_id;
            if(art_id){
              return (
                //not logged
                <div>
                  <Toolbar {...session} />
                  <div className="container">
                    <div className="content">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card article-card">
                                <div className="card-body">
                                <h1>{article.title}</h1>
                                <p className="lead">Autor artykułu: {article.author_login}</p>
                                <p>Dodano: {article.create_date}</p>
                                <img className="img-fluid rounded image" src="http://localhost/api/uploads/Articles/1.jpg"></img>
                                <p className="article">{article.text}</p>
                                </div>
                                </div>
                                <Comments session={session} article_id={art_id} />
                                </div>
                        </div>
                    </div>      
                </div>
              </div>
              );
            } else return null;
          } else
          //session set (user logged)
          if(session.error_code === 0){
            let art_id = article.article_id;
            if(art_id) {
              return ( 
                <div>
                  <Toolbar {...session} />
                  <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-1 col-md-1"></div>
                                <div className="user-profile col-lg-3 col-md-3 col-sm-12">
                                    <ProfilePanel {...session} />
                                    <Votings {...session}/>
                                </div>  
                                <div className="content col-lg-7 col-md-7 col-sm-12">
                                    <div className="card article-card">
                                    <div className="card-body">
                                    <h1>{article.title}</h1>
                                    <p className="lead">Autor artykułu: {article.author_login}</p>
                                    <p>Dodano: {article.create_date}</p>
                                    <img className="img-fluid rounded image" src="http://localhost/api/uploads/Articles/1.jpg"></img>
                                    <p className="article">{article.text}</p>
                                    </div>
                                    </div>  
                                    <Comments session={session} article_id={art_id} />       
                                                          
                                </div>      
                            </div>
                        </div>
                </div>
                  //logged
                );
            } else return null;
            
          }
        } else return <p>Loading ...</p>;
      }
    
}