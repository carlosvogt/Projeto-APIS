import React, { useState } from 'react';
import { Container, Modal, useToast } from '@components';
import { Header } from '@components/layout';
import { StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '@services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateEmail,
} from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { userUid } from '@store/auth';
import { accountInfo } from '@store/accountData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import UpdatePersonalInfoForm from './UpdatePersonalInfoForm';

function UpdatePersonalInfo() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const toast = useToast();
  const uuid = useSelector(userUid);
  const userInformation = useSelector(accountInfo);
  const dispatch = useDispatch();
  const [newData, setNewData] = useState();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const netInfo = useNetInfo();
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
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

  const handleSignOut = () => {
    AsyncStorage.removeItem('auth');
    dispatch({
      type: 'SIGN_OUT',
    });
  };

  const updateAccountData = async (form) => {
    const dateTime = getDateTime();
    const oldEmail = userInformation.email;
    const data = form;
    data.type = 'home';

    try {
      await updateDoc(doc(db, `users/${uuid}/accountData`, uuid), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        zipCode: form.zipCode || '',
        coordinates: form.coordinates || '',
        latitude: form.latitude || '',
        longitude: form.longitude || '',
        city: form.city,
        state: form.state,
        lastModify: dateTime,
      });
      AsyncStorage.setItem('account', JSON.stringify(form));
      dispatch({
        type: 'SET_ACCOUNT_DATA',
        payload: data,
      });
      if (form.email === oldEmail) {
        toast.success(t('translations:dataUpdatedSuccess'));
        navigation.goBack();
      }
    } catch (error) {
      toast.error(error.code);
    }
  };

  const updateAccountEmail = async () => {
    try {
      await updateEmail(auth.currentUser, newData.email);
      await sendEmailVerification(auth.currentUser);
      toast.success(t('translations:emailVerification'));
      handleSignOut();
    } catch (error) {
      toast.error(error.code);
    }
  };

  const handleUpdateUser = async (form) => {
    setShowConfirmationModal(false);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        auth.currentUser.email,
        form.password,
      );
      await updateAccountData(newData);
      await updateAccountEmail();
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        toast.error(t('translations:invalidPassword'));
      } else {
        toast.error(error.code);
      }
    }
    setLoading(false);
  };

  const handleUpdatePersonalInfo = async (form) => {
    setNewData(form);
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      setLoading(true);
      if (form.email === userInformation.email) {
        await updateAccountData(form);
      } else {
        setShowConfirmationModal(true);
      }
      setLoading(false);
    } else {
      toast.error(t('translations:noInternet'));
    }
  };

  return (
    <>
      <Modal
        mode="login"
        title={t('translations:confirmUser')}
        cancelText={t('translations:cancel')}
        positiveText={
          loading ? t('translations:validating') : t('translations:validate')
        }
        cancelFunction={() => setShowConfirmationModal(false)}
        positiveAction={(value) => handleUpdateUser(value)}
        showModal={showConfirmationModal}
        isSubmitting={loading}
      />
      <Header title={t('translations:personalInformationHeader')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <UpdatePersonalInfoForm
            onSubmit={(form) => handleUpdatePersonalInfo(form)}
            isSubmitting={loading}
          />
        </Container>
      </ScrollView>
    </>
  );
}
export default UpdatePersonalInfo;
