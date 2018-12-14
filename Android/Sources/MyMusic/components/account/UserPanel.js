import React from 'react';
import { Card, Text, Button } from 'react-native-elements';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  TextInput,
  Picker,
  View,
  Alert,
} from 'react-native';
import axios from 'axios';


export default class UserPanel extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      session: props.session,
      user: null,
      age: '',
      gender: "M",
      countries: null,
      country: "Polska",
      nav: props.nav
    };
  }


  componentDidMount() {
    axios('http://192.168.0.32:80/api/requests/users/getUserById?id=' + this.props.session.user_id, {
      method: "get",
      withCredentials: true,
      credentials: 'include',
      origin: '192.168.0.32:80',
      crossdomain: true,  
    }) .then((resp) => {
        this.setState({user: resp.data, age: resp.data.age, gender: resp.data.gender, country: resp.data.country_name});
    });

    axios('http://192.168.0.32:80/api/requests/countries/getCountries.php', {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
                crossdomain: true,  
        }) .then((resp) => {
            this.setState({countries: resp.data});
        });
  }

  update(id) {
    let data = {};
    data = {
        "user_id": id,
        "age": this.state.age,
        "gender": this.state.gender,
        "country_name": this.state.country,
    };

    axios('http://192.168.0.32:80/api/requests/users/updateData.php', {
        method: "post",
        data: JSON.stringify(data),
        withCredentials: true,
        credentials: 'include',
        origin: '192.168.0.32:80',
        crossdomain: true,
        
    }) .then(() => {        
        axios('http://192.168.0.32:80/api/requests/users/getUserById?id=' + this.props.session.user_id, {
            method: "get",
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
            crossdomain: true,  
            }) .then((resp) => {
                this.setState({user: resp.data, age: resp.data.age, gender: resp.data.gender, country: resp.data.country_name});
            });
    });
  }

  delete(id) {
    let data = {};
    data = {
        "user_id": id
    };

    axios('http://192.168.0.32:80/api/requests/users/deleteUser.php', {
        method: "post",
        data: JSON.stringify(data),
        withCredentials: true,
        credentials: 'include',
        origin: '192.168.0.32:80',
        crossdomain: true,
        
    }) .then(() => {        
        Alert.alert("Usunięto konto!");
        this.state.nav.navigate('Login');
    });
  }

  logout(id){
    axios('http://192.168.0.32:80/api/config/session_end.php', {
        method: "post",
        withCredentials: true,
        credentials: 'include',
        origin: '192.168.0.32:80',
		    crossdomain: true,
       
    }) .then(() => {
      let data= {
        user_id : id,
        state: "false"
      }
      axios('http://192.168.0.32:80/api/requests/users/setLoggedIn.php', {
        method: "post",
        data: JSON.stringify(data),
        withCredentials: true,
        credentials: 'include',
        origin: 'http://localhost',
        crossdomain: true,
        
      }) .then(() => {
        Alert.alert("Wylogowano poprawnie!");
        this.state.nav.navigate('Login');
      });
    });
  }

  render() {
    const {user, countries, session} = this.state;
    if(user !== null && countries !== null) {
      let countrySelect = countries.data.map((country) => {
        return (<Picker.Item label={country.country_name} value={country.country_name} key={country.country_name}/>)
      });

      return (
        <View>
          <Card title="Twoje konto">

            <Text style={{fontWeight:"bold"}}>Login:</Text>
            <Text style={styles.right}>{user.login}</Text>

            <Text style={{fontWeight:"bold"}}>E-mail:</Text> 
            <Text style={styles.right}>{user.email}</Text>

            <Text style={{fontWeight:"bold"}}>Wiek:</Text> 
            <Text style={styles.right}>{user.age}</Text>

            <Text style={{fontWeight:"bold"}}>Płeć:</Text> 
            <Text style={styles.right}>{user.gender == "M" ? "Mężczyzna" : "Kobieta"}</Text>

            <Text style={{fontWeight:"bold"}}>Kraj:</Text>
            <Text style={styles.right}>{user.country_name}</Text>

            <Text style={{fontWeight:"bold"}}>Zarejestrowano:</Text> 
            <Text style={styles.right}>{user.registration_date}</Text>
          </Card>
        
          <Card title="Zaktualizuj swoje dane">
            
                <View style={styles.input_div}>
                <Text style={styles.label}>Wiek:</Text>
                <TextInput 
                    defaultValue={user.age}
                    placeholder="wiek" 
                    onChangeText={(age) => this.setState({age})} 
                    style={styles.input}
                    numeric />
                </View>

                <View style={styles.picker_div}>
                    <Text style={styles.label}>Płeć:</Text>
                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.gender}
                        style={styles.picker_input}
                        onValueChange={(itemValue) => this.setState({gender: itemValue})}>
                        <Picker.Item label="Mężczyzna" value="M" />
                        <Picker.Item label="Kobieta" value="K" />
                    </Picker>
                </View>

                <View style={styles.picker_div}>
                    <Text style={styles.label}>Państwo:</Text>
                    <Picker
                    mode="dropdown"
                        selectedValue={this.state.country}
                        style={styles.picker_input}
                        onValueChange={(itemValue) => this.setState({country: itemValue})}>
                        {countrySelect}
                    </Picker>
                </View>
                <View>
                <Button
                        buttonStyle={{
                            backgroundColor: 'green',
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5,
                            marginTop: 15
                          }}
                        title='Zaktualizuj'
                        onPress={this.update.bind(this, session.user_id)}
                    />
                </View>
          </Card>

          <Card>
            <View>
                <Button
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        marginTop: 15
                        }}
                    title='Usuń konto'
                    onPress={this.delete.bind(this, session.user_id)}
                />
            </View>
          </Card>

          <Card>
            <View>
                <Button
                    buttonStyle={{
                        backgroundColor: 'gray',
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        marginTop: 15
                        }}
                    title='Wyloguj się'
                    onPress={this.logout.bind(this, session.user_id)}
                />
            </View>
          </Card>


        </View>
      );
    } else return null;
    
  }

}

const styles = StyleSheet.create({
    right: {
        textAlign: "right",
        paddingLeft: 20
    },
    picker_input: {
        color: 'black',
      },
      picker_div: {
          marginBottom: 15,
          width: 200,
          color: 'lightgrey',
      },
      input_div: {
        marginBottom: 15,
        width: 200,
        color: 'lightgrey',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
      },
  
});
