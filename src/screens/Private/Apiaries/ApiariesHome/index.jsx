/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { ExpensiveNote, TextInput } from '@components';
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
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [editedText, setEditedText] = useState();

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
      width: '100%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
      backgroundColor: colors.primary,
    },
    add: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    view: {
      marginLeft: 4,
    },
  });

  // Dados mocados
  const apiaries = [
    {
      code: 1,
      type: 'apiary',
      name: 'Erni',
      latitude: '-29.544985',
      longitude: '-52.512835',
      city: 'Sinimbu',
      coordinates: 'Latitude:-29.544985 Longitude:-52.512835',
      zipCode: '96890000',
      state: 'RS',
      quantityFull: '50',
      totalPlaces: '55',
      owner: 'Carlos Vogt',
      phone: '(51) 9 9999-9999',
      ownerPercent: '5',
      total: '2000',
      totalPayed: '300',
      mortality: 'Sim',
      notes: [
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
      ],
      production: [
        {
          code: 1,
          name: 'Safra 2019',
          date: '15/01/2020',
          qtd: '500',
          payed: 'Sim',
          payedQtd: '150',
        },
        {
          code: 2,
          name: 'Safra 2020',
          date: '15/01/2020',
          qtd: '1500',
          payed: 'Sim',
          payedQtd: '150',
        },
      ],
    },
    {
      code: 2,
      type: 'death',
      name: 'Valdir',
      latitude: '-29.543594',
      longitude: '-52.502483',
      city: 'Sinimbu',
      coordinates: 'Latitude:-29.543594 Longitude:-52.502483',
      zipCode: '96890000',
      state: 'RS',
      quantityFull: '50',
      totalPlaces: '55',
      owner: 'Carlos Vogt',
      phone: '(51) 9 9999-9999',
      ownerPercent: '5',
      total: '1000',
      totalPayed: '50',
      mortality: 'Sim',
      notes: [
        {
          code: 1,
          name: 'Anotação 1',
          note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
        },
      ],
      production: [
        {
          code: 1,
          name: 'Safra 2019',
          date: '15/01/2020',
          qtd: '500',
          payed: '',
          payedQtd: '50',
        },
        {
          code: 2,
          name: 'Safra 2020',
          date: '15/01/2020',
          qtd: '500',
          payed: 'Sim',
          payedQtd: '',
        },
      ],
    },
    {
      code: 3,
      type: 'apiary',
      name: 'Nelson',
      latitude: '-29.544390',
      longitude: '-52.488364',
      city: 'Sinimbu',
      coordinates: 'Latitude:-29.544390 Longitude:-52.488364',
      zipCode: '96890000',
      state: 'RS',
      quantityFull: '50',
      totalPlaces: '55',
      owner: 'Carlos Vogt',
      phone: '(51) 9 9999-9999',
      ownerPercent: '5',
      total: '0',
      totalPayed: '0',
      mortality: 'Não',
      notes: [],
      production: [],
    },
    {
      code: 4,
      type: 'apiary',
      name: 'Klein',
      latitude: '-29.566150',
      longitude: '-52.575366',
      city: 'Sinimbu',
      coordinates: 'Latitude:-29.566150 Longitude:-52.575366',
      zipCode: '96890000',
      state: 'RS',
      quantityFull: '50',
      totalPlaces: '55',
      owner: 'Carlos Vogt',
      phone: '(51) 9 9999-9999',
      ownerPercent: '5',
      total: '0',
      totalPayed: '0',
      mortality: 'Não',
      notes: [],
      production: [],
    },
  ];

  useEffect(() => {
    const handleListTitle = apiaries.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    );
    setEditedText(handleListTitle);
  }, [searchText]);

  const handleToApiary = (index) => {
    navigation.navigate('ApiaryNavigation', {
      screen: 'ApiaryHome',
      params: { ...apiaries[index] },
    });
  };

  const handleApiaries = (apiary, index) => {
    return (
      <ExpensiveNote
        key={apiary.code}
        data={apiary}
        hasData
        mode="apiary"
        onPress={() => handleToApiary(index)}
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
        <View style={{ marginBottom: 8 }}>
          <TextInput
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
            name="search"
            placeholderTextColor={colors.primary}
            placeholder={t('apiaries:placeholder')}
          />
        </View>
        {searchText === '' ? (
          apiaries.length > 0 ? (
            apiaries.map((apiary, index) => handleApiaries(apiary, index))
          ) : (
            <ExpensiveNote hasData={false} mode="apiary" />
          )
        ) : editedText.length > 0 ? (
          editedText.map((apiary, index) => handleApiaries(apiary, index))
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
