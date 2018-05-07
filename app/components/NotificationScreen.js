import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  BackHandler,
  AsyncStorage,
  Clipboard,
  ScrollView,
  ListView,
  FlatList,
  Alert,
  Platform
} from 'react-native';
import axios from 'axios';
import { Card, List, ListItem, SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { SBHeaderStyle, headerProp } from '../config/Config';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopRightmenu from '../components/TopRightmenu';
import _ from 'lodash';
import { URI } from '../config/Config';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";
import PTRView from 'react-native-pull-to-refresh';

class Tab extends Component {  
  constructor(props) {
    super(props);
    this.state={
      noti_count:null
    }
    this._loadInitialState().done();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
 

  _loadInitialState = async () => {
    var uname = await AsyncStorage.getItem('username');
    axios.get(`http://${URI.nodeServer}:${URI.port}/fcm/messagesCount?username=${uname}`)
    .then((res) => {  
      if(res.data.rows == 0){
        this.setState({
          noti_count:null
        })
      }else{
        this.setState({
          noti_count:res.data.rows
        })
      }
    });
   }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  async componentDidMount(){
    FCM.on(FCMEvent.Notification, notif => {
    if(notif.local_notification){
      return;
    }
    if(notif.opened_from_tray){
      console.log('opened_from_tray')
      return;
    }
    if(notif.fcm && notif.fcm.body) {
          /* Create local notification for showing in a foreground */
          FCM.presentLocalNotification({
             body: notif.fcm.body,
             priority: "high",
             title: notif.fcm.title,
             sound: "default", 
             icon: "ic_launcher",
             "show_in_foreground" :true, /* notification when app is in foreground (local & remote)*/
             vibrate: 300, /* Android only default: 300, no vibration if you pass null*/
             "lights": true, // Android only, LED blinking (default false)
          });
      }
    });
  } 

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => { 
    return BackHandler.exitApp();
  }
  render(){
    return(
    <View>
    <Text style={{marginLeft:10,color:'red',fontSize:8}}>
    {this.state.noti_count  }   
    </Text>
    </View>
    );
  }
}

class NotificationScreen extends Component {
  static navigationOptions = ({ navigation }) => {  
    const header = headerProp(navigation); 
    header.headerRight =  <TopRightmenu nav={navigation} />;
    header.headerTitle;
    header.tabBarLabel= 'Notification';
    header.tabBarIcon= ({ tintColor }) => <View><Tab /><Icon name='bell-o' color={tintColor} size={15} /></View>;
    return (header);
  };


  constructor(props) {
    super(props);
    this.state = {
        isLoading:true,
        notifications_data:'',
        isFetching:false
    }
    this.onRefresh();
  }

   onRefresh = async () => {
    var uname = await AsyncStorage.getItem('username');
    axios.get(`http://${URI.nodeServer}:${URI.port}/fcm/messages?username=${uname}`)
    .then(response => response.data)  
    .then(user_notification => {
        this.setState({
          notifications_data: user_notification,
          isLoading:false,
          isFetching:false
        })
    })
    .catch(function (error) { 
    
    });
   }

   _renderItem = ({item}) => {
 const subject = item.mob_subject.toUpperCase();
    const message = item.mob_message.replace(/(([^\s]+\s\s*){6})(.*)/,"$1…");
    const img = (item.img_url == '') ? require('../assets/images/img404_sm.jpg') : {uri : item.img_url};
    return (   
          <ListItem
          roundAvatar
          key={item.id}
          title={<View style={{flexDirection: 'row', flex: 1,}}>
                <View >
                <Text style={{fontSize: 15, fontWeight: 'bold',paddingLeft:6,paddingRight:15}} >{subject }</Text>
                <Text style={{fontSize: 13, paddingLeft:6,paddingRight:15}}>{message}</Text>
                </View>  
              </View>
            }
          avatar={img}
          rightIcon = {<Icon />}           
          avatarStyle={{ borderRadius: 50, width: 50, height: 50 }}
          containerStyle={{backgroundColor: (item.seen==1) ? '#fff' : '#e4e6f0'}}
          titleStyle={{fontSize: 13, fontWeight: 'bold'}}
          onPress={  () =>  this.props.navigation.navigate('NotiView', { id:item.id, course_name:item.course_name, sub: item.mob_subject, msg: item.mob_message })  }
          />
    ); 
}
    
  render() {
    
    const notification = this.state.notifications_data;

       if(this.state.isLoading){
            return (  
               <View><ActivityIndicator style={{ margin: 100 }}/></View>      
            );
        }else if(_.isEmpty(notification)){
          return(
          <PTRView onRefresh={() => this.onRefresh()} >
          <View style={styles.container}>
            <Text style={styles.paragraph}>
              You don't have any Notification.
            </Text>
          </View>
          </PTRView>);
        }
        else{
          return (
          <PTRView onRefresh={() => this.onRefresh()} >
            <View style={{flex: 1, padding: 2}}>
                <List style={{padding:0,margin:0}} >
                  <FlatList
                    data={this.state.notifications_data}
                    keyExtractor={(item) => item.id}
                    renderItem={this._renderItem}
                  />        
                </List>  
            </View>
            </PTRView>
          );
        }    
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
    color: '#34495e',
  },

  subtitleView: {
    paddingLeft: 10,
  }, 
  ratingText: { 
    color: 'grey'
  }
  
});

export default NotificationScreen;