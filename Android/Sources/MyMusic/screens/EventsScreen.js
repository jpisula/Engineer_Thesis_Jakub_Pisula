import React from 'react';
import { Card, Text } from 'react-native-elements'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import axios from 'axios';
import { EventsList } from '../components/events/eventsList';
import { Event } from '../components/events/event';


export default class EventsScreen extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      session: null,
      events: null,
      userEvents: null,
      showEvent: false,
      event_id: null,
    };
  }
  static navigationOptions = {
    title: 'Wydarzenia',
  };

  showEvent(id){
    this.setState({showEvent: true, event_id: id});
    }

    callBack(user_id) {
        axios('http://192.168.0.32:80/api/requests/events/getUserEventsParticip.php?id='+ user_id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
        }) .then((resp) => {
            this.setState({userEvents: resp.data});
        });
          this.setState({showEvent: false, event_id: null});
    }

    update(user_id) {
        axios('http://192.168.0.32:80/api/requests/events/getUserEventsParticip.php?id='+ user_id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
        }) .then((resp) => {
            this.setState({userEvents: resp.data});
        });
    }

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

    axios('http://192.168.0.32:80/api/requests/events/getActiveEvents.php', {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: '192.168.0.32:80',
      crossdomain: true,  
    }) .then((resp) => {
        this.setState({events: resp.data});
    });  
  }


  render() {
    const {session, events, userEvents, showEvent, event_id} = this.state;

    if(session!== null) {
        if(showEvent === false) {
            if(userEvents === null) {
                axios('http://192.168.0.32:80/api/requests/events/getUserEventsParticip.php?id='+ session.user_id, {
                method: "get",
                withCredentials: true,
                credentials: 'include',
                origin: '192.168.0.32:80',
                crossdomain: true,  
                }) .then((resp) => {
                    this.setState({userEvents: resp.data});
                });
            }
            
            if(events!== null && userEvents !== null) {
                let userEventsList = null;
                if (userEvents.data[0].event_id === 0) {
                    userEventsList = (
                        <Card title="Twoje wydarzenia">
                            <Text>Nie jesteś zapisany do żadnego wydarzenia!</Text>
                        </Card>
                    );
                } else 
                userEventsList = (<EventsList events={userEvents} title="Twoje Eventy" session={session} showEvent={this.showEvent.bind(this)}/>);
                
    
                return (
                    <ScrollView style={styles.container}>
                    <EventsList events={events} title="Aktywne Eventy" session={session} showEvent={this.showEvent.bind(this)}/>
                    {userEventsList}
                    </ScrollView>
                );
            } else return null;
        } else {
            return (
                <Event id={event_id} callBack={this.callBack.bind(this)} session={session} update={this.update.bind(this)} />
            );
        }
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
