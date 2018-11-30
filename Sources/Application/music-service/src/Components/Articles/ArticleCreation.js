import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import './article.css';
import { ProfilePanel } from '../Profile/ProfilePanel';
import { Toolbar } from '../Toolbar/Toolbar';
import { JournalistPanel } from './JournalistPanel';

export class ArticleCreation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          session: null,
          selectedFile: null
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


    }

    fileSelectedHandler = article => {
        this.setState({
            selectedFile: article.target.files[0]
        });
    }

    addEvent(user_id){
        let data = new FormData();
        for (const field in this.refs) {
          data.append(field, this.refs[field].value);
        }
        data.append('user_image', this.state.selectedFile);
        data.append('user_id', user_id);
        
        axios('http://localhost/api/requests/articles/addArticle.php', {
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
        const {session} = this.state;
        if(session !== null) {

            if(session.error_code === 0) {
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
                                        Tworzenie artykułu
                                    </div>
                                    <div className="card-body">
                                     
                                     <form>
                                         <div className="form-group">
                                         <label>Nazwa artykułu:
                                             <input className="form-control" ref="title" required></input>
                                         </label>
                                         </div>
                                         <div className="form-group">
                                         <label>Tekst artykułu:
                                             <textarea className="form-control" rows="50" ref="text" required></textarea>
                                         </label>
                                         </div>
                                         <div className="form-group">
                                         <label>Wstaw zdjęcie do artykułu:
                                             <input type="file" onChange={this.fileSelectedHandler} className="form-control-file" required></input>
                                         </label>
                                         </div>                                                                          
                                     </form>
                                     <button className="btn btn-info buttonek" onClick={this.addEvent.bind(this, session.user_id)}>Stwórz artykuł</button>

                                    </div>
                                    </div>  
                                                          
                                </div>      
                            </div>
                        </div>
                </div>
                );
            } else this.props.history.push('/');

        } else return null;
    }
}