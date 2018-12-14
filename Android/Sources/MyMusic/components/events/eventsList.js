import React from 'react';
import { Card, Text } from 'react-native-elements'
import {
    
    View,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';

export class EventsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: props.events
        }
    }

    showEvent(id){
        this.props.showEvent(id);
    }

    render() {
        const {events, showEvent, event_id} = this.state;

        const rowLen = events.data.length;
        let eventsList = events.data.map((event, i)=>{
            if (rowLen === i + 1) {
                return (
                    <View key={event.event_id}>
                    <TouchableOpacity onPress={()=>{ this.showEvent(event.event_id)}}>
                        <Text h4 style={styles.header}>{event.event_name}</Text>
                        <Text style={styles.text}>{event.text_short}</Text>
                        <Text style={styles.link}>Czytaj dalej ></Text>
                    </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View key={event.event_id} style={styles.listItem}>
                    <TouchableOpacity onPress={()=>{ this.showEvent(event.event_id)}}>
                        <Text h4 style={styles.header}>{event.event_name}</Text>
                        <Text style={styles.text}>{event.text_short}</Text>
                        <Text style={styles.link}>Czytaj dalej ></Text>
                    </TouchableOpacity>
                    </View>
                )
            }
        });
        return (
            <Card title={this.props.title}>
                {eventsList}
            </Card>
        );
        
        
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