import React from 'react'
import { StyleSheet } from 'react-native'

export default screenStyles = StyleSheet.create({
    verticalContainer: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection : 'column'
    },
    horizontalContainer : {
      flex : 1,
      backgroundColor : '#fff',
      flexDirection : 'row',
    },
    alignCenter : {
       justifyContent: 'center', 
       alignItems: 'center'
    }
  })