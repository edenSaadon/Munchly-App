// // // 📁 components/__tests__/TopBanner.test.tsx
// // /**
// //  * ✅ Test Summary:
// //  * This test suite validates the TopBanner component's behavior.
// //  * It verifies that:
// //  * - The title "Munchly" is displayed
// //  * - Pressing the ☰ icon opens the side menu with 3 options
// //  * - Pressing "Profile" triggers navigation to the /profile route
// //  * 
// //  * Mocks are used to simulate font loading and routing behavior during testing.
// //  */

// // import React from 'react';
// // import { render, fireEvent, act } from '@testing-library/react-native';
// // import TopBanner from '../TopBanner';

// // // 🟣 Mock font loading
// // jest.mock('@expo-google-fonts/fredoka', () => ({
// //   useFonts: () => [true],
// //   Fredoka_400Regular: 'Fredoka_400Regular',
// //   Fredoka_700Bold: 'Fredoka_700Bold',
// // }));

// // // ✅ Mock expo-router
// // const mockPush = jest.fn();
// // const mockReplace = jest.fn();

// // jest.mock('expo-router', () => ({
// //   useRouter: () => ({
// //     push: mockPush,
// //     replace: mockReplace,
// //   }),
// // }));

// // describe('TopBanner', () => {
// //   beforeEach(() => {
// //     jest.clearAllMocks();
// //   });

// //   it('renders title', () => {
// //     const { getByText } = render(<TopBanner />);
// //     expect(getByText('Munchly')).toBeTruthy();
// //   });

// //   it('opens menu when ☰ is pressed', () => {
// //     const { getByText } = render(<TopBanner />);
// //     fireEvent.press(getByText('☰'));
// //     expect(getByText('👤 Profile')).toBeTruthy();
// //     expect(getByText('📷 Scan Fridge')).toBeTruthy();
// //     expect(getByText('🚪 Logout')).toBeTruthy();
// //   });

// //   it('navigates to profile on press', () => {
// //     const { getByText } = render(<TopBanner />);
// //     fireEvent.press(getByText('☰'));
// //     fireEvent.press(getByText('👤 Profile'));
// //     expect(mockPush).toHaveBeenCalledWith('/profile');
// //   });

// //   it('logs out and shows goodbye modal, then redirects after 2.5s', async () => {
// //     jest.useFakeTimers(); // ⏲️ הפעלת טיימרים מזויפים

// //     const { getByText } = render(<TopBanner />);
// //     fireEvent.press(getByText('☰'));
// //     fireEvent.press(getByText('🚪 Logout'));

// //     // ⏳ המתן ל־modal
// //     expect(getByText('Thanks for choosing Munchly!')).toBeTruthy();

// //     // ⏱️ העבר זמן של 2.5 שניות וודא שה־replace נקרא
// //     await act(async () => {
// //       jest.advanceTimersByTime(2500);
// //     });

// //     expect(mockReplace).toHaveBeenCalledWith('/');
// //     jest.useRealTimers(); // תמיד להחזיר
// //   });
// // });


// // 📁 components/__tests__/TopBanner.test.tsx

// /**
//  * ✅ Test Summary:
//  * This test suite validates the behavior of the <TopBanner /> component.
//  *
//  * It ensures:
//  * - The title "Munchly" is displayed
//  * - Pressing the ☰ menu icon opens the side menu with all expected options
//  * - Pressing "👤 Profile" navigates to the /profile screen
//  * - Pressing "🚪 Logout" displays a goodbye modal and redirects after 2.5s
//  *
//  * Mocks:
//  * - Fonts are mocked to avoid rendering issues during tests
//  * - The router (useRouter) is mocked to intercept and assert navigation behavior
//  */

// import React from 'react';
// import { render, fireEvent, act } from '@testing-library/react-native';
// import TopBanner from '../TopBanner';

// // 🟣 Mock font loading to avoid font-related delays or failures in tests
// jest.mock('@expo-google-fonts/fredoka', () => ({
//   useFonts: () => [true],
//   Fredoka_400Regular: 'Fredoka_400Regular',
//   Fredoka_700Bold: 'Fredoka_700Bold',
// }));

