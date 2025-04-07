// 📁 src/services/authTokenService.ts
import { getAuth } from 'firebase/auth';

export async function getIdToken(): Promise<string | null> {
  const user = getAuth().currentUser;
  if (!user) return null;

  try {
    return await user.getIdToken();
  } catch (err) {
    console.error('Failed to get token', err);
    return null;
  }
}

