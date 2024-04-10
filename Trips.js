import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Trips = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data
  const navigation = useNavigation();

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedData = await AsyncStorage.getItem("userData");
    
      if (fetchedData !== null) {
        const user = JSON.parse(fetchedData);
        setUserData(user);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleCompleteTrip = () => {
    navigation.navigate('CompleteTrip');
  };

  const handleUpcomingTrip = () => {
    if (userData) { // Check if userData is available before navigating
      navigation.navigate('UpcomingTrip1', { employeeId: userData.employee_id });
    } else {
      console.error("User data is not available.");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCompleteTrip}>
          <Text style={styles.buttonText}>Complete Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUpcomingTrip}>
          <Text style={styles.buttonText}>Upcoming Trip</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Trips;
