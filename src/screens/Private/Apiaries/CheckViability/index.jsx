import React from 'react';
import { useTranslation } from 'react-i18next';
import { Title1 } from '@components/typography';
import { Container } from '@components';
import { ScrollView, StyleSheet } from 'react-native';
import { Header } from '@components/layout';

function CheckViability() {
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
  });

  return (
    <>
      <Header title={t('apiaries:name')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <Title1>Checar viabilidate</Title1>
          <Title1> {t('login:welcome')}</Title1>
        </Container>
      </ScrollView>
    </>
  );
}
export default CheckViability;
