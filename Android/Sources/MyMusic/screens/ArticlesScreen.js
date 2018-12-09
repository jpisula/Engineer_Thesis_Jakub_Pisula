import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';
import axios from 'axios';

import { ArticlesList } from '../components/articles/articlesList';

export default class ArticlesScreen extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      session: null,
      articles: null
    };
  }
  static navigationOptions = {
    title: 'Artykuły',
  };

  componentDidMount() {
    axios('http://192.168.0.32:80/api/config/getSession.php', {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: '192.168.0.32:80',
      crossdomain: true,  
    }) .then((resp) => {
        this.setState({session: resp.data});
    });
    axios('http://192.168.0.32:80/api/requests/articles/getAllArticles', {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: '192.168.0.32:80',
      crossdomain: true,  
    }) .then((resp) => {
        this.setState({articles: resp.data});
    });
  }

  render() {
    const {session, articles} = this.state;
    if(session !== null && articles!== null) {
      return (
        <ScrollView style={styles.container}>
          <ArticlesList articles={articles} title="Artykuły" session={session}/>
        </ScrollView>
      );
    } else return null;
    
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  
});
