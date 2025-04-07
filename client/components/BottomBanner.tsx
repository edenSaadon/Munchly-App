// 📁 components/BottomBanner.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { usePathname, router } from 'expo-router';
import PrimaryButton from './buttons/PrimaryButton';

export default function BottomBanner() {
  const pathname = usePathname();

  const handleLogout = () => {
    // תוסיפי כאן קריאה ל־signOut מה־viewModel שלך אם קיים
    router.replace('/');
  };

  const handleBack = () => {
    router.back();
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const isVisible = [
    '/preferences',
    '/fridge-scan',
    '/fridge-items',
    '/menu',
    '/profile',
    '/recipes',
  ].some(route => pathname?.startsWith(route) || pathname === route);

  if (!isVisible) return null;

  const showLogout = true;
  const showProfile = ['/menu', '/recipe', '/profile', '/recipes'].some(route => pathname?.startsWith(route));
  const showBack = ['/recipe', '/profile'].some(route => pathname?.startsWith(route));

  return (
    <View style={styles.container}>
      {showBack && <PrimaryButton title="Back" onPress={handleBack} />}
      {showProfile && <PrimaryButton title="Profile" onPress={handleProfile} />}
      {showLogout && <PrimaryButton title="Logout" onPress={handleLogout} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
