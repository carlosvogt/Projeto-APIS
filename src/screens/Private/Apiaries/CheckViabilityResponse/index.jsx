import React from 'react';
import { Container, Button } from '@components';
import { Header, Footer } from '@components/layout';
import { StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { useTheme } from '@theme';
import { useNavigation } from '@react-navigation/native';

function CheckViabilityResponse() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    footer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
  });

  // Dados mocados
  // Adicionar retornos e regras de exibição
  return (
    <>
      <Header title={t('translations:viabilityHeader')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <Title1 family="medium" color={colors.success}>
            {t('translations:success')}
          </Title1>
          <Title1 family="medium" color={colors.error}>
            {t('translations:warn')}
          </Title1>
          <Title2 family="medium" color={colors.primary}>
            {t('translations:warnInstruction')}
          </Title2>
        </Container>
        <Footer style={styles.footer}>
          <Button
            onPress={() => navigation.navigate('PersonalInfo')}
            title={t('translations:register')}
          />
        </Footer>
      </ScrollView>
    </>
  );
}
export default CheckViabilityResponse;
