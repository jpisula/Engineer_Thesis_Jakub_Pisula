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
import { Votings } from '../components/votings/votings';


export default class VotesScreen extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      session: null,
      artist_month: null,
      songOTD: null,
      votings: null,
    };
  }
  static navigationOptions = {
    title: 'Głosowania',
  };

  componentDidMount() {
    let date = new Date();
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    month = month < 10 ? '0'+month : month;
    let day = date.getUTCDate() <10 ? '0' + date.getUTCDate() : date.getUTCDate();
    let month_date = year+'-'+month+'-01'+'T00:00:00';
    if(month==1) month = 12; else month++;
    if(month == 13) month = 1;
    month = month < 10 ? '0'+month : month;
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
    axios('http://192.168.0.32:80/api/requests/votes/getActiveVotings.php', {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
                crossdomain: true,  
        }) .then((resp) => {
            this.setState({votings: resp.data});
        });
  }

  render() {
    const {session,songOTD,artist_month, votings} = this.state;
    if(session !== null && artist_month !== null && songOTD!== null && votings!== null) {
        let vote = votings.data.map((v) => {
            return (
                <Card key={v.voting_id} title={v.voting_name}>
                    <Votings id={v.voting_id} session={session} />
                </Card>
            );
        });
      return (
        <ScrollView style={styles.container}>
          <Card title = "Artysta miesiąca">
            <Text>{artist_month.name}</Text>
          </Card>
          <Card title = "Utwór dnia">
            <Text>{songOTD.name}</Text>
          </Card>
          <Card title="Zagłosuj!">
            {vote}
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
