import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  BackHandler,
  ActivityIndicator,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  ListView
} from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, ListItem, SearchBar } from 'react-native-elements';
import TopRightmenu from '../components/TopRightmenu';
import { connect } from 'react-redux'; 
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import { SBHeaderStyle, headerProp } from '../config/Config';
import { getCourses, selectBook, viewBook } from '../actions/courses'; 

class BScreen extends Component {
 
  static navigationOptions = ({ navigation }) => {  
    const header = headerProp(navigation); 
    header.headerRight =  <TopRightmenu nav={navigation} />;
    header.headerTitle;

    return (header);
  };

constructor(props) {
    super(props);  

    const dss = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
        dataSource: dss.cloneWithRows([]),
        isLoading: true,
    };
      this._renderRow = this._renderRow.bind(this);
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {  
     this.props.getCourses();
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillReceiveProps(nextProps) {
    if(_.isEmpty(nextProps.courses)){
      this.setState({
        isLoading: false,
        showError:""
      });
    }else{
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({
        dataSource: ds.cloneWithRows(_.values(nextProps.courses)),
        isLoading: false,
        showError:"noError"
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {      
      return BackHandler.exitApp();
  }

  
  _renderRow(rowData) {
    const img = (rowData.img_url == '') ? require('../assets/images/img404_sm.jpg') : {uri : rowData.img_url};
   
   return (
     <ListItem 
       roundAvatar
       title={rowData.name}
       subtitle={
         <View style={styles.subtitleView}>
           <Text style={styles.ratingText}>{ rowData.fname + ' ' + rowData.lname }</Text>
         </View>
       }
       avatar={img}
       avatarStyle={{ borderRadius: 0, width: 60, height: 60 }}
       containerStyle={{backgroundColor:'#fff'}}
       titleStyle={{ fontSize: 13, fontWeight: 'bold' }}
       onPress={  () =>  this.props.navigation.navigate('BS2', { id:rowData.id })  }
     />
   )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator style={{ margin: 100 }}/>
        </View>
      );
    }else if(_.isEmpty(this.state.showError)){
      return(<View style={styles.container}>
        <Text style={styles.paragraph}>
          Your are not Enrolled the Courses for this Phase.
        </Text>
      </View>);
    }else{
      return(
        <View style={{flex: 1, padding: 2}}>
          <List style={{padding:0,margin:0}} >
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}  
            />        
          </List>  
        </View>
      );
    }
    
      
}
} //End class

const styles = StyleSheet.create({
subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  }, 
  ratingText: { 
    color: 'grey'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
mapStateToProps = ({ courses }) => {
  return ({ 
    courses: courses.courses,
    
  })
}

export default connect(mapStateToProps, { getCourses, selectBook })(BScreen);