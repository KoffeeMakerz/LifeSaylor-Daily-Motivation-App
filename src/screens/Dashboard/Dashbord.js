import React, { useEffect, useState } from 'react';
import { BackHandler, ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Dashboard = ({ route }) => {
  const [greeting, setGreeting] = useState('');
  const [motivationTitle, setMotivationTitle] = useState('');
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  const motivationalQuotes = [
    // ... your motivational quotes
    "Seize the day; it's yours.",
    "Believe in your journey.",
    "Success is a series of small wins.",
    "Make today amazing.",
    "Your attitude determines your direction.",
    "Keep going, even on bad days.",
    "Chase your goals, not your doubts.",
    "The only way to do great work is to love what you do.",
    "Embrace the challenges; they make you stronger.",
    "Start where you are, use what you have, do what you can.",
    "Every day is a new beginning.",
    "You are stronger than you think.",
    "Dream big, work hard, stay focused.",
    "Progress, not perfection.",
    "Your only limit is you.",
    "The harder you work, the luckier you get.",
    "Make it happen. Shock everyone.",
    "Your future self will thank you.",
    "Be the energy you want to attract.",
    "Small steps lead to big changes."
  ];

  useEffect(() => {
    const currentTime = new Date().getHours();
    const getName = async () => {
      const Name = await AsyncStorage.getItem('userName');
      setUserName(Name);
    };
    getName();
    if (currentTime >= 5 && currentTime < 12) {
      setGreeting('Good morning..!');
    } else if (currentTime >= 12 && currentTime < 16) {
      setGreeting('Good afternoon..!');
    } else {
      setGreeting('Good evening..!');
    }

    // Set a random motivational quote when the component mounts
    setMotivationTitle(getRandomMotivationalQuote());

    // Lock the back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, []);

  const getRandomMotivationalQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };

  return (
    <View style={styles.container}>
      {/* ... rest of your component ... */}
      <View style={styles.container2}>
        <View style={styles.profileContainer}>
          <Image source={require("../../../assets/icons/man.png")} style={styles.btnIcon} />
          <View style={styles.profileContainer1}>
            <View>
              <Text style={[styles.greetingText, { color: 'black' }]}>Hello, {userName}</Text>
            </View>
            <View>
              <Text style={[styles.greetingText, { color: 'black' }]}>{greeting}</Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <Card.Title>
            <Text style={[styles.motivationTitle, { color: 'black' }]}>
              {`"${motivationTitle}"`}
            </Text>
          </Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{
                uri: "https://cdn.pixabay.com/photo/2017/08/15/12/04/helping-each-other-2643652_1280.jpg"
              }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { maxWidth: '100%' }]}
            onPress={() => {
              // Add functionality for the "ADD your own quote" button here
              // For example, you can navigate to a screen where users can add their own quote
              console.log("ADD your own quote button pressed");
            }}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>
              ADD your own quote
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Image
            source={require("../../../assets/icons/homeIcon.png")}
            style={styles.bottomNavItemIcon}
          />
          <Text style={[styles.bottomNavItemText, { color: 'black' }]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Reels')}
        >
          <Image
            source={require("../../../assets/icons/quotesIcon.png")}
            style={styles.bottomNavItemIcon}
          />
          <Text style={[styles.bottomNavItemText, { color: 'black' }]}>
            Quotes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('DiscoverScreen')}
        >
          <Image
            source={require("../../../assets/icons/discoverIcon.png")}
            style={styles.bottomNavItemIcon}
          />
          <Text style={[styles.bottomNavItemText, { color: 'black' }]}>
            Discover
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Image
            source={require("../../../assets/icons/settingsIcon.png")}
            style={styles.bottomNavItemIcon}
          />
          <Text style={[styles.bottomNavItemText, { color: 'black ' }]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 45,
  },
  // ... rest of your styles ...
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  profileContainer1: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    marginLeft: 10,
  },
  btnIcon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  greetingText: {
    fontSize: 20,
    marginVertical: 1,
    textAlign: 'left',
  },
  card: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 20,
    borderColor: '#72c17d',
    marginTop: 10,
    width: '100%',
  },
  motivationTitle: {
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#72c17d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#72c17d',
    paddingVertical: 8,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomNavItemIcon: {
    width: 24,
    height: 24,
  },
  bottomNavItemText: {
    color: 'black',
    fontSize: 14,
  },
  
});

export default Dashboard;
