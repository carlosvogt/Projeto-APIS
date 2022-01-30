import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme';
import Navigation from './src/navigation';
import { ToastProvider } from './src/components';

const App = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <ThemeProvider>
        <ToastProvider>
          <Navigation />
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
