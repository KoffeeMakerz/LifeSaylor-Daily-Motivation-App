import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  FlatList,
  TimePickerAndroid,
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showMotivationModal, setShowMotivationModal] = useState(false);
  const [motivationTimes, setMotivationTimes] = useState({
    Default: { checked: false, time: new Date() },
    Inspiration: { checked: false, time: new Date() },
    Productivity: { checked: false, time: new Date() },
    Positivity: { checked: false, time: new Date() },
  });

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handleCheckboxToggle = (category) => {
    setMotivationTimes((prevTimes) => ({
      ...prevTimes,
      [category]: { ...prevTimes[category], checked: !prevTimes[category].checked },
    }));
  };

  const showTimePicker = async (category) => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 12,
        minute: 0,
        is24Hour: false,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        setMotivationTimes((prevTimes) => ({
          ...prevTimes,
          [category]: { ...prevTimes[category], time: new Date().setHours(hour, minute) },
        }));
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Change Avatar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Change User Name</Text>
      </TouchableOpacity>

      {/* Change Motivation Time Option */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => setShowMotivationModal(true)}
      >
        <Text style={styles.settingText}>Change Motivation Time</Text>
      </TouchableOpacity>

      {/* Motivation Categories */}
      {showMotivationModal && (
        <View style={styles.modalContainer}>
          <FlatList
            data={Object.keys(motivationTimes)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.checkboxItem}
                  onPress={() => handleCheckboxToggle(item)}
                >
                  <Text style={styles.checkboxText}>{item}</Text>
                </TouchableOpacity>

                {motivationTimes[item].checked && (
                  <TouchableOpacity
                    style={styles.timePickerButton}
                    onPress={() => showTimePicker(item)}
                  >
                    <Text style={styles.timePickerButtonText}>Set Time</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>
      )}

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: '#767577', true: '#72c17d' }}
          thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          // Implement save settings functionality or any other action
          console.log('Save button pressed', motivationTimes);
        }}
      >
        <Text style={styles.saveButtonText}>Save Settings</Text>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    maxHeight: 300,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  timePickerButton: {
    backgroundColor: '#72c17d',
    padding: 8,
    borderRadius: 5,
  },
  timePickerButtonText: {
    color: 'white',
    fontSize: 14,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#72c17d',
    padding: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
