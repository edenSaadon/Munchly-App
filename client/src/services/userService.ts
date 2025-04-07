import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface UserPreferences {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  lactoseFree: boolean;
  nutAllergy: boolean;
  seafoodAllergy: boolean;
}

export async function saveUserPreferences(uid: string, preferences: UserPreferences): Promise<void> {
  if (!uid) throw new Error('Missing user ID');
  const userRef = doc(db, 'users', uid);
  try {
    await setDoc(userRef, { preferences }, { merge: true });
  } catch (error) {
    console.error('Error saving preferences:', error);
    throw error;
  }
}

export async function getUserProfile(uid: string) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error('User not found');
  return userSnap.data();
}
