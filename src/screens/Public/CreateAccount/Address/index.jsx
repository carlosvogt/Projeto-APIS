import React, { useState } from 'react';
import { Container } from '@components';
import { Header } from '@components/layout';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@theme';
import AddressForm from './AddressForm';

function Address() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { params } = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    modalItem: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    viewTitle: {
      marginTop: 24,
      marginBottom: 16,
    },
    viewInstruction: {
      marginBottom: 24,
    },
  });

  // Dado mocado
  const handleCreateAccount = (form) => {
    setLoading(true);
    console.log('Criar conta', form, params);
    navigation.navigate('SignIn');
    setLoading(false);
  };

  return (
    <>
      <Header title={t('createAccount:header')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 color={colors.primary} family="medium">
              {t('createAccount:address')}
            </Title1>
          </View>
          <View style={styles.viewInstruction}>
            <Title2 color={colors.primary}>
              {t('createAccount:requiredInfo')}
            </Title2>
          </View>

          <AddressForm
            isSubmitting={loading}
            onSubmit={(form) => handleCreateAccount(form)}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default Address;
