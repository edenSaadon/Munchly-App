import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getIdToken } from '../../src/services/authTokenService';

export default function RecipeDbScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = await getIdToken();
        const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setRecipe(data);
      } catch (err) {
        console.error('Error loading DB recipe:', err);
        Alert.alert('Error', 'Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 100 }} />;

  if (!recipe) return <Text style={styles.error}>Recipe not found</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      {recipe.imageUrl && (
        <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      )}

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {Array.isArray(recipe.ingredients) && recipe.ingredients.map((item: any, idx: number) => (
        <Text key={idx} style={styles.item}>• {item.name} - {item.quantity}</Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions:</Text>
      {typeof recipe.instructions === 'string'
        ? recipe.instructions.split('.').map((line: string, idx: number) =>
            line.trim() ? <Text key={idx} style={styles.item}>{line.trim()}.</Text> : null
          )
        : <Text style={styles.item}>No instructions provided.</Text>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 6,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 100,
  },
});
