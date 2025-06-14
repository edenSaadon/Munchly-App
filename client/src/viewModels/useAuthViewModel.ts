/**
 * File: viewModels/useAuthViewModel.ts
 *
 * Purpose:
 * This hook provides an abstraction layer for authentication logic used across the Munchly app.
 * It supports:
 * - Firebase email/password authentication (signup and login)
 * - Google Sign-In via Expo AuthSession
 * - Realtime user state observation with `onAuthStateChanged`
 * - Logout functionality
 *
 * Features:
 *  Google Sign-In configured for iOS, Android, and Web using environment variables
 * `isLoggedIn` derived from current user state (for easier use in UI and tests)
 * Automatically handles sign-in when Google OAuth flow completes
 *
 * Dependencies:
 * - Firebase Authentication SDK (firebase/auth)
 * - Expo Google AuthSession (expo-auth-session/providers/google)
 * - Firebase app initialized in @/config/firebase
 * - React hooks: useState, useEffect
 *
 * Returns:
 * - `user`: the current authenticated Firebase user or null
 * - `isLoading`: true while auth state is initializing
 * - `isLoggedIn`: boolean for simplified state checks (especially useful in tests)
 * - `promptGoogleSignIn()`: function to trigger the Google OAuth flow
 * - `signupWithEmail()`, `loginWithEmail()`, `logout()`: wrappers for Firebase Auth methods
 */

import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User as FirebaseUser,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '@/config/firebase';

export function useAuthViewModel() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Configure Google Sign-In based on platform-specific environment variables
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB!,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID!,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS!,
  });

  // Listen for auth state changes (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);       // Update local state
      setIsLoading(false);         // Auth check complete
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  // If Google sign-in succeeds, complete sign-in with the ID token
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential); // Sign in to Firebase
    }
  }, [response]);

  // Create new user with email + password
  const signupWithEmail = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Login user with email + password
  const loginWithEmail = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  // Sign out user from Firebase
  const logout = () => signOut(auth);

  // Add isLoggedIn helper for easier testing/UI conditions
  const isLoggedIn = !!user;

  return {
    user,
    isLoading,
    isLoggedIn, // ← exposed explicitly for convenience and testing
    promptGoogleSignIn: () => promptAsync(),
    signupWithEmail,
    loginWithEmail,
    logout,
  };
}