// // 🧭 Mock the expo-router navigation (useRouter)
// const mockPush = jest.fn();
// const mockReplace = jest.fn();

// jest.mock('expo-router', () => ({
//   useRouter: () => ({
//     push: mockPush,
//     replace: mockReplace,
//   }),
// }));

// describe('TopBanner', () => {
//   // Reset mocks before each test to avoid test pollution
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   // ✅ Basic rendering test: should display app title
//   it('renders title', () => {
//     const { getByText } = render(<TopBanner />);
//     expect(getByText('Munchly')).toBeTruthy();
//   });

//   // ✅ Should open the menu when the ☰ button is pressed
//   it('opens menu when ☰ is pressed', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     expect(getByText('👤 Profile')).toBeTruthy();
//     expect(getByText('📷 Scan Fridge')).toBeTruthy();
//     expect(getByText('🚪 Logout')).toBeTruthy();
//   });

//   // ✅ Should navigate to /profile when the Profile option is pressed
//   it('navigates to profile on press', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     fireEvent.press(getByText('👤 Profile'));
//     expect(mockPush).toHaveBeenCalledWith('/profile');
//   });

//   // ✅ Should show goodbye modal and navigate home after logout and timeout
//   it('logs out and shows goodbye modal, then redirects after 2.5s', async () => {
//     jest.useFakeTimers(); // Enable fake timers to control setTimeout

//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     fireEvent.press(getByText('🚪 Logout'));

//     // Ensure goodbye message is shown
//     expect(getByText('Thanks for choosing Munchly!')).toBeTruthy();

//     // Simulate 2.5 seconds passing
//     await act(async () => {
//       jest.advanceTimersByTime(2500);
//     });

//     // Ensure redirection to homepage
//     expect(mockReplace).toHaveBeenCalledWith('/');

//     jest.useRealTimers(); // Restore real timers after the test
//   });
// });
// // 📁 components/__tests__/TopBanner.test.tsx

// /**
//  * ✅ Test Summary:
//  * This test suite validates the behavior of the <TopBanner /> component.
//  *
//  * It ensures:
//  * - The title "Munchly" is displayed
//  * - Pressing the ☰ menu icon opens the side menu with all expected options
//  * - Pressing "👤 Profile" navigates to the /profile screen
//  * - Pressing "🚪 Logout" displays a goodbye modal and redirects after 2.5s
//  *
//  * Mocks:
//  * - Fonts are mocked to avoid rendering issues during tests
//  * - The router (router.push / router.replace) is mocked correctly
//  */

// import React from 'react';
// import { render, fireEvent, act } from '@testing-library/react-native';
// import TopBanner from '../TopBanner';

// // 🟣 Mock font loading to avoid font-related issues during rendering
// jest.mock('@expo-google-fonts/fredoka', () => ({
//   useFonts: () => [true],
//   Fredoka_400Regular: 'Fredoka_400Regular',
//   Fredoka_700Bold: 'Fredoka_700Bold',
// }));

// // ✅ Correctly mock the expo-router's router object
// const mockPush = jest.fn();
// const mockReplace = jest.fn();

// jest.mock('expo-router', () => ({
//   router: {
//     push: mockPush,
//     replace: mockReplace,
//   },
// }));

// describe('TopBanner', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Reset mocks between tests
//   });

//   // ✅ Test: Displays app title
//   it('renders title', () => {
//     const { getByText } = render(<TopBanner />);
//     expect(getByText('Munchly')).toBeTruthy();
//   });

//   // ✅ Test: Opens menu on ☰ press
//   it('opens menu when ☰ is pressed', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     expect(getByText('👤 Profile')).toBeTruthy();
//     expect(getByText('📷 Scan Fridge')).toBeTruthy();
//     expect(getByText('🚪 Logout')).toBeTruthy();
//   });

//   // ✅ Test: Navigates to /profile when Profile is pressed
//   it('navigates to profile on press', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     fireEvent.press(getByText('👤 Profile'));
//     expect(mockPush).toHaveBeenCalledWith('/profile');
//   });

