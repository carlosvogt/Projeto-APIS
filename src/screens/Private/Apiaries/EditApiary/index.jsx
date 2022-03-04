import React, { useState } from 'react';
import { Container } from '@components';
import { Header } from '@components/layout';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { useNavigation, useRoute } from '@react-navigation/native';
import EditApiaryForm from './EditApiaryForm';

function EditApiary() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const params = useRoute();
  const [loading, setLoading] = useState(false);

  const { ...data } = params.params;

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

  console.log('loading', loading);
  // Dado mocado
  const handleUpdateApiary = (form) => {
    setLoading(true);
    console.log('Atualizar os dados do apiário', form);
    navigation.goBack('ApiaryHome');
    setLoading(false);
  };

  return (
    <>
      <Header title={t('editApiary:header')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 family="medium">{t('editApiary:personalInfo')}</Title1>
          </View>
          <View style={styles.viewInstruction}>
            <Title2>{t('editApiary:mandatoryData')}</Title2>
          </View>

          <EditApiaryForm
            onSubmit={(form) => handleUpdateApiary(form)}
            defaultData={data}
            isSubmitting={loading}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default EditApiary;
