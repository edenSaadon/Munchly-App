// src/views/LoginView.js
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useAuthViewModel } from '../viewmodels/authViewModel';

export default function LoginView() {
  const { promptGoogleSignIn, isLoggedIn, user, signOut } = useAuthViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Welcome to Munchly!</Text>

      {!isLoggedIn ? (
        <>
          <Text style={styles.subtitle}>Sign in with your Google account:</Text>
          <Button title="🔐 Sign in with Google" onPress={promptGoogleSignIn} />
        </>
      ) : (
        <>
          <Text style={styles.loggedInText}>
            ✅ Logged in as: {user?.email}
          </Text>
          <Button title="🚪 Sign out" onPress={signOut} color="red" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  loggedInText: {
    fontSize: 16,
    marginBottom: 12,
    color: 'green',
  },
});
