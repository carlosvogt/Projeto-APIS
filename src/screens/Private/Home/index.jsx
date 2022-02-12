import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { ExpensiveNote, UserAvatar, Modal } from '@components';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@theme';
import { useNavigation } from '@react-navigation/native';
import { Add } from '@assets';

function HomeScreen() {
  const { t } = useTranslation();
  const [selectedCode, setSelectedCode] = useState(0);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const userImage = null;
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);

  // Dado mocado
  const username = 'Carlos Rodrigo Vogt';

  const styles = StyleSheet.create({
    container: {
      paddingBottom: 16,
    },
    scrollView: {
      flexGrow: 1,
      marginHorizontal: 16,
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
      nome: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
    {
      code: 2,
      nome: 'Anotação 2',
      note: 'Aqui o texto será escrito de forma integral',
    },
    {
      code: 3,
      nome: '',
      note: 'Aqui o texto será escrito de forma integral aaa',
    },
    {
      code: 4,
      nome: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
    {
      code: 5,
      nome: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
    {
      code: 6,
      nome: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
    {
      code: 7,
      nome: 'Anotação 1',
      note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
    },
  ];

  const handleEditModal = () => {
    setModalTitle(t('home:editNote'));
    setShowModal(true);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const modalNoteOptions = [
    { option: t('home:edit'), onClick: handleEditModal },
    { option: t('home:delete'), onClick: handleDeleteModal },
  ];

  const handleGoProfile = () => {
    navigation.navigate('ProfileNavigator', {
      screen: 'Profile',
    });
  };

  const handleShowModal = () => {
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
  const handleNote = (value) => {
    setIsSubmitting(true);
    console.log('fazer o que precisa', value);
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

  return (
    <View style={styles.container}>
      <Modal
        title={modalTitle}
        mode="note"
        cancelFunction={() => dismissModal()}
        positiveAction={(value) => handleNote(value)}
        showModal={showModal}
        isSubmitting={isSubmitting}
      />

      <Modal
        title={t('home:deleteNote')}
        description={t('home:deleteNoteQuestion')}
        cancelText={t('home:cancel')}
        positiveText={t('home:delete')}
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
          <UserAvatar
            image={userImage}
            onPress={handleGoProfile}
            name={username}
            size={50}
          />
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
            onPress={() => handleShowModal()}
          >
            <Add size={40} color={colors.secondary} />
          </TouchableOpacity>
          <Title1 centered color={colors.primary}>
            {t('home:notes')}
          </Title1>
        </View>
        {notes.length > 0 ? (
          notes.map((note) => {
            return (
              <ExpensiveNote
                mode="note"
                key={note.code}
                name={note.nome}
                notes={note.note}
                hasData
                modalOptions={modalNoteOptions}
                selectedCode={note.code}
                setSelectedCode={() => setSelectedCode(note.code)}
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
