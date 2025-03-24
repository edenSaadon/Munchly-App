// __tests__/authViewModel.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuthViewModel } from '../src/viewmodels/authViewModel';
import { onAuthStateChanged } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  GoogleAuthProvider: {
    credential: jest.fn()
  },
  signInWithCredential: jest.fn(),
  signOut: jest.fn()
}));

describe('useAuthViewModel', () => {
  it('should initialize without user', () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null); // no user
      return () => {};
    });

    const { result } = renderHook(() => useAuthViewModel());

    expect(result.current.user).toBe(null);
    expect(result.current.isLoggedIn).toBe(false);
  });
});
