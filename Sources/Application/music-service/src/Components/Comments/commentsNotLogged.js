import React from 'react';
import './comments.css';
import { Comment } from './Comment';

export class CommentNotLogged extends React.Component {
    constructor(props) {
        super(props);
        this.article_id = props.article_id;
    
        this.state = {
          comments: [ {data: []}],
          session: props.session,
          isLoading: false,
        };
      }

      componentDidMount() {
        this.setState({ isLoading: true });
    
        fetch('http://localhost/api/requests/comments/getArticleComments.php?id='+this.article_id)
          .then(response => response.json())
          .then(comments => this.setState({ comments, isLoading: false }));
      }

    render(){
        const { session, isLoading, comments } = this.state;
        console.log(comments);
        if (isLoading) {
            return <p>Loading ...</p>;
        } else {
            if(comments.data){
                if(comments.code === 0) {
                    return(
                    <div className="comments">
                        <hr className="comments-separator"></hr>
                        <p>Niestety nie znaleziono żadnych komentarzy do tego artykułu.</p>
                    </div>
                    );
                } else {
                    let commentsList = comments.data.map(function(comment){
                        return (
                            <div className="comment" key={comment.comment_id}>
                                <Comment {...comment} />
                            </div>
                        );
                      })

                    return (
                        <div className="comments">
                        <hr className="comments-separator"></hr>
                            {commentsList}
                    </div>
                    );
                }
                
            } else {
                return(
                    <div className="comments">
                        <hr className="comments-separator"></hr>
                        <p>Niestety nie znaleziono żadnych komentarzy do tego artykułu.</p>
                    </div>
                    );
            }
        }
      
    }
}