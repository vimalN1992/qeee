import React, { Component } from 'react';
import { 
  View, 
  ScrollView,
  TouchableOpacity,
  BackHandler,
   WebView,Text,
   TouchableHighlight
} from 'react-native';   
import HTMLView from 'react-native-htmlview'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationActions} from 'react-navigation';
import { SBHeaderStyle, headerProp } from '../config/Config';

class Description extends Component { 

  static navigationOptions = ({ navigation }) => {
    const header = headerProp(navigation);
    header.headerLeft =  <TouchableHighlight
      underlayColor='transparent'
      onPress={() =>  { 
                if(navigation.state.routeName == 'BS3Main'){
                  return navigation.navigate('BS2Main', { id:navigation.state.params.c_id, route:navigation.state.params.route }); 
                }else{
                    return navigation.navigate('BS2', { id:navigation.state.params.c_id });
                }
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
      header.headerTitle = 'Description';

      return (header);
  };
  constructor(props){
    super(props);
  }
  
    handleBackButtonClick() {
        const { params } = this.props.navigation.state;
        

    if(this.props.navigation.state.routeName == 'BS3Main'){
      return this.props.navigation.navigate('BS2Main', { id:params.c_id, route:params.route });
    }else{
        return this.props.navigation.navigate('BS2', { id:params.c_id });
    } 

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    render() {   
      const { params } = this.props.navigation.state;
        return (    
          <View style={{ flex: 1 }}>
            <WebView
              source={{ html: params.outline }}  
              style={{ paddingTop: 20  }}
              allowsInlineMediaPlayback
            />
          </View>        
        );
  }
}

const styles = {
  p: {
    margin: 0, 
    padding: 0
  }
};

export default Description;
