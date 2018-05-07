import React, { Component } from 'react';
import { View, 
    Text, 
    Image, 
    TouchableOpacity, 
    TouchableHighlight, 
    ScrollView ,
    ActivityIndicator,
    AsyncStorage,
    BackHandler
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions } from 'react-navigation';
import { _ } from 'lodash';

import { seeMore, selectBook, viewBook, getCourseOutline } from '../actions/courses';
import { SBHeaderStyle, headerProp } from '../config/Config';

class CoursesOutline extends Component {
    static navigationOptions = ({ navigation }) => { 
        
        const header = headerProp(navigation);
        header.headerLeft = <TouchableHighlight
            underlayColor='transparent'
            onPress={() =>  { 
                if(navigation.state.routeName == 'BS2Main'){
                  return navigation.dispatch(NavigationActions.navigate({ routeName: navigation.state.params.route }));
                }else if(navigation.state.params.route == 'Home'){
                  return navigation.dispatch(NavigationActions.navigate({ routeName: navigation.state.params.route }));
                }else{
                    return navigation.navigate('BS1');
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
        header.headerTitle = 'Topic Outline';

        return (header);
    };

    constructor(props) {
        
        super(props);  
        
        const { params } = this.props.navigation.state; 
        this.props.getCourseOutline(params.id);

        this.state = { course : null, cach_uname:null}
        this._loadInitialState().done(); 
    } 
    _loadInitialState = async () => {
      var uname = await AsyncStorage.getItem('username');
      this.setState({
        cach_uname:uname
      })
    }

    handleBackButtonClick() {
        
        if(this.props.navigation.state.routeName == 'BS2Main'){
          return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: this.props.navigation.state.params.route }));
        }else if(this.props.navigation.state.params.route == 'Home'){
          return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: this.props.navigation.state.params.route }));
        }
        else{
            return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'BS1' }));
        }       
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }
    componentWillReceiveProps(nextProps){  
        this.setState({ course: nextProps.course })
    }

    renderNode(node, index) {
        if (node.name === 'seeall') {
            return (
                <TouchableOpacity onPress={() => this.props.seeMore(desc)} key={index}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.buttonSeeAll}>
                            See All
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }


    render() {   
        if (_.isEmpty(this.state.course)){
            return (<View style={{ flex: 1 }}>
                <ActivityIndicator style={{ margin: 100 }} />
            </View>)
        }
        const {id, desc, prof_img, fname , lname, city, img_url, name } = this.state.course; 
        
        const { thumbnailStyle } = styles; 
        
        const img = (img_url == '') ? require('../assets/images/img404_lg.jpg') : { uri: img_url };
        const p_img = (prof_img == '') ? require('../assets/images/avatar.png') : { uri: prof_img };

        return (
            <View style={styles.parent}>
                <View>
                    <Image style={thumbnailStyle} source={img} />
                </View>
                <View style={styles.floatView}>
                    <Text style={styles.floatText}>{ name }</Text>
                </View>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    <View style={styles.WebView}>
                        <View style={styles.heading}>
                            <Text style={styles.headText}>
                                Course Outline
                            </Text>
                        </View>
                        <View style={{height: 100 }}>
                            <HTMLView value={desc} renderNode={this.renderNode.bind(this)} />
                        </View> 
                        <TouchableOpacity 
                        onPress={  () => {
                            if(this.props.navigation.state.routeName == 'BS2Main'){
                              return this.props.navigation.navigate('BS3Main', { c_id:id, outline: desc,route:this.props.navigation.state.params.route })  
                            }else{
                              return this.props.navigation.navigate('BS3', { c_id:id, outline: desc });
                            }
                        }}  
                        >
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.buttonSeeAll}>
                                        See All
                                     </Text>
                                </View>
                            </TouchableOpacity> 
                    </View>
                    <View style={styles.WebView}>
                        <View style={styles.heading}>
                            <Text style={styles.headText}>
                                Delivered by
                                </Text>
                        </View >
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View>
                                <Image 
                                style={{ height: 50, width: 50, borderRadius: 50, }} 
                                source={p_img} 
                                defaultSource={require('../assets/images/img123.png')}
                            />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <View style={{ paddingBottom: 2 }}>
                                    <Text style={{ fontSize: 15, color: '#2b2b2b', fontWeight: '600' }}>{ fname+ " "+ lname }</Text>
                                </View>
                                <View >
                                    <Text style={{ fontSize: 13, color: '#2b2b2b' }}>{ city }</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.footer} 
                    onPress={  () => {
                        if(this.props.navigation.state.routeName == 'BS2Main'){
                          return this.props.navigation.navigate('BS4Main', { data: this.state.course, route:this.props.navigation.state.params.route });  
                        }else{
                          return this.props.navigation.navigate('BS4', { data: this.state.course });
                        }
                    }} 
                >
                    <View >
                        <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>
                            View Book
                        </Text>
                    </View>
                </ TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        marginBottom: 50,
    },
    thumbnailStyle: {
        width: null,
        height: 200,
    },
    floatView: {
        position: 'absolute',
        height: 50,
        // width,
        top: 150,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    parent: {
        flex: 1,
    },
    floatText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center'
    },
    heading: {
        marginTop: 10
    },
    headText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18
    },
    WebView:
    {
        marginTop: 20,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        borderTopColor: '#eee',
        borderTopWidth: 1,
        paddingTop: 0,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#fff'
    },
    buttonSeeAll: {
        padding: 10,
        borderWidth: 1,
        color: '#007cab',
        borderRadius: 5,
        borderColor: '#007cab'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 15,
        backgroundColor: '#f8576b',
        left: 0,
        right: 0,
    },
};

const mapStateToProps = ({ courses }) => {
    return({
        course: courses.outline
    })
}

export default connect(mapStateToProps, { seeMore, selectBook, viewBook, getCourseOutline })(CoursesOutline);
