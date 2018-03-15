
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

class Phase1 extends Component {
 
 static navigationOptions = ({ navigation }) => { 
                                
            const header = headerProp(navigation);
           
            header.headerLeft = <TouchableHighlight  
                                  underlayColor='transparent'  
                                 onPress={() => {  
                    return navigation.dispatch(NavigationActions.navigate({ routeName: 'Login' }));
                    }}>
                                  <MaterialIcons
                                      name='arrow-back'
                                      size={25}
                                      style={{ color: 'white', marginLeft: 20 }}
                                  />
                              </TouchableHighlight>;
          header.headerRight = <View
            style={{ marginLeft: 20 }}
        />;
            header.headerTitle = 'All Courses';
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
   return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Login' }));
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
    const items = this.props.phasecourseslist[1];
    const count = this.objectLength(items); 
    if (count == 0) 
      return(<View style={{marginTop:100}} ><ActivityIndicator /></View>);  
    
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(_.values(this.props.phasecourseslist[1])),
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


export default connect(mapStateToProps, { getAllPhaseCourses, selectBook })(Phase1);