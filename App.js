import React from 'react'
import { StyleSheet, View, AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
/*
* Both of the following files work for react-navigation
* Routes will always be added and supported by modifying
* the AppNavigation file.  Special redux actions/reducers
* will be handled in Redux Navigation
*   // use this to use react-navigation no redux
*   import AppNavigation from './Navigation/AppNavigation'
*
*   // use this to use react-navigation with redux
*   
*/

// We're going to use navigation with redux
import ReduxNavigation from './App/Navigation/ReduxNavigation'
import AppReducer from './App/Reducers/index';
import { middleware } from './App/lib/redux';


// create our store
const store = createStore(
  AppReducer,
  applyMiddleware(middleware),
);

class App extends React.Component {
  render() {
    return (
       <Provider store={store}>
          <View style={styles.container}>
            <ReduxNavigation />
          </View>
       </Provider> 
    )
  }
}

AppRegistry.registerComponent('App', () => App);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})