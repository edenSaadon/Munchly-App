/**
 * File: services/userService.ts
 *
 * Purpose:
 * This module manages user-related interactions between the React Native client
 * and the backend server, using Firebase Authentication tokens for secure communication.
 *
 * Functions:
 * 1. verifyUserWithServer() – Verifies the current Firebase-authenticated user by sending their ID token to the backend.
 * 2. logoutUser() – Logs out the user from Firebase Auth on the client.
 * 3. saveUserPreferences() – Sends the user's preferences to the backend to be stored in Firestore.
 * 4. getUserProfile() – Retrieves the user's full profile from the backend, including preferences and liked recipes.
 *
 * Dependencies:
 * - Firebase Auth client SDK (getAuth)
 * - Firebase ID token retrieval (getIdToken)
 * - Environment variable: EXPO_PUBLIC_SERVER_URL (server base URL)
 */

import { getAuth } from 'firebase/auth';
import { getIdToken } from './authTokenService';
const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

/**
 * Verifies the authenticated user with the backend using a fresh ID token.
 * Sends a GET request to /users/verify with the token in the Authorization header.
 *
 * @returns {Promise<{ uid: string }>} UID returned by the backend.
 * @throws Error if no token is found or server response is not OK.
 */
export async function verifyUserWithServer(): Promise<{ uid: string }> {
  const token = await getIdToken(true);
  if (!token) throw new Error('No token found');

  const res = await fetch(`${SERVER_URL}/users/verify`, {
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

  return await res.json();
}

/**
 * Signs the user out from Firebase Authentication on the client side.
 */
export async function logoutUser(): Promise<void> {
  const auth = getAuth();
  await auth.signOut();
}

/**
 * Sends the user's selected preferences to the backend to be saved in Firestore.
 *
 * @param {string} uid – Firebase UID of the user.
 * @param {any} preferences – Object containing the user's preferences.
 * @throws Error if token is missing or the POST request fails.
 */
export async function saveUserPreferences(uid: string, preferences: any): Promise<void> {
  const token = await getIdToken(true);
  if (!token) throw new Error('No token found');

  const res = await fetch(`${SERVER_URL}/users/${uid}/preferences`, {
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
 * Fetches the user's full profile from the backend, including preferences and liked recipes.
 *
 * @param {string} uid – The user's UID (currently unused by the API).
 * @returns {Promise<any>} The user's profile data from the backend.
 * @throws Error if token is missing or the fetch fails.
 */
export async function getUserProfile(uid: string): Promise<any> {
  const token = await getIdToken();
  if (!token) throw new Error('No token found');

  const res = await fetch(`${SERVER_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
  return data;
}
