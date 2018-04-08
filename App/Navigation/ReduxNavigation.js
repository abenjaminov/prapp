import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation'
import PropTypes from 'prop-types';
import { addListener } from '../lib/redux';
import LoginScreen from '../Screens/Login'
import NewResultScreen from '../Screens/NewResult'
import SearchScreen from '../Screens/Search'
import HomeScreen from '../Screens/Home'
import DisplayResultsScreen from '../Screens/DisplayResults'
import DrawerButton from '../Components/DrawerButton/DrawerButton'

// drawer stack
const DrawerStack = DrawerNavigator({
  HomeScreen : { screen : HomeScreen},
  NewResultScreen : { 
    screen: NewResultScreen.screen,
    navigationOptions : NewResultScreen.navigationOptions
  },
  SearchScreen : {
    screen : SearchScreen.screen,
    navigationOptions : SearchScreen.navigationOptions
  },
  DisplayResultsScreen : {
    screen : DisplayResultsScreen.screen,
    navigationOptions : DisplayResultsScreen.navigationOptions
  }
}, {
  initialRouteName: 'HomeScreen'
})

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
      headerStyle: {
          backgroundColor: '#f4511e',
      },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold',
      },
    headerLeft: <DrawerButton />
  })
})

// login stack
const LoginStack = StackNavigator({
  loginScreen: { screen: LoginScreen },
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: 'red'},
    title: 'You are not logged in'
  }
})

// Manifest of possible screens
export const AppNavigator = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack'
})

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);