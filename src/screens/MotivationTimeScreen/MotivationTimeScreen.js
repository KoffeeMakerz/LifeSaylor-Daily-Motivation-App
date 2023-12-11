import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, DatePickerAndroid, TimePickerAndroid } from 'react-native';

const MotivationTimeScreen = () => {
  const [showAddMotivationModal, setShowAddMotivationModal] = useState(false);
  const [motivationQuote, setMotivationQuote] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: selectedDate,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const newDate = new Date(year, month, day);
        setSelectedDate(newDate);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const openTimePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: selectedTime.getHours(),
        minute: selectedTime.getMinutes(),
        is24Hour: false,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const newTime = new Date();
        newTime.setHours(hour, minute);
        setSelectedTime(newTime);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  const handleSaveMotivation = () => {
    // Save the motivation and close the modal
    // You can implement your saving logic here
    setShowAddMotivationModal(false);
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
          <TouchableOpacity style={styles.dateInput} onPress={openDatePicker}>
            <Text>Date: {selectedDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateInput} onPress={openTimePicker}>
            <Text>Time: {selectedTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveMotivation}>
            <Text style={styles.buttonText}>Save Motivation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddMotivationModal(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
