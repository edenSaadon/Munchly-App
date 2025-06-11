/**
 * Test Summary:
 * This test checks the BackButton component:
 * 1. Ensures it renders the back icon
 * 2. Verifies that pressing the button calls router.back()
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BackButton from '../buttons/BackButton';

// Create a mock for the router.back() function
const mockBack = jest.fn();

// Mock useRouter from expo-router to return our mock function
jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe('BackButton', () => {
  it('renders the back button icon', () => {
    const { getByTestId } = render(<BackButton />);
    expect(getByTestId('BackButtonTouchable')).toBeTruthy();
  });

  it('calls router.back() when pressed', () => {
    const { getByTestId } = render(<BackButton />);
    fireEvent.press(getByTestId('BackButtonTouchable'));
    expect(mockBack).toHaveBeenCalled();
  });
});
