/**
 * File: services/authTokenService.ts
 *
 * Purpose:
 * This module provides a utility function to retrieve the Firebase ID token
 * for the currently authenticated user. This token is required to authenticate
 * secure requests between the React Native client and the backend server.
 *
 * Functions:
 * 1. getIdToken(forceRefresh?) – Retrieves the Firebase ID token for the logged-in user,
 *    optionally forcing a fresh token if needed (e.g., after login).
 *
 * Dependencies:
 * - Firebase Auth client SDK (getAuth from firebase/auth)
 */

import { getAuth } from 'firebase/auth';

/**
 * Retrieves the Firebase ID token of the currently authenticated user.
 * This token is typically attached to backend requests to verify the user's identity.
 *
 * @param {boolean} forceRefresh – Optional flag to force a token refresh (default: false).
 *                                 Set this to true after login/logout to ensure token validity.
 * @returns {Promise<string | null>} Returns the token string, or null if no user is signed in.
 */
export async function getIdToken(forceRefresh: boolean = false): Promise<string | null> {
  const user = getAuth().currentUser;
  if (!user) return null; // No user is signed in

  try {
    // Return the user's ID token; force refresh if specified
    return await user.getIdToken(forceRefresh);
  } catch (err) {
    console.error(' Failed to retrieve ID token:', err);
    return null;
  }
}
