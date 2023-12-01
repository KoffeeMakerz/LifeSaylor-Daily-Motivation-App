import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SurveyScreen = ({ navigation }) => {
  const handleYes = () => {
    // Navigate to the "NewUserScreen"
    navigation.navigate("NewUserScreen");
  };

  const handleNo = () => {
    // Navigate to the "MotivationScreen"
    navigation.navigate("MotivationScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you new to LifeSaylor Daily Motivation?</Text>


      <TouchableOpacity style={styles.button} onPress={handleYes}>
        <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNo}>
        <Text style={styles.buttonText}>No</Text>
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
    textAlign: 'center', // Align center
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555555',
  },
  button: {
    backgroundColor: '#72c17d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SurveyScreen;
