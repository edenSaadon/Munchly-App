import { doc, setDoc } from 'firebase/firestore';
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
