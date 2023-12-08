import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MotivationTimeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Motivation Time Settings</Text>
      
      <View style={styles.addMotivationContainer}>
        <Text style={styles.topic}>Add Your Motivation</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Add Motivation</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addMotivationContainer: {
    marginBottom: 20,
  },
  topic: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#72c17d',
    padding: 15,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#72c17d',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MotivationTimeScreen;
