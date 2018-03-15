import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  AsyncStorage 
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './app/reducers';
import AppIndex from './app/components';
import { AppContent } from './app/config/Router';   

class App extends Component{ 
    render(){  
      return (
          <Provider store={createStore(reducers, applyMiddleware(thunk))}>
            <View style={{flex: 1}}>
              <StatusBar  backgroundColor={'rgba(0, 0, 0, 0.18)'} translucent  /> 
              <AppIndex />
            </View>
          </Provider >
      );
    }
}
 
AppRegistry.registerComponent('navigation', () => App);
