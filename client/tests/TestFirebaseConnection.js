import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { auth } from '../src/config/firebaseConfig';
import { onAuthStateChanged, signOut as firebaseSignOut, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// Expo-only: close unfinished sessions
WebBrowser.maybeCompleteAuthSession();

// Load client IDs from .env
const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID;
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS;
const expoClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_EXPO;

export default function TestFirebaseConnection() {
  const [status, setStatus] = useState('🌀 Checking Firebase connection...');
  const [user, setUser] = useState(null);

  // Google Sign-In setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    androidClientId,
    iosClientId,
  });

  // When user completes Google Sign-In flow
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCred) => {
          setUser(userCred.user);
          setStatus(`✅ Connected to Firebase. Logged in as: ${userCred.user.email}`);
        })
        .catch((err) => {
          console.error("❌ Google sign-in error:", err.message);
          setStatus("❌ Google sign-in failed");
        });
    }
  }, [response]);

  // Listen for Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (auth && typeof auth.signOut === 'function') {
        if (firebaseUser) {
          setUser(firebaseUser);
          setStatus(`✅ Connected to Firebase. Logged in as: ${firebaseUser.email}`);
        } else {
          setUser(null);
          setStatus('✅ Connected to Firebase. ❌ No user signed in.');
        }
      } else {
        setStatus('❌ Firebase connection failed');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setStatus('👋 Signed out successfully.');
      setUser(null);
    } catch (error) {
      console.error('❌ Sign-out error:', error.message);
    }
  };

  return (
    <View style={{ marginTop: 100, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>{status}</Text>
      {status.includes('🌀') && <ActivityIndicator size="large" color="#0000ff" />}

      {!user && (
        <Button
          title="🔐 Sign in with Google"
          onPress={() => promptAsync()}
          disabled={!request}
        />
      )}

      {user && (
        <Button
          title="🚪 Sign Out"
          color="red"
          onPress={handleSignOut}
        />
      )}
    </View>
  );
}
