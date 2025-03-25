// ✅ src/config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

// ✅ First: define the config
const firebaseConfig = {
  apiKey: Platform.OS === 'ios'
    ? process.env.EXPO_PUBLIC_FIREBASE_API_KEY_IOS
    : process.env.EXPO_PUBLIC_FIREBASE_API_KEY_ANDROID,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: Platform.OS === 'ios'
    ? process.env.EXPO_PUBLIC_FIREBASE_APP_ID_IOS
    : process.env.EXPO_PUBLIC_FIREBASE_APP_ID_ANDROID,
};

// ✅ Then: initialize Firebase with that config
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔍 Log confirmation
console.log("✅ Firebase initialized:", app.name);

export { app, auth, db };
