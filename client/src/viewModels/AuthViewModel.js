// src/viewmodels/authViewModel.js

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';

import { auth } from '../config/firebaseConfig';
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth';

// ✅ Complete any pending authentication sessions (important for Expo Go)
WebBrowser.maybeCompleteAuthSession();

// ✅ Load client IDs from environment variables
const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID;
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS;
const expoClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_EXPO;
const webClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB;

export function useAuthViewModel() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // ✅ Optional loading flag

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    iosClientId,
    androidClientId,
    webClientId,
  });

  // ✅ Handle Google Sign-In response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCred) => {
          console.log("✅ Signed in with Google:", userCred.user.email);
        })
        .catch((err) => {
          console.error("❌ Google sign-in error:", err.message);
        });
    }
  }, [response]);

  // ✅ Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false); // ✅ Done loading
    });
    return () => unsubscribe();
  }, []);

  // ✅ Sign out function
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
    authLoading,
    promptGoogleSignIn: () => promptAsync(),
    signOut,
  };
}
