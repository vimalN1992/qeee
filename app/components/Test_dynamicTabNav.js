import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.5.2

const FooScreen = () => <Center><Text>Fooo</Text></Center>;
const BarScreen = () => <Center><Text>Barr</Text></Center>;

const components = {
  Foo: FooScreen,
  Bar: BarScreen,
};

const Center = ({ children }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>{children}</View>
);

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const pages = [
      { screenName: 'Foo', componentName: 'Foo' },
      { screenName: 'Bar', componentName: 'Bar' },
    ];
    
    setTimeout(() => {
      const screens = {};
      pages.forEach(page => {
        screens[page.screenName] = { screen: components[page.componentName] };
      });
      this.setState({ tabs: TabNavigator(screens,
        {
          tabBarOptions: { 
            scrollEnabled:true,
            style: {
                backgroundColor: '#32313F',
            },
            tabStyle: {
              width: 155,    
            },
          },
          lazy: true
        }) 
      });
    }, 2000);
  }

  render() {
    if (this.state.tabs) {
      return <this.state.tabs />;
    }
    return <Center><Text>Loading...</Text></Center>;
  }
}
