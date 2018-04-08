import React from 'react'
import { StyleSheet, Text,TouchableOpacity,TextInput,Button, Image } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Actions } from '../../lib/Consts';


const DrawerButton = ({drawerOpen, toggleDrawer}) => {
    
    return (
    <TouchableOpacity onPress={() => toggleDrawer(drawerOpen)}>
        <Image source={require('../../Images/menu.png')} style={{width: 25, height: 25, marginLeft : 5}}/>
    </TouchableOpacity>
    )
}

// REDUX MAPPING
const mapState = state => ({
    drawerOpen : state.drawer.isOpen
})

const mapDispatch = dispatch => ({
    toggleDrawer: (isOpen) => isOpen ? dispatch({type : Actions.Drawer.CLOSE}) : dispatch({type : Actions.Drawer.OPEN})
})

export default connect(mapState, mapDispatch)(DrawerButton);