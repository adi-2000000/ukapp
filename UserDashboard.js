import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const UserDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.3/UK_UserLogin/userdashboard-api.php');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Driver Name: {item.driver_name}</Text>
      <Text>Cab No: {item.cab_no}</Text>
      <Text>Contact No: {item.contact_no}</Text>
      <Text>Pickup Timings: {item.pickup_timings}</Text>
      <Text>In Timing: {item.in_timing}</Text>
      <Text>Pickup Date: {item.pickup_date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default UserDashboard;
