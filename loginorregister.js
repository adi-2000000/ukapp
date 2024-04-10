import React from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet, BackHandler } from 'react-native';

const loginregister = ({ navigation }) => {
  const handleLoginPress = () => {
    // Navigate to the login form screen
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    // Navigate to the register form screen
    navigation.navigate('Register');
  };

  const closeApp = () => {
    BackHandler.exitApp();
  };

  const handleSkipPress = () => {
    closeApp();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to User App</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: "#A9D6E5",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#468FAF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#013A63',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#468FAf',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default loginregister;
