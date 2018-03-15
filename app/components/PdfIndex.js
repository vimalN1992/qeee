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

class VideoIndex extends Component {
  static navigationOptions = ({ navigation }) => { 
        const header = headerProp(navigation);
        header.headerLeft = <TouchableHighlight
            underlayColor='transparent'
            onPress={() =>  { 
                if(navigation.state.routeName == 'pdfMain'){
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
      if(this.props.navigation.state.routeName == 'pdfMain'){
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

      const data = _.remove(_.map(nextProps.courses.BookIndex.index, function (v, id) {
            return _.map(v.data.pdf, function (d) { 
                return { 
                    id,
                    name: v.title + ' ' + d.title,
                    source: d.source
                }
            })
        }), function (n) {
            return _.size(n) != 0;
        });

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          item: data,
          loading: false,
          dataSource: ds.cloneWithRows([].concat.apply([], data)),
        });    
    }

 _renderRow(rowData, s, i) {
    return (   
        <ListItem
        roundAvatar
        title={rowData.name}
        rightIcon = {<Icon />}
        containerStyle={{backgroundColor:'#fff'}}
        onPress={  () => {
            if(this.props.navigation.state.routeName == 'pdfMain'){
              return this.props.navigation.navigate('BS8Main', { data:rowData, cdata: this.props.navigation.state.params.data, id:this.props.navigation.state.params.data.id, name:this.props.navigation.state.params.data.name, route:this.props.navigation.state.params.route });  
            }else{
              return this.props.navigation.navigate('BS8', { data:rowData, cdata: this.props.navigation.state.params.data,id:this.props.navigation.state.params.data.id, name:this.props.navigation.state.params.data.name,route:this.props.navigation.state.params.route });
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
    }else if(_.isEmpty(this.state.item)){
       return(<View style={styles.bgcontainer}>
            <Text style={styles.paragraph}>
              Pdf aren't Available
            </Text>
          </View>);
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
    bgcontainer: {
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
export default connect(mapStateToProps,mapDispatchToProps)(VideoIndex);