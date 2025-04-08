import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Image, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router } from 'expo-router';
import { getIdToken } from '@/services/authTokenService';

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
      const token = await getIdToken(true);
      if (!token) throw new Error('No auth token');

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
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const raw = await response.text(); // ✅ קריאה אחת בלבד
      console.log('📥 Raw response:', raw);

      let result;
      try {
        result = JSON.parse(raw); // ✅ ננסה לפרש את זה כ-JSON
      } catch (err) {
        console.error('❌ Failed to parse JSON:', err);
        throw new Error('Unexpected response format from server');
      }

      if (response.ok) {
        router.push({
          pathname: '/fridge-items',
          params: { items: JSON.stringify(result.items) },
        });
      } else {
        Alert.alert('Error', result.message || 'Scan failed');
      }
    } catch (err: any) {
      console.error('❌ Scan error:', err);
      Alert.alert('Error', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>📸 Scan Your Fridge</Text>

        {image && <Image source={{ uri: image }} style={styles.preview} />}

        <PrimaryButton title="Take a Fridge Photo" onPress={pickImage} />
        <PrimaryButton title="Scan & Continue" onPress={handleScan} disabled={!image || loading} />

        {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  preview: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 15,
  },
});
