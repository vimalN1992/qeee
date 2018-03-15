import React, { Component } from 'react';
import {  
  View, 
  Image, 
} from 'react-native';  
import { Spinner } from './common'; 

class Loading extends Component { 

  static navigationOptions = {
      header: null
  }  

  render() {
    return (
        <Image source={require('../assets/images/bg.png')} style={styles.wrapper}>
            <View style={styles.container}> 
                <View style={styles.logoContainer}>
                    <Image style={styles.logoImage} source={require('../assets/images/logo.png')} />        
                </View>
                <View style={styles.LoginFooter} >
                    <Spinner />
                </View>
            </View>
        </Image>   
    );
  }
} 

const styles = { 
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
        justifyContent: 'center',   
    },
    LoginFooter: { 
         flex: 0.5,
         alignItems: 'center',
        justifyContent: 'center', 
    },
        logoImage: {
     width: 200, height: 60, resizeMode: 'contain'
    },
};

export default Loading;
