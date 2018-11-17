import React from 'react';

export class CommentLogged extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.article_id = props.article_id;
    
        this.state = {
          comments: [ {data: []}],
          session: props.session,
          isLoading: false,
        };
      }

    render(){
        console.log(this.article_id);

        return <p>haha</p>;
    }
}