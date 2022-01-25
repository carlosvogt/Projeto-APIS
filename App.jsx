import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from './src/theme';
import Navigation from './src/navigation';
import { ToastProvider } from './src/components';

function AppContents() {
  return <Navigation />;
}

const App = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <ToastProvider>
        <AppContents />
      </ToastProvider>
    </SafeAreaProvider>
  );
};

export default App;
