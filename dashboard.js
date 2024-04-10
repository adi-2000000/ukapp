
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './WelcomePage'; // Import TabNavigator
import HomePage from './HomePage';


const Homepage = () => {
    return (
      <Stack.Navigator>
        {/* <Stack.Screen name="HomePage" component={HomePage} /> */}
        {/* <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}
      </Stack.Navigator>
    );
  };
  export default Homepage;