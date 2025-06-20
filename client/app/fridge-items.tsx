// fridge-items.tsx
//
// This screen displays a list of fridge items that were automatically detected
// using image recognition (YOLO and Google Vision API).
// Users can:
// - Review the detected items
// - Remove irrelevant items
// - Add new items manually via a modal food category list
// - Proceed to the next screen to refine the AI recipe prompt
//
// All item changes are synced in real-time with the backend (Firestore),
// using Firebase authentication for security.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router, useLocalSearchParams } from 'expo-router';
import { getAuth, getIdToken } from 'firebase/auth';
import AddItemModal from '../components/AddItemModal';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export default function FridgeItemsScreen() {
  const params = useLocalSearchParams();

  // Initial list of detected items (from YOLO/Google Vision), passed as a JSON string
  const [items, setItems] = useState<string[]>(() => {
    try {
      return params.items ? JSON.parse(params.items as string) : [];
    } catch {
      return [];
    }
  });

  // Optional fridge image from the scan (displayed at the top)
  const imageUrl = typeof params.imageUrl === 'string' ? params.imageUrl : null;

  // Controls the visibility of the modal for manual item selection
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Sends a request to the server to update the user's fridge item list.
   * Action can be 'add' or 'remove', and updates Firestore accordingly.
   */
  const updateItemOnServer = async (item: string, action: 'add' | 'remove') => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;
      const token = await getIdToken(user);

      await fetch(`${SERVER_URL}/users/${user.uid}/${action}-item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item }),
      });
    } catch (error) {
      console.error(`Error during ${action} item:`, error);
    }
  };

  /**
   * Handles adding a new item from the modal.
   * Updates local state and sends to server.
   */
  const handleSelectItem = async (item: string) => {
    if (!items.includes(item)) {
      const newItems = [...items, item];
      setItems(newItems);
      await updateItemOnServer(item, 'add');
    }
    setModalVisible(false);
  };

  /**
   * Handles removing an item from the list.
   * Updates local state and syncs with the backend.
   */
  const handleRemoveItem = async (item: string) => {
    const filteredItems = items.filter((i) => i !== item);
    setItems(filteredItems);
    await updateItemOnServer(item, 'remove');
  };

  /**
   * Navigates to the recipe prompt refinement screen.
   * Requires at least one fridge item to be selected.
   */
  const handleContinue = async () => {
    if (items.length === 0) {
      Alert.alert('Error', 'Please add at least one item');
      return;
    }
    router.push({
      pathname: '/recipe-prompt-refiner',
      params: { items: JSON.stringify(items) },
    });
  };

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Your Fridge Items</Text>

        {/* Display fridge image if available */}
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.fridgeImage} />
        )}

        {/* Display current list of items (editable) */}
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
          style={{ width: '90%', marginBottom: 10 }}
        />

        {/* Action buttons */}
        <PrimaryButton title="➕ Add Item" onPress={() => setModalVisible(true)} />
        <PrimaryButton title="Continue" onPress={handleContinue} />

        {/* Replaced modal with reusable component */}
        <AddItemModal
          visible={modalVisible}
          onSelect={handleSelectItem}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </ImageBackground>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  fridgeImage: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  delete: {
    fontSize: 16,
    color: '#d11a2a',
  },
});

