import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your components
import YourTrips from './complete_trip';
import Offers from './Offers1'; // assuming you have a separate component named Offers
import ProfilePage from './ProfilePage'; // Import ProfilePage component
import Trips from './Trips';

// Create Tab navigator
const Tab = createBottomTabNavigator();

// Define Home Screen component
const HomeScreen = ({ route }) => {
  const { employeeId } = route.params; // Destructure route.params inside the component body

  const [trips, setTrips] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAdditionalDetails, setLoadingAdditionalDetails] = useState(true);

  useEffect(() => {
      const fetchTrips = async () => {
          try {
              const response = await fetch(`http://192.168.1.3/UK_UserLogin/userdashboard-api.php?employee_id=${employeeId}`);
              console.log(response);
              if (response.ok) {
                  const data = await response.json();
                  setTrips(data);
              } else {
                  console.error('Error fetching trips:', response.status);
              }
          } catch (error) {
              console.error('Error fetching trips:', error);
          } finally {
              setLoading(false);
          }
      };

      fetchTrips();
  }, [employeeId]);

  useEffect(() => {
      const fetchAdditionalDetails = async () => {
          try {
              const response = await fetch(`http://192.168.1.3/UK_UserLogin/userdashboarddrop-api.php?employee_id=${employeeId}`);
              if (response.ok) {
                  const data = await response.json();
                  setAdditionalDetails(data);
              } else {
                  console.error('Error fetching additional details:', response.status);
              }
          } catch (error) {
              console.error('Error fetching additional details:', error);
          } finally {
              setLoadingAdditionalDetails(false); // Corrected the loading state
          }
      };

      fetchAdditionalDetails();
  }, [employeeId]);

  return (
      <ScrollView style={styles.container} vertical={true}>
          <View>
              <Text style={styles.sectionTitle}>Upcoming Trips Table</Text>
              {loading ? (
                  <ActivityIndicator size="large" color="blue" style={styles.loadingIndicator} />
              ) : (
                  <ScrollView horizontal={true}>
                      <View style={styles.table}>
                          <View style={[styles.row, styles.header]}>
                              <Text style={styles.cellLabel}>Employee ID</Text>
                              <Text style={styles.cellLabel}>Driver Name</Text>
                              <Text style={styles.cellLabel}>Cab No</Text>
                              <Text style={styles.cellLabel}>pickup_timings</Text>
                              <Text style={styles.cellLabel}>Pickup_Date</Text>
                              <Text style={styles.cellLabel}>in_timing</Text>
                          </View>
                          {trips.map((trip, index) => (
                              <View key={index} style={styles.row}>
                                  <Text style={styles.cellValue}>{trip.employee_id}</Text>
                                  <Text style={styles.cellValue}>{trip.driver_name}</Text>
                                  <Text style={styles.cellValue}>{trip.cab_no}</Text>
                                  <Text style={styles.cellValue}>{trip.pickup_timings}</Text>
                                  <Text style={styles.cellValue}>{trip.pickup_date}</Text>
                                  <Text style={styles.cellValue}>{trip.in_timing}</Text>
                              </View>
                          ))}
                      </View>
                  </ScrollView>
              )}
          </View>

          <View>
              <Text style={styles.sectionTitle}>Drop Trip Details</Text>
              {loadingAdditionalDetails ? (
                  <ActivityIndicator size="large" color="blue" style={styles.loadingIndicator} />
              ) : (
                  <ScrollView horizontal={true}>
                      <View style={styles.table}>
                          <View style={styles.mar}>
                          <View style={[styles.row, styles.header]}>
                              <Text style={styles.cellLabel}>Employee ID</Text>
                              <Text style={styles.cellLabel}>Driver Name</Text>
                              <Text style={styles.cellLabel}>Cab No</Text>
                              <Text style={styles.cellLabel}>Drop_timings</Text>
                              <Text style={styles.cellLabel}>drop_Date</Text>
                              <Text style={styles.cellLabel}>out_timing</Text>
                          </View>
                          {additionalDetails.map((detail, index) => (
                              <View key={index} style={[styles.row]}>
                                  <Text style={styles.cellValue}>{detail.employee_id}</Text>
                                  <Text style={styles.cellValue}>{detail.driver_name}</Text>
                                  <Text style={styles.cellValue}>{detail.cab_no}</Text>
                                  <Text style={styles.cellValue}>{detail.drop_timings}</Text>
                                  <Text style={styles.cellValue}>{detail.drop_date}</Text>
                                  <Text style={styles.cellValue}>{detail.out_timing}</Text>
                              </View>
                          ))}
                      </View>
                      </View>
                  </ScrollView>
              )}
          </View>
      </ScrollView>
  );
};

// Create Tab navigator component
const TabNavigator = ({ route }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        // Pass the employeeId as a screen parameter to the HomeScreen component
        initialParams={{ employeeId: route.params?.employeeId }}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          unmountOnBlur: true, // Ensure only one instance of the "Home" screen is displayed
        }}
      />
      <Tab.Screen
        name="Trips"
        component={Trips}
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={Offers}
        options={{
          tabBarLabel: 'Offers',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="megaphone" size={size} color={color} />
          ),
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

const styles = StyleSheet.create({
  container: {
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 10,
    
      borderColor: '#ccc',
  },
  sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 50, 
      borderColor: '#ccc',
  },
  loadingIndicator: {
      marginTop: 10, 
      borderColor: '#ccc',
  },
  tableContainer: {
      maxHeight: 200, // Set maximum height for the tables
      borderWidth: 1,
      borderColor: '#ccc',
  },
  table: {
      borderWidth: 0,
      borderColor: '#ccc',
  },
  row: {
      flexDirection: 'row',
    
      borderBottomColor: '#ccc',
      paddingVertical: 10,
  },
  header: {
      backgroundColor: '#f0f0f0',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      textAlign: 'center',
  },
  cellLabel: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
      marginHorizontal: 20,
      fontSize:20,
     
  },
  cellValue: {
      flex: 1,
      textAlign: 'center',
    
      textAlign: 'center',
      color: 'black',
      marginHorizontal: 20,
      fontSize:20,
    
     
      flexDirection: 'row',
  },
  row: {
      flexDirection: 'row',
       borderRightWidth: 0,
   
      borderColor: 'black', // Set border color for rows
  },
  borderRight: {
      borderRightWidth: 0,
  },
  borderTop: {
      borderTopWidth: 3,
  },
});
export default TabNavigator;
