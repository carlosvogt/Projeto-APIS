import React from 'react';
import { useTranslation } from 'react-i18next';
import { Title1 } from '@components/typography';
import { Container } from '@components';
import { ScrollView, StyleSheet } from 'react-native';

function Suggestions() {
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
  });

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <Container>
        <Title1>Suggestions</Title1>
        <Title1> {t('login:welcome')}</Title1>
      </Container>
    </ScrollView>
  );
}
export default Suggestions;
