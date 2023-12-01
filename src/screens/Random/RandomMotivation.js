import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { affirmations } from '../../data/constants';
import { getRandomItem } from '../../data/utils'; // new helper function

const RandomScreen = ({ navigation }) => {
  const [affirmation, setAffirmation] = useState('');

  useEffect(() => {
    getRandomAffirmation();
  }, []);

  const getRandomAffirmation = async () => {
    try {
      const customAffirmations =
        JSON.parse(await AsyncStorage.getItem('customAffirmations')) || [];
      const allAffirmations = [...affirmations, ...customAffirmations];
      const randomAffirmation = getRandomItem(allAffirmations); // using helper function
      setAffirmation(randomAffirmation);
    } catch (error) {
      console.error('Failed to fetch affirmation: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.affirmationText}>{affirmation}</Text>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={getRandomAffirmation}
      >
        <MaterialIcons name="refresh" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  affirmationText: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  refreshButton: {
    marginTop: 50,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RandomScreen;
