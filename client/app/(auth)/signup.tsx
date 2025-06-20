// =================================================================================================
// File: /app/(auth)/signup.tsx
//
// Purpose:
// Signup screen for the Munchly app. Allows users to create a new account using email/password
// or Google Sign-In. After registration, the user is sent to the server to create a Firestore record
// and then navigated to the preferences screen.
//
// Technologies:
// - React Native with Expo Router
// - Firebase Authentication (Client SDK)
// - ViewModel pattern using useAuthViewModel()
// - Uses fetch to POST to /users endpoint with Firebase ID token
//
// Location:
// This file is located under /app/auth and maps to the route /auth/signup in Expo Router.
// =================================================================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
import { router } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

export default function SignupScreen() {
  // Hooks for auth logic
  const { signupWithEmail } = useAuthViewModel();

  // State for email and password input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) return null;

  // Handle signup process
  const handleSignup = async () => {
    try {
      await signupWithEmail(email, password); // Create user in Firebase Auth

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('User not found after signup');

      const token = await user.getIdToken(true); // Retrieve ID token
      if (!token) throw new Error('Missing token');

      // Send user to backend
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.email?.split('@')[0], // Default name based on email
        }),
      });


      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create user in database');
      }

      Alert.alert('Success', 'Account created!');
      router.replace('/preferences');
    } catch (error: any) {
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Join Munchly</Text>

        {/* Email input field */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password input field */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Email signup button */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up with Email</Text>
        </TouchableOpacity>

        {/* Redirect to login screen */}
        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.link}>
            Already have an account? <Text style={styles.linkBold}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Fredoka_700Bold',
  },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    fontFamily: 'Fredoka_400Regular',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Fredoka_400Regular',
  },
  link: {
    marginTop: 20,
    color: '#00AEEF',
    fontSize: 14,
    fontFamily: 'Fredoka_400Regular',
  },
  linkBold: {
    color: '#00AEEF',
    fontFamily: 'Fredoka_700Bold',
  },
});
