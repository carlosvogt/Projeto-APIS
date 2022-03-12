import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { ExpensiveNote, UserAvatar, Modal } from '@components';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@theme';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Add } from '@assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // Dado mocado
  const username = 'Carlos Rodrigo Vogt';

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
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
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
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
      backgroundColor: colors.primary,
    },
    add: {
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  // Dados mocados
  const notes = [
    {
      code: 1,
      name: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
    {
      code: 2,
      name: 'Anotação 2',
      note: 'Aqui o texto será escrito de forma integral',
    },
    {
      code: 3,
      name: '',
      note: 'Aqui o texto será escrito de forma integral aaa',
    },
    {
      code: 4,
      name: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
    {
      code: 5,
      name: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
    {
      code: 6,
      name: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
    {
      code: 7,
      name: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
    {
      code: 8,
      name: 'Anotação 8',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
  ];

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

  // Dado mocado
  const handleCreateNote = (value) => {
    setIsSubmitting(true);
    console.log('Adicionar nota', value);
    setIsSubmitting(false);
    setShowModal(false);
  };

  // Dado mocado
  const handleEditNote = (value) => {
    setIsSubmitting(true);
    console.log('Editar nota', value, selectedCode);
    setIsSubmitting(false);
    setShowModal(false);
  };

  // Dado mocado
  const handleDeleteNote = () => {
    setIsSubmittingDelete(true);
    console.log('Deletar nota', selectedCode);
    setIsSubmittingDelete(false);
    setShowDeleteModal(false);
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
          <Title1 centered color={colors.primary}>
            {t('home:notes')}
          </Title1>
        </View>
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
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
