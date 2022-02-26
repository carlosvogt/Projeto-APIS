/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { ExpensiveNote, TextInput, Modal } from '@components';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import { useTheme } from '@theme';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Add, CheckOutline } from '@assets';
import { Header } from '@components/layout';

function ApiariesHome() {
  const { t } = useTranslation();
  const [selectedCode, setSelectedCode] = useState(0);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [editedText, setEditedText] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const styles = StyleSheet.create({
    container: {
      paddingBottom: 55,
    },
    scrollView: {
      flexGrow: 1,
      marginHorizontal: 16,
      marginVertical: 8,
      justifyContent: 'center',
    },
    button: {
      flexDirection: 'row',
      height: 50,
      width: 'auto',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
      paddingHorizontal: 8,
      backgroundColor: colors.primary,
    },
    add: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
      width: ' 100%',
      justifyContent: 'center',
    },
    view: {
      marginLeft: 4,
    },
  });

  // Dados mocados
  const apiaries = [
    {
      code: 1,
      nome: 'Apiário número 1',
      qtdOcupada: 50,
      qtdLivre: 10,
      notes: [
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
      ],
    },
    {
      code: 2,
      nome: 'Apiário número 2',
      qtdOcupada: 50,
      qtdLivre: 10,
      notes: [
        {
          code: 1,
          nome: 'Anotação 1',
          note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
        },
      ],
    },
    {
      code: 3,
      nome: 'Apiário número 3',
      qtdOcupada: 50,
      qtdLivre: 10,
      notes: [],
    },
  ];

  useEffect(() => {
    const handleListTitle = apiaries.filter((item) =>
      item.nome.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    );
    setEditedText(handleListTitle);
  }, [searchText]);

  const handleNewNote = () => {
    setShowModal(true);
  };

  const handleToApiary = () => {
    console.log('Ir para apiários', selectedCode);
    navigation.navigate('ApiaryNavigation', {
      screen: 'ApiaryHome',
    });
  };

  const modalOptions = [
    { option: t('apiaries:addNote'), onClick: handleNewNote },
    { option: t('apiaries:seeApiary'), onClick: handleToApiary },
  ];

  const handleNotes = (note) => {
    return (
      <ExpensiveNote
        key={note.code}
        name={note.nome}
        qtdEmpty={note.qtdLivre}
        qtdOccupy={note.qtdOcupada}
        notes={note.notes}
        hasData
        modalOptions={modalOptions}
        mode="apiary"
        selectedCode={note.code}
        setSelectedCode={() => setSelectedCode(note.code)}
      />
    );
  };

  const handleAddApiary = () => {
    navigation.navigate('ApiaryNavigation', {
      screen: 'CreateApiaryPersonalInfo',
    });
  };

  const handleCheckViability = () => {
    navigation.navigate('ApiaryNavigation', {
      screen: 'CheckViability',
    });
  };

  const dismissModal = () => {
    setShowModal(false);
    setIsSubmitting(false);
  };

  // Dado mocado
  const handleNote = (value) => {
    setIsSubmitting(true);
    console.log('fazer o que precisa', value);
    setIsSubmitting(false);
    setShowModal(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('HomeScreen');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const handleHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Modal
        mode="note"
        cancelFunction={() => dismissModal()}
        positiveAction={(value) => handleNote(value)}
        showModal={showModal}
        isSubmitting={isSubmitting}
      />
      <Header title={t('apiaries:name')} onGoBack={handleHome} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.add}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddApiary()}
          >
            <Add size={40} color={colors.secondary} />
            <Title1 centered color={colors.secondary}>
              {t('apiaries:add')}
            </Title1>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCheckViability()}
          >
            <CheckOutline size={30} color={colors.secondary} />
            <View style={styles.view}>
              <Title1 centered color={colors.secondary}>
                {t('apiaries:viability')}
              </Title1>
            </View>
          </TouchableOpacity>
        </View>
        <TextInput
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          name="search"
          placeholderTextColor={colors.primary}
          placeholder={t('apiaries:placeholder')}
        />
        {searchText === '' ? (
          apiaries.length > 0 ? (
            apiaries.map((note) => handleNotes(note))
          ) : (
            <ExpensiveNote hasData={false} mode="apiary" />
          )
        ) : editedText.length > 0 ? (
          editedText.map((note) => handleNotes(note))
        ) : (
          <Title2 centered color={colors.primary}>
            {t('apiaries:nothingFound')}
          </Title2>
        )}
      </ScrollView>
    </View>
  );
}
export default ApiariesHome;
