/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Container, Button } from '@components';
import { Header, Footer } from '@components/layout';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { useTheme } from '@theme';
import { useNavigation, useRoute } from '@react-navigation/native';

function CheckViabilityResponse() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { params } = useRoute();

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    footer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    card: {
      borderWidth: 1,
      borderRadius: 20,
      padding: 8,
      marginBottom: 16,
    },
    marginBottom: { marginBottom: 8 },
  });

  const handleAddApiary = () => {
    navigation.navigate('ApiaryNavigation', {
      screen: 'CreateApiaryPersonalInfo',
      params: params[0].estimativa,
    });
  };

  return (
    <>
      <Header title={t('translations:viabilityHeader')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.marginBottom}>
            <Title2 family="medium" centered color={colors.primary}>
              {t('translations:viabilityResponseDescription')}
            </Title2>
          </View>
          {params.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.card,
                  {
                    borderColor:
                      item.status === 'Sucesso' ? colors.success : colors.error,
                  },
                ]}
              >
                <View style={styles.marginBottom}>
                  <Title1
                    family="medium"
                    centered
                    color={
                      item.status === 'Sucesso' ? colors.success : colors.error
                    }
                  >
                    {item.name}
                  </Title1>
                </View>
                <Title2
                  centered
                  family="medium"
                  color={
                    item.status === 'Sucesso' ? colors.success : colors.error
                  }
                >
                  {item.description}
                </Title2>
              </View>
            );
          })}
          <View style={{ marginVertical: 32 }}>
            <Title2 family="medium" justify color={colors.primary}>
              {t('translations:viabilityWarning')}
            </Title2>
          </View>
          <Title2 family="medium" justify color={colors.primary}>
            {t('translations:warnInstruction')}
          </Title2>
        </Container>
        <Footer style={styles.footer}>
          <Button
            onPress={() => handleAddApiary()}
            title={t('translations:register')}
          />
        </Footer>
      </ScrollView>
    </>
  );
}
export default CheckViabilityResponse;
