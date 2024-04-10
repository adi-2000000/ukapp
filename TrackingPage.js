import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const TrackingPage = () => {
  // Dummy driver's location
  const driverLocation = {  latitude: 18.5204, longitude: 73.8567 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tracking Page</Text>
      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.9922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marker for the driver's location */}
        <Marker coordinate={driverLocation} title="Driver" />
      </MapView>
      {/* Tracking Information */}
      <View style={styles.trackingInfo}>
        <Text>Driver: John Doe</Text>
        <Text>Vehicle: Toyota Camry</Text>
        <Text>Location: 123 Main St, City</Text>
        {/* Add more tracking information as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  trackingInfo: {
    backgroundColor: 'lightgrey',
    padding: 20,
    borderRadius: 10,
  },
});

export default TrackingPage;