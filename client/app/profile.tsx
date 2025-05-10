// // 📁 app/profile.tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
// import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
// //import { getUserProfile } from '@/services/userService';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router } from 'expo-router';
// import { getUserProfile } from '@/services/userService';

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

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
// import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router } from 'expo-router';
// import { getUserProfile } from '@/services/userService'; // וודא שהשירות הזה קיים

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
//       <Image
//         source={{ uri: 'https://via.placeholder.com/100x100.png?text=User' }}
//         style={styles.avatar}
//       />
//       <Text style={styles.name}>{profile.name || 'Munchly User'}</Text>

//       <Text style={styles.sectionTitle}>🍽️ Preferences:</Text>
//       {Object.entries(profile.preferences || {}).map(([key, value]) => (
//         <Text key={key} style={styles.item}>
//           {formatLabel(key)}: {value ? '✅' : '❌'}
//         </Text>
//       ))}

//       <Text style={styles.sectionTitle}>❤️ Liked Recipes:</Text>
//       {(profile.likedRecipes || []).map((id: string, idx: number) => (
//         <Text key={id} style={styles.item}>Recipe ID: {id}</Text>
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
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 20,
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//   },
//   item: {
//     fontSize: 16,
//     marginBottom: 6,
//     alignSelf: 'flex-start',
//   },
//   error: {
//     marginTop: 50,
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'red',
//   },
// });


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Image,
//   Alert,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router } from 'expo-router';
// import { getUserProfile } from '@/services/userService';
// import {
//   useFonts,
//   Fredoka_400Regular,
//   Fredoka_700Bold,
// } from '@expo-google-fonts/fredoka';

// export default function ProfileScreen() {
//   const { user } = useAuthViewModel();
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState<any | null>(null);
//   const [profileImage, setProfileImage] = useState<string | null>(null);

//   const [fontsLoaded] = useFonts({
//     Fredoka_400Regular,
//     Fredoka_700Bold,
//   });

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

//   const handlePickProfileImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert('Permission denied', 'Gallery access is required.');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setProfileImage(result.assets[0].uri);
//     }
//   };

//   if (!fontsLoaded || loading) {
//     return (
//       <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
//     );
//   }

//   if (!profile) {
//     return <Text style={styles.error}>Unable to load profile.</Text>;
//   }

//   return (
//     <ImageBackground
//       source={require('../assets/images/scan-fridge.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <ScrollView contentContainerStyle={styles.overlay}>
//         <TouchableOpacity onPress={handlePickProfileImage}>
//           <Image
//             source={
//               profileImage
//                 ? { uri: profileImage }
//                 : require('../assets/images/default-avatar.png')
//             }
//             style={styles.avatar}
//           />
//         </TouchableOpacity>

//         <Text style={styles.username}>{profile.name || 'Munchly User'}</Text>

//         <Text style={styles.sectionTitle}>Food Preferences:</Text>
//         {Object.entries(profile.preferences || {}).map(([key, value]) => (
//           <Text key={key} style={styles.item}>
//             {formatLabel(key)}: {value ? '✅' : '❌'}
//           </Text>
//         ))}

//         {profile.lastFridgeScan && (
//           <>
//             <Text style={styles.sectionTitle}>Last Fridge Scan:</Text>
//             <Text style={styles.item}>{profile.lastFridgeScan}</Text>
//           </>
//         )}

//         <Text style={styles.sectionTitle}>Liked Recipes:</Text>
//         {(profile.likedRecipes || []).map((id: string) => (
//           <Text key={id} style={styles.item}>❤️ Recipe ID: {id}</Text>
//         ))}

//         <PrimaryButton title="Back to Menu" onPress={() => router.replace('/menu')} />
//         <PrimaryButton title="Logout" onPress={() => router.replace('/')} />
//       </ScrollView>
//     </ImageBackground>
//   );
// }

// function formatLabel(key: string): string {
//   return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   overlay: {
//     flexGrow: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#ccc',
//     marginBottom: 10,
//   },
//   username: {
//     fontSize: 20,
//     fontFamily: 'Fredoka_700Bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontFamily: 'Fredoka_700Bold',
//     marginTop: 20,
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//     color: '#fff',
//   },
//   item: {
//     fontSize: 16,
//     fontFamily: 'Fredoka_400Regular',
//     marginBottom: 6,
//     alignSelf: 'flex-start',
//     color: '#fff',
//   },
//   error: {
//     marginTop: 50,
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'red',
//   },
// });
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
// import { getUserProfile } from '@/services/userService';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router } from 'expo-router';

