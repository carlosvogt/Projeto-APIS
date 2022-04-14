import React, { useState } from 'react';
import { Container, useToast } from '@components';
import { Header } from '@components/layout';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@theme';
import { auth, db } from '@services/firebase';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';
import AddressForm from './AddressForm';

function Address() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { params } = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const toast = useToast();
  const netInfo = useNetInfo();

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

  const handleDeleteUserAccess = async () => {
    await deleteUser(auth.currentUser);
  };

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

  const handleCreateAccountData = async (form, userCredencial) => {
    const dateTime = getDateTime();
    await setDoc(
      doc(
        db,
        `users/${userCredencial.user.uid}/accountData`,
        userCredencial.user.uid,
      ),
      {
        name: params.name,
        email: params.email,
        phone: params.phone,
        zipCode: form.zipCode,
        coordinates: form.coordinates,
        latitude: form.latitude,
        longitude: form.longitude,
        city: form.city,
        state: form.state,
        lastModify: dateTime,
      },
    )
      .then(() => {
        toast.success(t('createAccount:success'));
        navigation.navigate('SignIn');
        sendEmailVerification(auth.currentUser);
      })
      .catch((error) => {
        handleDeleteUserAccess();
        toast.error(error.code);
      });
  };

  const handleCreateUser = async (form) => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, params.email, params.password)
        .then((userCredencial) => {
          handleCreateAccountData(form, userCredencial);
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
            toast.error(t('createAccount:emailInUse'));
          } else {
            toast.error(error.code);
          }
        });
      setLoading(false);
    } else {
      toast.error(t('createAccount:noInternetLogin'));
    }
  };

  return (
    <>
      <Header title={t('createAccount:header')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.viewTitle}>
            <Title1 color={colors.primary} family="medium">
              {t('createAccount:address')}
            </Title1>
          </View>
          <View style={styles.viewInstruction}>
            <Title2 color={colors.primary}>
              {t('createAccount:requiredInfo')}
            </Title2>
          </View>

          <AddressForm
            isSubmitting={loading}
            onSubmit={(form) => handleCreateUser(form)}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default Address;
