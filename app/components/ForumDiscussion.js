import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Button,
  ActivityIndicator,
  AsyncStorage,
  TouchableHighlight,
  StatusBar,
  TextInput,
  ScrollView,
  ListView
} from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux'; 
import { NavigationActions } from 'react-navigation'; 
import _ from 'lodash';
import moment from 'moment';

import { SBHeaderStyle, headerProp } from '../config/Config';
import { getForumDiscussionLists, postForums } from '../actions/courses'; 

class ForumDiscussion extends Component {

static navigationOptions = ({ navigation }) => { 
                              
         const header = headerProp(navigation);
          const crse_id = navigation.state.params.id.c_id;
           header.headerLeft = <TouchableHighlight
            underlayColor='transparent'
            onPress={() => {  
            return navigation.dispatch(NavigationActions.navigate({ routeName: 'ForumList', params: { id: {cid: crse_id, cname:navigation.state.params.id.cname } } })

            );
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
            header.drawerLabel = 'Forum';
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
        isLoading:true,
        message:'',
        text: '',
        dataSource: dss.cloneWithRows([]),
        res_data:''
        };
    this._renderRow = this._renderRow.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

 componentWillMount() {  
    const { params } = this.props.navigation.state;
    this.props.getForumDiscussionLists(params.id.f_id);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
 }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    // this.props.navigation.goBack(null);
    // return true;
     const crse_id = this.props.navigation.state.params.id.c_id;
    return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'ForumList', params: { id: {cid: crse_id, cname:this.props.navigation.state.params.id.cname } } }));
  }

   componentWillReceiveProps(nextProps) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
        dataSource: ds.cloneWithRows(_.values(nextProps.forum_discussion)),
        isLoading: false,
        res_data:nextProps.forum_discussion
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

if(data != 'No records found')
        {
        const value = data.created;
        const formattedDate = moment.unix(value).format('DD-MM-YYYY, h:mm A');

            const regex = /(<([^>]+)>)/ig
            const body = data.message;
            const result = body.replace(regex, "");

    return ( 
        
        <View style={{flexDirection: 'row', padding: 10, marginTop:8}}>
            <View style={{marginLeft: 5 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image source={require('../assets/images/avatar.png')}
                           style={{width: 40, height: 40}} />
                    <View style={{ flexDirection: 'column', marginLeft:10 }}>          
                            
                        <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold' }}>
                        {data.firstname}
                        </Text> 
                    
                        <Text style={{ fontSize: 13 }}>
                        {formattedDate}
                        </Text>
                    
                    </View>  
                </View>

                <View style={{paddingTop:10}}>
                    <Text style={{fontSize:15,padding:3,color:'black'}}> {result}</Text>
                </View>
            </View>                
        </View>    

              
    );

     }
        else
        {
            return (<Text style={{fontWeight: 'bold',textAlign:'center',color:'#34495e',paddingTop:150,fontSize:18}}>{data}</Text>);
        }
  }

  // Forum posts submit
 _handlePress() {
    if(this.state.message == ''){
        alert("Please input a Value"); 
    }
    else{
        this._loadInitialState().done();
    }
}

 _loadInitialState = async () => {

        const { params } = this.props.navigation.state;
        const uid = await AsyncStorage.getItem('userId');
        const disc_id = params.id.f_id;
        const msg = this.state.message;
        this.props.postForums(uid, disc_id, msg);

        const ds1 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }); 
        this.setState({
        isLoading:false,
        dataSource: ds1.cloneWithRows(_.values(this.state.res_data)),
        message:'',
        })
 }


   render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator style={{ margin: 100 }}/>
        </View>
      );
    }
 
    return (
      
     <View style={{flex:1}}>

        <ScrollView style={{marginBottom:50, backgroundColor:'#fff'}}
                ref={ref => this.scrollView = ref}
                onContentSizeChange={(contentWidth, contentHeight)=>{        
                    this.scrollView.scrollToEnd({animated: true});
                }}>
            <View style={{flexDirection:'row', paddingTop:20,paddingLeft:20,paddingRight:20 }}>
                <Text style={{fontSize:16,fontWeight: 'bold',color:'#1abc9c'}}>Topics:  </Text>
                <Text style={{fontSize:16,paddingRight:10,fontWeight: 'bold',color:'black'}}>{this.state.res_data[0].subject} </Text>
            </View>
               
                <ListView 
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow}  
                />
   
         </ScrollView> 
      
         <View style={{flex:1,flexDirection:'row', position: 'absolute', left: 0, right: 0, bottom: 0,backgroundColor:'#d3d3d3',padding:8}}>
                <View style={{flex:5}}>
                    <TextInput 
                    placeholder="Reply" 
                    underlineColorAndroid='transparent' 
                    style={{backgroundColor:'#fff', borderWidth: 3, padding: 0, marginLeft: 10, marginRight: 10, paddingLeft: 10, borderRadius: 5, borderColor: '#e5e5e5',fontSize:16 }} 
                    onChangeText={(text) => this.setState({message:text})}
                    value={this.state.message}
                    />
                </View>
                <View style={{flex:1}}>
                    <Button 
                        title="Reply"
                        color="orange"
                        onPress={() => this._handlePress()}
                    />
                </View>
                    
             </View>   
            
       </View>

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
    forum_discussion: courses.forum_discussion, 
  })
}


export default connect(mapStateToProps, { getForumDiscussionLists, postForums })(ForumDiscussion);
