import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Offers = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.text}>offers Screen</Text> */}
        {/* Add your offers content here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    // fontSize: 20,
    // fontWeight: 'bold',
  },
});

export default Offers;
