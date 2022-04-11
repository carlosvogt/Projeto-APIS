import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1 } from '@components/typography';
import { Container, useToast } from '@components';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@components/layout';
import { useTheme } from '@theme';
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { auth } from '@services/firebase';
import { useNetInfo } from '@react-native-community/netinfo';
import { useSelector } from 'react-redux';
import { accountInfo } from '@store/accountData';
import ChangePasswordForm from './ChangePasswordForm';

function ChangePassword() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const userInformation = useSelector(accountInfo);
  const netInfo = useNetInfo();
  const toast = useToast();

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    viewTitle: {
      marginTop: 32,
      marginBottom: 24,
    },

    forgotPassword: {
      paddingVertical: 16,
    },
  });

  const handleChangePassword = async (form) => {
    await updatePassword(auth.currentUser, form.newPassword)
      .then(() => {
        toast.success(t('changePassword:success'));
        navigation.navigate('Profile');
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };

  const handleConfirmUser = async (form) => {
    setLoading(true);
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      await signInWithEmailAndPassword(
        auth,
        userInformation.email,
        form.oldPassword,
      )
        .then(() => {
          handleChangePassword(form);
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            toast.error(t('changePassword:invalidPassword'));
          } else {
            toast.error(error.code);
          }
        });
    } else {
      toast.error(t('changePassword:noInternet'));
    }
    setLoading(false);
  };

  return (
    <>
      <Header title={t('changePassword:header')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 color={colors.primary} family="medium">
              {t('changePassword:body')}
            </Title1>
          </View>

          <ChangePasswordForm
            onSubmit={(values) => handleConfirmUser(values)}
            isSubmitting={loading}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default ChangePassword;
