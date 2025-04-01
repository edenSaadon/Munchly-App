// 📁 app/index.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import PrimaryButton from '../components/buttons/PrimaryButton';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Welcome to Munchly</Text>
      <Text style={styles.subtitle}>Your smart kitchen companion</Text>

      <PrimaryButton
        title="Sign Up"
        onPress={() => router.push('/signup')}
      />
      <PrimaryButton
        title="Log In"
        onPress={() => router.push('/login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
  },
});
