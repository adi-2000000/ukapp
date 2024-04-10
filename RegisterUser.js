import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [employeeIdError, setEmployeeIdError] = useState('');

  const navigation = useNavigation();

  const handleSignup = () => {
    let isValid = true;
    if (!username) {
      setUsernameError('Username is required.');
      isValid = false;
    } else {
      setUsernameError('');
    }
    // Add validation for Employee ID
    if (!employeeId) {
      setEmployeeIdError('Employee ID is required.');
      isValid = false;
    } else {
      setEmployeeIdError('');
    }
    // Add validation for other fields (password, name, email, age, gender, phone, confirmPassword)

    if (!isValid) {
      return;
    }

    const payload = {
      username,
      password,
      name,
      email,
      age,
      gender,
      phone,
      employee_id: employeeId,
      confirm_password: confirmPassword,
    };

    fetch('http://192.168.1.3/UK_UserLogin/signup-api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        try {
          const data = JSON.parse(result); // Parse the response as JSON
          if (data.success === true) {
            // Navigate to the login screen
            navigation.navigate('Login');
            Alert.alert(
              'Success',
              'Registration successful.',
              [
                {
                  text: 'OK',
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              'Error',
              'Oops! Something went wrong. Please try again later.'
            );
          }
        } catch (error) {
          console.error(error);
          Alert.alert(
            'Error',
            'Oops! Something went wrong. Please try again later.'
          );
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          'Error',
          'Oops! Something went wrong. Please try again later.'
        );
      });
    
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Registration form</Text>
        <TextInput
          style={[styles.input, !!usernameError && styles.inputError]}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        {!!usernameError && <Text style={styles.errorText}>{usernameError}</Text>}
        <TextInput
          style={[styles.input, !!nameError && styles.inputError]}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        {!!nameError && <Text style={styles.errorText}>{nameError}</Text>}
        <TextInput
          style={[styles.input, !!emailError && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, !!passwordError && styles.inputError]}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Pressable
            style={styles.passwordVisibilityButton}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>
        {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, !!confirmPasswordError && styles.inputError]}
            placeholder="Confirm Password"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <Pressable
            style={styles.passwordVisibilityButton}
            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          >
            <Ionicons
              name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>
        {!!confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
        <TextInput
          style={[styles.input, !!ageError && styles.inputError]}
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
          keyboardType="numeric"
        />
        {!!ageError && <Text style={styles.errorText}>{ageError}</Text>}
        <TextInput
          style={[styles.input, !!phoneError && styles.inputError]}
          placeholder="Phone Number"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
        />
        {!!phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
        <TextInput
  style={[styles.input, !!employeeIdError && styles.inputError]}
  placeholder="Employee ID"
  value={employeeId}
  onChangeText={(text) => setEmployeeId(text)}
/>

        {!!employeeIdError && <Text style={styles.errorText}>{employeeIdError}</Text>}
        <Button title="Sign Up" onPress={handleSignup} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2a52be',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  inputError: {
    borderColor: 'red',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  passwordVisibilityButton: {
    padding: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  genderButtonContainer: {
    flexDirection: 'row',
  },
  genderButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ccc',
    marginRight: 10,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
  },
  genderButtonSelected: {
    backgroundColor: '#2a52be',
  },
  genderButtonError: {
    backgroundColor: 'red',
  },
  genderButtonText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterUser;
