import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  BackHandler,
  ActivityIndicator,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  ListView
} from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, ListItem, SearchBar } from 'react-native-elements';
import TopRightmenu from '../components/TopRightmenu';
import { connect } from 'react-redux'; 
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import { SBHeaderStyle, headerProp } from '../config/Config';

import {AllPhaseStack} from '../config/Router';

export default class AllCourses extends Component {
 
  static navigationOptions = ({ navigation }) => {  
    const header = headerProp(navigation); 
    header.headerRight = null;
    header.headerRight =  <TopRightmenu nav={navigation} />;
    header.headerTitle = 'All Courses  ';
    header.drawerLabel = 'All Courses  ';
            header.drawerIcon =  ({ tintColor }) => (
              <Icon
                name="book"
                size={20}
                style={{ color: tintColor }}
              />
            );

    return (header);
  };

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
 }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    return BackHandler.exitApp();
  }

  render() {
    
    return(<AllPhaseStack/>);
      
  }
} 

const styles = StyleSheet.create({
subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  }, 
  ratingText: { 
    color: 'grey'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});