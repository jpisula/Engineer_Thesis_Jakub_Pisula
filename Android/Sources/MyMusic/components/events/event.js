import React from 'react';
import { Card, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Image,
    ScrollView,
    View,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import axios from 'axios';
import { ArticleComments } from '../comments/articleComments';
import { EventComments } from '../comments/eventComments';

export class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            event: null,
            eventPart: null,
            session: props.session,          
        }
    }

    componentDidMount() {
        axios('http://192.168.0.32:80/api/requests/events/getEventById?id='+this.props.id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
          }) .then((resp) => {
              this.setState({event: resp.data});
          });

          axios('http://192.168.0.32:80/api/requests/eventParticipants/getEventParticipants.php?event_id='+this.props.id, {
          method: "get",
          withCredentials: true,
          credentials: 'include',
          origin: '192.168.0.32:80',
          crossdomain: true,  
        }) .then((resp) => {
            this.setState({eventPart: resp.data});
        });
    }

    goBack(){
        this.props.callBack(this.props.session.user_id)
    }

    joinEvent(user_id, event_id) {
        let data = new FormData();
        data.append('user_id', user_id);
        data.append('event_id', event_id);

        axios('http://192.168.0.32:80/api/requests/eventParticipants/addEventParticipant.php', {
          method: "post",
          data: data,
          withCredentials: true,
          credentials: 'include',
          origin: '192.168.0.32:80',
          crossdomain: true,
         
        }) .then(() => {        
            axios('http://192.168.0.32:80/api/requests/eventParticipants/getEventParticipants.php?event_id='+event_id, {
          method: "get",
          withCredentials: true,
          credentials: 'include',
          origin: '192.168.0.32:80',
          crossdomain: true,  
        }) .then((resp) => {
            this.setState({eventPart: resp.data});
        });
        });

        this.props.update(user_id);
  
    }

    leaveEvent(user_id, event_id) {
        let data = new FormData();
        data.append('user_id', user_id);
        data.append('event_id', event_id);
   
      axios('http://192.168.0.32:80/api/requests/eventParticipants/deleteEventParticipant.php', {
        method: "post",
        data: data,
        withCredentials: true,
        credentials: 'include',
        origin: '192.168.0.32:80',
        crossdomain: true,       
      }) .then(() => {        
        axios('http://192.168.0.32:80/api/requests/eventParticipants/getEventParticipants.php?event_id='+event_id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
          }) .then((resp) => {
              this.setState({eventPart: resp.data});
          });
      });

      this.props.update(user_id);

  }

    render() {
        const {event, eventPart, session} = this.state;
        if(event !== null && eventPart !== null) {
            let event_id = event.event_id;
            let address = event.street + " " + event.house_num + ((event.apart_num!=null) ? "/"+event.apart_num : " ");
            let ep = false;
            eventPart.data.forEach(element => {
                if(element.user_id === session.user_id) {
                ep = true;
                return;
                }
            });

            let epList = null;
            let eventPartHTML = null;
            if(ep) {
                epList = eventPart.data.map((element) => {
                    return (
                        <Text key={element.event_id+element.user_id}>{element.user_name}</Text>
                    );
                });

                eventPartHTML = (
                <View>
                    <Text>ZAPISANI: </Text>
                      {epList}
                    <Text>ADRES: {address}</Text>
                    <Button
                        buttonStyle={{
                            backgroundColor: 'red',
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5,
                            marginTop: 15
                          }}
                        title='Wypisz się'
                        onPress={this.leaveEvent.bind(this, session.user_id, event_id)}
                    />
                </View>
                )
            } else {
                epList = (
                <View>
                <Text>Musisz być członkiem wydarzenia, aby zobaczyć listę członków!</Text>
                <Button
                        buttonStyle={{
                            backgroundColor: 'green',
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5,
                            marginTop: 15
                          }}
                        title='Dołącz do wydarzenia!'
                        onPress={this.joinEvent.bind(this, session.user_id, event_id)}
                    />
                </View>
            )
                eventPartHTML = epList;
            }

            if(event.user_id === session.user_id) {
                eventPartHTML = (
                  <View>
                      <Text>ZAPISANI: </Text>
                      {epList}
                      <Text>ADRES: {address}</Text>
                  </View>
                )
              }

            console.log(eventPart);
            return (
                <ScrollView>
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
                    <Card title={event.event_name}>
                        <Text style={styles.header}>Autor: {event.login}</Text>
                        <Image
                            source={{uri: 'http://192.168.0.32:80/api/uploads/Articles/1.jpg'}}
                            style={{width: 150}} 
                        />
                        <Text style={styles.text}>
                            {event.text}
                        </Text>
                        <Text>START: {event.start_time}</Text>
                        <Text>KONIEC: {event.end_time}</Text>
                        <Text>MIASTO: {event.city_name}</Text>
                        <Text>ZAPISANYCH: {event.usersNum}</Text>
                        {eventPartHTML}
                    </Card>                    
                    <EventComments session={this.props.session} id={event.event_id} />
                </ScrollView>
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
        marginBottom: 10,
        fontSize: 14

    },    
  });