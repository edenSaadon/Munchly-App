// // 📁 app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ImageBackground } from 'react-native';
//import AppText from '../components/common/AppText';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
import { router } from 'expo-router';
import { getIdToken } from '@/services/authTokenService'; // ✅
import { verifyUserWithServer } from '@/services/userService';
import BackButton from '../../components/buttons/BackButton'; // ✅ ייבוא כפתור חזור

export default function LoginScreen() {
  const { promptGoogleSignIn, loginWithEmail } = useAuthViewModel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // שלב 1: התחברות לפיירבייס
      await loginWithEmail(email, password);
      await verifyUserWithServer(); // ← כולל שליפת טוקן ובדיקה
      Alert.alert('Success', 'Logged in!');
      router.replace('/menu'); // או /preferences
    } catch (error: any) {
      Alert.alert('Login Error', error.message || 'Something went wrong');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <BackButton /> 
        <Text style={styles.title}>Welcome Back to Munchly 🍽️</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <PrimaryButton title="Log In with Email" onPress={handleLogin} />
        <PrimaryButton title="Or Log In with Google" onPress={promptGoogleSignIn} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
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
  },
});
