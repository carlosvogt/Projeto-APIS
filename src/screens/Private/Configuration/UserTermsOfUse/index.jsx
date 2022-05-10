import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, TermsOfUse } from '@components';
import { ScrollView, StyleSheet } from 'react-native';
import { Header } from '@components/layout';

function UserTermsOfUse() {
  const { t } = useTranslation();
  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
  });

  return (
    <>
      <Header title={t('termsOfUse:title')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <TermsOfUse />
        </Container>
      </ScrollView>
    </>
  );
}
export default UserTermsOfUse;
