import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './SignIn';

const Stack = createStackNavigator();

function PublicNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export default PublicNavigator;
