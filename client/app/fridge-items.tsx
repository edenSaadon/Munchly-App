import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router } from 'expo-router';

const suggestedItems = ['Tomato', 'Milk', 'Eggs', 'Cheese', 'Spinach'];

export default function FridgeItemsScreen() {
  const [items, setItems] = useState<string[]>(['Tomato', 'Onion']);
  const [modalVisible, setModalVisible] = useState(false);

  const removeItem = (itemToRemove: string) => {
    setItems(prev => prev.filter(item => item !== itemToRemove));
  };

  const addItem = (itemToAdd: string) => {
    if (!items.includes(itemToAdd)) {
      setItems(prev => [...prev, itemToAdd]);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧊 Your Fridge Items</Text>

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => removeItem(item)}>
              <Text style={styles.removeButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <PrimaryButton title="➕ Add Item" onPress={() => setModalVisible(true)} />
      <PrimaryButton title="Continue to Menu" onPress={() => router.push('/menu')} />

      {/* Modal for adding item */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select item to add</Text>
            {suggestedItems.map(item => (
              <TouchableOpacity key={item} onPress={() => addItem(item)}>
                <Text style={styles.modalItem}>{item}</Text>
              </TouchableOpacity>
            ))}
            <PrimaryButton title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center'
  },
  itemRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 10, borderBottomWidth: 1, borderColor: '#ccc'
  },
  itemText: {
    fontSize: 18,
  },
  removeButton: {
    fontSize: 18, color: 'red',
  },
  modalContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff', padding: 20, borderRadius: 8, width: '80%',
  },
  modalTitle: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 10
  },
  modalItem: {
    padding: 10, fontSize: 16, borderBottomWidth: 1, borderColor: '#eee'
  }
});
