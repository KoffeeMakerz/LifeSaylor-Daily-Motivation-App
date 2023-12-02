// SettingsScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Modal, FlatList } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showMotivationModal, setShowMotivationModal] = useState(false);
  const [selectedMotivation, setSelectedMotivation] = useState('Default');

  const motivationTypes = ['Default', 'Inspiration', 'Productivity', 'Positivity'];

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handleMotivationPress = (motivation) => {
    setSelectedMotivation(motivation);
    setShowMotivationModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <TouchableOpacity style={styles.settingItem}>
        <Text>Change Avatar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Text>Change User Name</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => setShowMotivationModal(true)}
      >
        <Text>Change Motivation Type</Text>
        <Text>{selectedMotivation}</Text>
      </TouchableOpacity>

      <View style={styles.settingItem}>
        <Text>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          // Implement logout functionality or any other action
          console.log('Save button pressed');
        }}
      >
        <Text style={styles.logoutButtonText}>Save Settings</Text>
      </TouchableOpacity>

      {/* Motivation Type Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showMotivationModal}
        onRequestClose={() => setShowMotivationModal(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={motivationTypes}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleMotivationPress(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
  },
  logoutButtonText: {
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
  modalItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
});

export default SettingsScreen;
