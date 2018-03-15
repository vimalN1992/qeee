
import React, { Component } from 'react';
import { View,BackHandler, Text, ActivityIndicator, AsyncStorage, StyleSheet,TouchableHighlight, ScrollView,StatusBar } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { URI } from '../config/Config';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { SBHeaderStyle, headerProp } from '../config/Config';
import { connect } from 'react-redux'; 
import { NavigationActions } from 'react-navigation';
import TopRightmenu from '../components/TopRightmenu'; 
import { getUserData, selectUserEdit } from '../actions/courses'; 

class ProfileScreen extends Component {
    
static navigationOptions = ({ navigation }) => {  
    const header = headerProp(navigation); 
    header.headerRight =  <TopRightmenu nav={navigation} />;
    header.headerTitle;
    return (header);
  };

 
 constructor(props){
   super(props);
   this.state = {
    isLoading: true,
    res_data:'',
  };
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
 }
  
 componentDidMount(){
    this._loadInitialState().done();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
 }
 
 _loadInitialState = async () => {
  var uname = await AsyncStorage.getItem('username');
  var uid = await AsyncStorage.getItem('userId');

  this.props.getUserData(uname);
 }
 
 componentWillReceiveProps(nextProps){
    this.setState({
      isLoading: false,
      res_data:nextProps.user_details,
    });
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
 
  return BackHandler.exitApp();
}

  handleSettingsPress(usr_name) {
      this.props.selectUserEdit(usr_name);
  }


  check_gender(c_gen){
    if(c_gen.gender == 1){
      return (
        <Tile
        imageSrc={require('../assets/images/avatar.png')}
        featured
        title={`${c_gen.firstname.toUpperCase()}`}
        caption={c_gen.email}
        imageContainerStyle={{padding:180}}
      />);
    }
    else if(c_gen.gender == 2){
      return ( 
        <Tile
        imageSrc={require('../assets/images/favatar.jpg')}
        featured
        title={`${c_gen.firstname.toUpperCase()}`}
        caption={c_gen.email}
        imageContainerStyle={{padding:180}}
      />);
    }
    else{
      return '';
    }
  }


  _Gender(gender){
    if(gender == 1){
      return 'Male';
    }
    else if(gender == 2){
      return 'Female';
    }
    else{
      return '';
    }
  }
 
  render() {

 var profile_data = this.state.res_data;

  if(this.state.isLoading)
    return (<View><ActivityIndicator style={{ margin: 100 }}/></View>);

  return (
    <ScrollView >
      {this.check_gender(profile_data)} 

        <Button
        title="EDIT"
        buttonStyle={{ marginTop: 20,backgroundColor:"#f8576b" }}
        onPress={ () => { 
              return this.handleSettingsPress.call(this, profile_data.username)
             }
           }
      /> 
      <List>
        <ListItem
          title="Email"
          rightTitle={(profile_data.email == '') ? null : profile_data.email}
          hideChevron
        />
        <ListItem
          title="Phone"
          rightTitle={(profile_data.phone == '') ? null : profile_data.phone}
          hideChevron
        />
      </List>
      <List>
        <ListItem
          title="Username"
          rightTitle={(profile_data.username == '') ? null : profile_data.username}
          hideChevron
        />
      </List>
      <List>
          <ListItem
          title="Gender"
          rightTitle={this._Gender(profile_data.gender)}
          hideChevron
        />
      </List>
    </ScrollView>
  );
  }
}


mapStateToProps = ({ courses }) => {
  return ({ 
    user_details: courses.user_details, 
  })
}


export default connect(mapStateToProps, { getUserData, selectUserEdit })(ProfileScreen);
