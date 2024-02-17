import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MotivationTimeScreen = () => {
  const [showAddMotivationModal, setShowAddMotivationModal] = useState(false);
  const [motivationQuote, setMotivationQuote] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [motivations, setMotivations] = useState([]);

  useEffect(() => {
    // Load saved motivations from AsyncStorage when the component mounts
    loadMotivations();
  }, []);

  const loadMotivations = async () => {
    try {
      const storedMotivations = await AsyncStorage.getItem('@motivations');
      if (storedMotivations) {
        setMotivations(JSON.parse(storedMotivations));
      }
    } catch (error) {
      console.error('Error loading motivations from AsyncStorage:', error);
    }
  };

  const saveMotivation = async () => {
    try {
      const newMotivation = {
        quote: motivationQuote,
        date: selectedDate.toLocaleDateString(),
        time: selectedDate.toLocaleTimeString(),
      };

      // Save the new motivation to AsyncStorage
      const updatedMotivations = [...motivations, newMotivation];
      await AsyncStorage.setItem('@motivations', JSON.stringify(updatedMotivations));

      // Update the state and close the modal
      setMotivations(updatedMotivations);
      setShowAddMotivationModal(false);
    } catch (error) {
      console.error('Error saving motivation to AsyncStorage:', error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedDate(time);
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Motivation Time Settings</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddMotivationModal(true)}
      >
        <Text style={styles.buttonText}>Add Your Motivation</Text>
      </TouchableOpacity>

      {/* Add Motivation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddMotivationModal}
        onRequestClose={() => setShowAddMotivationModal(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add Your Motivation</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your motivation quote"
            value={motivationQuote}
            onChangeText={(text) => setMotivationQuote(text)}
          />
          <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
            <Text>Date: {selectedDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateInput} onPress={showTimePicker}>
            <Text>Time: {selectedDate.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={saveMotivation}>
            <Text style={styles.buttonText}>Save Motivation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddMotivationModal(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </Modal>

      {/* Display saved motivations */}
      <View style={styles.savedMotivationsContainer}>
        <Text style={styles.savedMotivationsHeader}>Saved Motivations:</Text>
        {motivations.map((motivation, index) => (
          <Text key={index} style={styles.savedMotivationText}>
            {motivation.quote} - {motivation.date} {motivation.time}
          </Text>
        ))}
      </View>
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
  addButton: {
    backgroundColor: '#72c17d',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
  },
  dateInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
  },
  saveButton: {
    backgroundColor: '#72c17d',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    width: '80%',
  },
});


export default MotivationTimeScreen;
