// src/views/LoginView.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useAuthViewModel } from './AuthViewModel';

export default function LoginView() {
  const { promptGoogleSignIn } = useAuthViewModel();

  return (
    <ImageBackground
      source={require('../../assets/login-bg.png')} // ⬅️ שים לב לשם התמונה שאתה שומר
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.logo}>Munchly</Text>
        <Text style={styles.subtitle}>take care your munchies</Text>

        <TouchableOpacity style={styles.button} onPress={promptGoogleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    alignItems: 'center',
    marginBottom: 100,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    fontFamily: 'serif', // אפשר לשים פה גופן אחר אם תרצי
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
