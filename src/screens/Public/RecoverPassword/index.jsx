import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { Container, useToast } from '@components';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '@components/layout';
import { useTheme } from '@theme';
import { useNetInfo } from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import RecoverPasswordForm from './RecoverPasswordForm';

function RecoverPassword() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [emailSended, setEmailSended] = useState(false);
  const toast = useToast();
  const netInfo = useNetInfo();

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    viewTitle: {
      marginVertical: '5%',
    },
    viewInstruction: {
      marginBottom: 16,
      paddingHorizontal: 16,
    },
  });

  const handleRecoverPassword = async (form) => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      setLoading(true);
      try {
        await auth().sendPasswordResetEmail(form.email);
        setEmailSended(true);
        toast.success(t('translations:emailSuccess'));
      } catch (error) {
        toast.error(t('translations:genericError'));
      }
      setLoading(false);
    } else {
      toast.error(t('translations:noInternet'));
    }
  };

  return (
    <>
      <Header title={t('translations:recoverPasswordHeader')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 centered family="medium" color={colors.primary}>
              {t('translations:recoverPasswordQuestion')}
            </Title1>
          </View>
          <View style={styles.viewInstruction}>
            <Title2 color={colors.primary} centered>
              {t('translations:recoverPasswordBody')}
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
