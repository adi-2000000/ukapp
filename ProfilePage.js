import React, { useEffect, useState } from 'react';
import { View, Text,  ScrollView, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData.username) {
          const response = await fetch(`http://192.168.1.3/UK_UserLogin/profiledata-api.php?username=${userData.username}`);
          if (response.ok) {
            const responseData = await response.json();
            console.log('Response from server:', responseData);
            setUserData(responseData);
            setError(null);
          } else {
            throw new Error('Error fetching user data: ' + response.statusText);
          }
        } else {
          throw new Error('Username not found in user data');
        }
      } else {
        throw new Error('User data not found in AsyncStorage');
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    
    
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/3783083/pexels-photo-3783083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : userData ? (
          <View style={styles.profileContainer}>
            <View style={styles.header}>
              <View style={styles.profileIcon}>
                {userData.profilePicture ? (
                  <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
                ) : (
                  <Image
                    source={{ uri: 'https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg' }}
                    style={styles.profileImage}
                  />
                )}
              </View>
              <Text style={styles.name}>{userData.name}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.detail}>
                  <MaterialIcons name="email" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.value}>{userData.email}</Text>
                </View>
                <View style={styles.detail}>
                  <MaterialIcons name="date-range" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}>Age:</Text>
                  <Text style={styles.value}>{userData.age}</Text>
                </View>
                <View style={styles.detail}>
                  <MaterialIcons name="phone" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}>Contact Number:</Text>
                  <Text style={styles.value}>{userData.phone}</Text>
                </View>
                <View style={styles.detail}>
                  <MaterialIcons name="person" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}>Gender:</Text>
                  <Text style={styles.value}>{userData.gender}</Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.option} onPress={() => console.log('Settings pressed')}>
                <MaterialIcons name="settings" size={20} color="black" style={styles.optionIcon} />
                <Text style={styles.optionText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={handleLogout}>
                <MaterialIcons name="logout" size={20} color="black" style={styles.optionIcon} />
                <Text style={styles.optionText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.error}>Loading...</Text>
        )}
      </View>
    </ImageBackground>
    
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    width: windowWidth * 1.0,
    height: windowHeight * 0.89,
    backgroundColor: 'white',
    padding: 21,
    borderRadius: 10,
    marginTop: 250,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'skyblue',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    marginBottom: 20,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
  footer: {
    marginBottom: 150,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionIcon: {
    marginRight: 5,
  },
  optionText: {
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfilePage;
