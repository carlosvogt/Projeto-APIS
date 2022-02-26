import React from 'react';
import { Container } from '@components';
import { Header } from '@components/layout';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { useNavigation } from '@react-navigation/native';
import PersonalInfoForm from './PersonalInfoForm';

function PersonalInfo() {
  const { t } = useTranslation();
  const navigation = useNavigation();

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

  const handlePersonalInfo = (form) => {
    navigation.navigate('CreateApiaryAddress', form);
  };

  return (
    <>
      <Header title={t('createApiary:header')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 family="medium">{t('createApiary:personalInfo')}</Title1>
          </View>
          <View style={styles.viewInstruction}>
            <Title2>{t('createApiary:mandatoryData')}</Title2>
          </View>

          <PersonalInfoForm onSubmit={(form) => handlePersonalInfo(form)} />
        </Container>
      </ScrollView>
    </>
  );
}
export default PersonalInfo;
