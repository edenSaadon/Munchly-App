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
// // 📁 src/services/userService.tsimport { getAuth } from 'firebase/auth';
// import { getAuth } from 'firebase/auth';
// import { getIdToken } from './authTokenService';

// /**
//  * אימות המשתמש מול השרת על סמך טוקן עדכני
//  */
// export async function verifyUserWithServer(): Promise<{ uid: string }> {
//   const token = await getIdToken(true); // ← רענון חובה אחרי login

//   if (!token) throw new Error('No token found');

//   const res = await fetch('https://09e4-2a06-c701-ca95-9900-4ccb-7d0e-ae4a-7956.ngrok-free.app/users/verify', {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   console.log('🔐 Token sent to server:', token);

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}));
//     throw new Error(err.message || 'Token invalid or expired');
//   }

//   return await res.json(); // ← מחזיר את ה־uid או מידע אחר מהשרת
// }

// /**
//  * התנתקות מה-Firebase Auth בצד הלקוח
//  */
// export async function logoutUser(): Promise<void> {
//   const auth = getAuth();
//   await auth.signOut();
// }

// /**
//  * שליחת העדפות המשתמש לשרת לשמירה ב-Firestore
//  */
// export async function saveUserPreferences(uid: string, preferences: any): Promise<void> {
//   const token = await getIdToken(true);
//   if (!token) throw new Error('No token found');

//   const res = await fetch(`https://09e4-2a06-c701-ca95-9900-4ccb-7d0e-ae4a-7956.ngrok-free.app/users/${uid}/preferences`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ preferences }),
//   });

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}));
//     throw new Error(err.message || 'Failed to save preferences');
//   }
// }

import { getAuth } from 'firebase/auth';
import { getIdToken } from './authTokenService';

/**
 * אימות המשתמש מול השרת על סמך טוקן עדכני
 */
export async function verifyUserWithServer(): Promise<{ uid: string }> {
  const token = await getIdToken(true); // ← רענון חובה אחרי login

  if (!token) throw new Error('No token found');

  const res = await fetch('https://43a6-2a06-c701-ca9a-4b00-d459-177d-3538-a430.ngrok-free.app/users/verify', {
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

  const res = await fetch(`https://43a6-2a06-c701-ca9a-4b00-d459-177d-3538-a430.ngrok-free.app/users/${uid}/preferences`, {
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

/**
 * שליפת פרופיל המשתמש כולל העדפות ומתכונים שאהב
 */
export async function getUserProfile(uid: string): Promise<any> {
  const token = await getIdToken();
  if (!token) throw new Error('No token found');

  const res = await fetch(`https://43a6-2a06-c701-ca9a-4b00-d459-177d-3538-a430.ngrok-free.app/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
  return data;
}

