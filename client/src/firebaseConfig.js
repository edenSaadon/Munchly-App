// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { Platform } from 'react-native';

const androidConfig = {
  apiKey: "AIzaSyCvMohRcj_qH4EwNtIj3uTt8OJt5EOrfFk",  // ה-API Key של אנדרואיד
  authDomain: "munchly-48936.firebaseapp.com",
  projectId: "munchly-48936",
  storageBucket: "munchly-48936.appspot.com",
  messagingSenderId: "1003950167016",
  appId: "1:1003950167016:android:6b2818b59c041fa9c30a5d"
};

const iosConfig = {
  apiKey: "AIzaSyD4SjgWSwuwMDyCIrAlK4JmbLWW6rkPml0",  // ה-API Key של iOS
  authDomain: "munchly-48936.firebaseapp.com",
  projectId: "munchly-48936",
  storageBucket: "munchly-48936.appspot.com",
  messagingSenderId: "1003950167016",
  appId: "1:1003950167016:ios:8eb1f5479762a1e7c30a5d"
};

// בוחרים את ההגדרה לפי הפלטפורמה
const firebaseConfig = Platform.OS === 'ios' ? iosConfig : androidConfig;

// אתחול Firebase
const app = initializeApp(firebaseConfig);

export default app;
