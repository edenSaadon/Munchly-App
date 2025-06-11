import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { Platform } from 'react-native';


// 🔁 Dynamic Firebase config based on platform
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

// 🔥 Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
