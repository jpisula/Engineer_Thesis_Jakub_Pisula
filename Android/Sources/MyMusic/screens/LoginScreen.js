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

            <View style={styles.input_div}>
              <TextInput
              placeholder="login" 
              onChangeText={(login) => this.setState({login})} 
              style={styles.input} />
            </View>

            <View style={styles.input_div}>
              <TextInput 
                placeholder="hasło" 
                onChangeText={(password) => this.setState({password})} 
                style={styles.input}
                secureTextEntry />
            </View>

            <View style={styles.button_div}>
              <Button 
                title="Zaloguj się!" 
                onPress={this.login.bind(this)} 
                color='green'
                style={styles.button} />
            </View>          

            <View style={styles.reg_div}>
              <Text styles={styles.regText}>Nie masz konta? Zarejestruj się!</Text>
              <View style={styles.button_div}>
                <Button 
                  title="Rejestracja" 
                  onPress={this.goToReg.bind(this)} 
                  color='blue'
                  style={styles.button} />
              </View>
            </View>

          </View>
        );
      }

      goToReg() {
        this.props.navigation.navigate('Registration')
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
            let data= {
              user_id : resp.data.user_id,
              state: 1
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
      marginBottom: 70,
      fontSize: 50,
      color: 'lightblue',
    },
    input: {
      color: 'black',
      fontSize: 20,
    },
    input_div: {
      marginBottom: 30,
      width: 200,
      color: 'lightgrey',
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey',
    },
    button: {
      padding: 20,
      fontSize: 100,     
    },
    button_div: {
      width: 200,
      padding: 10,
    },
    reg_div: {
      marginTop: 40,
    },
    regText: {
      fontSize: 14,
      color: 'blue',
    },
  });