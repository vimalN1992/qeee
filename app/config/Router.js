import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBar,
    View,
    Image,
    AsyncStorage
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Cur_Phase_Course from '../components/cur_phase_courses.js';

import Phase_1 from '../components/phase1.js';
import Phase_2 from '../components/phase2.js';
import Phase_3 from '../components/phase3.js';
import Phase_7 from '../components/phase7.js';
import Phase_8 from '../components/phase8.js';
import Phase_9 from '../components/phase9.js';
import Phase_10 from '../components/phase10.js';
import LoginScreen from '../components/LoginScreen';
import LoadingScreen from '../components/LoadingScreen';
import HomeScreen from '../components/HomeScreen';
import FlatScroll from '../components/FlatScroll';
import Sessions from '../components/Session';
import CourseScreen from '../components/CourseScreen';
import ForumScreen from '../components/ForumScreen';
import ForumDiscussion from '../components/ForumDiscussion';
import CalendarScreen from '../components/CalendarScreen';
import AgendaScreen from '../components/CalendarScreen2';
import ProfileScreen from '../components/ProfileScreen';
import EditScreen from '../components/ProfileEdit';
import NotificationScreen from '../components/NotificationScreen';
import NotificationView from '../components/Noti_view';
import Loading from '../components/Loading'; 
import DrawerLeftConfig from '../components/DrawerLeftConfig'; 
import BrowseScreen from '../components/BrowseScreen.js';
import CourseOutline from '../components/CourseOutline.js';
import Description from '../components/Description.js';
import BookIndex from '../components/BookIndex.js';
import VideoIndex from '../components/VideoIndex.js';
import PdfIndex from '../components/PdfIndex.js';
import ViewBookWebView from '../components/ViewBook.js';
import VP from '../components/VideoPlayer.js';
import PDF from '../components/PDF_download.js';

import { SBHeaderStyle, headerProp } from '../config/Config'; 

const ForumStack = StackNavigator({
    Course: {  screen: CourseScreen },
    ForumList: { screen: ForumScreen }, 
    ForumDiscussion: { screen: ForumDiscussion  },
});

const ProfileStack = StackNavigator({ 
      Profile: { screen: ProfileScreen },
      Edit: { screen: EditScreen, navigationOptions: { tabBarVisible: false } }
    },{
      headerMode: 'none'
});

const HomeStack = StackNavigator({ 
    Home: { screen: HomeScreen},
    Session: { screen: Sessions, navigationOptions: { tabBarVisible: false } },  
    },{
    headerMode: 'none'
});

export const BrwCourseTab = TabNavigator({
    chapter : {
        screen: BookIndex,
        navigationOptions: { 
            tabBarLabel: 'Chapters'
        }
    },
    video: {
        screen: VideoIndex,
        navigationOptions: {
            tabBarLabel: 'Videos'
        }
    },
    pdf: {
        screen: PdfIndex,
        navigationOptions: {
            tabBarLabel: 'Pdf Files'
        }
    }      
}, {tabBarOptions: { 
        scrollEnabled:true,
        style: {
            backgroundColor: '#32313F',
        },
        tabStyle: {
            width: 135,    
        },
    },
    lazy: true
     });
export const BrwCourseTabMain = TabNavigator({
    chapterMain : {
        screen: BookIndex,
        navigationOptions: { 
            tabBarLabel: 'Chapters'
        }
    } ,
    videoMain: {
        screen: VideoIndex,
        navigationOptions: {
            tabBarLabel: 'Videos'
        }
    },
    pdfMain: {
        screen: PdfIndex,
        navigationOptions: {
            tabBarLabel: 'Pdf Files'
        }
    }      
}, {tabBarOptions: { 
        scrollEnabled:true,
        style: {
            backgroundColor: '#32313F',
        },
        tabStyle: {
            width: 135,    
        },
    },
    lazy: true
     });

const BrowseStack = StackNavigator({ 
    BS1: { screen: BrowseScreen},
    BS2: { screen: CourseOutline, navigationOptions: { tabBarVisible: false }},
    BS3: { screen: Description, navigationOptions: { tabBarVisible: false }},
    BS4: { screen: BrwCourseTab, navigationOptions: { tabBarVisible: false }},
    BS6: { screen: ViewBookWebView, navigationOptions: { tabBarVisible: false }},
    BS7: { screen: VP, navigationOptions: { tabBarVisible: false }},
    BS8: { screen: PDF, navigationOptions: { tabBarVisible: false }}
},{
      headerMode: 'none'
});



