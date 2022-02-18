import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1 } from '@components/typography';
import { Container } from '@components';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@components/layout';
import ChangePasswordForm from './ChangePasswordForm';

function ChangePassword() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

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

  // Dado mocado
  const handleChangePassword = (values) => {
    setLoading(true);
    console.log(values);
    navigation.navigate('PublicNavigator', {
      screen: 'SignIn',
    });
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
            <Title1 family="medium">{t('changePassword:body')}</Title1>
          </View>

          <ChangePasswordForm
            onSubmit={(values) => handleChangePassword(values)}
            isSubmitting={loading}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default ChangePassword;
