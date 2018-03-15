
import React, { Component } from 'react';
import { View, AsyncStorage, StatusBar, Text } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from 'react-navigation'; 
import { DrawerNav } from '../config/Router.js';
 
export default class DrawerLeftConfig extends Component {
    
    constructor(props){
        super(props)
        this.state ={
            data: false
        }
    }

    componentWillMount(){
        AsyncStorage.getItem('userInfo')
        .then((data) =>{
            this.setState({
                data: JSON.parse(data)
            })
        });
    }

    render(){ 
        
        if(this.state.data == false)
            return <View /> 

        return (<View style={{ flex: 1, backgroundColor: '#32313F', paddingTop: StatusBar.currentHeight, }}>
            <View style={{ padding: 20, flexDirection: 'row' }} >
                <View style={{ flex: 4 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.data.name}</Text>
                    <Text style={{ color: 'white' }}>{this.state.data.email}</Text>
                    <Text style={{ color: 'white' }}>{this.state.data.role}</Text>
                </View>
            </View>
            <View style={{ flex: 10 }}>
            <DrawerItems {...this.props} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ alignSelf: 'center',color: 'white', fontWeight: 'bold' }}>VERSION 1.0   </Text>
            </View>
            
        </View>)
    }
}