import React from 'react'
import { Text, View, FlatList, Image, AppState } from 'react-native';
import PropTypes from 'prop-types';
import ScreenStyle from '../../Config/Styles'
import { Actions } from '../../lib/Consts';

import styles from './styles';
import Storage from '../../lib/Storage';
import ResultItem from '../ResultItem/ResultItem'

class ResultsList extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isDataLoading : false,
      data : []
    }
  }

  componentWillMount() {
    var self = this;

      this.setState({isStoreLoading: true});
      let AllResults;

      Storage.GetAllStorageItems((allResults) => {
        
        allResults.sort(function(a,b){
            return new Date(b.dateTime) - new Date(a.dateTime);
          });

        self.setState({data: allResults});
        self.setState({isDataLoading: false});
      }, self.props.filter)
  }

  render() {
    
    if(this.state.isDataLoading) {
      return (<Text>Loading your results</Text>)
    } else {
      return (
        <View style={{flex : 7}}>
          <FlatList style={styles.resultList} data={this.state.data} renderItem={({item}) => {
            return (
            <ResultItem item={item} />
          )}}/>
        </View>)
    }
  }
}

export default ResultsList;