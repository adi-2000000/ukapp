import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import ProfilePage from './ProfilePage';// Assuming your ProfilePage component is in a separate file
import YourComponent from './YourComponent';
import TripTable from './complete_trip';
import HomePageScreen from './HomePage';

const Tab = createBottomTabNavigator();

const Logo = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={YourComponent}
        listeners={({ navigation, route }) => ({
          tabPress: (event) => {
            if (route.name === 'Home') {
              event.preventDefault();
            } else {
              navigation.navigate('Home', { screen: 'YourComponent' });
            }
          },
        })}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Logo;
