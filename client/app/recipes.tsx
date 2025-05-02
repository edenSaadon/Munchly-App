// // 📁 app/recipes.tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router } from 'expo-router';

// // דמו מתכונים זמניים
// const sampleRecipes = [
//   {
//     id: '1',
//     title: 'פסטה עגבניות',
//     image: 'https://images.unsplash.com/photo-1603133872878-684f207b69d4',
//   },
//   {
//     id: '2',
//     title: 'סלט ירוק טרי',
//     image: 'https://images.unsplash.com/photo-1569058242403-2446f0d7ba31',
//   },
// ];

// export default function RecipesScreen() {
//   const [recipes, setRecipes] = useState<any[]>([]);
//   const [likedRecipes, setLikedRecipes] = useState<string[]>([]);

//   useEffect(() => {
//     // בהמשך תשלפי מהשרת/Firestore
//     setRecipes(sampleRecipes);
//   }, []);

//   const handleLike = (id: string) => {
//     setLikedRecipes(prev =>
//       prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
//     );
//     // 🔁 בהמשך תשלחי ל-Firestore
//   };

//   const renderItem = ({ item }: { item: any }) => (
//     <TouchableOpacity style={styles.card} onPress={() => router.push(`/recipe/${item.id}`)}>
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <View style={styles.info}>
//         <Text style={styles.title}>{item.title}</Text>
//         <TouchableOpacity onPress={() => handleLike(item.id)}>
//           <Text style={styles.like}>{likedRecipes.includes(item.id) ? '❤️' : '🤍'}</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>📚 Recipes Collection</Text>
//       <FlatList
//         data={recipes}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       />

//       <View style={styles.footer}>
//         <PrimaryButton title="Profile" onPress={() => router.push('/profile')} />
//         <PrimaryButton title="Logout" onPress={() => router.replace('/')} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   header: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   card: {
//     marginBottom: 20,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   image: {
//     height: 180,
//     width: '100%',
//   },
//   info: {
//     padding: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   like: {
//     fontSize: 24,
//   },
//   footer: {
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
// });


// 📁 app/recipes.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router } from 'expo-router';
// import { getIdToken } from '../src/services/authTokenService';
// import { getAuth } from 'firebase/auth';

// export default function RecipesScreen() {
//   const [recipes, setRecipes] = useState<any[]>([]);
//   const [likedRecipes, setLikedRecipes] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const token = await getIdToken();
//         const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message);
//         setRecipes(data);
//       } catch (err) {
//         console.error('Failed to fetch recipes:', err);
//         Alert.alert('Error', 'Could not load recipes');
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleLike = async (id: string) => {
//     try {
//       const token = await getIdToken();
//       const user = getAuth().currentUser;
//       if (!user) throw new Error('User not logged in');
  
//       // שליחת בקשת לייק לשרת
//       const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}/like`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ uid: user.uid }),
//       });
  
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
  
//       // עדכון ה־UI
//       setLikedRecipes(prev =>
//         prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
//       );
//     } catch (err: any) {
//       console.error('❌ Failed to like recipe:', err);
//       Alert.alert('Error', err.message || 'Failed to like recipe');
//     }
//   };
  

//   const renderItem = ({ item }: { item: any }) => (
//     <TouchableOpacity style={styles.card} onPress={() => router.push(`/recipe/${item.id}`)}>
//       <View style={styles.cardContent}>
//         <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }} style={styles.thumbnail} />
//         <View style={styles.details}>
//           <View style={styles.row}>
//             <Text style={styles.title}>{item.title}</Text>
//             <TouchableOpacity onPress={() => handleLike(item.id)}>
//               <Text style={styles.like}>{likedRecipes.includes(item.id) ? '❤️' : '🤍'}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>📚 Recipes Collection</Text>
//       <FlatList
//         data={recipes}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 100 }}
//       />

//       <View style={styles.footer}>
//         <PrimaryButton title="Profile" onPress={() => router.push('/profile')} />
//         <PrimaryButton title="Logout" onPress={() => router.replace('/')} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   header: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   card: {
//     marginBottom: 16,
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#f8f8f8',
//     elevation: 2,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//   },
//   thumbnail: {
//     width: 90,
//     height: 90,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   details: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     flexShrink: 1,
//   },
//   like: {
//     fontSize: 22,
//     marginLeft: 10,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginTop: 10,
//   },
// });



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router } from 'expo-router';
import { getIdToken } from '../src/services/authTokenService';
import { getAuth } from 'firebase/auth';

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = await getIdToken();
        const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setRecipes(data);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        Alert.alert('Error', 'Could not load recipes');
      }
    };

    fetchRecipes();
  }, []);

  const handleLike = async (id: string) => {
    try {
      const token = await getIdToken();
      const user = getAuth().currentUser;
      if (!user) throw new Error('User not logged in');

      const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid: user.uid }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setLikedRecipes(prev =>
        prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
      );
    } catch (err: any) {
      console.error('❌ Failed to like recipe:', err);
      Alert.alert('Error', err.message || 'Failed to like recipe');
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const recipePath = item.source === 'db'
      ? `/recipe-db/${item.id}` // מסך ייעודי למתכונים רגילים
      : `/recipe/${item.id}`;   // מסך למתכונים מ-AI

    return (
      <TouchableOpacity style={styles.card} onPress={() => router.push(recipePath)}>
        <View style={styles.cardContent}>
          <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }} style={styles.thumbnail} />
          <View style={styles.details}>
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <Text style={styles.like}>{likedRecipes.includes(item.id) ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Recipes Collection</Text>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <View style={styles.footer}>
        <PrimaryButton title="Profile" onPress={() => router.push('/profile')} />
        <PrimaryButton title="Logout" onPress={() => router.replace('/')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flexShrink: 1,
  },
  like: {
    fontSize: 22,
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});
