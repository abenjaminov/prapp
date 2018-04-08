import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity,TextInput,Button, Alert } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ScreenStyle from '../Config/Styles'
import ResultsInput from '../Components/ResultsInput/ResultsInput';
import SaveButton from '../Components/SaveButton/SaveButton'
import { Actions } from '../lib/Consts';
import ResultsList from '../Components/ResultsList/ResultsList';

const styles = StyleSheet.create({
  button : {
    flex : 3,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  title : {
    flex : 1,
    marginLeft: 10,
    fontSize : 20  
  }
})

const NewResultScreen = ({ navigation, currentDrill,searchDrill, error,resetError }) => {
  const searchBoxText = "Search Drill.."

  let HistoryCondition = currentDrill.id ? (item) => currentDrill.id === item.id : (item) => false;
  
  if(error) {
    Alert.alert(
      error.title,
      error.message,
      [
        {text: 'OK', onPress: resetError},
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={ScreenStyle.verticalContainer}>
      <View style={[ScreenStyle.horizontalContainer,ScreenStyle.alignCenter]}>
          <Text style={styles.title}>Drill</Text>
          <TouchableOpacity style={styles.button} onPress={searchDrill}>
            <Text> {!currentDrill.name ? "Search Drill..." : currentDrill.name} </Text>
          </TouchableOpacity>
      </View>
      <View style={ScreenStyle.verticalContainer}>
          <ResultsInput style={{flex : 1}}/>
      </View>
      <View style={{flex : 3}}>
          <Text style={styles.title}>History</Text>
          <ResultsList filter={HistoryCondition}/>
      </View>
    </View>
)}
  
NewResultScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

NewResultScreen.navigationOptions = {
  title: 'New Result',
};

const mapStateToProps = state => ({
  currentDrill : state.newResult.pickedDrill,
  error : state.newResult.error
});

const mapDispatchToProps = dispatch => ({
  save: () => dispatch({ type: Actions.NewResult.SAVE_NEW_RESULT }),
  searchDrill : () => dispatch({type : Actions.Navigation.SEARCH_SCREEN}),
  resetError : () => dispatch({type : Actions.NewResult.RESET_ERROR})
});

export default {
  screen : connect(mapStateToProps, mapDispatchToProps)(NewResultScreen),
  navigationOptions : {
    title : "Enter a new result",
    headerRight : (<SaveButton dispatchEvent={Actions.NewResult.SAVE_NEW_RESULT}/>),
  }
}