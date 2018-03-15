import React, {
  Component
} from 'react';

import {
  ActivityIndicator,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  Slider,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video-controls';
import { URI } from '../config/Config';
import { NavigationActions } from 'react-navigation';

const {height, width} = Dimensions.get('window');

export default class VideoPlayer extends Component {
  static navigationOptions = {
        header: null
    }
  constructor(props) {
    super(props); 
  } 
  handleBackButtonClick() {  
      return this.props.navigation.dispatch(NavigationActions.back());
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
  }

  render() { 
    const { source } = this.props.navigation.state.params.data;
    const { id } = this.props.navigation.state.params.cdata;
    return (<View style={{flex: 1}}>
        <Video
            source={{ uri: source}} 
            style={styles.fullScreen}
            onBack={() =>  { 
                if(this.props.navigation.state.routeName == 'BS7Main'){
                  return this.props.navigation.goBack(); 
                }else{
                  return this.props.navigation.goBack();
                }
            }}
        />
    </View>);
  
     
  } 
}

const styles = StyleSheet.create({ 
  fullScreen: { 
      flex: 1,
      backgroundColor: 'black'
  }, 
});

 
        
        