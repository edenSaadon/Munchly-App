import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '@/config/firebase';

export function useAuthViewModel() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB!,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID!,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS!,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const signupWithEmail = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithEmail = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);


  return {
    user,
    isLoading,
    promptGoogleSignIn: () => promptAsync(),
    signupWithEmail,
    loginWithEmail,
    logout,
  };
}


