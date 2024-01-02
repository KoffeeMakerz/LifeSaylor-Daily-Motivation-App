import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';

const WelcomeScreen = (props) => {
  const { navigation } = props;
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1, // Animate to opacity: 1 (visible)
        duration: 2000, // 2000ms
        useNativeDriver: true, // Add this line
      }
    ).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../assets/Logo.png')}
        style={[
          styles.logo,
          { opacity: fadeAnim } // Bind opacity to animated value
        ]}
      />

      <Text style={styles.title}>
        Welcome to {'\n'} LifeSaylor Daily Motivation
      </Text>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'black',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#72c17d',
    paddingVertical: 15,
    paddingHorizontal: 75,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
