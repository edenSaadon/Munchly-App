import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import foodData from '../assets/data/food-items.json';

type Props = {
  visible: boolean;
  onSelect: (item: string) => void;
  onClose: () => void;
};

export default function AddItemModal({ visible, onSelect, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Select an item to add:</Text>
          <FlatList
            data={Object.entries(foodData)}
            keyExtractor={([category]) => category}
            renderItem={({ item: [category, items] }) => (
              <View>
                <Text style={styles.category}>{category}</Text>
                {items.map((item: string) => (
                  <TouchableOpacity key={item} onPress={() => onSelect(item)}>
                    <Text style={styles.item}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>❌ Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
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
