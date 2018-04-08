import React from 'react'
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Actions } from '../../lib/Consts';
import ScreenStyle from '../../Config/Styles';
import { DrillTypes, ResultInputTypes } from '../../../Data/Data'
import { RenderIf, NumberToString } from '../../lib/Utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title : {
    flex : 1,
    marginLeft: 10,
    fontSize : 20  
  },
  resultInput : { 
    flex : 3,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor : 'lightgrey',
    paddingLeft : 10,
    marginRight : 5
  },
})

const generateWeightResult = (drillValueState, nextUnits, onResultTextChange) => {
    return (<View style={[ScreenStyle.horizontalContainer, ScreenStyle.alignCenter]}>
                <Text style={styles.title}>Weight</Text>
                <TextInput style={styles.resultInput} 
                           onChangeText={(text) => onResultTextChange(text)}
                           keyboardType='numeric'
                           value={drillValueState.value.toString()} underlineColorAndroid='rgba(0,0,0,0)'/>
                <Button style={{flex : 1}} title={drillValueState.units.acronym} onPress={nextUnits}/>
            </View>);
};

const generateDistanceResult = (drillValueState, nextUnits, onResultTextChange) => {
    return (<View style={{flex : 1}}>
                <Text style={styles.title}>Distance</Text>
                <View style={[ScreenStyle.horizontalContainer, ScreenStyle.alignCenter]}>
                    <TextInput style={styles.resultInput} keyboardType='numeric' 
                                onChangeText={(text) => onResultTextChange(text)}
                               value={drillValueState.value.toString()} underlineColorAndroid='rgba(0,0,0,0)'/>
                    <Button style={{flex : 1}} title={drillValueState.units.acronym} onPress={nextUnits}/>
                </View>
            </View>);
};

const generateTimedResult = (drillValueState, onTimeChange) => {
    return (<View style={{flex : 1}}>
                <Text style={styles.title}>Time</Text>
                <View style={[ScreenStyle.horizontalContainer, ScreenStyle.alignCenter]}>
                    <TextInput style={styles.resultInput} 
                               keyboardType='numeric' 
                               onChangeText={(text) => onTimeChange(text, drillValueState.timedValue.seconds)}
                               value={drillValueState.timedValue.minutes.toString()} underlineColorAndroid='rgba(0,0,0,0)'/>
                    <TextInput style={styles.resultInput} keyboardType='numeric' 
                               onChangeText={(text) => onTimeChange(drillValueState.timedValue.minutes, text)}
                               value={drillValueState.timedValue.seconds.toString()} underlineColorAndroid='rgba(0,0,0,0)'/>
                </View>
            </View>)
}

const generateReps = (reps, onRepsChange) => {
    return (<View style={[ScreenStyle.horizontalContainer, ScreenStyle.alignCenter]}>
                <Text style={styles.title}>Reps</Text>
                <TextInput style={styles.resultInput} 
                           onChangeText={(text) => onRepsChange(text)} keyboardType='numeric'
                           value={reps.toString()} underlineColorAndroid='rgba(0,0,0,0)'/>
            </View>);
};

// Check the type of the drill to know wich result type the component should render
const renderResultType = (drill, nextUnits, onResultTextChange) => {
    if(drill.type === DrillTypes.Weight) {
        return generateWeightResult(drill.drillValueState, nextUnits, onResultTextChange);
    } else if(drill.type === DrillTypes.Distance) {
        return generateDistanceResult(drill.drillValueState, nextUnits, onResultTextChange);
    } else {
        return null;
    }
}

// Check if the current drill is timed and render a timed result if so
const renderTimedResult = (drill, onTimeChange) => {
    if(drill.isTimed) {
        return generateTimedResult(drill.drillValueState, onTimeChange);
    } else {
        return null;
    }
}

// Check if the current drill needs a rep count and render a rep result if so
const renderRepsResult = (drill, onRepsChange) => {
    if(drill.type.hasReps) {
        return generateReps(drill.reps, onRepsChange)
    } else {
        return null;
    }
}

const ResultsInput = ({ drill, nextUnits, onResultTextChange, onTimeChange, onRepsChange, toggleTime }) => {
    let ResultBody;
    if(Object.keys(drill).length === 0 && drill.constructor === Object) {
        return (<View></View>);
    } else {
        
        let resultRender = renderResultType(drill, nextUnits, onResultTextChange);
        let timeResultRender = renderTimedResult(drill, onTimeChange);
        let repsRender = renderRepsResult(drill, onRepsChange);

        return(<View style={{flex : 1}}>
            {resultRender}
            {repsRender}
            {timeResultRender}
        </View>);
    }
}

const mapStateToProps = (state) => ({
    drill : state.newResult.pickedDrill
})

const mapDispatchToProps = (dispath) => ({
    toggleTime : () => dispath({type : Actions.NewResult.TOGGLE_TIMED}),
    nextUnits : () => dispath({type : Actions.NewResult.NEXT_DRILL_VALUE_STATE_UNITS}),
    onResultTextChange : (result) => {dispath({type : Actions.NewResult.ON_RESULT_CHANGE, result : result})},
    onRepsChange : (reps) => {dispath({type : Actions.NewResult.ON_REPS_CHANGE, reps : reps})},
    onTimeChange : (minutes, seconds) => {dispath({type : Actions.NewResult.ON_TIME_CHANGE, minutes : minutes, seconds : seconds})}
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultsInput);