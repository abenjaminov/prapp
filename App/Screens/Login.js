import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

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

const LoginScreen = ({ navigation }) => (
    <View style={styles.container}>
      <Text>I am Login Screen</Text>

      <Text
        style={styles.linky}
        onPress={() => navigation.dispatch({type :'signupScreen'})} >
        Go to Signup
      </Text>

      <Text
        style={styles.linky}
        onPress={() => navigation.dispatch({type :'forgottenPasswordScreen'})} >
        Go to Forgot Password
      </Text>

      <Text
        style={styles.linky}
        onPress={() => navigation.dispatch({type :'LOGIN_SUCCESS'})} >
        Pretend we logged in
      </Text>
    </View>
)

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

LoginScreen.navigationOptions = {
  title: 'Log In',
};

export default LoginScreen;

