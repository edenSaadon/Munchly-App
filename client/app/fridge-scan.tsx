import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router } from 'expo-router';

export default function FridgeScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'Camera access is required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
    }
  };

  const handleScan = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'fridge.jpg',
      } as any);

      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/fridge/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        router.push('/fridge-items'); // מעבר למסך הבא
      } else {
        Alert.alert('Error', result.message || 'Scan failed');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Scan Your Fridge</Text>

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <PrimaryButton title="Take a Fridge Photo" onPress={pickImage} />
      <PrimaryButton title="Scan & Continue" onPress={handleScan} disabled={!image || loading} />

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20,
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20,
  },
  preview: {
    width: 250, height: 250, resizeMode: 'cover', borderRadius: 10, marginVertical: 15,
  },
});
