import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleNotificationAsync } from 'expo-notifications';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Import Ionicons and MaterialIcons from Expo vector icons
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

    const trigger = new Date(moment(motivation.date, 'M/D/YYYY').format('YYYY-MM-DD') + 'T' + moment(motivation.time, 'h:mm:ss A').format('HH:mm:ss'));
    trigger.setSeconds(0);
    try {
      await scheduleNotificationAsync({
        content: notificationContent,
        trigger,
      });
      console.log('Notification scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
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

      <TouchableOpacity style={styles.addButton} onPress={() => setShowAddMotivationModal(true)}>
        <MaterialIcons name="add" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Add Your Motivation</Text>
      </TouchableOpacity>

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

      <ScrollView style={styles.savedMotivationsContainer}>
        <Text style={styles.savedMotivationsHeader}>Saved Motivations:</Text>
        {motivations.map((motivation, index) => (
          <View key={index} style={styles.savedMotivationItem}>
            <View style={styles.motivationContent}>
              <Text style={styles.savedMotivationQuote}>{motivation.quote}</Text>
              <Text style={styles.savedMotivationDateTime}>
                <Text style={{ fontStyle: 'italic', color: '#555' }}>Date:</Text> {motivation.date} {'\n'}
                <Text style={{ fontStyle: 'italic', color: '#555' }}>Time:</Text>{' '}
                {moment(motivation.time, 'HH:mm:ss').format('hh:mm A')}
              </Text>
            </View>
            <TouchableOpacity onPress={() => deleteMotivation(index)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={24} color="#fff" />
            </TouchableOpacity>
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
    backgroundColor: '#f0f8ff', // Light Blue
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 80,
    color: '#2e8b57', // Sea Green
  },
  addButton: {
    backgroundColor: '#32cd32', // Lime Green
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 10,
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
    color: '#fff', // White
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
  },
  dateInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
  },
  saveButton: {
    backgroundColor: '#32cd32', // Lime Green
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
  },
  cancelButton: {
    backgroundColor: '#e74c3c', // Tomato Red
    padding: 15,
    borderRadius: 8,
    width: '80%',
  },
  savedMotivationsContainer: {
    marginTop: 10,
    width: '80%',
  },
  savedMotivationsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  savedMotivationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  motivationContent: {
    flex: 1,
  },
  savedMotivationQuote: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  savedMotivationDateTime: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#e74c3c', // Tomato Red
    padding: 8,
    borderRadius: 8,
  },
});

export default MotivationTimeScreen;
