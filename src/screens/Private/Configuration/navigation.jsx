import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import UpdatePersonalInfo from './UpdatePersonalInfo';
import ChangePassword from './ChangePassword';
import Suggestions from './Suggestions';
import UserTermsOfUse from './UserTermsOfUse';

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
      <Stack.Screen
        name="Suggestions"
        component={Suggestions}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdatePersonalInfo"
        component={UpdatePersonalInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserTermsOfUse"
        component={UserTermsOfUse}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default ProfileNavigator;
