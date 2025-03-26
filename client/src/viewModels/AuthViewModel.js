// src/viewmodels/authViewModel.js

// Import Google sign-in methods from expo-auth-session
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
// Import Firebase authentication instance
import { auth } from '../config/firebaseConfig';
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth';

// Complete any pending authentication sessions (important for Expo Go)
WebBrowser.maybeCompleteAuthSession();

// Get Client IDs from environment variables
const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID;
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS;
const expoClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_EXPO;

// Custom hook to handle authentication logic
export function useAuthViewModel() {
  const [user, setUser] = useState(null); // Stores the currently signed-in user

  // Configure the Google sign-in request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    iosClientId,
    androidClientId,
  });

  // Handle Google login success
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      // Sign in to Firebase with Google credentials
      signInWithCredential(auth, credential)
        .then((userCred) => {
          console.log("✅ Signed in with Google:", userCred.user.email);
        })
        .catch((err) => {
          console.error("❌ Google sign-in error:", err.message);
        });
    }
  }, [response]);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // Sign-out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      console.log("👋 Signed out");
    } catch (error) {
      console.error("❌ Error signing out:", error.message);
    }
  };

  return {
    user,
    isLoggedIn: !!user,
    promptGoogleSignIn: () => promptAsync(), // Trigger Google sign-in flow
    signOut,
  };
}
