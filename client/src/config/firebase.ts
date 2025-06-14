/**
 * File: firebaseConfig.ts
 *
 * Purpose:
 * This module initializes and exports the Firebase configuration for the app,
 * including Authentication and Firestore services. It dynamically loads configuration
 * based on the current platform (iOS or Android) using Expo environment variables.
 *
 * Functions / Exports:
 * - `app`: The initialized Firebase app instance.
 * - `auth`: Firebase Authentication service instance.
 * - `db`: Firestore database service instance.
 *
 * Key Features:
 * Uses `Platform.OS` to select platform-specific keys (iOS vs Android)
 * Reads all config from environment variables via `process.env`
 * Initializes Firebase once and exports ready-to-use services
 *
 * Dependencies:
 * - firebase/app for app initialization
 * - firebase/auth for user authentication
 * - firebase/firestore for database access
 * - react-native Platform to detect OS
 */

import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { Platform } from 'react-native';

// Dynamic Firebase config based on platform
const firebaseConfig: FirebaseOptions = {
  apiKey: Platform.OS === 'ios'
    ? process.env.EXPO_PUBLIC_FIREBASE_API_KEY_IOS!
    : process.env.EXPO_PUBLIC_FIREBASE_API_KEY_ANDROID!,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: Platform.OS === 'ios'
    ? process.env.EXPO_PUBLIC_FIREBASE_APP_ID_IOS!
    : process.env.EXPO_PUBLIC_FIREBASE_APP_ID_ANDROID!,
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

// Export Firebase modules to be used across the app
export { app, auth, db };