// export default function ProfileScreen() {
//   const { user } = useAuthViewModel();
//   const [profile, setProfile] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return;

//     const fetchData = async () => {
//       try {
//         const data = await getUserProfile(user.uid);
//         setProfile(data);
//       } catch (err: any) {
//         Alert.alert('Error', err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   if (!profile) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.error}>Unable to load profile</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>👤 Profile</Text>
//       <Text style={styles.item}>UID: {profile.uid}</Text>
//       <Text style={styles.item}>Email: {profile.email}</Text>

//       <Text style={styles.sectionTitle}>🍽️ Preferences:</Text>
//       {Object.entries(profile.preferences || {}).map(([key, value]) => (
//         <Text key={key} style={styles.item}>
//           {key}: {value ? '✅' : '❌'}
//         </Text>
//       ))}

//       <Text style={styles.sectionTitle}>❤️ Liked Recipes:</Text>
//       {(profile.likedRecipes || []).map((id: string) => (
//         <Text key={id} style={styles.item}>• Recipe ID: {id}</Text>
//       ))}

//       <PrimaryButton title="Back to Menu" onPress={() => router.replace('/menu')} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   item: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   error: {
//     color: 'red',
//     fontSize: 18,
//   },
// });


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Image,
//   Alert,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
// import { getUserProfile } from '@/services/userService';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router } from 'expo-router';
// import {
//   useFonts,
//   Fredoka_400Regular,
//   Fredoka_700Bold,
// } from '@expo-google-fonts/fredoka';

// export default function ProfileScreen() {
//   const { user } = useAuthViewModel();
//   const [profile, setProfile] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState<string | null>(null);

//   const [fontsLoaded] = useFonts({
//     Fredoka_400Regular,
//     Fredoka_700Bold,
//   });

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

//   const handlePickProfileImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert('Permission denied', 'Gallery access is required.');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setProfileImage(result.assets[0].uri);
//     }
//   };

//   if (!fontsLoaded || loading) {
//     return (
//       <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
//     );
//   }

//   if (!profile) {
//     return <Text style={styles.error}>Unable to load profile.</Text>;
//   }

//   return (
//     <ImageBackground
//       source={require('../assets/images/scan-fridge.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <ScrollView contentContainerStyle={styles.overlay}>
//         <TouchableOpacity onPress={handlePickProfileImage}>
//           <Image
//             source={
//               profileImage
//                 ? { uri: profileImage }
//                 : require('../assets/images/default-avatar.png')
//             }
//             style={styles.avatar}
//           />
//         </TouchableOpacity>
//         <Text style={styles.username}>{user?.displayName || 'Munchly User'}</Text>

//         <Text style={styles.sectionTitle}>🍽️ Food Preferences:</Text>
//         {Object.entries(profile.preferences || {}).map(([key, value]) => (
//           <Text key={key} style={styles.item}>
//             {formatLabel(key)}: {value ? '✅' : '❌'}
//           </Text>
//         ))}

//         {profile.lastFridgeScan && (
//           <>
//             <Text style={styles.sectionTitle}>📸 Last Fridge Scan:</Text>
//             <Text style={styles.item}>{profile.lastFridgeScan}</Text>
//           </>
//         )}

//         <Text style={styles.sectionTitle}>❤️ Liked Recipes:</Text>
//         {(profile.likedRecipes || []).map((id: string) => (
//           <Text key={id} style={styles.item}>• Recipe ID: {id}</Text>
//         ))}

//         <PrimaryButton title="Back to Menu" onPress={() => router.replace('/menu')} />
//         <PrimaryButton title="Logout" onPress={() => router.replace('/')} />
//       </ScrollView>
//     </ImageBackground>
//   );
// }

// function formatLabel(key: string): string {
//   return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   overlay: {
//     flexGrow: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#ccc',
//     marginBottom: 10,
//   },
//   username: {
//     fontSize: 20,
//     fontFamily: 'Fredoka_700Bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontFamily: 'Fredoka_700Bold',
//     marginTop: 20,
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//     color: '#fff',
//   },
//   item: {
//     fontSize: 16,
//     fontFamily: 'Fredoka_400Regular',
//     marginBottom: 6,
//     alignSelf: 'flex-start',
//     color: '#fff',
//   },
//   error: {
//     marginTop: 50,
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'red',
//   },
// });


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Image,
//   Alert,
//   TouchableOpacity,
//   ImageBackground,
//   Modal,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
// import { getUserProfile } from '@/services/userService';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router } from 'expo-router';
// import {
//   useFonts,
//   Fredoka_400Regular,
//   Fredoka_700Bold,
// } from '@expo-google-fonts/fredoka';
// import { getIdToken } from '../src/services/authTokenService';

