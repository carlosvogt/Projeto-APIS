import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { ExpensiveNote, UserAvatar, Modal, useToast } from '@components';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@theme';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Add } from '@assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  query,
  getDocs,
  collection,
  setDoc,
  doc,
  deleteDoc,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@services/firebase';
import { userUid } from '@store/auth';
import { userName } from '@store/accountData';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';
import { useNetInfo } from '@react-native-community/netinfo';

function HomeScreen() {
  const { t } = useTranslation();
  const [selectedCode, setSelectedCode] = useState(0);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);
  const isFocused = useIsFocused();
  const [userImage, setUserImage] = useState();
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);
  const [defaultData, setDefaultData] = useState(null);
  const userUuid = useSelector(userUid);
  const username = useSelector(userName);
  const toast = useToast();
  const [notes, setNotes] = useState([]);
  const netInfo = useNetInfo();

  const styles = StyleSheet.create({
    container: {
      paddingBottom: 16,
    },
    scrollView: {
      flexGrow: 1,
      marginHorizontal: 16,
      paddingBottom: 120,
      marginVertical: 8,
      justifyContent: 'center',
    },
    header: {
      backgroundColor: colors.primary,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
    },
    profile: {
      marginBottom: 16,
    },
    button: {
      width: 40,
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
      backgroundColor: colors.primary,
    },
    add: {
      marginBottom: 8,
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    noteContainer: {
      marginTop: 8,
    },
  });

  const getData = async () => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      const q = query(
        collection(db, `users/${userUuid}/homeNotes`),
        orderBy('lastModify', 'desc'),
      );
      const docsSnap = await getDocs(q);
      setNotes([]);
      docsSnap.forEach((item) => {
        setNotes((oldArray) => [...oldArray, item.data()]);
      });
    } else {
      toast.error(t('home:noInternet'));
    }
  };

  useEffect(() => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet !== null) {
      getData();
    }
  }, [netInfo]);

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

  const handleEditModal = () => {
    setModalType(2);
    setModalTitle(t('home:editNote'));
    setDefaultData(notes[selectedNoteIndex]);
    setShowModal(true);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const modalNoteOptions = [
    { option: t('home:editNote'), delete: false, onClick: handleEditModal },
    { option: t('home:deleteNote'), delete: true, onClick: handleDeleteModal },
  ];

  const handleGoProfile = () => {
    navigation.navigate('ProfileNavigator', {
      screen: 'Profile',
    });
  };

  const handleAddNote = () => {
    setModalType(1);
    setDefaultData(null);
    setModalTitle(t('home:addNote'));
    setShowModal(true);
  };

  const dismissModal = () => {
    setShowModal(false);
    setIsSubmitting(false);
  };

  const dismissDeleteModal = () => {
    setShowDeleteModal(false);
    setIsSubmittingDelete(false);
  };

  const handleCreateNote = async (value) => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      setIsSubmitting(true);
      const dateTime = getDateTime();
      const noteId = `${uuid.v4()}-${value.title}`;
      await setDoc(doc(db, `users/${userUuid}/homeNotes`, noteId), {
        code: noteId,
        name: value.title,
        note: value.description,
        lastModify: dateTime,
      })
        .then(() => {
          toast.success(t('home:noteSuccessCreated'));
          setShowModal(false);
          getData();
        })
        .catch((error) => {
          toast.error(error.code);
        });
      setIsSubmitting(false);
    } else {
      toast.error(t('home:noInternet'));
    }
  };

  const handleEditNote = async (value) => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      setIsSubmitting(true);
      const dateTime = getDateTime();
      await updateDoc(doc(db, `users/${userUuid}/homeNotes`, selectedCode), {
        code: selectedCode,
        name: value.title,
        note: value.description,
        lastModify: dateTime,
      })
        .then(() => {
          toast.success(t('home:noteUpdated'));
          setShowModal(false);
          getData();
        })
        .catch((error) => {
          toast.error(error.code);
        });
      setIsSubmitting(false);
    } else {
      toast.error(t('home:noInternet'));
    }
  };

  const handleDeleteNote = async () => {
    setIsSubmittingDelete(true);

    await deleteDoc(doc(db, `users/${userUuid}/homeNotes`, selectedCode))
      .then(() => {
        toast.success(t('home:noteDeleted'));
        setShowDeleteModal(false);
        getData();
      })
      .catch((error) => {
        toast.error(error.code);
      });

    setIsSubmittingDelete(false);
  };

  const loadPhoto = async () => {
    if (username) {
      const perfil = await AsyncStorage.getItem(JSON.stringify(username));
      setUserImage(perfil ? { uri: `${perfil}` } : null);
    }
  };

  useEffect(() => {
    loadPhoto();
  }, [isFocused, username]);

  return (
    <View style={styles.container}>
      <Modal
        title={modalTitle}
        mode="note"
        cancelFunction={() => dismissModal()}
        defaultData={defaultData}
        positiveAction={(value) =>
          modalType === 1 ? handleCreateNote(value) : handleEditNote(value)
        }
        showModal={showModal}
        isSubmitting={isSubmitting}
      />

      <Modal
        title={t('home:deleteNote')}
        description={t('home:deleteNoteQuestion')}
        cancelText={t('home:cancel')}
        positiveText={
          isSubmittingDelete ? t('home:deleting') : t('home:delete')
        }
        cancelFunction={() => dismissDeleteModal()}
        positiveAction={() => handleDeleteNote()}
        showModal={showDeleteModal}
        isSubmitting={isSubmittingDelete}
      />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => handleGoProfile()}
          style={styles.profile}
        >
          <UserAvatar image={userImage} name={username} size={60} />
        </TouchableOpacity>
        <View>
          <Title2 centered color={colors.secondary}>
            {username}
          </Title2>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.add}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddNote()}
          >
            <Add size={40} color={colors.secondary} />
          </TouchableOpacity>
          <Title1 centered color={colors.primary} family="medium">
            {t('home:notes')}
          </Title1>
        </View>
        <View style={styles.noteContainer}>
          {notes.length > 0 ? (
            notes.map((note, index) => {
              return (
                <ExpensiveNote
                  mode="note"
                  key={note.code}
                  data={note}
                  hasData
                  modalOptions={modalNoteOptions}
                  selectedCode={note.code}
                  setSelectedCode={() => {
                    setSelectedCode(note.code);
                    setSelectedNoteIndex(index);
                  }}
                />
              );
            })
          ) : (
            <ExpensiveNote hasData={false} mode="note" />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
