import React from 'react';
import './comments.css';
import axios from 'axios';

export class Comment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          comment: props.comment,
          session: props.session
        };
      }

    deleteComment(){
        let data = {comment_id: this.props.comment.comment_id};
        const jtfd = require("json-to-form-data");
        axios('http://localhost/api/requests/comments/deleteComment.php', {
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
        const { comment, session } = this.state;

        let delBtn = null;
        if(comment.user_id === session.user_id) {
            delBtn = (
                <button type="button" className="close" onClick={this.deleteComment.bind(this)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            );
        }
        return (
        <div>
            <div>
                <span className="comment-author">Dodane przez: {comment.login}</span>
                <span className="comment-date float-right">Data: {comment.create_date}</span>
            </div>
            <p className="comment-text">
            {comment.text.split('\n').map((item, key) => {
                return <span key={key}>{item}<br/></span>
            })}
            </p>
            {delBtn}
        </div>
        );
    }
}