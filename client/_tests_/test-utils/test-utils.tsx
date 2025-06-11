// // tests/test-utils.tsx
// import React from 'react';
// import { render } from '@testing-library/react-native';
// import { Slot } from 'expo-router';
// import { RouterContextProvider } from 'expo-router/build/router-context';

// // יצירת רנדר עם רואטר
// export function customRender(ui, options) {
//   return render(
//     <RouterContextProvider value={{}}>
//       {ui}
//     </RouterContextProvider>,
//     options
//   );
// }

// tests/test-utils.tsx

import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import type { ReactElement } from 'react';

/**
 * Custom render function for React Native component testing.
 * Use this wrapper to render components in tests with any additional providers if needed.
 *
 * @param ui - The React component to render
 * @param options - Optional configuration for @testing-library/react-native's render
 * @returns Rendered component utilities for querying and interaction
 */
export function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) {
  return render(ui, options);
}

