import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  ActivityIndicator,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  ListView
} from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux'; 
import { NavigationActions } from 'react-navigation'; 
import _ from 'lodash';
import TopRightmenu from '../components/TopRightmenu';
import { SBHeaderStyle, headerProp } from '../config/Config';
import { getForumCourses, selectForumCourses } from '../actions/courses'; 

class CourseScreen extends Component {
 
    static navigationOptions = ({ navigation }) => { 
      const header = headerProp(navigation);

          header.headerLeft = <TouchableHighlight  
                                  underlayColor='transparent'  
                                  onPress={() => { navigation.navigate('DrawerOpen') }}
                                  >
                                  <Icon 
                                      name='bars'  
                                      size={25} 
                                      style={{  color: 'white',marginLeft:20}}
                                  />
                                </TouchableHighlight>;
          header.headerRight =  <TopRightmenu nav={navigation} />;
          header.headerTitle = 'Forum';
          header.drawerLabel = 'Forum     ';
          header.drawerIcon =  ({ tintColor }) => (
              <MaterialIcons
                name="forum"
                size={24}
                style={{ color: tintColor }}
              />
            );

            return (header);
    };

  constructor(props) {
    super(props);  

    const dss = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
        dataSource: dss.cloneWithRows([]),
        isLoading: true,
        text: '',
        response_data:'',
        emptySearch:1
    };
      this._renderRow = this._renderRow.bind(this);
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }


  componentWillMount() {  
    this.props.getForumCourses();
  }

  componentWillReceiveProps(nextProps) {  
 
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      dataSource: ds.cloneWithRows(_.values(nextProps.courseslist)),
      isLoading: false,
    });
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
 }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    
    return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Main' }));
  }
 
  objectLength(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }

  _renderRow(data) {
    return (   
          <ListItem
          roundAvatar
          key={data.id}
          title={data.fullname}
          containerStyle={{backgroundColor:'#fff'}}
          titleStyle={{fontSize: 13, fontWeight: 'bold'}}
          onPress={  () => { 
              return this._pressRow.call(this, data.id, data.fullname )
             }
           }
          />
    );
  }

   _pressRow(id, cname){
        this.props.selectForumCourses(id, cname);      
    }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator style={{ margin: 100 }}/>
        </View>
      );
    }
  if(this.state.emptySearch.length == 0){
    return(
    <View style={{flex: 1, padding: 2}}>
            
          <SearchBar
            lightTheme
            round
            onChangeText={(text) => this.filterSearch(text)}
            clearIcon
            textInputRef='none'
            placeholder='Type Here...' />       

            <Text style={{textAlign:'center',fontSize:20,marginTop:10,color:'black',padding:6}} >No results found</Text>
          
  </View>
    )
  }
    return (
      
            <View style={{flex: 1, padding: 2}}>
          
                    <SearchBar
                      lightTheme
                      round
                      onChangeText={(text) => this.filterSearch(text)}
                      clearIcon
                      textInputRef='none'
                      placeholder='Type Here...' />
                <List style={{padding:0,margin:0}} >
                  <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow}  
                  />        
                </List>  
            </View>

    );
  }

  filterSearch(text){
      const course_data = this.props.courseslist;
      const newData = course_data.filter(function(item){
          const itemData = item.fullname.toUpperCase()
          const textData = text.toUpperCase()
          return itemData.indexOf(textData) > -1
      })
      this.state.dataSource = this.state.dataSource.cloneWithRows(newData);
      this.setState({
          emptySearch:newData,
          text: text
      })
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
  }
});
mapStateToProps = ({ courses }) => {
  return ({ 
    courseslist: courses.courseslist,
    
  })
}


export default connect(mapStateToProps, { getForumCourses, selectForumCourses })(CourseScreen);