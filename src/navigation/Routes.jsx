import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PublicNavigator from '@screens/Public/navigation';

function Routes() {
  const Stack = createStackNavigator();
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
