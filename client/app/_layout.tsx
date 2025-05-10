// // 📁 app/_layout.tsx
// import { Stack } from 'expo-router';

// export default function Layout() {
//   return <Stack />;
// }

// import React from 'react';
// import { Slot, usePathname } from 'expo-router';
// import { View, StyleSheet } from 'react-native';
// import TopBanner from '../components/TopBanner';

// export default function Layout() {
//   const pathname = usePathname();
//   const hideUI = pathname === '/' || pathname.includes('/login') || pathname.includes('/signup');

//   return (
//     <View style={styles.container}>
//       {!hideUI && <TopBanner />}
//       <Slot />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

import React from 'react';
import { Slot, usePathname } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import TopBanner from '../components/TopBanner';


export default function Layout() {
  const pathname = usePathname();
  
  // תואם לנתיבים עם קבוצה (auth)
  const hideUI =
    pathname === '/' ||
    pathname.includes('/(auth)/login') ||
    pathname.includes('/(auth)/signup');

  return (
    <View style={styles.container}>
      {!hideUI && <TopBanner />}
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});