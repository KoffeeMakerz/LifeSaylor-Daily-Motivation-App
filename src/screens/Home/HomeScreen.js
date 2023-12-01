import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableHighlight, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import styles from "./styles";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";

const HomeScreen = (props) => {
  const { navigation } = props;
  const [userName, setUserName] = useState('');

  const handleNavigateToCategories = () => { navigation.navigate('My Motivations'); };
  const handleNavigateToMotivations = () => { navigation.navigate('Motivatin Gallery'); };
  const handleNavigateToTest = () => { navigation.navigate('Test'); };
  const handleNavigateToSample = () => { navigation.navigate('Random Motivation'); };

  useEffect(() => {
    // Load the user's name from AsyncStorage when the component mounts
    loadUserName();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { fontWeight: "bold", textAlign: "center", alignSelf: "center", flex: 1,},
      headerLeft: () => (<MenuImage onPress={() => { navigation.openDrawer(); }}/>),
      headerRight: () => <View />,
    });
  }, []);

  const loadUserName = async () => {
    try {
      // Retrieve the user's name from AsyncStorage
      const savedUserName = await AsyncStorage.getItem('userName');

      if (savedUserName !== null) {
        setUserName(savedUserName);
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    }
  };

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} motivations</Text>
      </View>
    </TouchableHighlight>
  );
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.welcomeRow}>
      <Text style={styles.welcomeText}>Welcome {userName}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#FFB166' }]} onPress={handleNavigateToCategories}>
        <Image style={styles.photo} source={{uri: "https://cdn.dribbble.com/users/648289/screenshots/6500093/like_button.png?resize=400x0"}} />
          <Text style={styles.cardText}>My Motivations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#FF6B6B' }]} onPress={handleNavigateToMotivations}>
        <Image style={styles.photo} source={require("../../../assets/motivations/hand.jpg")} />
          <Text style={styles.cardText}>Motivatin Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#45B649' }]} onPress={handleNavigateToTest}>
        <Image style={styles.photo} source={{uri: "https://cdn.pixabay.com/photo/2023/02/15/13/06/mood-7791841_1280.png"}} />
          <Text style={styles.cardText}>Mood Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#4F95EF' }]} onPress={handleNavigateToSample}>
        <Image style={styles.photo} source={{uri: "https://ulfire.com.au/wp-content/uploads/2017/01/Motivation-300x300.jpg"}} />
          <Text style={styles.cardText}>Random Motivations</Text>
        </TouchableOpacity>
        {/* <View style={[styles.card, { backgroundColor: 'rgba(0, 0, 255, 0.5)' }]}>
          <Text style={styles.cardText}>Custom Card 1</Text>
        </View>
        <View style={[styles.card, { backgroundColor: 'rgba(225, 0, 0, 0.5)' }]}>
          <Text style={styles.cardText}>Custom Card 2</Text>
        </View>
        <View style={[styles.card, { backgroundColor: 'rgba(0, 255, 0, 0.5)' }]}>
          <Text style={styles.cardText}>Custom Card 1</Text>
        </View>
        <View style={[styles.card, { backgroundColor: 'rgba(225, 0, 225, 0.5)' }]}>
          <Text style={styles.cardText}>Custom Card 2</Text>
        </View> */}
        {/* Add more cards with different colors */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F0F0F0', // Background color for the entire screen
  },
  welcomeRow: {
    //alignItems: 'center',
    marginLeft:20,
    marginTop:20,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    //textAlign: 'center',
    marginTop: 5,
    marginBottom: 0,
    color: '#333', 
    textTransform: 'uppercase',
  },
  card: {
    width: '48%',
    height: 150,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Text color for cards
  },
  photo: {
    width: '60%',
    height:'40%',    
    height: undefined,
    aspectRatio: 1,
    marginTop:5,
    marginBottom: 5,
    borderRadius: 10,
  },
});

export default HomeScreen;