// export default function ProfileScreen() {
//   const { user } = useAuthViewModel();
//   const [profile, setProfile] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [showRecipeBook, setShowRecipeBook] = useState(false);
//   const [recipes, setRecipes] = useState<any[]>([]);

//   const [fontsLoaded] = useFonts({
//     Fredoka_400Regular,
//     Fredoka_700Bold,
//   });

//   useEffect(() => {
//     if (!user) return;

//     const fetchProfile = async () => {
//       try {
//         const data = await getUserProfile(user.uid);
//         setProfile(data);

//         if (data.likedRecipes && data.likedRecipes.length > 0) {
//           const token = await getIdToken();
//           const recipePromises = data.likedRecipes.map((id: string) =>
//             fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`, {
//               headers: { Authorization: `Bearer ${token}` },
//             }).then(res => res.json())
//           );
//           const fullRecipes = await Promise.all(recipePromises);
//           setRecipes(fullRecipes);
//         }
//       } catch (err: any) {
//         Alert.alert('Error', err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user]);

//   const handlePickProfileImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert('Permission denied', 'Gallery access is required.');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setProfileImage(result.assets[0].uri);
//     }
//   };

//   if (!fontsLoaded || loading) {
//     return (
//       <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
//     );
//   }

//   if (!profile) {
//     return <Text style={styles.error}>Unable to load profile.</Text>;
//   }

//   return (
//     <ImageBackground
//       source={require('../assets/images/scan-fridge.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <ScrollView contentContainerStyle={styles.overlay}>
//         <TouchableOpacity onPress={handlePickProfileImage}>
//           <Image
//             source={
//               profileImage
//                 ? { uri: profileImage }
//                 : require('../assets/images/default-avatar.png')
//             }
//             style={styles.avatar}
//           />
//         </TouchableOpacity>
//         <Text style={styles.username}>{user?.displayName || 'Munchly User'}</Text>

//         <Text style={styles.sectionTitle}>🍽️ Food Preferences:</Text>
//         {Object.entries(profile.preferences || {}).map(([key, value]) => (
//           <Text key={key} style={styles.item}>
//             {formatLabel(key)}: {value ? '✅' : '❌'}
//           </Text>
//         ))}

//         {profile.lastFridgeScan && (
//           <>
//             <Text style={styles.sectionTitle}>📸 Last Fridge Scan:</Text>
//             <Text style={styles.item}>{profile.lastFridgeScan}</Text>
//           </>
//         )}

//         <PrimaryButton title="📚 My Recipe Book" onPress={() => setShowRecipeBook(true)} />
//         <PrimaryButton title="Back to Menu" onPress={() => router.replace('/menu')} />
//         <PrimaryButton title="Logout" onPress={() => router.replace('/')} />
//       </ScrollView>

//       <Modal
//         visible={showRecipeBook}
//         animationType="slide"
//         onRequestClose={() => setShowRecipeBook(false)}
//       >
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>📚 My Recipe Book</Text>
//           <ScrollView contentContainerStyle={{ padding: 20 }}>
//             {recipes.length === 0 ? (
//               <Text style={styles.item}>No liked recipes yet.</Text>
//             ) : (
//               recipes.map((recipe, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={styles.recipeCard}
//                   onPress={() => {
//                     setShowRecipeBook(false);
//                     router.push(`/recipe/${recipe.id}`);
//                   }}
//                 >
//                   {recipe.imageUrl && (
//                     <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
//                   )}
//                   <Text style={styles.recipeTitle}>{recipe.title}</Text>
//                 </TouchableOpacity>
//               ))
//             )}
//             <PrimaryButton title="Close" onPress={() => setShowRecipeBook(false)} />
//           </ScrollView>
//         </View>
//       </Modal>
//     </ImageBackground>
//   );
// }

// function formatLabel(key: string): string {
//   return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   overlay: {
//     flexGrow: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#ccc',
//     marginBottom: 10,
//   },
//   username: {
//     fontSize: 20,
//     fontFamily: 'Fredoka_700Bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontFamily: 'Fredoka_700Bold',
//     marginTop: 20,
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//     color: '#fff',
//   },
//   item: {
//     fontSize: 16,
//     fontFamily: 'Fredoka_400Regular',
//     marginBottom: 6,
//     alignSelf: 'flex-start',
//     color: '#fff',
//   },
//   error: {
//     marginTop: 50,
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'red',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#003366',
//     paddingTop: 60,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontFamily: 'Fredoka_700Bold',
//     textAlign: 'center',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   recipeCard: {
//     backgroundColor: '#fefefe',
//     borderRadius: 12,
//     padding: 10,
//     marginBottom: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   recipeImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//   },
//   recipeTitle: {
//     fontSize: 18,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//     flexShrink: 1,
//   },
// });


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
import { getUserProfile } from '@/services/userService';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router } from 'expo-router';
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';
import { getIdToken } from '../src/services/authTokenService';

