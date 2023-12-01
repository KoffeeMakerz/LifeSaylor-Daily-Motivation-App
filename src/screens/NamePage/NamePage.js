import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

const NamePage = (props) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [userName, setUserName] = useState(''); // State to store the user's name
  const { navigation } = props;

  const handleContinue = async() =>{
    const fromAsync = await AsyncStorage.getItem('isAgreed')
    console.log('value from async', fromAsync);
      await AsyncStorage.setItem('userName',userName);

    if (userName.trim() === '') {
      // Display an alert if the user's name is not provided
      Alert.alert('Please enter your name');
    } else {
      // Navigate to the "SurveyScreen" screen if the user's name is provided
      navigation.navigate("SurveyScreen");
    }
  };


  const isButtonEnabled = userName.trim() !== ''; // Check if the text input is not empty

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>How Should We Call You?</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setUserName(text)}
        value={userName}
        placeholder="Username"
      />

      <TouchableOpacity
        style={isButtonEnabled ? styles.continueButtonEnabled : styles.continueButtonDisabled}
        disabled={!isButtonEnabled}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555555',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'black', // Set the border color to black
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  continueButtonEnabled: {
    backgroundColor: '#72c17d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  continueButtonDisabled: {
    backgroundColor: '#bfb6b6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NamePage;
