import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../screens/RegistrationScreen';
import OTPScreen from '../screens/OTPScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Registration" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
