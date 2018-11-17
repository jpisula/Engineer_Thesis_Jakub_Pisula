import React from 'react';
import { ArticleTile } from './ArticleTile';

export class Articles extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            articles: [ { data: [] } ],
            isLoading: false,
          };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
    
        fetch('http://localhost/api/requests/articles/getRecentArticles.php')
          .then(response => response.json())
          .then(articles => this.setState({ articles, isLoading: false }));
      }

    render(){
        const { articles, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading ...</p>;
        } else {
            if(articles.data){
                let articlesList = articles.data.map(function(article){
                    return (
                        <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4" key={article.article_id}>
                            <ArticleTile {...article} />
                        </div>
                    );
                  })
            
                return (
                    <div id="artykuly" className="row">
                        {articlesList}
                    </div>
                );
            } else {
                return <p>Loading ...</p>;
            }
        }
    }
}