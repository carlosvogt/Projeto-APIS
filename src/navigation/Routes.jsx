import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PublicNavigator from '@screens/Public/navigation';
import PrivateNavigator from '@screens/Private/navigation';
import ProfileNavigator from '@screens/Private/Configuration/navigation';
import ApiaryNavigation from '@screens/Private/Apiaries/navigation';
import { useSelector } from 'react-redux';
import { userUid } from '@store/auth';

function Routes() {
  const Stack = createStackNavigator();
  const token = useSelector(userUid);

  if (token) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="PrivateNavigator"
          component={PrivateNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileNavigator"
          component={ProfileNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ApiaryNavigation"
          component={ApiaryNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PublicNavigator"
        component={PublicNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Routes;
