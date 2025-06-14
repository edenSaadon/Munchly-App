// AddItemModal.tsx
//
// This component displays a modal popup for selecting an item from a predefined list (food categories and items).
// It is used within the fridge items flow, allowing the user to manually add items that were not automatically detected.
// The list is based on a static JSON file (food-items.json) organized by categories (e.g., "Fruits", "Vegetables").
//
// Props:
// - `visible`: Controls the visibility of the modal.
// - `onSelect`: Callback function triggered when an item is selected.
// - `onClose`: Callback function triggered when the user closes the modal without selecting.
//
// Internally:
// - Uses React Native's Modal component for the popup.
// - FlatList is used to render the food categories and their items.
// - Touching an item will invoke `onSelect(item)` with the selected item string.
// - Touching "Close" will dismiss the modal via `onClose`.

import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import foodData from '../assets/data/food-items.json';

// Define the props expected by the modal component
type Props = {
  visible: boolean; // Whether the modal is currently visible
  onSelect: (item: string) => void; // Callback when a user selects an item
  onClose: () => void; // Callback when the modal is dismissed
};

// Main component for rendering the food item selection modal
export default function AddItemModal({ visible, onSelect, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* Modal overlay with dark background */}
      <View style={styles.overlay}>
        {/* Inner container with rounded background */}
        <View style={styles.container}>
          {/* Modal header text */}
          <Text style={styles.title}>Select an item to add:</Text>

          {/* Render all food categories and their respective items */}
          <FlatList
            data={Object.entries(foodData)} // Converts object to array of [category, items[]]
            keyExtractor={([category]) => category} // Each category as a unique key
            renderItem={({ item: [category, items] }) => (
              <View>
                {/* Display category name */}
                <Text style={styles.category}>{category}</Text>

                {/* Display all items under the category */}
                {items.map((item: string) => (
                  <TouchableOpacity key={item} onPress={() => onSelect(item)}>
                    <Text style={styles.item}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />

          {/* Close button to exit the modal */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>❌ Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Style definitions for the modal and its content
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#444',
  },
  item: {
    paddingVertical: 6,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  close: {
    marginTop: 15,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
