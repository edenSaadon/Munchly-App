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

export default function FridgeItemsScreen() {
  const params = useLocalSearchParams();

  const [items, setItems] = useState<string[]>(() => {
    try {
      return params.items ? JSON.parse(params.items as string) : [];
    } catch {
      return [];
    }
  });

  // תמונה שהתקבלה מהסריקה
  const imageUrl = typeof params.imageUrl === 'string' ? params.imageUrl : null;

  const handleRemove = (item: string) => {
    setItems((prev) => prev.filter((i) => i !== item));
  };

  const handleAddItem = () => {
    const newItem = 'Cucumber';
    if (!items.includes(newItem)) {
      setItems((prev) => [...prev, newItem]);
    }
  };

  const handleContinue = () => {
    if (items.length === 0) {
      Alert.alert('Error', 'Please add at least one item');
      return;
    }
    router.push('/menu');
  };

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🥬 Your Fridge Items</Text>

        {/* אם יש תמונה שנשלחה, הצג אותה */}
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.fridgeImage} />
        )}

        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemove(item)}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
          style={{ width: '90%' }}
        />

        <PrimaryButton title="➕ Add Item" onPress={handleAddItem} />
        <PrimaryButton title="Continue to Menu" onPress={handleContinue} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    fontSize: 20,
  },
});
