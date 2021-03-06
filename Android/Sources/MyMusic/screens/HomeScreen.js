import React from 'react';
import { Card, Text, Button } from 'react-native-elements';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import axios from 'axios';
import { ArticlesList } from '../components/articles/articlesList';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      session: null,
      articles: null,
      artist_month: null,
      songOTD: null,
    };
  }
  static navigationOptions = {
    title: 'Strona główna',
  };

  componentDidMount() {
    let date = new Date();
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    if(month==1) month = 12; else month++;
    if(month == 13) month = 1;

    month = month < 10 ? '0'+month : month;
    let day = date.getUTCDate() <10 ? '0' + date.getUTCDate() : date.getUTCDate();
    let month_date = year+'-'+month+'-01'+'T00:00:00';
    day = day - 1;
    day = day < 10 ? '0'+day : day;
    let day_date = year+'-'+month+'-'+day+'T00:00:00';
    axios('http://192.168.0.32:80/api/config/getSession.php', {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: '192.168.0.32:80',
      crossdomain: true,  
    }) .then((resp) => {
        this.setState({session: resp.data});
    });
    
    axios('http://192.168.0.32:80/api/requests/articles/getRecentArticles.php', {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: '192.168.0.32:80',
      crossdomain: true,  
    }) .then((resp) => {
        this.setState({articles: resp.data});
    });

    axios('http://192.168.0.32:80/api/requests/votes/getVoteWinner.php?start_date='+month_date+'&vtype_id='+1, {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: '192.168.0.32:80',
      crossdomain: true,  
    }) .then((resp) => {
        this.setState({artist_month: resp.data});
    });
    axios('http://192.168.0.32:80/api/requests/votes/getVoteWinner.php?start_date='+day_date+'&vtype_id='+2, {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: '192.168.0.32:80',
      crossdomain: true,  
    }) .then((resp) => {
        this.setState({songOTD: resp.data});
    });
  }

  render() {
    const {session, articles, artist_month, songOTD} = this.state;
    if(session !== null && articles!== null && artist_month!== null && songOTD !== null) {
      
      return (
        <ScrollView style={styles.container}>
          <ArticlesList articles={articles} title="Ostatnie Artykuły" session={session}/>
          <Card title = "Artysta miesiąca">
            <Text>{artist_month.name}</Text>
          </Card>
          <Card title = "Utwór dnia">
            <Text>{songOTD.name}</Text>
          </Card>
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
