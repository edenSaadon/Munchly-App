// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { db } from '../config/firebase';

// export interface UserPreferences {
//   vegetarian: boolean;
//   vegan: boolean;
//   glutenFree: boolean;
//   lactoseFree: boolean;
//   nutAllergy: boolean;
//   seafoodAllergy: boolean;
// }

// export async function saveUserPreferences(uid: string, preferences: UserPreferences): Promise<void> {
//   if (!uid) throw new Error('Missing user ID');
//   const userRef = doc(db, 'users', uid);
//   try {
//     await setDoc(userRef, { preferences }, { merge: true });
//   } catch (error) {
//     console.error('Error saving preferences:', error);
//     throw error;
//   }
// }

// export async function getUserProfile(uid: string) {
//   const userRef = doc(db, 'users', uid);
//   const userSnap = await getDoc(userRef);
//   if (!userSnap.exists()) throw new Error('User not found');
//   return userSnap.data();
// }

import { getAuth } from 'firebase/auth';
import { getIdToken } from './authTokenService';

export async function verifyUserWithServer(): Promise<{ uid: string }> {
  const token = await getIdToken();
  if (!token) throw new Error('No token found');

  const res = await fetch('https://your-server.com/auth/verify', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Token invalid or expired');
  return await res.json();
}

export async function logoutUser(): Promise<void> {
  const auth = getAuth();
  await auth.signOut();
}

