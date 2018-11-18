import React from 'react';
import './comments.css';
import axios from 'axios';
import { Comment } from './Comment';

export class Comments extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          comments: [ {data: []}],
          session: props.session
        };
      }

      componentDidMount() {
        axios('http://localhost/api/requests/comments/getArticleComments.php?id='+this.props.article_id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then((resp) => {
            this.setState({comments: resp.data});
        });
    
      }

    render(){
        const { session, comments } = this.state;
        if(comments.data) {
            let commentsList = comments.data.map(function(comment){
                return (               
                    <div className="card comment-card" key={comment.comment_id}>
                        <div className="card-body">
                            <Comment {...comment} {...session} />
                        </div>
                    </div>
                );
              });
              if(commentsList) {
                return (
                    <div className="card comments-card">
                        <div className="card-header">
                            Komentarze:
                        </div>
                        <div className="card-body">
                        {commentsList}
                        </div>                        
                    </div>
                );
              } else {
                return (
                    <div className="card comments-card">
                        <div className="card-header">
                            Komentarze:
                        </div>
                        <div className="card-body">
                            Niestety, nie znaleziono żadnych komentarzy.
                        </div>                        
                    </div>
                );
              }
           
        } else {
            return (
                <div className="card comments-card">
                    <div className="card-header">
                        Komentarze:
                    </div>
                    <div className="card-body">
                        Niestety, nie znaleziono żadnych komentarzy.
                    </div>                        
                </div>
            );
        }
        
    }
}