import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { useAuthViewModel } from '../src/viewModels/useAuthViewModel';
import { onAuthStateChanged } from 'firebase/auth';

// 🧪 מוק לפיירבייס
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(),
  GoogleAuthProvider: {
    credential: jest.fn(),
  },
  signInWithCredential: jest.fn(),
  signOut: jest.fn(),
}));

// ✅ מוק ל־expo-auth-session כדי לא לקרוס בטסט
jest.mock('expo-auth-session/providers/google', () => ({
  useAuthRequest: () => [null, null, jest.fn()],
}));

// קומפוננטת טסט
const TestComponent = () => {
  const { user } = useAuthViewModel();
  const isLoggedIn = !!user;

  return (
    <>
      <Text testID="user">{user ? 'yes' : 'no'}</Text>
      <Text testID="logged">{isLoggedIn ? 'true' : 'false'}</Text>
    </>
  );
};

describe('useAuthViewModel', () => {
  it('should show no user when not authenticated', () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      callback(null);
      return () => {};
    });

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('user').props.children).toBe('no');
    expect(getByTestId('logged').props.children).toBe('false');
  });
});