export default function ProfileScreen() {
  const { user } = useAuthViewModel();
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showRecipeBook, setShowRecipeBook] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user.uid);
        setProfile(data);

        if (data.likedRecipes && data.likedRecipes.length > 0) {
          const token = await getIdToken();
          const recipePromises = data.likedRecipes.map((id: string) =>
            fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then(res => res.json())
          );
          const fullRecipes = await Promise.all(recipePromises);
          setRecipes(fullRecipes);
        }
      } catch (err: any) {
        Alert.alert('Error', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handlePickProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied', 'Gallery access is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
    );
  }

  if (!profile) {
    return <Text style={styles.error}>Unable to load profile.</Text>;
  }

  return (
    <ImageBackground
      source={require('../assets/images/scan-fridge.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <TouchableOpacity onPress={handlePickProfileImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../assets/images/default-avatar.png')
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.username}>{user?.displayName || 'Munchly User'}</Text>

        <Text style={styles.sectionTitle}>🍽️ Food Preferences:</Text>
        {Object.entries(profile.preferences || {}).map(([key, value]) => (
          <Text key={key} style={styles.item}>
            {formatLabel(key)}: {value ? '✅' : '❌'}
          </Text>
        ))}

        {profile.lastFridgeScan && (
          <>
            <Text style={styles.sectionTitle}>📸 Last Fridge Scan:</Text>
            <Text style={styles.item}>{profile.lastFridgeScan}</Text>
          </>
        )}

        <PrimaryButton title="📚 My Recipe Book" onPress={() => setShowRecipeBook(true)} />
        <PrimaryButton title="Back to Menu" onPress={() => router.replace('/menu')} />
        <PrimaryButton title="Logout" onPress={() => router.replace('/')} />
      </ScrollView>

      <Modal
        visible={showRecipeBook}
        animationType="slide"
        onRequestClose={() => setShowRecipeBook(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            {selectedRecipe ? (
              <View>
                <TouchableOpacity onPress={() => setSelectedRecipe(null)}>
                  <Text style={{ color: '#fff', marginBottom: 10 }}>🔙 Back to list</Text>
                </TouchableOpacity>
                {selectedRecipe.imageUrl && (
                  <Image source={{ uri: selectedRecipe.imageUrl }} style={styles.fullImage} />
                )}
                <Text style={styles.modalTitle}>{selectedRecipe.title}</Text>

                <Text style={styles.sectionTitle}>Ingredients</Text>
                {selectedRecipe.ingredients.map((item: string, idx: number) => (
                  <Text key={idx} style={styles.item}>• {item}</Text>
                ))}

                <Text style={styles.sectionTitle}>Instructions</Text>
                {selectedRecipe.instructions.map((step: string, idx: number) => (
                  <Text key={idx} style={styles.item}>{idx + 1}. {step}</Text>
                ))}
              </View>
            ) : (
              <>
                <Text style={styles.modalTitle}>📚 My Recipe Book</Text>
                {recipes.length === 0 ? (
                  <Text style={styles.item}>No liked recipes yet.</Text>
                ) : (
                  recipes.map((recipe, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.recipeCard}
                      onPress={() => setSelectedRecipe(recipe)}
                    >
                      {recipe.imageUrl && (
                        <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
                      )}
                      <Text style={styles.recipeTitle}>{recipe.title}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </>
            )}
            <PrimaryButton title="Close" onPress={() => {
              setSelectedRecipe(null);
              setShowRecipeBook(false);
            }} />
          </ScrollView>
        </View>
      </Modal>
    </ImageBackground>
  );
}

function formatLabel(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Fredoka_700Bold',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    color: '#fff',
  },
  item: {
    fontSize: 16,
    fontFamily: 'Fredoka_400Regular',
    marginBottom: 6,
    alignSelf: 'flex-start',
    color: '#fff',
  },
  error: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#003366',
    paddingTop: 60,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Fredoka_700Bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#fefefe',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recipeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 18,
    color: '#003366',
    fontFamily: 'Fredoka_700Bold',
    flexShrink: 1,
  },
  fullImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
});
