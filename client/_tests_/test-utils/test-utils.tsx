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

// // tests/test-utils.tsx

// import React from 'react';
// import { render, RenderOptions } from '@testing-library/react-native';
// import type { ReactElement } from 'react';

// /**
//  * Custom render function for React Native component testing.
//  * Use this wrapper to render components in tests with any additional providers if needed.
//  *
//  * @param ui - The React component to render
//  * @param options - Optional configuration for @testing-library/react-native's render
//  * @returns Rendered component utilities for querying and interaction
//  */
// export function customRender(
//   ui: ReactElement,
//   options?: Omit<RenderOptions, 'queries'>
// ) {
//   return render(ui, options);
// }


// tests/test-utils.tsx

// ==========================================
// Purpose:
// This utility provides a custom `render` function to be used in test files.
// It wraps the default `render` function from @testing-library/react-native,
// allowing you to add global wrappers (e.g., context providers) in one place.
//
// Why use this file:
// - Centralizes the testing setup
// - Enables adding global providers easily (e.g., ThemeProvider, NavigationContainer)
// - Keeps test files cleaner and more consistent
// ==========================================

import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import type { ReactElement } from 'react';

// Custom render function to override default `render` from testing-library
// You can use this to inject additional wrappers such as navigation or global context
// without repeating boilerplate code in every test file.

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
  // You can wrap `ui` here with any global providers if needed.
  return render(ui, options);
}
