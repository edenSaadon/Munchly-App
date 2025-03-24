// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginView from '../views/LoginView';
import HomeView from '../views/HomeView';
import { useAuthViewModel } from '../viewmodels/authViewModel';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isLoggedIn } = useAuthViewModel();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            component={LoginView}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={{ headerTitle: 'Munchly' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
