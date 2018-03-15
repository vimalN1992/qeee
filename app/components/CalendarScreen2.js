import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  TouchableHighlight,
  Alert
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SBHeaderStyle, headerProp } from '../config/Config';

export default class AgendaScreen extends Component {

static navigationOptions = ({ navigation }) => { 
                                
            const header = headerProp(navigation);
           
            header.headerLeft = <TouchableHighlight  
                                  underlayColor='transparent'  
                                  onPress={() => navigation.goBack()}
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
            header.headerTitle = 'Events';
            header.drawerLabel = 'Event';
            header.drawerIcon =  ({ tintColor }) => (
              <Icon
                name="calendar"
                size={20}
                style={{ color: tintColor }}
              />
            );

            return (header);
};

  constructor(props) {
    super(props);
     const {state} = this.props.navigation;
    this.state = {
      items: {},
      current_date:state.params.current_date,
      listdate: state.params.days
    };

    this.loadItems = this.loadItems.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
 
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }



  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems(this.state.listdate)}
        selected={this.state.current_date}
        renderItem={this.renderItem.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayPress={()=>{this.props.navigation.goBack()}}

         // onDayPress={(day)=>{
         //  for(var key in this.state.items){
         //      if(day.dateString === key){
         //        console.log(this.state.items)
         //      }
         //    }
         //  }}


        // agenda theme
        theme={{
          agendaTodayColor: 'red',
          agendaKnobColor: '#FFF'
        }}

      />
    );
  }
  

  loadItems(listdate) {

var temp = {};

listdate.forEach(x => {
  temp[x.start_date] = temp[x.start_date] || { 'fullname':[], 'event_id':[], 'event_name' : [], 'start_date' : x.start_date, 'end_date':x.end_date };
  temp[x.start_date].event_name = temp[x.start_date].event_name.concat(x.event_name);
  temp[x.start_date].event_id = temp[x.start_date].event_id.concat(x.event_id);
  temp[x.start_date].fullname = temp[x.start_date].fullname.concat(x.fullname);
});

var result =  Object.keys(temp).map(k => temp[k]);

    for(let d of result){
      var value = d.start_date;
      var strTime = moment.unix(value).format('YYYY-MM-DD');
      // CourseName
      const courseName = d.fullname;
      const course1 = courseName[0];
      const course2 = courseName[1];
      // Session
      const strEvent = d.event_name;
      const str1 = strEvent[0];
      const str2 = strEvent[1];
      // Session Time
      const value1 = d.start_date;
      const s_date = moment.unix(value1).format('h:mm A');
      const value2 = d.end_date;
      const e_date = moment.unix(value2).format('h:mm A');

       const strId = d.event_id;
       const strEventCount = 1;

        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = strEventCount;   // counts

          for (let j = 0; j < numItems; j++) {
                
            this.state.items[strTime].push({
              course_Name:courseName,
              co1:course1,
              co2:course2,
              check_evt: str2,
              event1: str1+' : ('+s_date+' - '+e_date+')',
              event2: str2+' : ('+s_date+' - '+e_date+')',
              id:strId,
              height: 150
            });
          }
        }
    }       
  }



  renderItem(item) {
    if(item.check_evt == undefined)
      return (
        <View style={{marginTop:100,height: item.height}} >
          <Text>{item.course_Name}</Text>
          <Text>{item.event1}</Text>
        </View>
      );
    return (
      <View style={{marginTop:100,height: item.height}} >
        <Text>{item.co1}</Text>
        <Text>{item.event1}</Text>
        <Text style={{padding:10}} ></Text>
        <Text>{item.co2}</Text>
        <Text>{item.event2}</Text>
      </View>
    );
  }

 
  rowHasChanged(r1, r2) {
    return r1.event !== r2.event;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

