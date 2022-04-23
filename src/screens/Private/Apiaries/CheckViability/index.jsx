import React, { useState } from 'react';
import { Container } from '@components';
import { Header } from '@components/layout';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@theme';
import CheckViabilityForm from './CheckViabilityForm';

function CheckViability() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { colors } = useTheme();

  const styles = StyleSheet.create({
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
  const handleViability = (form) => {
    setIsSubmitting(true);
    navigation.navigate('CheckViabilityResponse', form);
    setIsSubmitting(false);
  };

  return (
    <>
      <Header title={t('checkViability:header')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 color={colors.primary} family="medium">
              {t('checkViability:checkViability')}
            </Title1>
          </View>
          <View style={styles.viewInstruction}>
            <Title2 color={colors.primary}>
              {t('checkViability:checkInstruction')}
            </Title2>
          </View>

          <CheckViabilityForm
            isSubmitting={isSubmitting}
            onSubmit={(form) => handleViability(form)}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default CheckViability;
