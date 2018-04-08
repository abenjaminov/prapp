import React from 'react';
import { Button, View, Text,  } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Consts from './Components/Consts';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen2</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate(Consts.ScreenNames.DetailsScreen, {
            itemId: 86,
            otherParam: 'anything you want here',
          })}
        />
        
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
    }
  };

  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherParam = params ? params.otherParam : null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({otherParam: 'Asaf'})}
        />
      </View>
    );
  }
}

const RootStack = StackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },{
    initialRouteName: 'Home',
    navigationOptions : {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}



//////////////////////////////////////////////


import React from 'react';
import { Button, View, Text, StyleSheet  } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import Consts from './Components/Consts';

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    drawerLabel: 'Home',
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notificationsssss"
      />
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const MyApp = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  }},{
    initialRouteName: 'Home',
    navigationOptions : {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

export default class App extends React.Component {
  render() {
    return <MyApp />;
  }
}