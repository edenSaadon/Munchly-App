import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { auth } from '../config/firebaseConfig';
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

const expoClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_EXPO;
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS;
const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID;

// ✅ את זה את יוצרת לפי מה שמופיע אצלך בקונסול (או `makeRedirectUri({ useProxy: true })`)
import { makeRedirectUri } from 'expo-auth-session';

const redirectUri = makeRedirectUri({
  scheme: 'exp', // בדיוק כמו ב-app.config.js
  useProxy: true,    // כדי שזה יהיה https://auth.expo.io/...
});


export function useAuthViewModel() {
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_EXPO,
  redirectUri: makeRedirectUri({ useProxy: true }),
    iosClientId,
    androidClientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCred) => {
          console.log('✅ Signed in as:', userCred.user.email);
        })
        .catch((error) => {
          console.error('❌ Sign-in error:', error.message);
        });
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      console.log('👋 Signed out');
    } catch (e) {
      console.error('❌ Sign-out error:', e.message);
    }
  };

  return {
    user,
    isLoggedIn: !!user,
    promptGoogleSignIn: () => promptAsync(),
    signOut,
  };
}
