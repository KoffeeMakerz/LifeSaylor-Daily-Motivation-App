import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Share } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DiscoverScreen = () => {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('');

  const goBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const goForward = () => {
    if (webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  const reload = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const sharePage = async () => {
    try {
      const url = 'https://lifesaylor.com/blog/';
      await Share.share({
        message: `Check out this article: ${pageTitle}\n${url}`,
        url: url,
      });
    } catch (error) {
      console.error('Error sharing page:', error.message);
    }
  };

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = (syntheticEvent) => {
    setLoading(false);
    const { nativeEvent } = syntheticEvent;
    setPageTitle(nativeEvent.title || 'Discover');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{pageTitle}</Text>
      </View>

      <WebView
        ref={webViewRef}
        source={{ uri: 'https://lifesaylor.com/blog/' }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#72c17d" />
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={goBack} disabled={loading}>
          <Icon name="navigate-before" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goForward} disabled={loading}>
          <Icon name="navigate-next" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reload} disabled={loading}>
          <Icon name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sharePage} disabled={loading}>
          <Icon name="share" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    backgroundColor: '#72c17d',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#72c17d',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
});

export default DiscoverScreen;