//   // ✅ Test: Logs out, shows modal, and navigates after 2.5s
//   it('logs out and shows goodbye modal, then redirects after 2.5s', async () => {
//     jest.useFakeTimers(); // Enable fake timers

//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     fireEvent.press(getByText('🚪 Logout'));

//     // Modal should be visible
//     expect(getByText('Thanks for choosing Munchly!')).toBeTruthy();

//     // Advance timers by 2500ms and expect redirect
//     await act(async () => {
//       jest.advanceTimersByTime(2500);
//     });

//     expect(mockReplace).toHaveBeenCalledWith('/');

//     jest.useRealTimers(); // Clean up
//   });
// // });
// components/__tests__/TopBanner.test.tsx

// import React from 'react';
// import { render, fireEvent, act } from '@testing-library/react-native';
// import TopBanner from '../TopBanner';

// // 🟣 Mock fonts
// jest.mock('@expo-google-fonts/fredoka', () => ({
//   useFonts: () => [true],
//   Fredoka_400Regular: 'Fredoka_400Regular',
//   Fredoka_700Bold: 'Fredoka_700Bold',
// }));

// // ✅ Correct mocking of router with factory function
// const mockPush = jest.fn();
// const mockReplace = jest.fn();

// jest.mock('expo-router', () => ({
//   __esModule: true,
//   router: {
//     push: mockPush,
//     replace: mockReplace,
//   },
// }));

// describe('TopBanner', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders title', () => {
//     const { getByText } = render(<TopBanner />);
//     expect(getByText('Munchly')).toBeTruthy();
//   });

//   it('opens menu when ☰ is pressed', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     expect(getByText('👤 Profile')).toBeTruthy();
//     expect(getByText('📷 Scan Fridge')).toBeTruthy();
//     expect(getByText('🚪 Logout')).toBeTruthy();
//   });

//   it('navigates to profile on press', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     fireEvent.press(getByText('👤 Profile'));
//     expect(mockPush).toHaveBeenCalledWith('/profile');
//   });

//   it('logs out and shows goodbye modal, then redirects after 2.5s', async () => {
//     jest.useFakeTimers();
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     fireEvent.press(getByText('🚪 Logout'));

//     expect(getByText('Thanks for choosing Munchly!')).toBeTruthy();

//     await act(async () => {
//       jest.advanceTimersByTime(2500);
//     });

//     expect(mockReplace).toHaveBeenCalledWith('/');
//     jest.useRealTimers();
//   });
// });

// 📁 components/__tests__/TopBanner.test.tsx

/**
 * ✅ Test Summary:
 * This test suite validates the behavior of the <TopBanner /> component.
 *
 * It ensures:
 * - The title "Munchly" is displayed
 * - Pressing the ☰ menu icon opens the side menu with all expected options
 * - Pressing "👤 Profile" navigates to the /profile screen
 * - Pressing "🚪 Logout" displays a goodbye modal and redirects after 2.5s
 *
 * Mocks:
 * - Fonts are mocked to avoid rendering issues during tests
 * - useRouter (from expo-router) is mocked to intercept navigation
 */

// import React from 'react';
// import { render, fireEvent, act } from '@testing-library/react-native';
// import TopBanner from '../TopBanner';

// // 🟣 Mock fonts to prevent UI rendering issues
// jest.mock('@expo-google-fonts/fredoka', () => ({
//   useFonts: () => [true],
//   Fredoka_400Regular: 'Fredoka_400Regular',
//   Fredoka_700Bold: 'Fredoka_700Bold',
// }));

// // ✅ Mock useRouter instead of router
// const mockPush = jest.fn();
// const mockReplace = jest.fn();

// jest.mock('expo-router', () => ({
//   __esModule: true,
//   useRouter: () => ({
//     push: mockPush,
//     replace: mockReplace,
//   }),
// }));

// describe('TopBanner', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders title', () => {
//     const { getByText } = render(<TopBanner />);
//     expect(getByText('Munchly')).toBeTruthy();
//   });

//   it('opens menu when ☰ is pressed', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     expect(getByText('👤 Profile')).toBeTruthy();
//     expect(getByText('📷 Scan Fridge')).toBeTruthy();
//     expect(getByText('🚪 Logout')).toBeTruthy();
//   });

