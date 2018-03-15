
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  BackHandler,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  Constants
} from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { Card, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import FlatScroll from './FlatScroll'; 
import { SBHeaderStyle, headerProp } from '../config/Config';
import Swiper from './Swiper';
import { getSessions } from '../actions/courses'; 
import TopRightmenu from '../components/TopRightmenu';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

class HomeScreen extends Component {
  
  static navigationOptions = ({ navigation }) => {
    const header = headerProp(navigation); 
    header.headerRight =  <TopRightmenu nav={navigation} />; 
    return (header);
  };
 
  constructor(props) { 
    super(props);

    this.state = {
      visibleSwiper: false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount(){
    this.props.getSessions();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentDidMount() {

    setTimeout(() => {
        this.setState({
          visibleSwiper: true
        });
    }, 0);  
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
 
  return BackHandler.exitApp();
}
 
  render() {    

    const swiper_sessions = (_.size(this.props.sessions.live) != 0) ? this.props.sessions.live : this.props.sessions.ads;

      return(  
        <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
          <Swiper data={swiper_sessions} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.HeaderStyle,{ flex:1}]}>Upcoming Session</Text>
          
          </View>
          <FlatScroll navigation={this.props.navigation} data={this.props.sessions.upcoming} onPress={() => {  
                return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Session', params: {sdata: this.props.sessions.upcoming} }));
            }}/>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.HeaderStyle,{ flex:1}]}>Completed Session</Text>
            
          </View> 
          <FlatScroll navigation={this.props.navigation}  data={this.props.sessions.completed} onPress={() => {  
                return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Session', params: {sdata: this.props.sessions.completed} }));
            }}/>
       </ScrollView>

       );
    
  }

}

const styles = StyleSheet.create({ 
  HeaderStyle:{
    fontSize: 15, 
    paddingLeft: 10,
    marginTop: 15,
    color: '#212121',
    fontWeight: 'bold'
  },
  HeaderRight: { textAlign: 'right', marginRight: 10, flex: 1, color: '#0089da' }
});

mapStateToProps = ({courses, Auth}) => { 
  return({
    sessions: courses.sessions,
    isLoggedIn: Auth.isLoggedIn
  })
}

mapDispatchToProps = (dispatch) => {
  return { getSessions: () => dispatch(getSessions())}  
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);