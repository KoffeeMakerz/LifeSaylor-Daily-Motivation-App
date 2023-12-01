import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = (props) => {
  const { navigation } = props;

  // Render the WelcomeScreen content
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to <Text style={styles.coloredText}>LifeSaylor</Text> {'\n'} Daily Motivation
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("PrivacyScreen")}>
        <Text style={styles.buttonText}>Let's Start</Text>
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
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 140, // Increased space between the text and the button
    color: 'black',
    textAlign: 'center', // Align text to the center
  },
  coloredText: {
    color: '#72c17d', // Color for "LifeSaylor"
  },
  startButton: {
    backgroundColor: '#72c17d',
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
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
