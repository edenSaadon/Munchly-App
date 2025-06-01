
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Alert,
//   ImageBackground,
//   TouchableOpacity,
// } from 'react-native';
// import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
// import { router } from 'expo-router';
// import { verifyUserWithServer } from '@/services/userService';
// import BackButton from '../../components/buttons/BackButton';
// import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

// export default function LoginScreen() {
//   const { promptGoogleSignIn, loginWithEmail } = useAuthViewModel();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [fontsLoaded] = useFonts({
//     Fredoka_400Regular,
//     Fredoka_700Bold,
//   });

//   if (!fontsLoaded) return null;

//   const handleLogin = async () => {
//     try {
//       await loginWithEmail(email, password);
//       await verifyUserWithServer();
//       Alert.alert('Success', 'Logged in!');
//       router.replace('/menu');
//     } catch (error: any) {
//       Alert.alert('Login Error', error.message || 'Something went wrong');
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/images/login-bg.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <BackButton />
//         <Text style={styles.title}>Welcome Back to Munchly 🍽️</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           placeholderTextColor="#ccc"
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#ccc"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />

//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Log In with Email</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button} onPress={promptGoogleSignIn}>
//           <Text style={styles.buttonText}>Or Log In with Google</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   title: {
//     fontSize: 26,
//     color: '#fff',
//     marginBottom: 20,
//     textAlign: 'center',
//     fontFamily: 'Fredoka_700Bold',
//   },
//   input: {
//     width: '90%',
//     padding: 12,
//     marginBottom: 16,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderRadius: 8,
//     color: '#fff',
//     borderColor: '#fff',
//     borderWidth: 1,
//     fontFamily: 'Fredoka_400Regular',
//   },
//   button: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 25,
//     marginVertical: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#000',
//     fontFamily: 'Fredoka_400Regular',
//   },
// });

// (auth)/login.tsx
// -----------------------------------------
// Login Screen – Munchly App (React Native + Expo Router)
// -----------------------------------------
// Purpose:
// - Allows users to log in using email/password or Google Sign-In.
// - Upon successful login, verifies user identity with the backend server.
// - Navigates the user to the main menu screen.
//
// Technologies:
// - React Native + Expo Router
// - Firebase Authentication
// - Custom MVVM ViewModel pattern (useAuthViewModel)
// - Google Fonts (Fredoka)
// -----------------------------------------

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
import { verifyUserWithServer } from '@/services/userService';
import BackButton from '../../components/buttons/BackButton';
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

export default function LoginScreen() {
  // ViewModel functions: handle email login and Google Sign-In
  const { promptGoogleSignIn, loginWithEmail } = useAuthViewModel();

  // Local state for email and password fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Load custom fonts for styling
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });
  if (!fontsLoaded) return null;

  // Handle user login with email/password
  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);           // Firebase login
      await verifyUserWithServer();                    // Server-side token verification
      Alert.alert('Success', 'Logged in!');
      router.replace('/menu');                         // Navigate to main menu
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

        <Text style={styles.title}>Welcome Back to Munchly</Text>

        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Login with email */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In with Email</Text>
        </TouchableOpacity>

        {/* Google Sign-In */}
        <TouchableOpacity style={styles.button} onPress={promptGoogleSignIn}>
          <Text style={styles.buttonText}>Or Log In with Google</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Style definitions for the login screen
const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', // dark overlay
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
});
