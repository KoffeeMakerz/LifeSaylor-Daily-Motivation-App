// ReelsScreen.js

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import YouTube from 'react-native-youtube';

const Reels = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);

  const navigateToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const navigateToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Reels Screen</Text>
      
      {/* YouTube Video
      <YouTube
        videoId="YOUR_YOUTUBE_VIDEO_ID_HERE" // Replace with your YouTube video ID
        style={{ alignSelf: 'stretch', height: 200 }}
      /> */}

      {/* Page indicator */}
      <Text style={styles.pageIndicator}>Video Page {currentPage}</Text>

      {/* Content for each page */}
      <View style={styles.contentContainer}>
        {/* You can replace this with your actual video component */}
        <Text style={styles.videoContent}>Video Content for Page {currentPage}</Text>
      </View>

      {/* Navigation buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={navigateToPreviousPage} disabled={currentPage === 1} />
        <Button title="Next" onPress={navigateToNextPage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pageIndicator: {
    fontSize: 18,
    marginVertical: 10,
  },
  contentContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  videoContent: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
});

export default Reels;
