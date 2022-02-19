import React from 'react';
import { Container } from '@components';
import { Header } from '@components/layout';
import { StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import UpdatePersonalInfoForm from './UpdatePersonalInfoForm';

function UpdatePersonalInfo() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
  });

  const handleUpdatePersonalInfo = (form) => {
    console.log('data', form);
    navigation.navigate('Profile', form);
  };

  return (
    <>
      <Header title={t('updatePersonalInfo:header')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <UpdatePersonalInfoForm
            onSubmit={(form) => handleUpdatePersonalInfo(form)}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default UpdatePersonalInfo;
