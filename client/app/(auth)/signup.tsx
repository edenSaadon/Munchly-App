
//   useEffect(() => {
//     fetch('https://8fe9-109-67-176-145.ngrok-free.app/ping')
//       .then((res) => res.json())
//       .then((data: { message: string }) => setServerStatus(data.message))
//       .catch((err) => setServerStatus('Error: ' + err.message));
//   }, []);


// 📁 app/(auth)/signup.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ImageBackground } from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
import { router } from 'expo-router';

export default function SignupScreen() {
  const { promptGoogleSignIn, signupWithEmail } = useAuthViewModel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signupWithEmail(email, password);
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
