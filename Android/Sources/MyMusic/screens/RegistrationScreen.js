import React from 'react';
import axios from 'axios';
import {
    Text,
    TouchableOpacity,
    Button,
    StyleSheet,
    TextInput,
    View,
    Picker,
    Alert,
} from 'react-native';



export default class RegistrationScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        login: '',
        password: '',
        email: '',
        age: '',
        gender: "M",
        countries: undefined,
        country: "Polska",
       };
    }

    componentDidMount() {
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

      goBack() {
        this.props.navigation.navigate('Login')
      }

    
      render() {
        const { countries } = this.state;
        if(countries !== undefined) {
            let countrySelect = countries.data.map((country) => {
                return (<Picker.Item label={country.country_name} value={country.country_name} key={country.country_name}/>)
            });

            return (
            <View style={styles.container}>

                <Text style={styles.title}>Rejestracja</Text>

                <View style={styles.input_div}>
                <TextInput
                placeholder="login" 
                onChangeText={(login) => this.setState({login})} 
                style={styles.input} />
                </View>

                <View style={styles.input_div}>
                <TextInput
                placeholder="e-mail" 
                onChangeText={(email) => this.setState({email})} 
                style={styles.input}
                email-address />
                </View>

                <View style={styles.input_div}>
                <TextInput 
                    placeholder="hasło" 
                    onChangeText={(password) => this.setState({password})} 
                    style={styles.input}
                    secureTextEntry />
                </View>

                <View style={styles.input_div}>
                <TextInput 
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

                <View style={styles.button_div}>
                <Button 
                    title="Zarejestruj się!" 
                    onPress={this.register.bind(this)} 
                    color='blue'
                    style={styles.button} />
                </View>

                <View style={styles.button_div}>
                <Button
                    style={{
                        backgroundColor: 'lightgrey',
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        marginTop: 10
                        }}
                    title='Powrót'
                    onPress={this.goBack.bind(this)}
                />
                </View>
            </View>
            );
        } else return null;
      }

      register() {
        let data = {
            login: this.state.login,
            password: this.state.password,
            email: this.state.email,
            age: this.state.age,
            gender: this.state.gender,
            country: this.state.country
        };

        axios('http://192.168.0.32:80/api/requests/users/CreateNewUser.php', {
            method: "post",
            data: JSON.stringify(data),
            withCredentials: true,
            credentials: 'include',
            origin: '192.168.0.32:80',
                crossdomain: true,
            
            }) .then((resp) => {
            if(resp.data.done === 1){
                Alert.alert("Możesz się zalogować!");
                this.props.navigation.navigate('Login');
            }
            else {
                Alert.alert("Prosze podać inny login lub e-mail.");
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
      marginBottom: 50,
      fontSize: 50,
      color: 'lightblue',
    },
    input: {
      color: 'black',
      fontSize: 20,
    },
    label: {
        color: 'lightgrey',
        fontSize: 18,
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
    button: {
      padding: 20,
      fontSize: 100,     
    },
    button_div: {
      width: 200,
      padding: 10,
    },
    regText: {
      fontSize: 14,
      color: 'blue',
    },
  });