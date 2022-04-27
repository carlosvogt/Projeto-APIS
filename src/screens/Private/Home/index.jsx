import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { ExpensiveNote, UserAvatar, Modal, useToast } from '@components';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
  LogBox,
} from 'react-native';
import { useTheme } from '@theme';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Add } from '@assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { userUid } from '@store/auth';
import { userName } from '@store/accountData';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';

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
  const [refreshing, setRefreshing] = useState(false);
  const [isPullRefreshing, setIsPullRefreshing] = useState(false);
  LogBox.ignoreLogs([
    'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
    'Require cycle:',
  ]);

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

  const getData = () => {
    setRefreshing(true);
    try {
      firestore()
        .collection(`users/${userUuid}/homeNotes`)
        .orderBy('lastModify', 'desc')
        .onSnapshot({ includeMetadataChanges: true }, (docs) => {
          setNotes([]);
          docs.forEach((doc) => {
            setNotes((oldArray) => [...oldArray, doc.data()]);
          });
        });
    } catch (error) {
      toast.error(error.code);
    }
    setRefreshing(false);
    setIsPullRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

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
    setModalTitle(t('translations:editNote'));
    setDefaultData(notes[selectedNoteIndex]);
    setShowModal(true);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const modalNoteOptions = [
    {
      option: t('translations:editNote'),
      delete: false,
      onClick: handleEditModal,
    },
    {
      option: t('translations:deleteNote'),
      delete: true,
      onClick: handleDeleteModal,
    },
  ];

  const handleGoProfile = () => {
    navigation.navigate('ProfileNavigator', {
      screen: 'Profile',
    });
  };

  const handleAddNote = () => {
    setModalType(1);
    setDefaultData(null);
    setModalTitle(t('translations:addNotes'));
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

  const handleCreateNote = (value) => {
    setIsSubmitting(true);
    const dateTime = getDateTime();
    const createdAt = Date();
    const noteId = `${uuid.v4()}-${value.title}`;
    try {
      firestore()
        .collection(`users/${userUuid}/homeNotes`)
        .doc(noteId)
        .set({
          code: noteId,
          title: value.title || '',
          description: value.description,
          lastModify: dateTime,
          createdAt: createdAt.toString(),
        });
      setShowModal(false);
      toast.success(t('translations:noteSuccessCreated'));
    } catch (error) {
      toast.error(error.code);
    }
    setIsSubmitting(false);
  };

  const handleEditNote = (value) => {
    setIsSubmitting(true);
    const dateTime = getDateTime();
    try {
      firestore()
        .collection(`users/${userUuid}/homeNotes`)
        .doc(selectedCode)
        .update({
          title: value.title || '',
          description: value.description,
          lastModify: dateTime,
        });
      setShowModal(false);
      toast.success(t('translations:noteUpdated'));
    } catch (error) {
      toast.error(t('translations:noInternet'));
    }
    setIsSubmitting(false);
  };

  const handleDeleteNote = () => {
    setIsSubmittingDelete(true);
    try {
      firestore()
        .collection(`users/${userUuid}/homeNotes`)
        .doc(selectedCode)
        .delete();
      setShowDeleteModal(false);
      toast.success(t('translations:noteDeleted'));
    } catch (error) {
      toast.error(error.code);
    }
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
        title={t('translations:warn')}
        description={t('translations:deleteNoteQuestion')}
        cancelText={t('translations:cancel')}
        positiveText={
          isSubmittingDelete
            ? t('translations:deleting')
            : t('translations:delete')
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
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            progressBackgroundColor={colors.secondary}
            refreshing={isPullRefreshing}
            onRefresh={() => {
              setIsPullRefreshing(true);
              getData();
            }}
          />
        }
      >
        <View style={styles.add}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddNote()}
          >
            <Add size={40} color={colors.secondary} />
          </TouchableOpacity>
          <Title1 centered color={colors.primary} family="medium">
            {t('translations:addNotes')}
          </Title1>
        </View>

        {refreshing ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
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
        )}
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
