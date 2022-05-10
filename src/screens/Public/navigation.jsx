import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './SignIn';
import CreateAccountPersonalInfo from './CreateAccount/PersonalInfo';
import CreateAccountAddress from './CreateAccount/Address';
import RecoverPassword from './RecoverPassword';
import AcceptTermsOfUse from './AcceptTermsOfUse';

const Stack = createStackNavigator();

function PublicNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen
        name="CreateAccountPersonalInfo"
        component={CreateAccountPersonalInfo}
      />
      <Stack.Screen
        name="CreateAccountAddress"
        component={CreateAccountAddress}
      />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="AcceptTermsOfUse" component={AcceptTermsOfUse} />
    </Stack.Navigator>
  );
}

export default PublicNavigator;
