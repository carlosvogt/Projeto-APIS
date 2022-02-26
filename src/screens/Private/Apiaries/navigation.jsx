import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditApiary from './EditApiary';
import CreateApiaryPersonalInfo from './CreateApiary/PersonalInfo';
import CheckViability from './CheckViability';
import ApiariesHome from './ApiariesHome';
import ApiaryHome from './ApiaryHome';
import CreateApiaryAddress from './CreateApiary/Address';

function ApiaryNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="ApiariesHome">
      <Stack.Screen
        name="EditApiary"
        component={EditApiary}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CheckViability"
        component={CheckViability}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateApiaryAddress"
        component={CreateApiaryAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateApiaryPersonalInfo"
        component={CreateApiaryPersonalInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ApiariesHome"
        component={ApiariesHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ApiaryHome"
        component={ApiaryHome}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default ApiaryNavigation;
