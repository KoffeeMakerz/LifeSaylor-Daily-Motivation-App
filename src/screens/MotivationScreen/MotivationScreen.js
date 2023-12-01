import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';

const MotivationScreen = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionToggle = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
  };

  const handleNext = () => {
    // Navigate to the "TimeScreen" screen
    navigation.navigate('TimeScreen', { selectedOptions });
  };

  const options = ['Happiness', 'Confidence', 'Wealth', 'Creativity', 'Relationship', 'Loss Weight', 'Love', 'Food'];

  const renderOptionCard = ({ item }) => {
    const isSelected = selectedOptions.includes(item);

    return (
      <TouchableOpacity
        style={[
          styles.optionCard,
          isSelected && styles.selectedOptionCard,
        ]}
        onPress={() => handleOptionToggle(item)}
      >
        <Text style={styles.optionText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.question}>What Brings You Motivation?</Text>

      <View style={styles.optionsContainer}>
        <FlatList
          data={options}
          numColumns={2}
          renderItem={renderOptionCard}
          keyExtractor={(item) => item}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
    backgroundColor: '#ffffff',
    padding: 10,
  },
  question: {
    fontSize: 24,
    marginTop: 30,
    marginBottom: 20,
    color: '#555555',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    backgroundColor: '#72c17d',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 5,
    width: '48%', // Adjust the width for two columns with a small margin
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOptionCard: {
    backgroundColor: '#4d8b66',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#72c17d',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MotivationScreen;
