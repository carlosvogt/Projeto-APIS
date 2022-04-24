/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, TitleHeader } from '@components/typography';
import {
  UserAvatar,
  ModalBottom,
  NavBackButton,
  ToggleButton,
  Modal,
  Camera,
  useToast,
} from '@components';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import { useTheme } from '@theme';
import { useNavigation } from '@react-navigation/native';
import {
  DarkMode,
  LightMode,
  Logout,
  Password,
  Person,
  Send,
  ShareIcon,
  Trash,
} from '@assets';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import { auth, db } from '@services/firebase';
import { deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, deleteDoc, collection, query, getDocs } from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';
import { userUid } from '@store/auth';
import { userName } from '@store/accountData';

function HomeScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [showModalDrawer, setShowModalDrawer] = useState(false);
  const darkMode = useSelector((state) => state.mode.darkMode);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [takePicture, setTakePicture] = useState(false);
  const types = ['selfie'];
  const [response, setResponse] = useState(null);
  const [reloadImage, setReloadImage] = useState(true);
  const [userImage, setUserImage] = useState(null);
  const [photo, setPhoto] = useState([]);
  const iconColor = darkMode ? colors.secondary : colors.primary;
  const [modalMode, setModalMode] = useState('question');
  const netInfo = useNetInfo();
  const uuid = useSelector(userUid);
  const username = useSelector(userName);
  const toast = useToast();

  const setSelectedMode = async (value) => {
    await AsyncStorage.setItem('darkMode', JSON.stringify(value));
    dispatch({
      type: 'SET_MODE',
      payload: value,
    });
  };

  const styles = StyleSheet.create({
    container: {
      paddingBottom: 16,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    scrollView: {
      flexGrow: 1,
      marginHorizontal: 16,
      marginVertical: 16,
      justifyContent: 'center',
    },
    header: {
      backgroundColor: colors.primary,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: 'center',
    },
    modalItem: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    picture: {
      paddingVertical: 16,
      alignItems: 'center',
    },
    headerView: { paddingRight: 16 },
    touchableOpacity: {
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    darkModeContainer: {
      paddingVertical: 16,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    line: { borderColor: colors.primary, borderWidth: 1 },
    option: { marginLeft: 16 },
    darkMode: {
      flexDirection: 'row',
    },
  });

  const handleTakePicture = () => {
    setShowModalDrawer(false);
    setTakePicture(true);
  };

  const handleChoosePicture = () => {
    setShowModalDrawer(false);
    ImagePicker.launchImageLibrary(
      {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
      },
      setResponse,
    );
  };

  const handleDelePicture = () => {
    setShowModalDrawer(false);
    AsyncStorage.removeItem(JSON.stringify(username)).then(() => {
      setReloadImage(!reloadImage);
    });
  };

  const data = [
    {
      option: t('translations:takePicture'),
      onClick: () => handleTakePicture(),
    },
    {
      option: t('translations:selectPicture'),
      onClick: () => handleChoosePicture(),
    },
    {
      option: t('translations:deletePicture'),
      onClick: () => handleDelePicture(),
    },
  ];

  const handleConfirmationModal = (value) => {
    setModalType(value);
    setShowConfirmationModal(true);
  };

  const dismissConfirmationModal = () => {
    setShowConfirmationModal(false);
    setIsSubmitting(false);
  };

  const handleSignOut = () => {
    AsyncStorage.removeItem('auth');
    dispatch({
      type: 'SIGN_OUT',
    });
    setShowConfirmationModal(false);
  };

  const deleteHomeNotes = async () => {
    try {
      const q = query(collection(db, `users/${uuid}/homeNotes`));
      const docsSnap = await getDocs(q);
      docsSnap.forEach((item) => {
        deleteDoc(doc(db, `users/${uuid}/homeNotes`, item.data().code));
      });
    } catch (error) {
      toast.error(error.code);
    }
  };

  const deleteAccountData = async () => {
    try {
      await deleteDoc(doc(db, `users/${uuid}/accountData`, uuid));
    } catch (error) {
      toast.error(error.code);
    }
  };

  const deleteNotes = async (item) => {
    try {
      const apiaryRef = doc(db, `users/${uuid}/apiaries`, item.code);
      const queryNotesSnapshot = query(collection(apiaryRef, 'notes'));
      const docsNotesSnap = await getDocs(queryNotesSnapshot);
      docsNotesSnap.forEach((note) => {
        deleteDoc(doc(apiaryRef, 'notes', note.data().code));
      });
    } catch (error) {
      toast.error(error.code);
    }
  };

  const deleteProductions = async (item) => {
    try {
      const apiaryRef = doc(db, `users/${uuid}/apiaries`, item.code);
      const queryNotesSnapshot = query(collection(apiaryRef, 'productions'));
      const docsNotesSnap = await getDocs(queryNotesSnapshot);
      docsNotesSnap.forEach((production) => {
        deleteDoc(doc(apiaryRef, 'productions', production.data().code));
      });
    } catch (error) {
      toast.error(error.code);
    }
  };

  const deleteApiary = async (item) => {
    try {
      await deleteDoc(doc(db, `users/${uuid}/apiaries`, item.code));
    } catch (error) {
      toast.error(error.code);
    }
  };

  const deleteApiaries = async () => {
    try {
      const querySnapshot = query(collection(db, `users/${uuid}/apiaries`));
      const docsSnap = await getDocs(querySnapshot);
      docsSnap.forEach((item) => {
        deleteNotes(item.data());
        deleteProductions(item.data());
        deleteApiary(item.data());
      });
    } catch (error) {
      toast.error(error.code);
    }
  };

  const deleteUuid = async () => {
    try {
      await deleteDoc(doc(db, 'users', uuid));
    } catch (error) {
      toast.error(error.code);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
      await deleteHomeNotes();
      await deleteAccountData();
      await deleteApiaries();
      await deleteUuid();
      toast.success(t('translations:successDeleteAccount'));
      handleSignOut();
    } catch (error) {
      toast.error(error.code);
    }
  };

  const handleModalConfirmation = async (form) => {
    if (modalType === 1) {
      handleSignOut();
    }

    if (modalType === 2) {
      setModalType(3);
      setModalMode('login');
      setShowConfirmationModal(true);
    }

    if (modalType === 3) {
      const hasInternet = netInfo.isConnected;
      if (hasInternet) {
        setIsSubmitting(true);
        try {
          await signInWithEmailAndPassword(
            auth,
            auth.currentUser.email,
            form.password,
          );
          await handleDeleteAccount();
        } catch (error) {
          if (error.code === 'auth/wrong-password') {
            toast.error(t('translations:invalidPassword'));
          } else {
            toast.error(error.code);
          }
        }
        setIsSubmitting(false);
        setModalMode('question');
        setShowConfirmationModal(false);
      } else {
        toast.error(t('translations:noInternet'));
      }
    }
  };

  const handleSuggestions = () => {
    navigation.navigate('Suggestions');
  };

  const handlePersonalInfo = () => {
    navigation.navigate('UpdatePersonalInfo');
  };

  const handlePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleShare = async () => {
    await Share.share({
      message: 'https://play.google.com/store/apps/details?id=com.apis',
    });
  };

  function handleOnBackTakePhoto() {
    setShowModalDrawer(false);
    setTakePicture(false);
  }

  const loadPhoto = async () => {
    if (response || photo) {
      const perfil = await AsyncStorage.getItem(JSON.stringify(username));
      setUserImage(perfil ? { uri: `${perfil}` } : null);
    }
  };

  useEffect(() => {
    loadPhoto();
  }, [reloadImage]);

  useEffect(() => {
    if (response?.assets?.length) {
      AsyncStorage.setItem(JSON.stringify(username), response?.assets[0].uri);
      setReloadImage(!reloadImage);
      setPhoto(null);
    } else if (photo[0]?.image?.uri) {
      AsyncStorage.setItem(JSON.stringify(username), photo[0]?.image?.uri);
      setReloadImage(!reloadImage);
      setResponse(null);
    }
    setShowModalDrawer(false);
  }, [response, photo, username]);

  return (
    <>
      {takePicture ? (
        <Camera
          photos={(image) => {
            setPhoto(image);
            handleOnBackTakePhoto();
          }}
          types={types}
          onBack={handleOnBackTakePhoto}
          hideOverlay
          header={t('translations:takeSelfie')}
        />
      ) : (
        <View style={styles.container} radius={false}>
          <Modal
            mode={modalMode}
            title={t('translations:warn')}
            description={
              modalType === 1
                ? t('translations:checkoutBody')
                : t('translations:deleteBody')
            }
            cancelText={t('translations:cancel')}
            positiveText={
              modalType === 1
                ? t('translations:getOut')
                : modalType === 2 && !isSubmitting
                ? t('translations:delete')
                : modalType === 2 && isSubmitting
                ? t('translations:deleting')
                : t('translations:validate')
            }
            cancelFunction={() => dismissConfirmationModal()}
            positiveAction={(value) => handleModalConfirmation(value)}
            showModal={showConfirmationModal}
            isSubmitting={isSubmitting}
          />

          <ModalBottom
            showModal={showModalDrawer}
            onPressOut={() => setShowModalDrawer(false)}
          >
            {data?.map((item) => {
              return (
                <TouchableOpacity
                  key={item.option}
                  style={styles.modalItem}
                  onPress={item.onClick}
                >
                  <Title1 family="medium" color={colors.primary}>
                    {item.option}
                  </Title1>
                </TouchableOpacity>
              );
            })}
          </ModalBottom>

          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <View style={styles.headerView}>
                <NavBackButton />
              </View>
              <TitleHeader>
                {t('translations:configurationsHeader')}
              </TitleHeader>
            </View>

            <View style={styles.picture}>
              <TouchableOpacity onPress={() => setShowModalDrawer(true)}>
                <UserAvatar image={userImage} name={username} size={60} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.line} />
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => handlePersonalInfo()}
            >
              <Person color={iconColor} size={30} />
              <View style={styles.option}>
                <Title1 family="medium">
                  {t('translations:personalInfo')}
                </Title1>
              </View>
            </TouchableOpacity>

            <View style={styles.line} />
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => handlePassword()}
            >
              <Password color={iconColor} size={30} />
              <View style={styles.option}>
                <Title1 family="medium">
                  {t('translations:changePassword')}
                </Title1>
              </View>
            </TouchableOpacity>

            <View style={styles.line} />
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => handleShare()}
            >
              <ShareIcon color={iconColor} size={30} />
              <View style={styles.option}>
                <Title1 family="medium">{t('translations:share')}</Title1>
              </View>
            </TouchableOpacity>

            <View style={styles.line} />
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => handleSuggestions()}
            >
              <Send color={iconColor} size={30} />
              <View style={styles.option}>
                <Title1 family="medium">{t('translations:suggestions')}</Title1>
              </View>
            </TouchableOpacity>

            <View style={styles.line} />
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                setModalMode('question');
                handleConfirmationModal(1);
              }}
            >
              <Logout color={iconColor} size={30} />
              <View style={styles.option}>
                <Title1 family="medium">{t('translations:checkout')}</Title1>
              </View>
            </TouchableOpacity>

            <View style={styles.line} />
            <View style={styles.darkModeContainer}>
              <View style={styles.darkMode}>
                {darkMode && <LightMode color={colors.secondary} size={30} />}
                {!darkMode && <DarkMode color={colors.primary} size={30} />}
                <View style={styles.option}>
                  <Title1 family="medium">
                    {darkMode
                      ? t('translations:lightMode')
                      : t('translations:darkMode')}
                  </Title1>
                </View>
              </View>
              <ToggleButton
                isEnabled={darkMode}
                setIsEnabled={(value) => setSelectedMode(value)}
              />
            </View>

            <View style={styles.line} />
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                setModalMode('question');
                handleConfirmationModal(2);
              }}
            >
              <Trash color={colors.error} size={30} />
              <View style={styles.option}>
                <Title1 color={colors.error} family="medium">
                  {t('translations:deleteAccount')}
                </Title1>
              </View>
            </TouchableOpacity>

            <View style={styles.line} />
          </ScrollView>
        </View>
      )}
    </>
  );
}
export default HomeScreen;
