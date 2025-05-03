// // 📁 app/profile.tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
// import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
// //import { getUserProfile } from '@/services/userService';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router } from 'expo-router';

// export default function ProfileScreen() {
//   const { user } = useAuthViewModel();
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState<any | null>(null);

//   useEffect(() => {
//     if (!user) return;

//     const fetchProfile = async () => {
//       try {
//         const data = await getUserProfile(user.uid);
//         setProfile(data);
//       } catch (err: any) {
//         Alert.alert('Error', err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />;
//   }

//   if (!profile) {
//     return <Text style={styles.error}>Unable to load profile.</Text>;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>👤 Your Profile</Text>

//       <Text style={styles.sectionTitle}>Food Preferences:</Text>
//       {Object.entries(profile.preferences || {}).map(([key, value]) => (
//         <Text key={key} style={styles.item}>
//           {formatLabel(key)}: {value ? '✅' : '❌'}
//         </Text>
//       ))}

//       <Text style={styles.sectionTitle}>Last Fridge Scan:</Text>
//       <Text style={styles.item}>{profile.lastFridgeScan || 'Not scanned yet'}</Text>

//       <Text style={styles.sectionTitle}>Liked Recipes:</Text>
//       {(profile.likedRecipes || []).map((id: string) => (
//         <Text key={id} style={styles.item}>❤️ Recipe ID: {id}</Text>
//       ))}

//       <PrimaryButton title="Back to Menu" onPress={() => router.replace('/menu')} />
//       <PrimaryButton title="Logout" onPress={() => router.replace('/')} />
//     </ScrollView>
//   );
// }

// function formatLabel(key: string): string {
//   return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   item: {
//     fontSize: 16,
//     marginBottom: 6,
//   },
//   error: {
//     marginTop: 50,
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'red',
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router } from 'expo-router';
import { getUserProfile } from '@/services/userService'; // וודא שהשירות הזה קיים

export default function ProfileScreen() {
  const { user } = useAuthViewModel();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user.uid);
        setProfile(data);
      } catch (err: any) {
        Alert.alert('Error', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />;
  }

  if (!profile) {
    return <Text style={styles.error}>Unable to load profile.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/100x100.png?text=User' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{profile.name || 'Munchly User'}</Text>

      <Text style={styles.sectionTitle}>🍽️ Preferences:</Text>
      {Object.entries(profile.preferences || {}).map(([key, value]) => (
        <Text key={key} style={styles.item}>
          {formatLabel(key)}: {value ? '✅' : '❌'}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>❤️ Liked Recipes:</Text>
      {(profile.likedRecipes || []).map((id: string, idx: number) => (
        <Text key={id} style={styles.item}>Recipe ID: {id}</Text>
      ))}

      <PrimaryButton title="Back to Menu" onPress={() => router.replace('/menu')} />
      <PrimaryButton title="Logout" onPress={() => router.replace('/')} />
    </ScrollView>
  );
}

function formatLabel(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  item: {
    fontSize: 16,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  error: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
});
