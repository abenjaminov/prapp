import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../Navigation/ReduxNavigation';
import { Actions } from '../lib/Consts';

import newResult from '../Reducers/NewResultReducer';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('loginStack');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction,
  tempNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case Actions.Navigation.LOGIN_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'drawerStack' }),
        state
      );
      break;
    case Actions.Navigation.SEARCH_SCREEN : {
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName : 'SearchScreen'}),
        state
      );
      break;
    }
    case  Actions.Navigation.NEW_RESULT_SCREEN : {
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName : 'NewResultScreen'}),
        state
      );
      break;
    }
    case Actions.Navigation.LOGOUT:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state 
      );
      break;
    case Actions.Drawer.OPEN : {
      console.log("Open")
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName: "DrawerOpen"}),
        state
      );
    }
    break;
    case Actions.Drawer.CLOSE : {
      console.log("Close")
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName: "DrawerClose"}),
        state
      );
    }
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case Actions.Navigation.LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

function drawer(state = {isOpen : false}, action) {
  switch (action.type) {
    case Actions.Drawer.OPEN:
      return { ...state, isOpen: true };
    case Actions.Drawer.CLOSE:
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth,
  drawer,
  newResult,
});

export default AppReducer;