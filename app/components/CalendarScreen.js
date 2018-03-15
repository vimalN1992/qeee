import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SBHeaderStyle, headerProp } from '../config/Config';
import moment from 'moment';
import { URI } from '../config/Config';
import TopRightmenu from '../components/TopRightmenu';

export default class CalendarsScreen extends Component {

  state = {
    load:false,
    response_data:'',
  }

  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
    this.markdates = this.markdates.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  static navigationOptions = ({ navigation }) => { 
                                
            const header = headerProp(navigation);

            header.headerLeft = <TouchableHighlight  
                                  underlayColor='transparent'  
                                  onPress={() => { navigation.navigate('DrawerOpen') }}
                                  >
                                  <Icon 
                                      name='bars'  
                                      size={25} 
                                      style={{  color: 'white',marginLeft:20}}
                                  />
                              </TouchableHighlight>;
            header.headerRight =  <TopRightmenu nav={navigation} />;
            header.headerTitle = 'Events';
            header.drawerLabel = 'Events  ';
            header.drawerIcon =  ({ tintColor }) => (
              <Icon
                name="calendar"
                size={20}
                style={{ color: tintColor }}
              />
            );

            return (header);
};

  componentWillMount(){
        this._loadInitialState().done();
  }

   _loadInitialState = async () => {
  var uname = await AsyncStorage.getItem('username');
  var uid = await AsyncStorage.getItem('userId');
    return fetch(`http://${URI.nodeServer}:${URI.port}/psessions?username=${uname}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          load:true,
          response_data: responseJson
        }, function() {
        });
      })
      .catch((error) => {
        
      }); 
 }

 componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
 }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Main' }));
  }

  render() {
var dayys = this.state.response_data;
if(!this.state.load)
return(<View><ActivityIndicator style={{marginTop:100}} /></View>);


    return (
      <ScrollView style={styles.container}>
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={this.markdates(dayys)}
          theme={{
          todayTextColor: 'red',       //current day color
          dayTextColor: '#2d4150',     // all day color
        }}      
        />
      </ScrollView>
    );
  }

markdates(data){

  const arr={};
  for(let d of data){
    var value = d.start_date;
    var n_date = moment.unix(value).format('YYYY-MM-DD');
    arr[n_date] = {selected: true, marked: true};
  }
  return arr;

}


onDayPress(day) {

var JSON = this.state.response_data;
var hasMatch =false;

for (var i = 0; i < JSON.length; ++i) {

 var cdate = JSON[i];
    var value = cdate.start_date;
    var strTime = moment.unix(value).format('YYYY-MM-DD');
     if(strTime == day.dateString){
       hasMatch = true;
         if(hasMatch == true){
            const { navigate } = this.props.navigation;
            navigate('Agenda',{current_date:day.dateString, days: this.state.response_data });
         }
       break;
     }

}
        this.setState({
          selected: day.dateString
        });
      }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350,
    marginTop:15
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee',
    marginTop:35,
    color:'#1abc9c',
    fontSize:16
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
