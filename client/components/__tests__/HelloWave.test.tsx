// 📁 components/__tests__/HelloWave.test.tsx

/**
 * Test Summary:
 * This test verifies that the HelloWave component renders correctly.
 * It specifically checks that the 👋 emoji is visible in the UI.
 * 
 * The animation behavior (rotation) is handled by Reanimated, but we do not test the animation itself here,
 * because unit tests focus on structure and rendering – not visual motion.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import HelloWave from '../HelloWave';

describe('HelloWave', () => {
  // 🧪 Basic test to check if the waving emoji is rendered
  it('renders waving emoji', () => {
    // 🔍 Render the HelloWave component
    const { getByText } = render(<HelloWave />);

    // 👋 Search for the emoji in the rendered output
    const emoji = getByText('👋');

    // ✅ Assert that it exists in the component
    expect(emoji).toBeTruthy();
  });
});
