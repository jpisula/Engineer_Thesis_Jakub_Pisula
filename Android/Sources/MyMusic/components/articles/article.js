import React from 'react';
import { Card, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import axios from 'axios';
import { ArticleComments } from '../comments/articleComments';

export class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            article: null,
        }
    }

    componentDidMount() {
        axios('http://192.168.0.32:80/api/requests/articles/getArticleById?id='+this.props.id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
          }) .then((resp) => {
              this.setState({article: resp.data});
          });
    }

    goBack(){
        this.props.callBack()
    }

    render() {
        const {article} = this.state;
        if(article !== null) {
            return (
                <View>
                    <Button
                        buttonStyle={{
                            backgroundColor: 'lightgrey',
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5,
                            marginTop: 15
                          }}
                        title='Powrót'
                        onPress={this.goBack.bind(this)}
                    />
                    <Card title={article.title}>
                        <Text style={styles.header}>Autor: {article.author_login}</Text>
                        <Image
                            source={{uri: 'http://192.168.0.32:80/api/uploads/Articles/1.jpg'}}
                            style={{width: 150}} 
                        />
                        <Text style={styles.text}>
                            {article.text}
                        </Text>
                    </Card>
                    <ArticleComments session={this.props.session} id={article.article_id} />
                </View>
            );
        } else return null;
        
    }
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 10,
        fontSize: 14,
    },
    text: {
        fontStyle: 'italic',
        marginBottom: 5,
        fontSize: 14

    },    
  });