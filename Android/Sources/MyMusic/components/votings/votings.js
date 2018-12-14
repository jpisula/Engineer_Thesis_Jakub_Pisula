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

export class Votings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            voting_id: props.id,
            votingOptions: null,
            userVote: null,       
        }
    }

    componentDidMount() {
        axios('http://192.168.0.32:80/api/requests/votes/getVotingOptions.php?id='+this.props.id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
        }) .then((resp) => {         
            this.setState({votingOptions: resp.data});
            axios('http://192.168.0.32:80/api/requests/votes/getUserVote.php?id='+this.props.id, {
                method: "get",
                withCredentials: true,
                credentials: 'include',
                origin: '192.168.0.32:80',
                crossdomain: true,  
            }) .then((resp) => {
                this.setState({userVote: resp.data});
            });
        });
    }


    addVote(option) {
        let data = new FormData();
        data.append('voting_id', this.props.id);
        data.append('user_id', this.props.session.user_id);
        data.append('voptions_id', option);

        axios('http://192.168.0.32:80/api/requests/votes/addVote.php', {
            method: "post",
            data: data,
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
        }) .then(() => {
            axios('http://192.168.0.32:80/api/requests/votes/getVotingOptions.php?id='+this.props.id, {
                method: "get",
                withCredentials: true,
                credentials: 'include',
                origin: '192.168.0.32:80',
                crossdomain: true,  
            }) .then((resp) => {         
                this.setState({votingOptions: resp.data});
                axios('http://192.168.0.32:80/api/requests/votes/getUserVote.php?id='+this.props.id, {
                    method: "get",
                    withCredentials: true,
                    credentials: 'include',
                    origin: '192.168.0.32:80',
                    crossdomain: true,  
                }) .then((resp) => {
                    this.setState({userVote: resp.data});
                });
            });
        });
  
    }

    deleteVote(option) {
        let data = new FormData();
        data.append('voptions_id', option);
        data.append('user_id', this.props.session.user_id);
        
        axios('http://192.168.0.32:80/api/requests/votes/deleteVote.php', {
            method: "post",
            data: data,
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
        }) .then(() => {
            axios('http://192.168.0.32:80/api/requests/votes/getVotingOptions.php?id='+this.props.id, {
                method: "get",
                withCredentials: true,
                credentials: 'include',
                origin: '192.168.0.32:80',
                crossdomain: true,  
            }) .then((resp) => {         
                this.setState({votingOptions: resp.data});
                axios('http://192.168.0.32:80/api/requests/votes/getUserVote.php?id='+this.props.id, {
                    method: "get",
                    withCredentials: true,
                    credentials: 'include',
                    origin: '192.168.0.32:80',
                    crossdomain: true,  
                }) .then((resp) => {
                    this.setState({userVote: resp.data});
                });
            });
        });
    }

    render() {
        const {session, voting, votingOptions, userVote} = this.state;
        if(votingOptions !== null && userVote !== null) {
            let votingOpts = null;
            if(votingOptions.data === 0) {
                votingOpts = (
                    <Text>Brak opcji do głosowania. Zgłoś to administracji strony.</Text>
                );
            } else {
                votingOpts = votingOptions.data.map((option) => {                    
                    if (userVote.voption_id === option.voptions_id){
                        return (
                            <Button
                            buttonStyle={{
                                backgroundColor: 'lightblue',
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5,
                                marginTop: 15
                            }}
                            title={option.voptions_name}
                            onPress={this.deleteVote.bind(this,option.voptions_id)}
                            key={option.voptions_id}
                            />                    
                        );
                    } else {
                        return (
                            <Button
                            buttonStyle={{
                                backgroundColor: 'lightgreen',
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5,
                                marginTop: 15
                            }}
                            title={option.voptions_name}
                            onPress={this.addVote.bind(this,option.voptions_id)}
                            key={option.voptions_id}
                            />                                             
                        );
                    }
                });

            }

            return votingOpts;
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