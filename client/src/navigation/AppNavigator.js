// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Views
import LoginView from '../views/LoginView';
import FridgeScanView from '../views/FridgeScanView';
import MenuView from '../views/MenuView';
import CreateRecipeView from '../views/CreateRecipeView';
import SearchRecipeView from '../views/SearchRecipeView';
import InventoryView from '../views/InventoryView';
import ProfileView from '../views/ProfileView';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="FridgeScan" component={FridgeScanView} />
        <Stack.Screen name="Menu" component={MenuView} />
        <Stack.Screen name="CreateRecipe" component={CreateRecipeView} />
        <Stack.Screen name="SearchRecipe" component={SearchRecipeView} />
        <Stack.Screen name="Inventory" component={InventoryView} />
        <Stack.Screen name="Profile" component={ProfileView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
