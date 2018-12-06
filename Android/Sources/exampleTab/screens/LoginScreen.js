import React from 'react';
import axios from 'axios';
import {
    Text,
    TouchableOpacity,
    Button,
    StyleSheet,
    TextInput,
    View,
    Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation'


export default class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        login: '',
        password: '',
       };
    }

    static navigationOptions = {
        header: 'Zaloguj się',
      };

    
      render() {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>MyMusic</Text>
            <TextInput
             placeholder="login" 
             onChangeText={(login) => this.setState({login})} 
             style={styles.input} />
            <TextInput 
              placeholder="password" 
              onChangeText={(password) => this.setState({password})} 
              style={styles.input}
              secureTextEntry />
            <Button title="Zaloguj się!" onPress={this.login.bind(this)} style={styles.button} />
          </View>
        );
      }

      login() {
        let data = {
          login : this.state.login,
          password: this.state.password
        };
        axios('http://192.168.0.32:80/api/requests/users/signIn.php', {
          method: "post",
          data: JSON.stringify(data),
          withCredentials: true,
          credentials: 'include',
          origin: '192.168.0.32:80',
          crossdomain: true,
         
        }) .then((resp) => {
          if(resp.data.done === 1){
            console.log("a");
            let data= {
              user_id : resp.data.user_id,
              state: "true"
            }
            axios('http://192.168.0.32:80/api/requests/users/setLoggedIn.php', {
              method: "post",
              data: JSON.stringify(data),
              withCredentials: true,
              credentials: 'include',
              origin: '192.168.0.32:80',
              crossdomain: true,
              
            }) .then(() => {
              this.props.navigation.navigate('Main');
            });
          }
          else {
            Alert.alert("Podano złe dane do logowania! Spróbuj jeszcze raz :)");
          } 
        });
      }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      marginBottom: 25,
      fontSize: 50,
      color: 'lightblue',
    },
    input: {
      height: 40,
      marginBottom: 10,
      padding: 10,
    },//
    button: {
      padding: 20,
      fontSize: 100,     
    }
  });