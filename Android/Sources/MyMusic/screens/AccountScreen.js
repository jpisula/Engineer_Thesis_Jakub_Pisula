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
import UserPanel from '../components/account/UserPanel';


export default class AccountScreen extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      session: null
    };
  }
  static navigationOptions = {
    title: 'Twoje konto',
  };

  componentDidMount() {
    axios('http://192.168.0.32:80/api/config/getSession.php', {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: '192.168.0.32:80',
      crossdomain: true,  
    }) .then((resp) => {
      console.log(resp);
        this.setState({session: resp.data});
    });
    axios('http://192.168.0.32:80/api/requests/articles/getAllArticles', {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: '192.168.0.32:80',
      crossdomain: true,  
    }) .then((resp) => {
        this.setState({user: resp.data});
    });
  }

  render() {
    const {session} = this.state;
    if(session !== null) {
      return (
        <ScrollView style={styles.container}>
          <UserPanel session={session} nav={this.props.navigation}/>
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
