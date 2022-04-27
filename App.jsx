/* eslint-disable no-empty */
import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '@store';
import { useTheme, ThemeProvider } from '@theme';
import { ToastProvider } from '@components';
import Navigation from '@navigation/index';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AppContents = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const darkMode = useSelector((state) => state.mode.darkMode);

  const getUserInfo = async (uid) => {
    try {
      firestore()
        .collection(`users/${uid}/accountData`)
        .onSnapshot({ includeMetadataChanges: true }, (docs) => {
          docs.forEach((doc) => {
            AsyncStorage.setItem('account', JSON.stringify(doc.data()));
            dispatch({
              type: 'SET_ACCOUNT_DATA',
              payload: doc.data(),
            });
          });
        });
    } catch (error) {}
  };

  const getStoreData = async () => {
    try {
      const getMode = await AsyncStorage.getItem('darkMode');
      const getAuth = await AsyncStorage.getItem('auth');
      const getAccount = await AsyncStorage.getItem('account');
      const darkModeState = JSON.parse(getMode);
      const getAuthState = JSON.parse(getAuth);
      const getAccountState = JSON.parse(getAccount);

      if (darkModeState) {
        dispatch({
          type: 'SET_MODE',
          payload: darkModeState,
        });
      }
      if (getAuth) {
        dispatch({
          type: 'SIGN_IN',
          payload: getAuthState,
        });
      }
      if (getAccount) {
        dispatch({
          type: 'SET_ACCOUNT_DATA',
          payload: getAccountState,
        });
      }
    } catch (e) {
      SplashScreen.hide();
      return e;
    }
    return null;
  };

  const checkPermission = async () => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        getUserInfo(user.uid);
      } else {
        AsyncStorage.removeItem('auth');
        dispatch({
          type: 'SIGN_OUT',
        });
      }
    });
  };

  const loadData = async () => {
    await checkPermission();
    await getStoreData();
    SplashScreen.hide();
  };

  useLayoutEffect(() => {
    loadData();
  }, []);

  return (
    <ThemeProvider theme={darkMode}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <ToastProvider>
      <Provider store={store}>
        <MenuProvider>
          <SafeAreaProvider>
            <AppContents />
          </SafeAreaProvider>
        </MenuProvider>
      </Provider>
    </ToastProvider>
  );
};

export default App;
