
import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import { Card, ListItem, Button } from 'react-native-elements'
import moment from 'moment';


export default class SwiperScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleSwiper: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visibleSwiper: true
      });
    }, 0);
  }

  timestamp2date(time){   
    return moment.unix(time).format('DD.MM.YYYY, h:mm A');    
  }

  render() {
    let swiper = null;
    const item = this.props.data;  
    if (this.state.visibleSwiper && item != undefined) {
      return (
        <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
          <Swiper
            height={300} horizontal={true}
            loop={true} bounces={true}
            removeClippedSubviews={false}
            autoplay
          >
            {
              item.map((u, i) => {
                if(u.event_name != undefined){
                  return (
                    <View key={i} style={styles.slide}>
                      <View style={{ flex: 4 }}>
                        <Image
                          resizeMode='cover'
                          style={styles.image}
                          source={{ uri: u.img_url }}
                        />
                      </View>
                      <View >
                        <View style={[styles.SwipeTextBox, { marginTop: 10 }]}>
                          <Text style={styles.SwipeTextStyle}>
                            {u.fullname}
                          </Text>
                        </View>
                        <View style={styles.SwipeTextBox}>
                          <Text style={styles.SwipeTextStyle}>
                            {u.event_name}
                          </Text>
                        </View>
                        <View style={[styles.SwipeTextBox, { marginBottom: 10 }]}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.SwipeTextStyle}>
                              <MaterialIcons
                                name="access-time"
                                size={20}
                              />
                            </Text>
                            <Text style={styles.SwipeTextStyle}>{this.timestamp2date(u.start_date)} </Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.SwipeTextStyle}>
                              <MaterialIcons
                                name="videocam"
                                color='green'
                                size={20}
                              />
                            </Text>
                            <Text style={{ marginTop: 1, fontSize: 15, fontWeight: 'bold', color: 'green' }}>Live</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }else{
                  return (<View key={i} style={styles.slide}>
                    <View style={{ flex: 1 }}>
                      <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{ uri: u.url }}
                      />
                    </View>
                  </View>);
                }
              })
            }
          </Swiper>
        </ScrollView>

      );
    } else {
      return ( 
      <ActivityIndicator style={{ margin: 100 }}/> );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  indicateLive: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green'
  },
  icon: {
    flex: 1
  },
  slide: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginBottom: 20,
    elevation: 2,
  }, image: {
    flex: 1
  },
  SwipeTextBox: {
    paddingLeft: 10,
    flexDirection: 'row'
  },
  SwipeTextStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
    padding: 2
  },
  HeaderStyle: {
    fontSize: 15,
    paddingLeft: 10,
    marginTop: 15,
    color: '#212121',
    fontWeight: 'bold'
  },
  txtBox:{
    position: 'absolute', 
    bottom: 0,
    left:0,
    backgroundColor: 'rgba(0, 0, 0, 0.90)', 
    width: Dimensions.get('window').width
  }
});
