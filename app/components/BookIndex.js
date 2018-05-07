import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  BackHandler,
  ActivityIndicator,
  TouchableHighlight,
  StatusBar 
} from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SBHeaderStyle, headerProp } from '../config/Config';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as courseActions from '../actions/courses';
import { _ } from 'lodash';
import { List, ListItem } from 'react-native-elements';

class BookIndex extends Component {
  static navigationOptions = ({ navigation }) => { 
        const header = headerProp(navigation);
        header.headerLeft = <TouchableHighlight
            underlayColor='transparent'
            onPress={() =>  { 
                if(navigation.state.routeName == 'chapterMain'){
                  return navigation.navigate('BS2Main', { id:navigation.state.params.data.id, route:navigation.state.params.route });
                }else{
                    return navigation.navigate('BS2', { id:navigation.state.params.data.id });
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
        header.headerTitle = navigation.state.params.data.name;

        return (header);
    };

    constructor(props) {  
        super(props);
        const dss = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        if(props.navigation.state.params == undefined){
          this.state = { 
             course: null, 
             loading: true,
         }  
        }else{
          this.state = { 
             course: null, 
             loading: true,
             item:{},
             dataSource: dss.cloneWithRows([]),
         }   
        }  
        this._renderRow = this._renderRow.bind(this);
    } 

    handleBackButtonClick() {  
      const { params } = this.props.navigation.state;
      if(this.props.navigation.state.routeName == 'chapterMain'){
        return this.props.navigation.navigate('BS2Main', { id:params.data.id, route:params.route });
      }else{
          return this.props.navigation.navigate('BS2', { id:params.data.id });
      }
    }

    componentWillMount(){
      if(this.props.navigation.state.params != undefined){
         const { params } = this.props.navigation.state;
        this.props.getBookIndex(params.data.id, params.data.name); 
      }   
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }
    componentWillReceiveProps(nextProps) {

      if(_.isEmpty(_.trim(nextProps.courses.BookIndex.index))){
        this.setState({
          item: null,
          loading: false,
        }); 
      }else{
        const data = _.map(nextProps.courses.BookIndex.index, function (v) { 
            return {
                name: v.title,
                source: v.data.html,
                pdf: v.data.pdf
            }
        });
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          item: data,
          loading: false,
          dataSource: ds.cloneWithRows(_.values(data)),
        }); 
      }
           
    }

 _renderRow(rowData, s, i) { 
 
    const { params } = this.props.navigation.state;
    return (   
        <ListItem
        roundAvatar
        title={<View style={{flexDirection: 'row', flex: 1,}}>
                <View >
                <Text style={{paddingLeft:10,paddingRight:15}} >{ Number(i) + 1 }</Text>
                </View>            
                <View >
                    <Text >{rowData.name}</Text>
                </View>  
              </View>
            }
          rightIcon = {<Icon />}
          containerStyle={{backgroundColor:'#fff'}}
          onPress={  () => {

              if(this.props.navigation.state.routeName == 'chapterMain'){
                return this.props.navigation.navigate('BS6Main', { data:rowData, id:params.data.id, name:params.data.name,route:params.route });  
              }else{
                return this.props.navigation.navigate('BS6', { data:rowData, id:params.data.id, name:params.data.name });
              }
          }}
        />
      );
  } 

  render() {
    if (this.state.loading){ 
      return(<View>
            <ActivityIndicator style={{ margin: 100 }} />
        </View>);
    }else if(this.state.item == null){
      return(
          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center',backgroundColor: '#ecf0f1'}}>
            <Text style={{justifyContent: 'center',margin: 24,fontSize: 18,textAlign: 'center',color: '#34495e',}}>
              There is no Books Available for this Course.
            </Text>
          </View>
          );
    }else{  
     return (
          <List style={{padding:0,margin:0}} >
                  <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow}  
                  />        
                </List>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
        flexDirection: 'row', 
        borderBottomWidth: 1,
        borderColor: '#f6f6f6',
        flex: 1,
    },
    indexBox: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#f6f6f6',
        padding: 10,
    },
    textBox: {
        flex: 5, 
        padding: 10, 
    }
});

const mapStateToProps = ({ courses }) => {
    return{
        courses,
    }
};
const mapDispatchToProps = (dispatch) => {
    let actionCreators = bindActionCreators(courseActions, dispatch)
    return ({
        ...actionCreators,
        dispatch
    });
}
export default connect(mapStateToProps,mapDispatchToProps)(BookIndex);