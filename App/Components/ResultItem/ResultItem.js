import React from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ScreenStyle from '../../Config/Styles'
import styles from './styles'
import { DrillTypes } from '../../../Data/Data'
import { NumberToString } from '../../lib/Utils';

const createDate = (dateString) => {
  let date = new Date(dateString);

  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

class ResultItem extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {

      let item = this.props.item
      let value = item.value + (item.units ? " " + item.units.acronym : "");

      let imageSRC = item.isPersonalBest ? require('../../Images/y-star.png') : require('../../Images/star.png');

      let resultDataReder = null;
      let timedValueRender = null;
      
      if(item.timedValue) {
        timedValueRender = <Text style={styles.resultValue}>{NumberToString(item.timedValue.minutes) + ":" + NumberToString(item.timedValue.seconds)}</Text>;
      }


      if(item.typeID === DrillTypes.Distance.id) {
        resultDataReder = (<View style={ScreenStyle.horizontalContainer}>
                        <Text style={styles.resultValue}>{value}</Text>
                        {timedValueRender}
                      </View>)
      } else if(item.typeID === DrillTypes.BodyWeight.id) {
        resultDataReder = (<View style={ScreenStyle.horizontalContainer}>
                        <Text style={styles.resultReps}>{item.reps} {item.reps < 2 ? "Rep" : "Reps"}</Text>
                        {timedValueRender}
                      </View>)
      }  else if(item.typeID === DrillTypes.Weight.id) {
        resultDataReder = (<View style={ScreenStyle.horizontalContainer}>
                        <Text style={styles.resultReps}>{item.reps} {item.reps < 2 ? "Rep" : "Reps"}</Text>
                        <Text style={styles.resultValue}>{value}</Text>
                        {timedValueRender}
                      </View>)
      }

        return (
            <View style={styles.resultContainer}>
              <View style={ScreenStyle.horizontalContainer}>
              <View style={[ScreenStyle.horizontalContainer, styles.resultName]}>
                <Text style={{fontWeight : 'bold'}}>{item.name}</Text>
                <Text> on {createDate(item.dateTime)}</Text>
              </View>
                
                <Image source={imageSRC} style={{width: 20, height: 20,}}/>
              </View>  
                {resultDataReder}
            </View>
          )
    } 
}

// REDUX MAPPING
const mapState = state => ({
})

const mapDispatch = dispatch => ({
    
})

export default connect(mapState, mapDispatch)(ResultItem);