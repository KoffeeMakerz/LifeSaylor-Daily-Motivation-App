import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  const handleSaveUserName = async () => {
    try {
      // Save the user name to AsyncStorage
      await AsyncStorage.setItem('userName', userName);

      // Navigate to the Home page
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving user name:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <Image source={require("../../../assets/tree-icon.png")} style={styles.image}/>
       <Text style={styles.intro}>Life Changer" is your ultimate motivation companion, 
       designed to help you unleash your full potential and transform your life. 
       </Text>
       </View>
      <Text style={styles.title}>Enter Your Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        onChangeText={text => setUserName(text)}
        value={userName}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveUserName}>
        <Text style={styles.buttonText}>Save and Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    marginBottom: 10,
    marginLeft:20,
    marginRight:20,
    borderColor:'green',
    borderWidth:2,
    borderRadius:20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop:10,
    marginBottom: 20,
    color: '#333',
  },
  intro: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop:-20,
    marginLeft:10,
    marginRight:10,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 75,
    borderRadius: 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 190,
    height: 190,
    resizeMode: 'contain',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default ProfileScreen;
