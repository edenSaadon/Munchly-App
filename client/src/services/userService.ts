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
// 📁 src/services/userService.tsimport { getAuth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getIdToken } from './authTokenService';

/**
 * אימות המשתמש מול השרת על סמך טוקן עדכני
 */
export async function verifyUserWithServer(): Promise<{ uid: string }> {
  const token = await getIdToken(true); // ← רענון חובה אחרי login

  if (!token) throw new Error('No token found');

<<<<<<< HEAD
  const res = await fetch('https://8ae5-2a06-c701-746b-e00-45eb-7775-ed6a-7956.ngrok-free.app', {
=======
  const res = await fetch('https://4415-84-228-172-112.ngrok-free.app/users/verify', {
>>>>>>> 1e3f9aa225bdf8ff07677fe2064e5c5333ae2024
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('🔐 Token sent to server:', token);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Token invalid or expired');
  }

  return await res.json(); // ← מחזיר את ה־uid או מידע אחר מהשרת
}

/**
 * התנתקות מה-Firebase Auth בצד הלקוח
 */
export async function logoutUser(): Promise<void> {
  const auth = getAuth();
  await auth.signOut();
}

/**
 * שליחת העדפות המשתמש לשרת לשמירה ב-Firestore
 */
export async function saveUserPreferences(uid: string, preferences: any): Promise<void> {
  const token = await getIdToken(true);
  if (!token) throw new Error('No token found');

<<<<<<< HEAD
  const res = await fetch(`https://8ae5-2a06-c701-746b-e00-45eb-7775-ed6a-7956.ngrok-free.app/users/${uid}/preferences`, {
=======
  const res = await fetch(`https://4415-84-228-172-112.ngrok-free.app/users/${uid}/preferences`, {
>>>>>>> 1e3f9aa225bdf8ff07677fe2064e5c5333ae2024
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ preferences }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to save preferences');
  }
}
