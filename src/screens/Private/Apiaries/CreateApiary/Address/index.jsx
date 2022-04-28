import React, { useState } from 'react';
import { Container, useToast } from '@components';
import { Header } from '@components/layout';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@theme';
import firestore from '@react-native-firebase/firestore';
import { userUid } from '@store/auth';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';
import AddressForm from './AddressForm';

function Address() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { params } = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const userUuid = useSelector(userUid);
  const toast = useToast();

  const styles = StyleSheet.create({
    modalItem: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
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

  const getDateTime = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const newDay = day < 10 ? `0${day}` : day;
    const newMonth = month < 10 ? `0${month}` : month;
    const newHour = hours < 10 ? `0${hours}` : hours;
    const newMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${newDay}/${newMonth}/${year} - ${newHour}:${newMinutes}`;
  };

  const handleCreateApiary = (value) => {
    setIsSubmitting(true);
    const dateTime = getDateTime();
    const apiariId = `${uuid.v4()}-${params.name}`;
    const createdAt = Date();
    try {
      firestore()
        .collection(`users/${userUuid}/apiaries`)
        .doc(apiariId)
        .set({
          code: apiariId,
          name: params.name,
          owner: params.owner,
          phone: params.phone || '',
          totalPlaces: params.totalPlaces,
          quantityFull: params.quantityFull,
          ownerPercent: params.ownerPercent || '',
          zipCode: value.zipCode || '',
          coordinates: value.coordinates || '',
          latitude: value.latitude || '',
          longitude: value.longitude || '',
          city: value.city,
          state: value.state,
          createdAt: createdAt.toString(),
          type: 'apiary',
          mortality: 'false',
          mortalityId: '',
          quantityEmpty: (
            parseInt(params.totalPlaces, 10) - parseInt(params.quantityFull, 10)
          ).toString(),
          lastModify: dateTime,
        });
      navigation.navigate('PrivateNavigator', {
        screen: 'ApiariesHome',
        params: { reload: true },
      });
    } catch (error) {
      toast.error(error.code);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Header title={t('translations:createApiaryHeader')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 color={colors.primary} family="medium">
              {t('translations:address')}
            </Title1>
          </View>
          <View style={styles.viewInstruction}>
            <Title2 color={colors.primary}>
              {t('translations:requiredInfo')}
            </Title2>
          </View>

          <AddressForm
            isSubmitting={isSubmitting}
            onSubmit={(form) => handleCreateApiary(form)}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default Address;
