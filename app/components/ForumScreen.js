import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Image,
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

import { SBHeaderStyle, headerProp } from '../config/Config';
import { getForumLists, selectForumid } from '../actions/courses'; 

class ForumScreen extends Component {

static navigationOptions = ({ navigation }) => { 
                                
            const header = headerProp(navigation);

           header.headerLeft = <TouchableHighlight
            underlayColor='transparent'
            onPress={() => {  
                return navigation.dispatch(NavigationActions.navigate({ routeName: 'Course' }));
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
            header.headerTitle = navigation.state.params.id.cname;
            header.drawerLabel = 'Forum            ';
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
      const { params } = this.props.navigation.state;
      
      this.props.getForumLists(params.id.cid);

      const dss = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
        dataSource: dss.cloneWithRows([]),
        isLoading: true,
        response_data:'',
    };

    this._renderRow = this._renderRow.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Course' }));
  }

  componentWillReceiveProps(nextProps){

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({
        dataSource: ds.cloneWithRows(_.values(nextProps.forum_list)),
        isLoading: false,
      });
  }
 
 objectLength(obj) {
   var size = 0, key;
   for (key in obj) {
     if (obj.hasOwnProperty(key)) size++;
   }
   return size;
 }

_renderRow(data) {

   if(data != 'Forum not found for the particular course')
        {

        const d = new Date(data.timemodified * 1000).toDateString();
        const total = '( '+data.tot+' )';

        const cname = this.props.navigation.state.params.id.cname;

        return ( 
          <ListItem
          roundAvatar
          key={data.id}
          title={data.name}
          containerStyle={{backgroundColor:'#fff'}}
          titleContainerStyle={{width:280,paddingBottom:5,}}
          subtitle={d}
          rightTitle= {total}
          onPress={  () => { 
              return this._pressRow.call(this, data.dis_id, data.crs_id, cname)
             }
           }
          />                 
    );

     }
        else
        {
            return (<View><Text style={{fontWeight: 'bold',textAlign:'center',color:'#34495e',paddingTop:200,fontSize:18}}>{data}</Text></View>);
        }
  }


  _pressRow(forumid, crse_id, cname){
    this.props.selectForumid(forumid, crse_id, cname);    
  }

  render() {

    if (this.state.isLoading) 
      return(<View>
            <ActivityIndicator style={{ margin: 100 }}/>
        </View>);  

     return (
      <ScrollView >
              <ListView
              renderRow={this._renderRow}
             dataSource={this.state.dataSource} 
            />                   
      </ScrollView>
    );
  }
}

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
    forum_list: courses.forum_list, 
  })
}


export default connect(mapStateToProps, { getForumLists, selectForumid })(ForumScreen);
