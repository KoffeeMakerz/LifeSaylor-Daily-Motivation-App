import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const TimeScreen = ({ navigation }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [isNextButtonActive, setIsNextButtonActive] = useState(false);

  const handleNext = () => {
    // Navigate to the "Dashboard" screen only if an option is selected
    if (selectedTime) {
      navigation.navigate('Dashboard');
    }
  };

  const handleRadioSelect = (value) => {
    setSelectedTime(value);
    setIsNextButtonActive(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.question}>When Do You Need Motivation?</Text>

      <RadioButtonGroup
  selected={selectedTime}
  onSelected={(value) => handleRadioSelect(value)}
  radioBackground="green"
  style={styles.radioGroup} // Add style to the RadioButtonGroup
>
  <RadioButtonItem value="At Waking Up" label="At Waking Up" style={styles.radioButtonItem} />
  <RadioButtonItem value="At Breakfast" label="At Breakfast" style={styles.radioButtonItem} />
  <RadioButtonItem value="At Work" label="At Work" style={styles.radioButtonItem} />
  <RadioButtonItem value="At Gym" label="At Gym" style={styles.radioButtonItem} />
  <RadioButtonItem value="Before Study" label="Before Study" style={styles.radioButtonItem} />
  <RadioButtonItem value="At Lunch Break" label="At Lunch Break" style={styles.radioButtonItem} />
</RadioButtonGroup>


      <TouchableOpacity
        style={[styles.nextButton, { backgroundColor: isNextButtonActive ? '#007AFF' : 'grey' }]}
        onPress={handleNext}
        disabled={!isNextButtonActive}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  question: {
    fontSize: 24,
    marginBottom: 20,
  },
  radioGroup: {
    marginTop: 10, // Add margin between the question and RadioButtonGroup
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButtonItem: {
    marginBottom: 10, // Add margin bottom to create space between radio button items
  },
});

export default TimeScreen;
