/**
 * ✅ Test Summary:
 * This test suite verifies the PrimaryButton component:
 * 1. Renders the correct button label
 * 2. Calls the onPress function when pressed (if not disabled)
 * 3. Does NOT call onPress if the button is disabled
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrimaryButton from '../buttons/PrimaryButton';

describe('PrimaryButton', () => {
  it('renders the correct title', () => {
    const { getByText } = render(
      <PrimaryButton title="Click Me" onPress={() => {}} />
    );

    // ✅ Check that the button with the given title is rendered
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed and not disabled', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <PrimaryButton title="Submit" onPress={mockPress} />
    );

    fireEvent.press(getByText('Submit'));
    expect(mockPress).toHaveBeenCalled();
  });

  it('does NOT call onPress when button is disabled', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <PrimaryButton title="Disabled" onPress={mockPress} disabled />
    );

    fireEvent.press(getByText('Disabled'));
    expect(mockPress).not.toHaveBeenCalled();
  });
});
