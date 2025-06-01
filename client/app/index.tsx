// // 📁 app/index.tsx
// import React from 'react';
// import { View, Text, StyleSheet, ImageBackground } from 'react-native';
// import { router } from 'expo-router';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { useAuthViewModel } from '@/viewModels/useAuthViewModel';

// export default function WelcomeScreen() {
//   return (
//     <ImageBackground
//       source={require('../assets/images/login-bg.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>Munchly</Text>
//         <Text style={styles.subtitle}>Your smart kitchen companion</Text>

//         <PrimaryButton
//           title="Sign Up"
//           onPress={() => router.push('/signup')}
//         />
//         <PrimaryButton
//           title="Log In"
//           onPress={() => router.push('/login')}
//         />
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     //backgroundColor: 'rgba(255,255,255,0.8)', // רקע לבן שקוף קלות לטקסטים ולכפתורים
//     padding: 20,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#fff',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#fff',
//     marginBottom: 40,
//   },
// });



// // 📁 app/index.tsx
// import React from 'react';
// import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
// import { router } from 'expo-router';
// import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

// export default function WelcomeScreen() {
//   const [fontsLoaded] = useFonts({
//     Fredoka_400Regular,
//     Fredoka_700Bold,
//   });

//   if (!fontsLoaded) return null; 

//   return (
//     <ImageBackground
//       source={require('../assets/images/login-bg.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>Munchly</Text>
//         <Text style={styles.subtitle}>Your smart kitchen companion</Text>

//         <TouchableOpacity style={styles.button} onPress={() => router.push('/signup')}>
//           <Text style={styles.buttonText}>Sign Up</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
//           <Text style={styles.buttonText}>Log In</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//   },
//   title: {
//     fontSize: 36,
//     color: '#fff',
//     marginBottom: 10,
//     fontFamily: 'Fredoka_700Bold', // ✅ פונט מודגש
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#fff',
//     marginBottom: 40,
//     fontFamily: 'Fredoka_400Regular', // ✅ פונט רגיל
//   },
//   button: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 25,
//     marginVertical: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#000',
//     fontFamily: 'Fredoka_400Regular',
//   },
// });


// 📁 app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { useColorScheme } from '../hooks/useColorScheme'; // ✅

export default function WelcomeScreen() {
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  const theme = useColorScheme(); // 'light' or 'dark'

  if (!fontsLoaded) return null;

  // ✅ Dynamic styles:
  const buttonStyle = {
    backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.5)' : '#fff',
  };
  const textStyle = {
    color: theme === 'light' ? '#fff' : '#000',
  };

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Munchly</Text>
        <Text style={styles.subtitle}>Your smart kitchen companion</Text>

        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={() => router.push('/signup')}>
          <Text style={[styles.buttonText, textStyle]}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={() => router.push('/login')}>
          <Text style={[styles.buttonText, textStyle]}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    fontSize: 36,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Fredoka_700Bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    fontFamily: 'Fredoka_400Regular',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Fredoka_400Regular',
  },
});
