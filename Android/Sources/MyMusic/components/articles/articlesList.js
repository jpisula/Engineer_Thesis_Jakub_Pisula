import React from 'react';
import { Card, Text } from 'react-native-elements'
import {
    
    View,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import axios from 'axios';
import { Article } from './article';

export class ArticlesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: props.articles,
            showArticle: false,
            article_id: null
        }
    }

    callBack(){
        this.setState({showArticle: false});
    }

    render() {
        const {articles, showArticle, article_id} = this.state;
        if(!showArticle) {
            const rowLen = articles.data.length;
            let articlesList = articles.data.map((article, i)=>{
                if (rowLen === i + 1) {
                    return (
                        <View key={article.article_id}>
                        <TouchableOpacity onPress={()=>{ this.setState({showArticle: true, article_id: article.article_id})}}>
                            <Text h4 style={styles.header}>{article.title}</Text>
                            <Text style={styles.text}>{article.text.substring(0,200) + '...'}</Text>
                            <Text style={styles.link}>Czytaj dalej ></Text>
                        </TouchableOpacity>
                        </View>
                    )
                } else {
                    return (
                        <View key={article.article_id} style={styles.listItem}>
                        <TouchableOpacity onPress={()=>{ this.setState({showArticle: true, article_id: article.article_id})}}>
                            <Text h4 style={styles.header}>{article.title}</Text>
                            <Text style={styles.text}>{article.text.substring(0,200) + '...'}</Text>
                            <Text style={styles.link}>Czytaj dalej ></Text>
                        </TouchableOpacity>
                        </View>
                    )
                }
            });
            return (
                <Card title={this.props.title}>
                    {articlesList}
                </Card>
            );
        } else {
            return <Article id={article_id} callBack={this.callBack.bind(this)} session={this.props.session} />;
        }
        
    }
}

const styles = StyleSheet.create({
    listItem: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingBottom: 10
    },
    header: {
        marginBottom: 5,
        fontSize: 16
    },
    text: {
        fontStyle: 'italic',
        marginBottom: 5,
        fontSize: 14

    },
    link: {
        textAlign: 'right',
        fontSize: 12
    }
    
  });