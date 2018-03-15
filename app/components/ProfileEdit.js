import React, { Component } from 'react';
import { Text, View, BackHandler, ActivityIndicator, TouchableHighlight, AsyncStorage, StyleSheet, ScrollView, Alert } from 'react-native';
import { FormLabel, FormInput, CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SBHeaderStyle, headerProp } from '../config/Config';
import { URI } from '../config/Config';
import axios from 'axios';
import { connect } from 'react-redux'; 
import { NavigationActions } from 'react-navigation'; 
import { getUserData } from '../actions/courses'; 
import { InputBox, Button, Spinner } from './common';

class Edit extends Component {
  static navigationOptions = ({ navigation }) => { 
                                
            const header = headerProp(navigation);
           
            header.headerLeft = <TouchableHighlight
                                    underlayColor='transparent'
                                    onPress={() => {  
                                        return navigation.dispatch(NavigationActions.navigate({ routeName: 'Profile' }));
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
            header.headerTitle = 'Profile';
            header.headerRight = <View></View>;

            return (header);
};

constructor(props){
  super(props);
  this.state = {
   isLoading: true,
   uname:'',
   name:'',
   email:'',
   phone:'',
   res_data:'',
   errordata: false,
   eload:false,
   male:'',
   female:'',
   status:'',
};
this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}

  componentDidMount(){
    this._loadInitialState().done();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Profile' }));
  }

_loadInitialState = async () => {
  var uname = await AsyncStorage.getItem('username');
  this.props.getUserData(uname);
 }

  componentWillReceiveProps(nextProps){

    if(nextProps.user_details.gender == 1){
      this.setState({male : true, female: false});
    }
    else{ 
      this.setState({female : true, male: false})
    }

    this.setState({
      uname:nextProps.user_details.username,
      name: nextProps.user_details.firstname,
      email: nextProps.user_details.email,
      phone: nextProps.user_details.phone,
      isLoading:false,
      res_data:nextProps.user_details,
    });
}

  renderButton() {
    
       let buttonDisabled;  
       if (this.state.eload) {
           buttonDisabled = true;
       }
          
       if (this.state.eload) {
           return ( 
               <Button onPress={this._handlePress.bind(this)} disabled={buttonDisabled} >
                   <Spinner size='small' />
               </Button>    
           );
       }  
   
       return ( 
           <Button onPress={this._handlePress.bind(this)} disabled={buttonDisabled} childText >
               Submit
           </Button>    
       ); 
   
     }

     renderStatus(){
      if(this.state.status == 'success'){
        return (<View><Text style={{color: 'green', textAlign: 'center', fontWeight: '900'}} >{this.state.errordata}</Text></View>);
      }else{
        return(<View><Text style={{color: '#ff4949', textAlign: 'center', fontWeight: '900'}} >{this.state.errordata}</Text></View>);
      }
     }
  
   _handlePress() {
        const uname = this.state.uname;
        const name = this.state.name;
        const email = this.state.email;
        const phone = this.state.phone;
        let gender='';
        if(this.state.male){
          gender = 1;
        }
        else if(this.state.female){
          gender = 2;
        }
        else{
          gender = 0;
        }

        this.setState({eload: true}) 
        axios.post(`http://${URI.nodeServer}:${URI.port}/user/`, {
            username : uname,
            name : name,
            phone : phone,
            email : email,
            gender: gender,
        })
        .then(response => {
    
          setTimeout(function() { this.setState({errordata: response.data.message, status:response.data.status, eload: false}); }.bind(this), 3000);
        })
        .catch(function (error) {
          console.log(error);
        });  
    }

  render() {

if(this.state.isLoading)
  return (<View><ActivityIndicator style={{ margin: 100 }}/></View>);
      
    return (
      <ScrollView style={{backgroundColor:'#fff'}}>
      <View style={{backgroundColor:'#fff'}}>
          <FormLabel labelStyle={{color:'black',fontSize:14}}>Name</FormLabel>
          <FormInput
           inputStyle={{width:null}}
           onChangeText={(text) => this.setState({name:text})}
           value={this.state.name}
          />

          <FormLabel labelStyle={{color:'black',fontSize:14}}>Email</FormLabel>
          <FormInput
           inputStyle={{width:null}}
           onChangeText={(text) => this.setState({email:text})}
           value={this.state.email}
          />

          <FormLabel labelStyle={{color:'black',fontSize:14}}>Phone</FormLabel>
          <FormInput
           inputStyle={{width:null}}
           onChangeText={(text) => this.setState({phone:text})}
           value={this.state.phone}
          />
      </View>
          <FormLabel labelStyle={{color:'black',fontSize:14}}>Gender</FormLabel>
          <View style={{flexDirection:'row' }}>
            <CheckBox
              title='Male'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              containerStyle={{borderWidth:0}}
              checked={this.state.male}
              onPress = {()=>{ this.setState({ male: true, female: false })}}
            />
            <CheckBox
              title='Female'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              containerStyle={{borderWidth:0}}
              checked={this.state.female}
              onPress = {()=>{ this.setState({ female: true, male: false })}}
            />
          </View>    
          {this.renderButton.call(this)}
          {this.renderStatus.call(this)} 
      </ScrollView>
    );
  }
}

mapStateToProps = ({ courses }) => {
  return ({ 
    user_details: courses.user_details, 
  })
}


export default connect(mapStateToProps, { getUserData })(Edit);