//   it('navigates to profile on press', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     fireEvent.press(getByText('👤 Profile'));
//     expect(mockPush).toHaveBeenCalledWith('/profile');
//   });

//   it('logs out and shows goodbye modal, then redirects after 2.5s', async () => {
//     jest.useFakeTimers();

//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     fireEvent.press(getByText('🚪 Logout'));

//     expect(getByText('Thanks for choosing Munchly!')).toBeTruthy();

//     await act(async () => {
//       jest.advanceTimersByTime(2500);
//     });

//     expect(mockReplace).toHaveBeenCalledWith('/');

//     jest.useRealTimers();
//   });
// });


// components/__tests__/TopBanner.test.tsx

// import React from 'react';
// import { render, fireEvent, act } from '@testing-library/react-native';
// import TopBanner from '../TopBanner';

// jest.mock('@expo-google-fonts/fredoka', () => ({
//   useFonts: () => [true],
//   Fredoka_400Regular: 'Fredoka_400Regular',
//   Fredoka_700Bold: 'Fredoka_700Bold',
// }));

// const mockPush = jest.fn();
// const mockReplace = jest.fn();

// // ✅ Mock useRouter to return an object with push & replace directly
// jest.mock('expo-router', () => ({
//   __esModule: true,
//   useRouter: () => ({
//     push: mockPush,
//     replace: mockReplace,
//   }),
// }));

// describe('TopBanner', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders title', () => {
//     const { getByText } = render(<TopBanner />);
//     expect(getByText('Munchly')).toBeTruthy();
//   });

//   it('opens menu when ☰ is pressed', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     expect(getByText('👤 Profile')).toBeTruthy();
//     expect(getByText('📷 Scan Fridge')).toBeTruthy();
//     expect(getByText('🚪 Logout')).toBeTruthy();
//   });

//   it('navigates to profile on press', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     fireEvent.press(getByText('👤 Profile'));
//     expect(mockPush).toHaveBeenCalledWith('/profile');
//   });

//   it('logs out and shows goodbye modal, then redirects after 2.5s', async () => {
//     jest.useFakeTimers();
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     fireEvent.press(getByText('🚪 Logout'));

//     expect(getByText('Thanks for choosing Munchly!')).toBeTruthy();

//     await act(async () => {
//       jest.advanceTimersByTime(2500);
//     });

//     expect(mockReplace).toHaveBeenCalledWith('/');
//     jest.useRealTimers();
//   });
// });


// import React from 'react';
// import { render, fireEvent, act } from '@testing-library/react-native';
// import TopBanner from '../TopBanner';

// // 🟣 Mock fonts
// jest.mock('@expo-google-fonts/fredoka', () => ({
//   useFonts: () => [true],
//   Fredoka_400Regular: 'Fredoka_400Regular',
//   Fredoka_700Bold: 'Fredoka_700Bold',
// }));

// // ✅ Mock router object with push and replace
// const mockPush = jest.fn();
// const mockReplace = jest.fn();

// // ⚠️ IMPORTANT: TopBanner uses `import { router } from 'expo-router'`
// jest.mock('expo-router', () => ({
//   __esModule: true,
//   router: {
//     push: (...args: any[]) => mockPush(...args),
//     replace: (...args: any[]) => mockReplace(...args),
//   },
// }));

// describe('TopBanner', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders title', () => {
//     const { getByText } = render(<TopBanner />);
//     expect(getByText('Munchly')).toBeTruthy();
//   });

//   it('opens menu when ☰ is pressed', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     expect(getByText('👤 Profile')).toBeTruthy();
//     expect(getByText('📷 Scan Fridge')).toBeTruthy();
//     expect(getByText('🚪 Logout')).toBeTruthy();
//   });

//   it('navigates to profile on press', () => {
//     const { getByText } = render(<TopBanner />);
//     fireEvent.press(getByText('☰'));
//     fireEvent.press(getByText('👤 Profile'));
//     expect(mockPush).toHaveBeenCalledWith('/profile');
//   });

