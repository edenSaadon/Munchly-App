// app/index.tsx
//
// This is the Welcome (home) screen of the Munchly app.
// It appears when the app launches and allows the user to either sign up or log in.
// It includes a background image, title, subtitle, and two navigation buttons.

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';

export default function WelcomeScreen() {
  // Load Google Fonts before rendering UI
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) return null; // Show nothing until fonts are ready

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')} // Background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Munchly</Text>
        <Text style={styles.subtitle}>Your smart kitchen companion</Text>

        {/* Navigate to Sign Up screen */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Navigate to Login screen */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
  },
  overlay: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay for contrast
  },
  title: {
    fontSize: 36,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Fredoka_700Bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    fontFamily: 'Fredoka_400Regular',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Fredoka_400Regular',
    color: '#fff',
  },
});
