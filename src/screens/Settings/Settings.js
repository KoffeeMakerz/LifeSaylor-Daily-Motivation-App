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
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showMotivationModal, setShowMotivationModal] = useState(false);
  const [motivationTimes, setMotivationTimes] = useState({
    Default: { checked: false, time: new Date() },
    Inspiration: { checked: false, time: new Date() },
    Productivity: { checked: false, time: new Date() },
    Positivity: { checked: false, time: new Date() },
  });
  const [showUserNameModal, setShowUserNameModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [notificationStatusMessage, setNotificationStatusMessage] = useState('');
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');

  const { navigate } = useNavigation(); // Hook to get navigation object

  const toggleNotifications = () => {
    const newStatus = !notificationsEnabled;
    setNotificationsEnabled(newStatus);
    setNotificationStatusMessage(newStatus ? 'Notifications ON' : 'Notifications OFF');
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

  const handleUserNameSave = () => {
    setNotificationStatusMessage(`Username Saved: ${newUserName}`);
    setShowUserNameModal(false);
  };

  const handleSaveAvatar = (avatar) => {
    setNotificationStatusMessage(`New Avatar has been saved: ${avatar.name}`);
    setShowAvatarModal(false);
    setSelectedAvatar(avatar);
  };

  const avatarImages = [
    { name: 'Avatar 1', source: require('../../../assets/icons/avatar1.png') },
    { name: 'Avatar 2', source: require('../../../assets/icons/avatar2.png') },
    { name: 'Avatar 3', source: require('../../../assets/icons/avatar3.png') },
    { name: 'Avatar 4', source: require('../../../assets/icons/avatar4.png') },
    { name: 'Avatar 5', source: require('../../../assets/icons/avatar5.png') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Change Avatar Option */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => setShowAvatarModal(true)}
      >
        <Text style={styles.settingText}>Change Avatar</Text>
      </TouchableOpacity>

      {/* Change User Name Option */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => setShowUserNameModal(true)}
      >
        <Text style={styles.settingText}>Change User Name</Text>
      </TouchableOpacity>

      {/* Motivation Settings Option */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigate('MotivationTimeScreen')}
      >
        <Text style={styles.settingText}>Motivation Settings</Text>
      </TouchableOpacity>

      {/* Notifications Option */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: '#767577', true: '#72c17d' }}
          thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      {/* Notification Status */}
      {notificationStatusMessage !== '' && (
        <Text style={styles.notificationStatus}>{notificationStatusMessage}</Text>
      )}

      {/* Save Settings Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          console.log('Save button pressed', motivationTimes);
        }}
      >
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>

      {/* Avatar Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAvatarModal}
        onRequestClose={() => setShowAvatarModal(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={avatarImages}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}  // Display avatars in two columns
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.avatarItem}
                onPress={() => handleSaveAvatar(item)}
              >
                <Image source={item.source} style={styles.avatarImage} />
                <Text style={styles.avatarName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* User Name Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showUserNameModal}
        onRequestClose={() => setShowUserNameModal(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.userNameInput}
            placeholder="Enter new username"
            value={newUserName}
            onChangeText={(text) => setNewUserName(text)}
          />
          <TouchableOpacity
            style={styles.saveUserNameButton}
            onPress={handleUserNameSave}
          >
            <Text style={styles.saveButtonText}>Save User Name</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  avatarItem: {
    padding: 10,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarName: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  notificationStatus: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
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
  userNameInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
  },
  saveUserNameButton: {
    backgroundColor: '#72c17d',
    padding: 15,
    borderRadius: 8,
  },
});

export default SettingsScreen;
