import React, { Component, PropTypes } from 'react'
import { View, UIManager, findNodeHandle, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'; 
import { NavigationActions } from 'react-navigation';

import { onLogout } from '../actions/auth';

class PopupMenu extends Component {
  static propTypes = {
    // array of strings, will be list items of Menu
    actions:  PropTypes.arrayOf(PropTypes.string).isRequired,
   
  }

  constructor (props) {
    super(props)
    this.state = {
      icon: null
    }
  }

  onError () {
    console.log('Popup Error')
  }

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress
      )
    }
  }

  render () {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress} underlayColor='transparent'>
             <Icon 
                name='ellipsis-v'  
                size={25} 
                style={{color: '#fff',marginRight:20,padding: 10}} 
                ref={this.onRef}
              />
        </TouchableOpacity>
      </View>
    )
  }

  onRef = icon => {
    if (!this.state.icon) {
      this.setState({icon})
    }
  }
}

class RightMenu extends Component{
constructor(props){
  super(props)
}

render () {   
  
    return (
      <View>
        <PopupMenu actions={['Logout']} onPress={this.onPopupEvent.bind(this)} />
      </View>
    )
  }

  onPopupEvent = (eventName, index) => { 

    if (eventName !== 'itemSelected') return
    if (index === 0) {
      this.props.onLogout();
    } 
  }
  
  onNotification(){
    alert('Notification');
   
  } 
}

mapStateToProps = ({ Auth }) => {
  return ({
     isLoggedIn: Auth.isLoggedIn
  })
}


export default connect(mapStateToProps, { onLogout })(RightMenu);