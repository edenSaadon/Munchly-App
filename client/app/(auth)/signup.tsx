import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
import { router } from 'expo-router';
import { getIdToken } from '@/services/authTokenService';
import { getAuth } from 'firebase/auth';

export default function SignupScreen() {
  const { promptGoogleSignIn, signupWithEmail } = useAuthViewModel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      // 1. הרשמה ל-Firebase Auth
      await signupWithEmail(email, password);

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('User not found after signup');

      // 2. שליפת טוקן
      const token = await auth.currentUser?.getIdToken(true);
      if (!token) throw new Error('Missing token');

      // 3. שליחת פרטי היוזר לשרת ליצירת מסמך ב-Firestore
      const response = await fetch('https://e7cd-2a06-c701-ca96-7100-a4b2-37ce-7c3d-f600.ngrok-free.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.email?.split('@')[0], // או שדה name אמיתי
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
        <Text style={styles.title}>Join Munchly 🍽️</Text>

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

        <PrimaryButton title="Sign Up with Email" onPress={handleSignup} />
        <PrimaryButton title="Or Sign Up with Google" onPress={promptGoogleSignIn} />

        <Text style={styles.link}>Already have an account? Log in</Text>
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
  link: {
    marginTop: 20,
    color: '#00AEEF',
    fontSize: 14,
  },
});
