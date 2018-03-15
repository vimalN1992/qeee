import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Button,
  ActivityIndicator,
  AsyncStorage,
  TouchableHighlight,
  StatusBar,
  TextInput,
  ScrollView,
  ListView
} from 'react-native';
import axios from 'axios'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux'; 
import { NavigationActions } from 'react-navigation'; 
import _ from 'lodash';
import moment from 'moment';
import { URI } from '../config/Config';

import { SBHeaderStyle, headerProp } from '../config/Config';
import { getForumDiscussionLists, postForums } from '../actions/courses'; 

export default class ForumDiscussion extends Component {

static navigationOptions = ({ navigation }) => { 
                                
         const header = headerProp(navigation);
          const crse_id = navigation.state.params.id.c_id;
           header.headerLeft = <TouchableHighlight
            underlayColor='transparent'
            onPress={() => {  
            return navigation.dispatch(NavigationActions.navigate({ routeName: 'Notification' }));
            }}
        >
            <MaterialIcons
                name='arrow-back'
                size={25}
                style={{ color: 'white', marginLeft: 20 }}
            />
        </TouchableHighlight>;
            header.headerRight = <View
            style={{ marginLeft: 20 }}
        />;
        header.headerTitle = 'Notification';
        header.tabBarVisible= false;
        header.tabBarLabel= 'Notification';
        header.tabBarIcon= ({ tintColor }) => <Icon name='bell-o' size={17} color={tintColor} />;
           
            return (header);



};

    constructor(props) {
        super(props); 
    }

    handleBackButtonClick() {  
      return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Notification' }));
    }
    componentDidMount() {
      const {id } = this.props.navigation.state.params
      axios.get(`http://${URI.nodeServer}:${URI.port}/fcm/messageid?id=${id}`);

      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }    
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

   render() {
    const {course_name, sub, msg} = this.props.navigation.state.params

    return (
      <View style={{paddingTop:10,paddingLeft:10,paddingRight:8}}>
        <Text style={{fontSize:20,fontWeight:'bold'}} > {sub} </Text>
        <Text style={{paddingTop:20, fontSize:13}}> {msg} </Text>
      </View>
    );
 
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
  }
});
