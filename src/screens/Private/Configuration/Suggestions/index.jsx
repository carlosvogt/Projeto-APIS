import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1 } from '@components/typography';
import { Container } from '@components';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '@components/layout';
import { useNavigation } from '@react-navigation/native';
import SuggestionsForm from './SuggestionsForm';

function Suggestions() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    viewTitle: {
      marginTop: 32,
      marginBottom: 24,
    },
  });

  // Dado mocado
  const handleSuggestion = (values) => {
    setLoading(true);
    console.log(values);
    navigation.navigate('Profile');
    setLoading(false);
  };

  return (
    <>
      <Header title={t('suggestions:header')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 family="medium">{t('suggestions:instruction')}</Title1>
          </View>

          <SuggestionsForm
            onSubmit={(values) => handleSuggestion(values)}
            isSubmitting={loading}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default Suggestions;
