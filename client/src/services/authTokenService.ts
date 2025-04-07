// 📁 src/services/authTokenService.ts
import { getAuth } from 'firebase/auth';

/**
 * שליפת ID Token מהיוזר המחובר
 * @param forceRefresh - אם true → רענון טוקן (מומלץ אחרי login/logout)
 */
export async function getIdToken(forceRefresh: boolean = false): Promise<string | null> {
  const user = getAuth().currentUser;
  if (!user) return null;

  try {
    return await user.getIdToken(forceRefresh); // ← רענון לפי הצורך
  } catch (err) {
    console.error('Failed to get token:', err);
    return null;
  }
}
