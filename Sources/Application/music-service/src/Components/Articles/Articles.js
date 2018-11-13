import React from 'react';
import { Article } from './Article';

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
        // console.log(articles);
        // const arts = articles;
        // console.log(arts);
        // console.log(articles.data[0]);
        if (isLoading) {
            return <p>Loading ...</p>;
        } else {
            if(articles.data){
                // articles.data.forEach(element => {
                //     console.log(element);
                // });
                let articlesList = articles.data.map(function(article){
                    return (
                        <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4" key={article.article_id}>
                            <Article {...article} />
                        </div>
                    );
                  })
            
                return (
                    <div className="row">
                        {articlesList}
                    </div>
                );
            } else {
                return <p>Loading ...</p>;
            }
        }
    }
}