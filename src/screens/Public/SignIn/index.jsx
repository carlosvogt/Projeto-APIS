import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { Container, ToggleButton, Button } from '@components';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Footer } from '@components/layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@theme';
import SignInForm from './SignInForm';

function SignIn() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const darkMode = useSelector((state) => state.mode.darkMode);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
    navigation.navigate('RecoverPassword');
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccountPersonalInfo');
  };

  // Dado mocado
  const handleLogin = (login) => {
    setLoading(true);
    console.log('Fazer login', login);
    // navigation.navigate('home');
    setLoading(false);
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
            {t('login:welcome')}
          </Title1>
        </View>
        <View style={styles.viewInstruction}>
          <Title2 color={colors.primary}>{t('login:instruction')}</Title2>
        </View>

        <SignInForm
          onSubmit={(values) => handleLogin(values)}
          isSubmitting={loading}
        />

        <Button
          title={t('login:createAccount')}
          style={styles.createAccount}
          onPress={() => handleCreateAccount()}
        />

        <Button
          title={t('login:forgotPassword')}
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
