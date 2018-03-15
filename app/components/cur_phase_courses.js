import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  ActivityIndicator,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  ListView
} from 'react-native'; 
import { List, ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux'; 
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SBHeaderStyle, headerProp } from '../config/Config';
import {NavigationActions} from 'react-navigation';
import { getAllPhaseCourses, selectBook, viewBook } from '../actions/courses'; 
import moment from 'moment';
import { URI } from '../config/Config';
import TopRightmenu from '../components/TopRightmenu';

class AllPhaseCourses extends Component {
 
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
            header.headerTitle = 'Current Phase Courses';
            header.drawerLabel = 'Current Phase Courses           ';
            header.drawerIcon =  ({ tintColor }) => (
              <Icon
                name="book"
                size={20}
                style={{ color: tintColor }}
              />
            );

            return (header);
};

constructor(props){
  super(props) 
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}

componentDidMount(){
 this.props.getAllPhaseCourses();
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
   return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Main' }));
}
 
 objectLength(obj) {
   var size = 0, key;
   for (key in obj) {
     if (obj.hasOwnProperty(key)) size++;
   }
   return size;
 }

 renderRow(rowData, sectionID) {   
    if(rowData.img_url == '' || rowData.img_url == undefined)
    {
      return (
         <ListItem 
           roundAvatar
           title={rowData.name}
           subtitle={
             <View style={styles.subtitleView}>
               <Text style={styles.ratingText}>{ rowData.fname + ' ' + rowData.lname }</Text>
             </View>
           }
           avatar={require('../assets/images/img123.png')}
           avatarStyle={{ borderRadius: 0, width: 60, height: 60 }}
           rightIcon = {<Icon />}  
           titleStyle={{ fontSize: 13, fontWeight: 'bold' }}
           onPress={  () =>  this.props.navigation.navigate('BS2Main', { id:rowData.id, route:this.props.navigation.state.routeName })  }
         />
       )
    }
    else
    {
      return (
         <ListItem 
           roundAvatar
           title={rowData.name}
           subtitle={
             <View style={styles.subtitleView}>
               <Text style={styles.ratingText}>{ rowData.fname + ' ' + rowData.lname }</Text>
             </View>
           }
           avatar={{ uri: rowData.img_url }}
           avatarStyle={{ borderRadius: 0, width: 60, height: 60 }}
           titleStyle={{ fontSize: 13, fontWeight: 'bold' }}
           onPress={  () =>  this.props.navigation.navigate('BS2Main', { id:rowData.id, route:this.props.navigation.state.routeName })  }
         />
       )
    }
 }

  render() {
    const items = this.props.phasecourseslist[URI.currentPhase];
    const count = this.objectLength(items); 
    if (count == 0) 
      return(<View style={{marginTop:100}} ><ActivityIndicator /></View>);  
    
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(_.values(this.props.phasecourseslist[URI.currentPhase])),
    };

    return (
      <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
      <View> 
          <List containerStyle= {{marginTop:0, paddingTop:0}}>
              <ListView
                renderRow={this.renderRow.bind(this)}
              dataSource={this.state.dataSource} 
              />                   
          </List> 
      </View>
      </ScrollView>
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
mapStateToProps = ({ courses }) => {
  return ({ 
    phasecourseslist: courses.phasecourseslist
  })
}


export default connect(mapStateToProps, { getAllPhaseCourses, selectBook })(AllPhaseCourses);