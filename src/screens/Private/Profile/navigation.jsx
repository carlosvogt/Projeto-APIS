import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './index';

function ProfileNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default ProfileNavigator;
