import React from 'react';
import { Card, Text, Button } from 'react-native-elements';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput
  } from 'react-native';
  import axios from 'axios';

export class ArticleComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            session: this.props.session,
            comments: null,
            nComment: null,
        }
    }

    componentDidMount() {
        axios('http://192.168.0.32:80/api/requests/comments/getArticleComments.php?id='+this.props.id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
          }) .then((resp) => {
              this.setState({comments: resp.data});
          });
    }

    delete(id) {
        let data = new FormData();
        data.append('comment_id', id);
        axios('http://192.168.0.32:80/api/requests/comments/deleteComment.php', {
            method: "post",
            data: data,
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
          }) .then(() => {
            axios('http://192.168.0.32:80/api/requests/comments/getArticleComments.php?id='+this.props.id, {
                method: "get",
                withCredentials: true,
                credentials: 'include',
                origin: '192.168.0.32:80',
                crossdomain: true,  
              }) .then((resp) => {
                  this.setState({comments: resp.data});
              });
          });
    }

    addComment() {
        let data = new FormData();
        data.append('article_id', this.props.id);
        data.append('user_id', this.props.session.user_id);
        data.append('text', this.state.nComment);

        axios('http://192.168.0.32:80/api/requests/comments/addArticleComment.php', {
            method: "post",
            data: data,
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
          }) .then(() => {
            this.setState({nComment: null});
            axios('http://192.168.0.32:80/api/requests/comments/getArticleComments.php?id='+this.props.id, {
                method: "get",
                withCredentials: true,
                credentials: 'include',
                origin: '192.168.0.32:80',
                crossdomain: true,  
              }) .then((resp) => {
                  this.setState({comments: resp.data});
              });
          });
    }


    render() {
        const {comments, session} = this.state;
        if(comments !== null) {
            if(comments.code === 0) {
                return (
                    <View>

                        <Card title="Komentarze">
                            <Text style={styles.text}>Niestety nie dodano jeszcze żadnych komentarzy. Możesz być pierwszy!</Text>
                        </Card>

                        <Card title="Dodaj komentarz">
                        <TextInput
                            placeholder="Napisz komentarz..." 
                            onChangeText={(nComment) => this.setState({nComment})} 
                            style={{marginBottom:10, borderWidth:1, borderRadius: 3, borderColor: 'lightgrey', padding: 5}}
                            multiline
                        />
                        <Button title="Dodaj" onPress={this.addComment.bind(this)} />
                        </Card>

                    </View>
                )
            } else {
                return (
                    <View>

                        <Card title="Komentarze">
                            {comments.data.map((com) => {
                                let del = null;
                                if(session.user_id === com.user_id) {
                                    console.log("Wchodze tu!");
                                    del = (
                                        <TouchableOpacity onPress={this.delete.bind(this, com.comment_id)}>
                                            <Text style={{textAlign: 'right', fontSize: 13}}>Usuń komentarz</Text>
                                        </TouchableOpacity>
                                    );
                                }
                                return(
                                <Card style={styles.card} key={com.comment_id}>
                                    <View style={styles.header_div}>
                                        <Text style={styles.header}>Autor: {com.login}</Text> 
                                        <Text style={styles.header}>Dodano: {com.create_date}</Text>
                                    </View>
                                    <Text style={styles.text}>
                                        {com.text}
                                    </Text>
                                    {del}
                                </Card>
                              );
                            })}
                        </Card>

                        <Card title="Dodaj komentarz">
                        <TextInput
                            placeholder="Napisz komentarz..." 
                            onChangeText={(nComment) => this.setState({nComment})} 
                            style={{marginBottom:10, borderWidth:1, borderRadius: 3, borderColor: 'lightgrey', padding: 5}}
                            multiline
                        />
                        <Button title="Dodaj" onPress={this.addComment.bind(this)} />
                        </Card>

                    </View>
                )
            }           
        } else return null;
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 14,
    },
    header_div:{
        marginBottom: 15,
    },
    text: {
        fontStyle: 'italic',
        marginBottom: 5,
        fontSize: 13

    },  
    card: {
        width: 200,
    },
  });