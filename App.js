import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import NotificationHandler from './src/hooks/NotificationHandler';
import handleNotification from './src/hooks/handleNotification';

export default function App() {
  handleNotification();
  
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // Create a notification channel for Android 8.0 and above
    if (Notifications.getExpoPushTokenAsync) {
      const channelId = 'default'; // You can use any channel ID you prefer
      const channel = {
        name: 'Default',
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: true, // Enable or disable sound for the channel
      };

      Notifications.setNotificationChannelAsync(channelId, channel);
    }

    // Set up notification categories
    Notifications.setNotificationCategoryAsync('notification_actions', [
      {
        buttonTitle: 'Snooze',
        identifier: 'Snooze',
      },
      {
        buttonTitle: 'Complete',
        identifier: 'Complete',
      },
    ]);
  }, []);

  return (
    <SafeAreaProvider>
      <AppContainer />
    </SafeAreaProvider>
  );
}
