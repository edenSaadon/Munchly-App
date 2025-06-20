/**
 * File : components/__tests__/AddItemModal.test.tsx
 * Test Summary:
 * This test suite verifies the behavior of the AddItemModal component.
 * It ensures that:
 * 1. The modal renders correctly when visible is true and displays categories and items from the mocked JSON.
 * 2. Pressing an item calls the onSelect callback with the correct item name.
 * 3. Pressing the Close button calls the onClose callback.
 * 4. The modal does not render any content when visible is false.
 *
 * Mocking food-items.json ensures the test is isolated and predictable.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddItemModal from '../AddItemModal';

// Mock the food-items.json to isolate the test from real external data.
// This ensures the test is stable and does not depend on file contents.
jest.mock('../../assets/data/food-items.json', () => ({
  Vegetables: ['Carrot', 'Tomato'],
  Fruits: ['Apple'],
}));

describe('AddItemModal', () => {
  // 🔧 Create mock functions to test whether the correct props are triggered.
  const mockOnSelect = jest.fn();
  const mockOnClose = jest.fn();

  it('renders modal and displays items when visible is true', () => {
    // Render the modal with visible = true
    const { getByText } = render(
      <AddItemModal
        visible={true}
        onSelect={mockOnSelect}
        onClose={mockOnClose}
      />
    );

    // Assert that modal content is rendered correctly
    expect(getByText('Select an item to add:')).toBeTruthy();
    expect(getByText('Vegetables')).toBeTruthy();
    expect(getByText('Carrot')).toBeTruthy();
    expect(getByText('Tomato')).toBeTruthy();
    expect(getByText('Fruits')).toBeTruthy();
    expect(getByText('Apple')).toBeTruthy();
  });

  it('calls onSelect when an item is pressed', () => {
    // Render the modal and simulate pressing an item
    const { getByText } = render(
      <AddItemModal
        visible={true}
        onSelect={mockOnSelect}
        onClose={mockOnClose}
      />
    );

    fireEvent.press(getByText('Apple'));

    // onSelect should be called with the selected item's name
    expect(mockOnSelect).toHaveBeenCalledWith('Apple');
  });

  it('calls onClose when Close is pressed', () => {
    // 🧪 Render the modal and simulate pressing the Close button
    const { getByText } = render(
      <AddItemModal
        visible={true}
        onSelect={mockOnSelect}
        onClose={mockOnClose}
      />
    );

    fireEvent.press(getByText(' Close'));

    // onClose should be called
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not render anything when visible is false', () => {
    // Render the modal with visible = false
    const { queryByText } = render(
      <AddItemModal
        visible={false}
        onSelect={mockOnSelect}
        onClose={mockOnClose}
      />
    );

    // The modal should not appear in the output
    expect(queryByText('Select an item to add:')).toBeNull();
  });
});
