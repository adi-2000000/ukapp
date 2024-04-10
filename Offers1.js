import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Offers1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>offers Screen</Text>
      {/* Add your offers content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Offers1;