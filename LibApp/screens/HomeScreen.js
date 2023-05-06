import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function HomeScreen() {
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Library App</Text>
      <Text style={styles.subtitle}>Explore books, discover new ones, and keep track of your reading progress</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E3440',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#BD93F9"
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#888',
  },
});