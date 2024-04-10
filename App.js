import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegisterUser from './RegisterUser';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './Login';
// import WelcomePage from './WelcomePage';
// import UserDashboard from './UserDashboard';
import HomePage from './HomePage';
import Offers from './Offers';
import ProfilePage from './ProfilePage';
// import YourTrips from './YourTrips';
import YourTrips from './complete_trip';

import Logo from './logo';
import Trips from './Trips';


// import Home from './Home';
// import offers from './offers';
import TripTable from './complete_trip';
import loginregister from './loginorregister';
import Splash from './Splash';
import UpcomingTrip1 from './UpcomingTrip1';
import Offers1 from './Offers1';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
      <Stack.Screen name="LoginRegister" component={loginregister} />
        <Stack.Screen name="Register" component={RegisterUser} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="Offers1" component={Offers1} />
      
        <Stack.Screen name="YourTrips" component={YourTrips} />
        <Stack.Screen name="CompleteTrip" component={TripTable} />
        <Stack.Screen name="Logo" component={Logo} />
        <Stack.Screen name="Trips" component={Trips} />
        <Stack.Screen name="UpcomingTrip1" component={UpcomingTrip1} />
       
        {/* <Stack.Screen name="UserDashboard" component={UserDashboard} /> */}
        {/* <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="offers" component={offers} />
        <Stack.Screen name="Book" component={Book} />
        <Stack.Screen name="Trip" component={Trip} /> */}





        {/* Other screens go here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
