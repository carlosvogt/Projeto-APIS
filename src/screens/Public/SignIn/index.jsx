import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { Container, ToggleButton, Button, useToast } from '@components';
import { View, ScrollView, StyleSheet, LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Footer } from '@components/layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@theme';
import { useNetInfo } from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SignInForm from './SignInForm';

function SignIn() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();
  const darkMode = useSelector((state) => state.mode.darkMode);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  LogBox.ignoreLogs([
    'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
    'Require cycle:',
    'Cant perform a React state update on an unmounted component.',
  ]);

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    viewTitle: {
      marginTop: 48,
      marginBottom: 48,
    },
    viewInstruction: {
      marginBottom: 16,
    },
    createAccount: {
      marginHorizontal: 32,
      marginVertical: 48,
    },
  });

  const handleForgotPassword = () => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      navigation.navigate('RecoverPassword');
    } else {
      toast.error(t('translations:noInternet'));
    }
  };

  const handleCreateAccount = () => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      navigation.navigate('CreateAccountPersonalInfo');
    } else {
      toast.error(t('translations:noInternet'));
    }
  };

  const handleUserData = (userCredencial) => {
    if (userCredencial.user.emailVerified) {
      AsyncStorage.setItem('auth', JSON.stringify(userCredencial));
      dispatch({
        type: 'SIGN_IN',
        payload: userCredencial,
      });
    } else {
      toast.error(t('translations:emailVerifiedError'));
    }
  };

  const getUserInfo = async (userCredencial) => {
    firestore()
      .collection(`users/${userCredencial.user.uid}/accountData`)
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
          AsyncStorage.setItem('account', JSON.stringify(doc.data()));
          dispatch({
            type: 'SET_ACCOUNT_DATA',
            payload: doc.data(),
          });
        });
      });
  };

  const handleLogin = async (form) => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      setLoading(true);
      try {
        const user = await auth().signInWithEmailAndPassword(
          form.email,
          form.password,
        );
        await getUserInfo(user);
        handleUserData(user);
      } catch (error) {
        console.log('error', error);
        if (error.code === 'auth/user-not-found') {
          toast.error(t('translations:invalidUser'));
        } else if (error.code === 'auth/wrong-password') {
          toast.error(t('translations:invalidPassword'));
        } else {
          toast.error(error.code);
        }
      }
      setLoading(false);
    } else {
      toast.error(t('translations:noInternet'));
    }
  };

  const setSelectedMode = async (value) => {
    await AsyncStorage.setItem('darkMode', JSON.stringify(value));
    dispatch({
      type: 'SET_MODE',
      payload: value,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <Container>
        <View style={styles.viewTitle}>
          <Title1 color={colors.primary} centered family="medium">
            {t('translations:welcome')}
          </Title1>
        </View>
        <View style={styles.viewInstruction}>
          <Title2 color={colors.primary}>
            {t('translations:loginInstruction')}
          </Title2>
        </View>

        <SignInForm
          onSubmit={(values) => handleLogin(values)}
          isSubmitting={loading}
        />

        <Button
          title={t('translations:createAccount')}
          style={styles.createAccount}
          onPress={() => handleCreateAccount()}
        />

        <Button
          title={t('translations:forgotPassword')}
          onPress={() => handleForgotPassword()}
          mode="outlined"
          textColor={colors.primary}
          titleFamily="light"
        />

        <Footer withBorder={false}>
          <ToggleButton
            isEnabled={darkMode}
            setIsEnabled={(value) => setSelectedMode(value)}
          />
        </Footer>
      </Container>
    </ScrollView>
  );
}
export default SignIn;
