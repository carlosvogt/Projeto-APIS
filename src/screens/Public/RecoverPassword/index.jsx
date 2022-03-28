import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { Container } from '@components';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '@components/layout';
import { useTheme } from '@theme';
import RecoverPasswordForm from './RecoverPasswordForm';

function RecoverPassword() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [emailSended, setEmailSended] = useState(false);

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
      paddingHorizontal: 16,
    },
  });

  // Dado mocado
  const handleRecoverPassword = (email) => {
    setLoading(true);
    console.log('Recuperar senha', email);
    setLoading(false);
    setEmailSended(true);
  };

  return (
    <>
      <Header title={t('recoverPassword:header')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 centered family="medium" color={colors.primary}>
              {t('recoverPassword:question')}
            </Title1>
          </View>
          <View style={styles.viewInstruction}>
            <Title2 color={colors.primary} centered>
              {t('recoverPassword:body')}
            </Title2>
          </View>

          <RecoverPasswordForm
            onSubmit={(values) => handleRecoverPassword(values)}
            isSubmitting={loading}
            emailSended={emailSended}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default RecoverPassword;
