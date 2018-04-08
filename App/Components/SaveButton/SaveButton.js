import React from 'react'
import { StyleSheet, Text,TouchableOpacity,TextInput,Button, Image } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';


class SaveButton extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <TouchableOpacity onPress={() => this.props.saveContent(this.props.dispatchEvent)}>
                <Image source={require('../../Images/save.png')} style={{width: 25, height: 25, marginRight : 5}}/>
            </TouchableOpacity>
            )
    } 
}

// REDUX MAPPING
const mapState = state => ({
})

const mapDispatch = dispatch => ({
    saveContent : (dispatchEvent) => {dispatch({type : dispatchEvent})}
})

export default connect(mapState, mapDispatch)(SaveButton);