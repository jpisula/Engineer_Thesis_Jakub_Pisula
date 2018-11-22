import React from 'react';
import './comments.css';
import axios from 'axios';
import { Comment } from './Comment';

export class EventComments extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          comments: [ {data: []}],
          session: props.session
        };
      }

      componentDidMount() {
        axios('http://localhost/api/requests/comments/getEventComments.php?id='+this.props.event_id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then((resp) => {
            this.setState({comments: resp.data});
        });
    
      }

    addComment(e) {
        e.preventDefault();
        
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }

        const data = {
            event_id: this.props.event_id,
            user_id: this.props.session.user_id,
            text: formData.comment,
        };
        
        const jtfd = require("json-to-form-data");
        axios('http://localhost/api/requests/comments/addEventComment.php', {
            method: "post",
            data: jtfd(data),
            withCredentials: true,
            credentials: 'include',
            origin: 'http://localhost',
            crossdomain: true,  
        }) .then((resp) => {
            window.location.reload();
        });
    }

    render(){
        const { session, comments } = this.state;
        let addComment = null;
        if(session.error_code === 0) {
            addComment = (
                <div className="card addComment-card">
                
                    <form onSubmit={this.addComment.bind(this)}>
                        <div className="card-header">
                            Dodaj komentarz:
                        </div>
                        <div className="card-body">
                        <textarea className="form-control" rows="5" ref="comment" />
                        <input type="submit" className="btn btn-primary commentBtn" value="Dodaj komentarz" />
                        </div>
                    </form>  
                </div>
            );
          }

        if(comments.data) {
            let commentsList = comments.data.map(function(comment){
                return (               
                    <div className="card comment-card" key={comment.comment_id}>
                        <div className="card-body">
                            <Comment comment={comment} session={session} />
                        </div>
                    </div>
                );
              });
              if(commentsList) {                 
                return (
                    <div>
                    {addComment}
                    <div className="card comments-card">
                        <div className="card-header">
                            Komentarze:
                        </div>                        
                        <div className="card-body">                        
                        {commentsList}
                        </div>                        
                    </div>
                    </div>
                );
              } else {
                return (
                    <div>
                    {(addComment)? addComment : null}
                    <div className="card comments-card">
                        <div className="card-header">
                            Komentarze:
                        </div>
                        <div className="card-body">
                            Niestety, nie znaleziono żadnych komentarzy.
                        </div>                        
                    </div>
                    </div>
                );
              }
           
        } else {
            return (
                <div>
                {(addComment)? addComment : null}
                <div className="card comments-card">
                    <div className="card-header">
                        Komentarze:
                    </div>
                    <div className="card-body">
                        Niestety, nie znaleziono żadnych komentarzy.
                    </div>                        
                </div>
                </div>
            );
        }
        
    }
}