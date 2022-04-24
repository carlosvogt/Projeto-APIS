import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1 } from '@components/typography';
import { Container } from '@components';
import { ScrollView, StyleSheet, View, Linking } from 'react-native';
import { Header } from '@components/layout';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@theme';
import SuggestionsForm from './SuggestionsForm';

function Suggestions() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { colors } = useTheme();

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

  const handleSuggestion = (values) => {
    setLoading(true);
    Linking.openURL(
      `mailto:carlosvogt@outlook.com?subject=${values.subject}&body=${values.message}`,
    );
    navigation.navigate('Profile');
    setLoading(false);
  };

  return (
    <>
      <Header title={t('translations:suggestionsHeader')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 color={colors.primary} family="medium">
              {t('translations:suggestionsInstruction')}
            </Title1>
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
