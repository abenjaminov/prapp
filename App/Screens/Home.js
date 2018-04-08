import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Actions } from '../lib/Consts';

import Storage from '../lib/Storage'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linky: {
    color: 'blue',
    paddingTop: 10
  }
})

const HomeScreen = ({ navigation, enterNewResult,test,clearStorage }) => (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="New Result" onPress={enterNewResult}/>
      <Button title="Display" onPress={test}/>
      <Button title="Clear Storage" onPress={clearStorage}/>
    </View>
)

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

HomeScreen.navigationOptions = {
  title: 'Home',
};

const mapStateToProps = state => ({
    
  });
  
  const mapDispatchToProps = dispatch => ({
    enterNewResult: () => dispatch({ type: Actions.Navigation.NEW_RESULT_SCREEN }),
    test : () => {console.log(Storage.GetAllStorageItems((allValues) => {
      console.log(allValues);
    }))},
    clearStorage : () => {Storage.ClearAppStorage()}
  });

  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

