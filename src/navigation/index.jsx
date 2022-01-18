import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@theme';
import { SafeAreaView } from '@components/layout';

import Routes from './Routes';

const Navigation = () => {
  const theme = useTheme();

  return (
    <SafeAreaView>
      <NavigationContainer theme={theme}>
        <Routes />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Navigation;
