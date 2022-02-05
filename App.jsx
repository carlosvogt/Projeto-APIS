import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider, useTheme } from './src/theme';
import Navigation from './src/navigation';
import { ToastProvider } from './src/components';

const App = () => {
  const { colors } = useTheme();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <MenuProvider>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={colors.background}
          barStyle="dark-content"
        />
        <ThemeProvider>
          <ToastProvider>
            <Navigation />
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </MenuProvider>
  );
};

export default App;
