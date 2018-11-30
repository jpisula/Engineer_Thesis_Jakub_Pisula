import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import './article.css';
import { ProfilePanel } from '../Profile/ProfilePanel';
import { Toolbar } from '../Toolbar/Toolbar';
import { JournalistPanel } from './JournalistPanel';

export class EditArticle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          session: null,
          article: null
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

        axios('http://localhost/api/requests/articles/getArticleById?id='+this.props.match.params.id, {
          method: "get",
          withCredentials: true,
          credentials: 'include',
          origin: 'http://localhost',
          crossdomain: true,  
        }) .then((resp) => {
            this.setState({article: resp.data});
        });
    }

    fileSelectedHandler = article => {
        this.setState({
            selectedFile: article.target.files[0]
        });
    }

    updateArticle(){
        let data = new FormData();
        for (const field in this.refs) {
          data.append(field, this.refs[field].value);
        }
        data.append('article_id', this.props.match.params.id);
        
        axios('http://localhost/api/requests/articles/editArticle.php', {
            method: "post",
            data: data,
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then(() => {
            this.props.history.push('/articles');
        });
    }

    deleteArticle() {
        let data = new FormData();
        data.append('article_id', this.props.match.params.id);
        axios('http://localhost/api/requests/articles/deleteArticle.php', {
            method: "post",
            data: data,
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then(() => {
            this.props.history.push('/articles');
        });
    }

    render() {
        const {session, article} = this.state;
        if(session !== null) {

            if(session.error_code === 0 && article !== null) {

                return (
                <div>
                  <Toolbar {...session} />
                  <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-1 col-md-1"></div>
                                <div className="user-profile col-lg-3 col-md-3 col-sm-12">
                                    <ProfilePanel {...session} />
                                    <JournalistPanel {...session} />
                                </div>  
                                <div className="content col-lg-7 col-md-7 col-sm-12">
                                    <div className="card event-card">
                                    <div className="card-header">
                                        Edycja artykułu
                                    </div>
                                    <div className="card-body">
                                     
                                    <form>
                                         <div className="form-group">
                                         <label>Nazwa artykułu:
                                             <input className="form-control" ref="title" defaultValue={article.title} required></input>
                                         </label>
                                         </div>
                                         <div className="form-group">
                                         <label>Tekst artykułu:
                                             <textarea className="form-control" rows="50" ref="text" defaultValue={article.text} required></textarea>
                                         </label>
                                         </div>
                                                                                                               
                                     </form>
                                     <button className="buttonek btn btn-info" onClick={this.updateArticle.bind(this, session.user_id)}>Zaktualizuj artykuł</button>
                                     <button className="buttonek btn btn-danger" onClick={this.deleteArticle.bind(this)}>Usuń artykuł</button>

                                    </div>
                                    </div>  
                                                          
                                </div>      
                            </div>
                        </div>
                </div>
                );
            } else return null;

        } else return null;
    }
}