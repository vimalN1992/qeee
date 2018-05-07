import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View, 
  Image,
  BackHandler,
  TouchableHighlight,
  Text,
  ScrollView, 
  StatusBar, 
} from 'react-native';
import { connect } from 'react-redux';
import { InputBox, Button, Spinner } from './common';
import {
    instituteCodeChanged, 
    usernameChanged,
    passwordChanged,
    onSubmit
} from '../actions/auth';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";

class LoginScreen extends Component {
    
  static navigationOptions = { header: null };

  constructor(props){
      super(props);
      this.state={
        token:''
      }
  }

  async componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);    
    FCM.getFCMToken().then(token => {
      this.setState({token: token || ""})
    });
 
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {      
      return BackHandler.exitApp();
  }


  renderButton() {
 
    const { institutecode, username, password, loading } = this.props;
    let buttonDisabled;  
    if (institutecode === '' || username === '' || password === ''  || loading === true) {
        buttonDisabled = true;
    }
       
    if (loading === true) {
        return ( 
            <Button onPress={this.onSubmitz.bind(this)} disabled={buttonDisabled} >
                <Spinner size='small' />
            </Button>    
        );
    }  

    return ( 
        <Button style={{flex:1,alignSelf: 'center'}} onPress={this.onSubmitz.bind(this)} disabled={buttonDisabled} childText >
            Login   
        </Button>    
    ); 

  }
    onInstiCodeChange(text){
      this.props.instituteCodeChanged(text);
    }
    onUsernameChange(text) { 
        this.props.usernameChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }  
    onSubmitz() {
        const { institutecode, username, password } = this.props; 
        this.props.onSubmit(institutecode, username, password, this.state.token);   
    }  
  render() {  
  
    return (
      <Image source={require('../assets/images/bg.png')} style={styles.wrapper}>
          <View style={styles.container}> 
                  <View style={styles.logoContainer}>
                      <Image style={styles.logoImage} source={require('../assets/images/logo.png')} />
                  </View>
                      <ScrollView>
                          <View style={styles.LoginBody}>
                              <InputBox 
                                  placeholder="Institution Code"
                                  icon="university" 
                                  onChangeText={this.onInstiCodeChange.bind(this)}
                                  value={this.props.institutecode}
                              />   
                              <InputBox 
                                  placeholder=" Username"
                                  icon="user" 
                                  onChangeText={this.onUsernameChange.bind(this)}
                                  value={this.props.username}
                              />    
                              <InputBox 
                                  secureTextEntry
                                  placeholder="Password"
                                  icon="key" 
                                  onChangeText={this.onPasswordChange.bind(this)}
                                  value={this.props.password}   
                              /> 
                              <Text style={styles.errorText} >{this.props.error}</Text> 
                              {this.renderButton.call(this)}           
                          </View> 
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.props.navigation.navigate('Skip')}}> 
                      <View style={styles.borderButton} >
                        <Text style={{ flex:1, alignSelf: 'center', color: 'orange', fontSize: 16 }}>
                           All Courses      
                        </Text>
                      </View> 
                    </TouchableHighlight>
                      </ScrollView> 
                  <View style={styles.LoginFooter} />

          </View>
      </Image>   
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
            flex: 1, 
            width: null,
            height: null,
    },
    container: {
        flex: 1, 
        flexDirection: 'column', 
    },
    logoContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',   
    },
    logoImage: {  
        width: 200, 
        height: 60, 
        resizeMode: 'contain'  
    },
    LoginBody: {  
        flex: 5,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 80
    },
    LoginFooter: { 
         flex: 0.5,
         alignItems: 'center',
        justifyContent: 'center',   
    },
    errorText: {
        color: '#ff4949',
        textAlign: 'center',
        fontWeight: '900'
    },
    borderButton: {
         alignItems: 'center', 
         justifyContent: 'center', 
         marginTop: 50, 
         borderWidth: 1, 
         borderColor: 'orange',
         borderRadius: 5,
         padding: 10,
         marginLeft: 30,
         marginRight: 30,
    }
});

const mapStateToProps = ({ Auth, Nav }) => {    
    const { institutecode, username, password, loading, error, isLoggedIn  } = Auth; 
    return {
        institutecode,
        username,
        password,
        loading,
        error,
        isLogged: isLoggedIn,
        nav: Nav
    };
}; 
export default connect(mapStateToProps,{instituteCodeChanged, usernameChanged, passwordChanged, onSubmit })(LoginScreen)
