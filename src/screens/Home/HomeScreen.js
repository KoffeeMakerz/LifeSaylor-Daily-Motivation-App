import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuImage from "../../components/MenuImage/MenuImage";

const HomeScreen = (props) => {
  const { navigation } = props;
  const [userName, setUserName] = useState('');

  const handleNavigateToCategories = () => { navigation.navigate('My Motivations'); };
  const handleNavigateToMotivations = () => { navigation.navigate('Motivation Gallery'); };
  const handleNavigateToTest = () => { navigation.navigate('Test'); };
  const handleNavigateToSample = () => { navigation.navigate('Random Motivation'); };

  useEffect(() => {
    loadUserName();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { fontWeight: "bold", textAlign: "center", alignSelf: "center", flex: 1, },
      headerLeft: () => (<MenuImage onPress={() => { navigation.openDrawer(); }} />),
      headerRight: () => <View />,
    });
  }, []);

  const loadUserName = async () => {
    try {
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
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => onPressCategory(item)}
    >
      <Image style={styles.photo} source={{ uri: item.photo_url }} />
      <Text style={styles.cardText}>{item.name}</Text>
      <Text style={styles.cardInfo}>{getNumberOfRecipes(item.id)} motivations</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
      </View>
      <View style={styles.container}>
        {categories.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            {renderCategory({ item })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#F0F0F0',
  },
  cardContainer: {
    width: '48%',
    marginBottom: 16,
  },
  card: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  cardInfo: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;