const TabBar = TabNavigator({
    HomeStack: {
        screen: StackNavigator({ Home: { screen: HomeStack}}),
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name='home' size={25} color={tintColor} />,
            tabBarLabel: 'Home'
        }
    },
    BStack: {
        screen: StackNavigator({BS1: {screen: BrowseStack}}),
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name='play-circle-o' size={25} color={tintColor} />,
            tabBarLabel: 'Browse',
        }
    },
    Profile: {
        screen: StackNavigator({ Profile: { screen: ProfileStack } }),
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => <Icon name='user-circle-o' size={20} color={tintColor} />
        }
    },
    NotificationStack: {
        screen: StackNavigator({
            Notification: { screen: NotificationScreen },
            NotiView: {screen: NotificationView}
        }),
    },
}, {
        tabBarOptions: {
            activeTintColor: 'green',
            showIcon: true,
            style: { backgroundColor: 'whitesmoke', borderTopWidth: 0.5, borderTopColor: '#dadada' },
            inactiveTintColor: 'black',
            upperCaseLabel: false,
            tabStyle: { padding: 0, margin: 0, alignSelf: 'center' },
            indicatorStyle: { opacity: 0 },
            pressColor: 'gray',
            labelStyle: { fontSize: 11, marginTop: 0, },
        },
        tabBarPosition: 'bottom',
        initialRouteName: 'HomeStack',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
    });

export const CalendarStack = StackNavigator({ 
      Calendar: { screen: CalendarScreen },
      Agenda: { screen: AgendaScreen }
  });

export const Cur_Phase_CourseStack = StackNavigator({ 
      Cur_Phase_Course: { screen: Cur_Phase_Course }
  });

const DrawerRouteConfigs = {
    Home: {
        path: '/',
        screen: TabBar
    },
    Forum: {
        path: '/forum',
        screen: ForumStack,
    },
    Calendar: {
        path: '/calendar',
        screen: CalendarStack,
    },
    Current_Phase_Courses : {
        path: '/cur_pha_crses',
        screen: Cur_Phase_CourseStack,
    }
}
const DrawerNavigatorConfig = {
    contentOptions: {
        inactiveTintColor: 'white',
        activeTintColor: 'white',
        activeBackgroundColor: '#28262b',
        style: {    
            flex: 1
        }
    },
    contentComponent: DrawerLeftConfig,
    initialRouteName: 'Home'
}


export const DrawerNav = DrawerNavigator(DrawerRouteConfigs, DrawerNavigatorConfig); 

export const AllcourseTabView = TabNavigator({
    Phase1 : {
        screen: Phase_1,
        navigationOptions: { 
            tabBarLabel: 'Jan-Apr 2015'
        }
    } ,
    Phase2: {
        screen: Phase_2,
        navigationOptions: {
            tabBarLabel: 'Aug-Nov 2015'
        }
    },
    Phase3: {
        screen: Phase_3,
        navigationOptions: {
            tabBarLabel: 'Jan-Apr 2016'
        }
    },
    Phase4 : {
        screen: Phase_7,
        navigationOptions: { 
            tabBarLabel: 'Aug-Nov 2016'
        }
    } ,
    Phase5: {
        screen: Phase_8,
        navigationOptions: {
            tabBarLabel: 'Jan-Apr 2017'
        }
    },
    Phase6: {
        screen: Phase_9,
        navigationOptions: {
            tabBarLabel: 'Aug-Nov 2017'
        }
    },
    Phase7: {
        screen: Phase_10,
        navigationOptions: {
            tabBarLabel: 'Jan-Apr 2018'
        }
    },      
}, {tabBarOptions: { 
        scrollEnabled:true,
        style: {
            backgroundColor: '#32313F',
        },
        tabStyle: {
            width: 100,    
        },
    },
    lazy: true
     });


const AppNavigatorStack = {
    AllCourse:{ screen: StackNavigator({
        Skip: { screen: AllcourseTabView },
        BS2Main: { screen: CourseOutline, navigationOptions: { tabBarVisible: false }},
        BS3Main: { screen: Description, navigationOptions: { tabBarVisible: false }},
        BS4Main: { screen: BrwCourseTabMain, navigationOptions: { tabBarVisible: false }},
        BS6Main: { screen: ViewBookWebView, navigationOptions: { tabBarVisible: false }},
        BS7Main: { screen: VP, navigationOptions: { tabBarVisible: false }},
        BS8Main: { screen: PDF, navigationOptions: { tabBarVisible: false }}
    }) },
    Login: { screen: LoginScreen },
    Main: { screen: DrawerNav }   
};

export const AppNavigator = StackNavigator( AppNavigatorStack , { headerMode: 'none' } );