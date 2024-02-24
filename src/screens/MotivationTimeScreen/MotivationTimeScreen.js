import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleNotificationAsync } from 'expo-notifications';
import moment from 'moment';

const MotivationTimeScreen = () => {
  const [showAddMotivationModal, setShowAddMotivationModal] = useState(false);
  const [motivationQuote, setMotivationQuote] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [motivations, setMotivations] = useState([]);

  useEffect(() => {
    loadMotivations();
  }, []);

  const loadMotivations = async () => {
    try {
      const storedMotivations = await AsyncStorage.getItem('@motivations');
      if (storedMotivations) {
        setMotivations(JSON.parse(storedMotivations));
      }
    } catch (error) {
      console.log('Error loading motivations from AsyncStorage:', error);
    }
  };

  const saveMotivation = async () => {
    try {
      const newMotivation = {
        quote: motivationQuote,
        date: selectedDate.toLocaleDateString(),
        time: selectedDate.toLocaleTimeString(),
      };

      const updatedMotivations = [...motivations, newMotivation];
      await AsyncStorage.setItem('@motivations', JSON.stringify(updatedMotivations));

      await scheduleNotification(newMotivation);

      setMotivations(updatedMotivations);
      setShowAddMotivationModal(false);
    } catch (error) {
      console.error('Error saving motivation to AsyncStorage:', error);
    }
  };

  const scheduleNotification = async (motivation) => {
    const notificationContent = {
      title: 'Motivation Reminder',
      body: motivation.quote,
      data: { motivation },
    };

    const trigger = new Date(
      moment(motivation.date, 'M/D/YYYY').format('YYYY-MM-DD') +
        'T' +
        moment(motivation.time, 'h:mm:ss A').format('HH:mm:ss')
    );
    trigger.setSeconds(0);

    try {
      const not1 = await scheduleNotificationAsync({
        content: notificationContent,
        trigger,
      });
      console.log('Notification scheduled successfully!', not1);
    } catch (error) {
      console.error('Error scheduling notification:', error);
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

  const editMotivation = async (index) => {
    // Implement functionality to edit motivation here
  };

  const deleteMotivation = async (index) => {
    try {
      const updatedMotivations = [...motivations];
      updatedMotivations.splice(index, 1);

      await AsyncStorage.setItem('@motivations', JSON.stringify(updatedMotivations));

      setMotivations(updatedMotivations);
    } catch (error) {
      console.error('Error deleting motivation from AsyncStorage:', error);
    }
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
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowAddMotivationModal(false)}
          >
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
      <Text style={styles.savedMotivationsHeader}>Saved Motivations:</Text>
      <ScrollView style={styles.savedMotivationsContainer}>
        
        {motivations.map((motivation, index) => (
          <View key={index} style={styles.savedMotivationContainer}>
            <Text style={styles.savedMotivationText}>
              {motivation.quote} - {motivation.date} {motivation.time}
            </Text>
            <View style={styles.editDeleteButtonsContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editMotivation(index)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteMotivation(index)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  savedMotivationsContainer: {
    marginTop: 20,
    width: '80%',
    maxHeight: '50%',
  },
  savedMotivationsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  savedMotivationContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  savedMotivationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  editDeleteButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
});

export default MotivationTimeScreen;
