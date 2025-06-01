// import { useEffect, useState } from 'react';
// import { useColorScheme as useRNColorScheme } from 'react-native';

// /**
//  * To support static rendering, this value needs to be re-calculated on the client side for web
//  */
// export function useColorScheme() {
//   const [hasHydrated, setHasHydrated] = useState(false);

//   useEffect(() => {
//     setHasHydrated(true);
//   }, []);

//   const colorScheme = useRNColorScheme();

//   if (hasHydrated) {
//     return colorScheme;
//   }

//   return 'light';
// }


import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Custom hook to safely detect system color scheme.
 * Ensures correct behavior in static rendering environments (e.g., web).
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false); // Avoid premature rendering on web

  useEffect(() => {
    setHasHydrated(true); // Mark as "hydrated" after component mounts
  }, []);

  const colorScheme = useRNColorScheme(); // Returns 'light' | 'dark' | null

  // On first render (especially in SSR), force fallback to 'light'
  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
