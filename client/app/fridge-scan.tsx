// fridge-scan.tsx
//
// This screen allows the user to scan their fridge by taking a photo (camera or gallery).
// The selected image is sent to the server, which runs object detection (YOLO & Google Vision)
// and returns a list of detected food items + an uploaded image URL.
// The screen then navigates to /fridge-items with the results.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router } from 'expo-router';
import { getIdToken } from '@/services/authTokenService';
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';

export default function FridgeScanScreen() {
  const [image, setImage] = useState<string | null>(null);       // Local image URI
  const [loading, setLoading] = useState(false);                 // Loading state for scan request

  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) return null;

  // Opens the camera to take a fridge photo
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

  // Opens the gallery to pick a fridge photo
  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'Gallery access is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
    }
  };

  // Sends the selected image to the server and navigates to the next screen with the results
  const handleScan = async () => {
    if (!image) return;

    setLoading(true);

    try {
      const token = await getIdToken(true);
      if (!token) throw new Error('No auth token');

      const formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpg',
        name: 'fridge.jpg',
      } as any);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/fridge/scan`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const raw = await response.text();
      let result;

      try {
        result = JSON.parse(raw);
      } catch (err) {
        throw new Error('Unexpected response format from server');
      }

      if (response.ok) {
        // Navigate to fridge-items screen with scanned data
        router.push({
          pathname: '/fridge-items',
          params: {
            items: JSON.stringify(result.items),   // Detected items array
            imageUrl: result.imageUrl,             // Uploaded fridge image URL
          },
        });
      } else {
        Alert.alert('Error', result.message || 'Scan failed');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/scan-fridge.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Scan Your Fridge</Text>

        {/* Show preview of selected image */}
        {image && <Image source={{ uri: image }} style={styles.preview} />}

        {/* Buttons to take or pick image, and to trigger scan */}
        <PrimaryButton title="Take a Fridge Photo" onPress={pickImage} />
        <PrimaryButton title="Pick From Gallery" onPress={pickImageFromGallery} />
        <PrimaryButton
          title="Scan & Continue"
          onPress={handleScan}
          disabled={!image || loading}
        />

        {/* Show loading indicator while uploading and scanning */}
        {loading && (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        )}
      </View>
    </ImageBackground>
  );
}

// --- Styles ---
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
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Fredoka_700Bold',
  },
  preview: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 15,
  },
});
