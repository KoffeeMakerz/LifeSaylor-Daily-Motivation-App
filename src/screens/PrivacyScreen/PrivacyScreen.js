import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrivacyScreen = (props) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const { navigation } = props;

  const nextScreen = async () => {

    await AsyncStorage.setItem("isAgreed",JSON.stringify(isAgreed))
    navigation.navigate("NamePage")

  }

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.boxWithBorder]}>
        <Text style={styles.title}>Privacy Policy</Text>

        {/* Wrap the policyText in a ScrollView */}
        <ScrollView style={[styles.scrollContainer, styles.marginBottom20]}>
          <Text style={[styles.policyText, styles.justifyText, styles.greyText]}>
            We are committed to protecting your privacy. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our app.

            Personal information we collect may include your name, email address, postal address, and phone number. This information is used to provide and improve our services. We may also use your information to contact you with updates and promotional offers.

            By using our app, you agree to the collection and use of information in accordance with this policy. If you have any questions or concerns about our Privacy Policy, please contact us.

            Thank you for trusting us with your personal information.
          </Text>
        </ScrollView>

        <View style={styles.checkboxContainer}>
          <Checkbox value={isAgreed} onValueChange={setIsAgreed} />
          <Text style={[styles.checkboxText]}>I agree to the terms and conditions</Text>
        </View>
      </View>

      {/* Add margin to the continue button for spacing */}
      <TouchableOpacity
        style={[isAgreed ? styles.continueButton : styles.disabledButton, styles.buttonMargin]}
        disabled={!isAgreed}
        onPress={() => nextScreen()}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};
// test

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%', // Set the width to 80% of the parent container
    alignItems: 'center', // Center the content horizontally
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  boxWithBorder: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    maxHeight: 150, // Set the maximum height for scrolling
  },
  policyText: {
    fontSize: 16,
    marginBottom: 20,
  },
  justifyText: {
    textAlign: 'justify', // Justify the text
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 10,
  },
  greyText: {
    color: '#808080', // Grey color
  },
  continueButton: {
    backgroundColor: '#72c17d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  disabledButton: {
    backgroundColor: '#bfb6b6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonMargin: {
    marginTop: 20, // Add margin to the top of the button for spacing
  },
  marginBottom20: {
    marginBottom: 20, // Add margin to the bottom of the scroll container
  },
});

export default PrivacyScreen;
