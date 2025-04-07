import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

export default function TopBanner() {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleNavigate = (path: string) => {
    setMenuVisible(false);
    router.push(path);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMenuVisible(false);
    router.replace('/');
  };

  return (
    <View style={styles.banner}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Munchly</Text>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text style={styles.infoIcon}>ℹ️</Text>
      </TouchableOpacity>

      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
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
    fontWeight: 'bold',
  },
  menuIcon: {
    color: '#f5f5dc',
    fontSize: 22,
  },
  infoIcon: {
    color: '#f5f5dc',
    fontSize: 20,
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
  },
});
