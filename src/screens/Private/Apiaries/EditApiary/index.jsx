/* eslint-disable no-nested-ternary */
/* eslint-disable sonarjs/cognitive-complexity */
import React, { useState } from 'react';
import { Container, useToast } from '@components';
import { Header } from '@components/layout';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@theme';
import { userUid } from '@store/auth';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import EditApiaryForm from './EditApiaryForm';

function EditApiary() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const params = useRoute();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { colors } = useTheme();
  const toast = useToast();
  const { ...data } = params.params;
  const userUuid = useSelector(userUid);

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

  const handleUpdateApiary = async (value) => {
    setIsSubmitting(true);
    const dateTime = getDateTime();
    const mortalityId =
      data.mortality === 'false' && value.mortality === 'true'
        ? uuid.v4()
        : data.mortality === 'true' && value.mortality === 'true'
        ? data.mortalityId
        : '';

    const newData = {
      name: value.name,
      owner: value.owner,
      phone: value.phone || '',
      totalPlaces: value.totalPlaces,
      quantityFull: value.quantityFull,
      ownerPercent: value.ownerPercent || '',
      zipCode: value.zipCode || '',
      coordinates: value.coordinates || '',
      latitude: value.latitude || '',
      longitude: value.longitude || '',
      city: value.city,
      state: value.state,
      mortality: value.mortality || 'false',
      quantityEmpty: (
        parseInt(value.totalPlaces, 10) - parseInt(value.quantityFull, 10)
      ).toString(),
      lastModify: dateTime,
      mortalityId,
      type: value.mortality === 'true' ? 'mortality' : 'apiary',
    };

    if (data.mortality === 'false' && value.mortality === 'true') {
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const newDay = day < 10 ? `0${day}` : day;
      const newMonth = month < 10 ? `0${month}` : month;
      const createdAt = `${newDay}/${newMonth}/${year}`;
      try {
        firestore()
          .collection(`mortalityData`)
          .doc(mortalityId)
          .set({
            latitude: value.latitude || '',
            longitude: value.longitude || '',
            code: mortalityId,
            createdAt,
          });
      } catch (error) {
        toast.error(error.code);
      }
    }

    if (
      (data.mortality === 'false' && value.mortality === 'true') ||
      ((data.latitude !== value.latitude ||
        data.longitude !== value.longitude) &&
        data.mortalityId)
    ) {
      try {
        firestore()
          .collection(`mortalityData`)
          .doc(mortalityId)
          .update({
            latitude: value.latitude || '',
            longitude: value.longitude || '',
          });
      } catch (error) {
        toast.error(error.code);
      }
    }

    if (data.mortality === 'true' && value.mortality === 'false') {
      try {
        firestore().collection(`mortalityData`).doc(data.mortalityId).delete();
      } catch (error) {
        toast.error(error.code);
      }
    }

    try {
      firestore()
        .collection(`users/${userUuid}/apiaries`)
        .doc(data.code)
        .update(newData);
      newData.code = data.code;
      newData.reload = true;
      newData.originMap = data.originMap;
      toast.success(t('translations:apiaryUpdatedSuccess'));
      navigation.navigate('ApiaryHome', newData);
    } catch (error) {
      toast.error(error.code);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Header title={t('translations:editApiaryHeader')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 color={colors.primary} family="medium">
              {t('translations:informationData')}
            </Title1>
          </View>
          <View style={styles.viewInstruction}>
            <Title2 color={colors.primary}>
              {t('translations:requiredInfo')}
            </Title2>
          </View>

          <EditApiaryForm
            onSubmit={(form) => handleUpdateApiary(form)}
            defaultData={data}
            isSubmitting={isSubmitting}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default EditApiary;