//   it(
//     'logs out and shows goodbye modal, then redirects after 2.5s',
//     async () => {
//       jest.useFakeTimers();
//       const { getByText } = render(<TopBanner />);
//       fireEvent.press(getByText('☰'));
//       fireEvent.press(getByText('🚪 Logout'));

//       expect(getByText('Thanks for choosing Munchly!')).toBeTruthy();

//       await act(async () => {
//         jest.advanceTimersByTime(2500);
//       });

//       expect(mockReplace).toHaveBeenCalledWith('/');
//       jest.useRealTimers();
//     },
//     10000 // ✅ in case Jest needs more time
//   );
// });

/**
 * 📄 Test File: TopBanner.test.tsx
 *
 * ✅ Purpose:
 * This test suite verifies the behavior of the <TopBanner /> component, which renders a top banner UI in the app.
 * The component includes:
 * - A "hamburger" menu button (☰)
 * - The app title ("Munchly")
 * - A dropdown modal menu with options: Profile, Scan Fridge, and Logout
 * - A goodbye modal that appears after logout
 *
 * These tests check:
 * 1. That the title renders correctly.
 * 2. That clicking the ☰ icon opens the modal menu with the correct options.
 * 3. That clicking "👤 Profile" triggers router navigation to `/profile`.
 * 4. That clicking "🚪 Logout" displays the goodbye modal and redirects to `/` after 2.5 seconds.
 *
 * The test mocks:
 * - Font loading via @expo-google-fonts/fredoka
 * - The `router` object from `expo-router`, including `push` and `replace` functions
 *
 * The tests use `@testing-library/react-native` to render components and simulate interactions.
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import TopBanner from '../TopBanner';

// 🟣 Mock Google Fonts (Fredoka)
// Prevents actual font loading issues in test environment
jest.mock('@expo-google-fonts/fredoka', () => ({
  useFonts: () => [true], // Pretend fonts are always loaded
  Fredoka_400Regular: 'Fredoka_400Regular',
  Fredoka_700Bold: 'Fredoka_700Bold',
}));

// ✅ Mock navigation functions (router.push and router.replace)
// TopBanner uses `import { router } from 'expo-router'`, so we mock that object
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  __esModule: true,
  router: {
    push: (...args: any[]) => mockPush(...args),
    replace: (...args: any[]) => mockReplace(...args),
  },
}));

describe('TopBanner', () => {
  // 🔄 Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test: Banner renders with correct title
  it('renders title', () => {
    const { getByText } = render(<TopBanner />);
    expect(getByText('Munchly')).toBeTruthy();
  });

  // ✅ Test: Pressing ☰ icon opens the menu with 3 expected options
  it('opens menu when ☰ is pressed', () => {
    const { getByText } = render(<TopBanner />);
    fireEvent.press(getByText('☰'));
    expect(getByText('👤 Profile')).toBeTruthy();
    expect(getByText('📷 Scan Fridge')).toBeTruthy();
    expect(getByText('🚪 Logout')).toBeTruthy();
  });

  // ✅ Test: Selecting "Profile" from menu navigates to /profile
  it('navigates to profile on press', () => {
    const { getByText } = render(<TopBanner />);
    fireEvent.press(getByText('☰'));
    fireEvent.press(getByText('👤 Profile'));
    expect(mockPush).toHaveBeenCalledWith('/profile');
  });

  // ✅ Test: Pressing "Logout" shows goodbye modal and redirects after 2.5s
  it(
    'logs out and shows goodbye modal, then redirects after 2.5s',
    async () => {
      // Use fake timers to simulate timeout behavior
      jest.useFakeTimers();

      const { getByText } = render(<TopBanner />);
      fireEvent.press(getByText('☰'));
      fireEvent.press(getByText('🚪 Logout'));

      // Modal should be visible
      expect(getByText('Thanks for choosing Munchly!')).toBeTruthy();

      // Advance time by 2.5s and check redirect
      await act(async () => {
        jest.advanceTimersByTime(2500);
      });

      expect(mockReplace).toHaveBeenCalledWith('/');
      jest.useRealTimers();
    },
    10000 // Allow extra time for the test if needed
  );
});
