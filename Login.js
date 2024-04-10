import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSkipButton, setShowSkipButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkipButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    // Create a JSON object with username and password
    const data = {
      username: username,
      password: password
    };
  
    try {
      // Send the data to the login endpoint
      const response = await fetch('http://192.168.1.3/UK_UserLogin/login-api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      // Parse response as JSON
      const result = await response.json();
      if (result.success == true) {
        // Login successful
        if (result.user) { // Check if user data exists
          try {
            // Store user data in AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify(result.user));
          } catch (error) {
            console.error('Error saving user data:', error);
          }
          if (result.user.employee_id) { // Check if employee_id exists
            // Navigate to HomePage with employeeId as parameter
            navigation.navigate("HomePage", { employeeId: result.user.employee_id });
          } else {
            console.error('Error: Employee ID not found in user data');
          }
        } else {
          console.error('Error: User data not found in response');
        }
      } else {
        // Login error
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSkipTest = () => {
    console.log('Skip button pressed');
    // You can add any functionality here that should be executed when the skip button is pressed
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/background.jpg")}
        style={styles.backgroundImage}
      />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("./assets/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="username"
            placeholderTextColor="white"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="password"
            placeholderTextColor="white"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, { width: "100%" }]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </TouchableOpacity>

          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
        </View>

        {showSkipButton ? (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkipTest}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#FFF" size="small" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003580",
    padding: 20,
    width: "100%",
  },
  logoContainer: {},
  logoImage: {
    width: 300,
    height: 300,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "#6a83a6",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 16,
    color: "white",
    backgroundColor: "#6a83a6",
  },
  passwordToggle: {
    position: "absolute",
    right: 10,
    top: 69,
    transform: [{ translateY: -12 }],
  },
  loginButton: {
    backgroundColor: "#FFBF00",
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#5A5A5A",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  createAccountButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFBF00",
    borderRadius: 20,
  },
  skipButtonText: {
    color: "#5A5A5A",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingContainer: {
    position: "absolute",
    top: 60,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default Login;
