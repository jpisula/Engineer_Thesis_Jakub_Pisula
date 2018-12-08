import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ArticlesScreen from '../screens/ArticlesScreen';

const VotesStack = createStackNavigator({
  Vote: HomeScreen,
});

VotesStack.navigationOptions = {
  tabBarLabel: 'Głosowania',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-microphone${focused ? '' : '-outline'}`
          : 'md-microphone'
      }
    />
  ),
};

const EventsStack = createStackNavigator({
  Events: HomeScreen,
});

EventsStack.navigationOptions = {
  tabBarLabel: 'Wydarzenia',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-musical-note${focused ? '' : '-outline'}`
          : 'md-musical-note'
      }
    />
  ),
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Główna',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const ArticlesStack = createStackNavigator({
  LinkArticles: ArticlesScreen,
});

ArticlesStack.navigationOptions = {
  tabBarLabel: 'Artykuły',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
       ? 'ios-book' : 'md-book'}
    />
  ),
};

const AccountStack = createStackNavigator({
  Account: SettingsScreen,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Konto',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  VotesStack,
  EventsStack,
  HomeStack,
  ArticlesStack,
  AccountStack,
});
