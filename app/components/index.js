
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { bindActionCreators } from 'redux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  StatusBar, 
  AsyncStorage 
} from 'react-native'; 
import Loading from './Loading';

import { AppNavigator, Login, AppMain } from '../config/Router';  
import * as myActions from '../actions/auth';
import { LoggedIn } from '../actions/auth';
class AppIndex extends Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            logged: false,
            loading: true,
        };
    }

    componentWillMount() {  
        AsyncStorage.getItem('username')
        .then((data) => {    
             if (data !== null) {
                 this.props.LoggedIn();
                this.setState({ 
                    loading: false,            
                }); 
             } else {
                 this.setState({
                    loading: false,
                });
             } 
        });  
    }
    _addNavigationHelpers = (navigation) => {
        const original = addNavigationHelpers(navigation);
        let debounce;
        return {
            ...original,
            navigateWithDebounce: (routeName, params, action) => {
                let func = () => {
                    if (debounce) {
                        return;
                    }

                    navigation.dispatch(NavigationActions.navigate({
                        routeName,
                        params,
                        action
                    }));

                    debounce = setTimeout(() => {
                        debounce = 0;
                    }, 1000)
                };
                return func();
            }
        }
    };
    render(){ 
        const { nav, dispatch } = this.props; 
        if (this.state.loading)  
            return (<Loading />); 
 
    return (<AppNavigator navigation={this._addNavigationHelpers({ dispatch, state: nav })}  />);  
 
    }
}

const mapStateToProps = ({ Auth, Nav }) => {
    return({
        isLoggedIn: Auth.isLoggedIn,
        nav: Nav
    })
}
const mapDispatchToProps = (dispatch) => { 
    let actionCreators = bindActionCreators(myActions, dispatch)
    return ({
        ...actionCreators,
        dispatch
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);