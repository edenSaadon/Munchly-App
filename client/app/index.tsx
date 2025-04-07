// 📁 app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { useAuthViewModel } from '@/viewModels/useAuthViewModel';

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Munchly</Text>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(255,255,255,0.8)', // רקע לבן שקוף קלות לטקסטים ולכפתורים
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
  },
});
