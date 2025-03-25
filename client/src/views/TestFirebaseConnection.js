import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function TestFirebaseConnection() {
  const [status, setStatus] = useState('🌀 Checking Firebase connection...');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (auth && typeof auth.signOut === 'function') {
        if (user) {
          setStatus(`✅ Connected to Firebase. Logged in as: ${user.email}`);
        } else {
          setStatus('✅ Connected to Firebase. ❌ No user signed in.');
        }
      } else {
        setStatus('❌ Firebase connection failed');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ marginTop: 100, padding: 20 }}>
      <Text style={{ fontSize: 18 }}>{status}</Text>
      {status.includes('🌀') && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}
