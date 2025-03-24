// src/views/TestFirebaseConnection.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function TestFirebaseConnection() {
  const [status, setStatus] = useState('checking');
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setStatus('connected');
      } else {
        setStatus('no_user');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {status === 'checking' && <ActivityIndicator size="large" color="blue" />}
      {status === 'connected' && <Text>✅ Connected to Firebase as {userEmail}</Text>}
      {status === 'no_user' && <Text>❌ No user is currently signed in</Text>}
    </View>
  );
}
