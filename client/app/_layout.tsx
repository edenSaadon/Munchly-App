// // 📁 app/_layout.tsx
// import { Stack } from 'expo-router';

// export default function Layout() {
//   return <Stack />;
// }

// 📁 app/_layout.tsx
import React from 'react';
import { Slot, usePathname } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import BottomBanner from '../components/BottomBanner'; // ודאי שהנתיב נכון

export default function Layout() {
  const pathname = usePathname();

  // לא להציג את הבאנר במסכי login/signup/index
  const hideBanner = pathname === '/' || pathname.includes('/login') || pathname.includes('/signup');

  return (
    <View style={styles.container}>
      <Slot />
      {!hideBanner && <BottomBanner />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
