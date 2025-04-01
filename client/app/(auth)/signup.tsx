
//   useEffect(() => {
//     fetch('https://8fe9-109-67-176-145.ngrok-free.app/ping')
//       .then((res) => res.json())
//       .then((data: { message: string }) => setServerStatus(data.message))
//       .catch((err) => setServerStatus('Error: ' + err.message));
//   }, []);
// 📁 app/(auth)/signup.tsx
// 📁 app/(auth)/signup.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useAuthViewModel } from '@/viewmodels/useAuthViewModel';

export default function SignupScreen() {
  const { promptGoogleSignIn, signupWithEmail } = useAuthViewModel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signupWithEmail(email, password);
      Alert.alert('Success', 'Account created!');
    } catch (error: any) {
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Munchly 🍽️</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <PrimaryButton title="Sign Up with Email" onPress={handleSignup} />
      <PrimaryButton title="Or Sign Up with Google" onPress={promptGoogleSignIn} />

      <Text style={styles.link}>Already have an account? Log in</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#fff'
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20
  },
  input: {
    width: '80%', padding: 10, marginBottom: 15,
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8
  },
  link: {
    marginTop: 20, color: '#007AFF', fontSize: 14
  }
});
