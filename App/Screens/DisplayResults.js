import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, AppState } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScreenStyle from '../Config/Styles'
import { Actions } from '../lib/Consts';

import ResultsList from '../Components/ResultsList/ResultsList';

import Storage from '../lib/Storage';
import ResultItem from '../Components/ResultItem/ResultItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  resultList : {
    flex : 1
  },
})

const DisplayResultsScreen = ({}) => (
    <ResultsList />
)

DisplayResultsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

DisplayResultsScreen.navigationOptions = {
  title: 'Display Results',
};

const mapStateToProps = state => ({
    
});
  
const mapDispatchToProps = dispatch => ({
  
});

  export default {
    screen : connect(mapStateToProps, mapDispatchToProps)(DisplayResultsScreen),
    navigationOptions : {
      title : "Results"
    }
  }