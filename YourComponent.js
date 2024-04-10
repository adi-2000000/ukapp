import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hooks
import AsyncStorage from '@react-native-async-storage/async-storage';

const YourComponent = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [driverData, setdriverData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const driverDataString = await AsyncStorage.getItem('driverData');
      if (driverDataString) {
        const driverData = JSON.parse(driverDataString);
        // Assuming 'drivername' is a key in the driver data obtained from AsyncStorage
        const response = await fetch(`http://192.168.1.3/UK_driverLogin/driverdashboard-api.php?drivername=${driverData.drivername}`);
        const responseData = await response.json(); // Get the response body as JSON directly
        console.log('Response from server:', responseData); // Log the response
        setdriverData(responseData);
      } else {
        console.error('driver data not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching driver data:', error);
    }
  };

  const handleTrackPress = () => {
    // Handle the button press action
    console.log("Track button pressed");
    // Navigate to the tracking page
    navigation.navigate('TrackingPage');
  };

  return (
    <View style={styles.container}>
      {driverData ? (
        // Driver Details Box
        <View style={[styles.box, styles.driverBox]}>
          <Text style={styles.boxTitle}>Driver Details</Text>
          <Text>Name: {driverData.name}</Text>
          <Text>License Number: {driverData.licenseNumber}</Text>
          <Text>Vehicle Model: {driverData.vehicleModel}</Text>
          {/* Track Button */}
          <TouchableOpacity style={styles.trackButton} onPress={handleTrackPress}>
            <Text style={styles.trackButtonText}>Track</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text></Text>
      )}

      {/* Profile Logos */}
      <View style={styles.profileContaine}>
        {/* Render profile logos here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 10,
     marginBottom: -60,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 20,
  },
  box: {
    // backgroundColor: 'skyblue',
    // padding: 30,
    // marginBottom: 20,
    // borderRadius: 10,
    // width: '60%',
    // borderWidth: 2,
    // borderColor: 'blue',
  },
  driverBox: {
    // borderTopWidth: 2,
    // borderTopColor: 'blue',
  },
  boxTitle: {
    // fontSize: 18,
    // fontWeight: 'bold',
    // marginBottom: 10,
  },
  trackButton: {
    // backgroundColor: '#007bff',
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // borderRadius: 5,
    // marginTop: 10,
  },
  trackButtonText: {
    // color: 'white',
    // fontWeight: 'bold',
    // fontSize: 16,
    // alignItems: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileBox: {
    backgroundColor: 'black',
    padding: 0,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: 'white',
    width: '22%',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  profileImage: {
    width: '100%',
    height: '10%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default YourComponent;
