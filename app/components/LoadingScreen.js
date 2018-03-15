import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableHighlight,
    ListView,
    StatusBar,
    Alert
} from 'react-native';

import { Card, List, ListItem, SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions } from 'react-navigation';
import { SBHeaderStyle, headerProp } from '../config/Config';

export default class LoadingScreen extends Component {
    static navigationOptions = ({ navigation }) => {

        const header = headerProp(navigation);
        header.headerLeft = <TouchableHighlight
            underlayColor='transparent'
            onPress={() => navigation.dispatch(NavigationActions.back())}
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
        header.headerTitle = '';

        return (header);
    };

    constructor(props) {
        super(props); 
    }

 

    render() { 
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );  
    }
}


const styles = {
    box: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        margin: 3,
    }
}

