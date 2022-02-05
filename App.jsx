import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '@store';
import { useTheme, ThemeProvider } from './src/theme';
import Navigation from './src/navigation';
import { ToastProvider } from './src/components';

function AppContents() {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const darkMode = useSelector((state) => state.mode.darkMode);

  async function getStoreData() {
    try {
      const getMode = await AsyncStorage.getItem('darkMode');
      const darkModeState = JSON.parse(getMode);
      if (darkModeState) {
        dispatch({
          type: 'SET_MODE',
          payload: darkModeState,
        });
      }
    } catch (e) {
      SplashScreen.hide();
      return e;
    }
    return null;
  }

  async function loadData() {
    await getStoreData();
    SplashScreen.hide();
  }

  useLayoutEffect(() => {
    loadData();
  }, []);

  return (
    <ThemeProvider theme={darkMode}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <ToastProvider>
        <Navigation />
      </ToastProvider>
    </ThemeProvider>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <SafeAreaProvider>
          <AppContents />
        </SafeAreaProvider>
      </MenuProvider>
    </Provider>
  );
};

export default App;
