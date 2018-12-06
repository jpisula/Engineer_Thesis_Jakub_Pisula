import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';

const App = createStackNavigator({
  Login: {screen: LoginScreen}
});

export default App;