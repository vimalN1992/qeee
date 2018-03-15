import React, { Component } from 'react'; 
import { AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  Constants } from 'react-native';  
import Icon from 'react-native-vector-icons/FontAwesome'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DeviceInfo from  '../core/RNDeviceInfo/';


const StatusBarHeaderStyle = {
    Top: 0,
    height: 60 ,
};

if(DeviceInfo.versionCompatibility() != 0){

    StatusBarHeaderStyle = {
        Top: StatusBar.currentHeight,
        height: 60 + StatusBar.currentHeight,   
    }
}

export const SBHeaderStyle = StatusBarHeaderStyle;

export const headerProp = (navigation) => {  
    return({
            tabBarLabel:null,
            tabBarIcon: null,
            headerTitle: <Image   
                            source={require('../assets/images/q3e.png')}
                            style={{ alignSelf:'center', width:40, resizeMode: 'contain'}}
                        /> ,   
            drawerLabel: 'Home',
            drawerIcon: (props) => <MaterialIcons
                                        name="home"
                                        size={24}
                                        style={{ color: props.tintColor }}
                                    />,  
            headerLeft: <TouchableHighlight  
                            underlayColor='transparent'  
                            onPress={() => { navigation.navigate('DrawerOpen') }}
                        >
                            <Icon 
                                name='bars'  
                                size={25} 
                                style={{  color: 'white',marginLeft:20}}
                            />
                        </TouchableHighlight>,
           
            // <Icon name='ellipsis-v'  size={25} style={{color: 'white',marginRight:20}} />, 
            headerStyle:{
                backgroundColor: '#32313F',
                paddingTop: SBHeaderStyle.Top,
                height:  SBHeaderStyle.height
            }, 
            headerTitleStyle :{
                alignSelf: 'center',
                color: 'white'
            },
            
        })
}



export const URI = {
    nodeServer: 'qeee.rtbi.in',
    phpServer: 'qeee.in',
    coursePack: 'coursepack.tenet.res.in',
    port:3001,
    currentPhase:10
}

export const reqHeader = {
    headers: { 'X-API-KEY': '6SnzcCPITXrjVEcw4/WpGQ==' }
};
