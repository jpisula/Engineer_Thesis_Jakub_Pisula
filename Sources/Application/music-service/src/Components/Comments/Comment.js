import React from 'react';
import './comments.css';

export class Comment extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          comment: props,
        };
      }

    render(){
        const { comment } = this.state;
        console.log(comment);
        return (
        <div>
            <div>
                <span className="comment-author">{comment.login}</span>
                <span className="comment-date">{comment.create_date}</span>
            </div>
            <p className="comment-text">{comment.text}</p>
        </div>
        );
    }
}