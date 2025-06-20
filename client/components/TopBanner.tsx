// components/TopBanner.tsx
//
// Component Purpose:
// This component renders a top navigation banner for the app. It includes a hamburger menu icon,
// the app title, and a modal menu with navigation options for Profile, Fridge Scan, and Logout.
// On logout, it shows a temporary modal with a waving animation before navigating back to the home screen.
// This component also ensures that custom fonts are loaded before displaying UI.

// // Import React and required hooks/components
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

// Import the updated navigation hook from expo-router
import { router } from 'expo-router';

// Import custom fonts from Google Fonts using Expo
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';

/// Import a waving animation component used on logout
import HelloWave from './HelloWave'; 

export default function TopBanner() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) return null;

  const handleNavigate = (path: string) => {
    setMenuVisible(false);
    router.push(path);
  };

  const handleLogout = () => {
    setMenuVisible(false);
    setShowLogoutModal(true);

    setTimeout(() => {
      setShowLogoutModal(false);
      router.replace('/');
    }, 2500);
  };

  return (
    <View style={styles.banner}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Munchly</Text>

      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => handleNavigate('/profile')}>
              <Text style={styles.menuItem}>👤 Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('/fridge-scan')}>
              <Text style={styles.menuItem}>📷 Scan Fridge</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.menuItem}>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {showLogoutModal && (
        <Modal transparent animationType="fade">
          <View style={styles.logoutOverlay}>
            <HelloWave />
            <Text style={styles.subtext}>
              Thanks for choosing Munchly!
            </Text>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    color: '#f5f5dc',
    fontSize: 20,
    fontFamily: 'Fredoka_700Bold',
  },
  menuIcon: {
    color: '#f5f5dc',
    fontSize: 22,
    fontFamily: 'Fredoka_700Bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingLeft: 20,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
    fontFamily: 'Fredoka_400Regular',
  },
  logoutOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtext: {
    fontSize: 16,
    color: '#f5f5dc',
    fontFamily: 'Fredoka_400Regular',
    textAlign: 'center',
  },
});

