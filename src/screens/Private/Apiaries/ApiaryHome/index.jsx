/* eslint-disable no-empty */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { Modal, ExpensiveNote, useToast } from '@components';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import { Header } from '@components/layout';
import { Add } from '@assets';
import { useTheme } from '@theme';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MapView, { Circle, Marker } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import { userUid } from '@store/auth';
import uuid from 'react-native-uuid';
import { useNetInfo } from '@react-native-community/netinfo';

function ApiaryHome() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [modalTitle, setModalTitle] = useState('');
  const [modalMode, setModalMode] = useState();
  const [description, setDescription] = useState('');
  const [cancelButton, setCancelButton] = useState('');
  const [confirmButton, setConfirmButton] = useState('');
  const [modalOption, setModalOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [defaultData, setDefaultData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedNoteCode, setSelectedNoteCode] = useState(0);
  const [selectedProductionCode, setSelectedProductionCode] = useState(0);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);
  const [selectedProductionIndex, setSelectedProductionIndex] = useState(0);
  const params = useRoute();
  const { ...data } = params.params;
  const navigation = useNavigation();
  const darkMode = useSelector((state) => state.mode.darkMode);
  const userUuid = useSelector(userUid);
  const [permission, setPermission] = useState(false);
  const [notes, setNotes] = useState([]);
  const [productions, setProductions] = useState([]);
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [isPullRefreshing, setIsPullRefreshing] = useState(false);
  const [qtdTotalPayed, setQtdTotalPayed] = useState(0);
  const [qtdTotal, setQtdTotal] = useState(0);
  const [mortalityExists, setMortalityExists] = useState(false);
  const netInfo = useNetInfo();

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    scrollView: {
      marginHorizontal: 16,
      justifyContent: 'center',
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
      flexDirection: 'row',
      alignItems: 'center',
    },
    listContainer: {
      borderRadius: 10,
      borderWidth: darkMode ? 0 : 1,
      paddingBottom: 16,
      borderColor: colors.primary,
      marginBottom: 16,
      marginTop: 8,
      backgroundColor: colors.secondary,
    },
    listProductionContainer: {
      borderRadius: 10,
      borderWidth: darkMode ? 0 : 1,
      paddingVertical: 16,
      borderColor: colors.primary,
      marginBottom: 16,
      marginTop: 8,
      backgroundColor: colors.secondary,
    },
    noData: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.primary,
    },
    infoContainer: {
      borderRadius: 10,
      borderWidth: darkMode ? 0 : 1,
      paddingVertical: 16,
      borderColor: colors.primary,
      marginVertical: 16,
      backgroundColor: colors.secondary,
    },
    quantity: {
      marginHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      borderColor: colors.primary,
      borderBottomWidth: 1,
      paddingBottom: 8,
      marginTop: -8,
      alignItems: 'center',
      textAlign: 'center',
      alignContent: 'center',
    },
    map: { flex: 1 },
    view: {
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    containerMap: {
      flex: 1,
      width: Dimensions.get('window').width - 32,
      height: 250,
      marginBottom: 16,
      borderWidth: darkMode ? 0 : 1,
      borderColor: colors.primary,
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

  const getNotesData = () => {
    try {
      firestore()
        .collection(`users/${userUuid}/apiaries`)
        .doc(data.code)
        .collection('notes')
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
  };

  const getProductionsData = () => {
    try {
      firestore()
        .collection(`users/${userUuid}/apiaries`)
        .doc(data.code)
        .collection('productions')
        .orderBy('lastModify', 'desc')
        .onSnapshot({ includeMetadataChanges: true }, (docs) => {
          setQtdTotal(0);
          setQtdTotalPayed(0);
          setProductions([]);
          docs.forEach((doc) => {
            setProductions((oldArray) => [...oldArray, doc.data()]);
            setQtdTotal(
              (value) => parseInt(value, 10) + parseInt(doc.data().qtd, 10),
            );
            if (doc.data().payedQtd !== '') {
              setQtdTotalPayed(
                (value) =>
                  parseInt(value, 10) + parseInt(doc.data().payedQtd, 10),
              );
            }
          });
        });
    } catch (error) {
      toast.error(error.code);
    }
  };

  const getData = () => {
    setRefreshing(true);
    getNotesData();
    getProductionsData();
    setRefreshing(false);
    setIsPullRefreshing(false);
  };

  const handleUpdateApiary = () => {
    const dateTime = getDateTime();

    try {
      firestore()
        .collection(`users/${userUuid}/apiaries`)
        .doc(data.code)
        .update({
          mortality: 'false',
          lastModify: dateTime,
          type: 'apiary',
          mortalityId: '',
        });
      data.mortality = 'false';
      data.lastModify = dateTime;
      data.type = 'apiary';
      data.mortalityId = '';
    } catch (error) {}
  };

  const checkIFMortalityExists = () => {
    try {
      firestore()
        .collection('mortalityData')
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            if (doc.data().code === data.code) {
              setMortalityExists(true);
            }
          });
          if (!mortalityExists) {
            handleUpdateApiary();
          }
        });
    } catch (error) {}
  };

  useEffect(() => {
    const hasInternet = netInfo.isConnected;
    getData();

    if (hasInternet && data.mortality === 'true') {
      checkIFMortalityExists();
    }
  }, []);

  const disableApiary = () => {
    try {
      firestore()
        .collection(`users/${userUuid}/apiaries`)
        .doc(data.code)
        .update({ status: 'inactive' });
    } catch (error) {
      toast.error(error.code);
    }
  };

  const handlePositiveAction = async (value) => {
    setIsSubmitting(true);

    if (modalOption === 0) {
      setConfirmButton(t('translations:inactivating'));
      try {
        disableApiary();
        toast.success(t('translations:successApiaryDisabled'));
        if (data.originMap === true) {
          navigation.goBack();
        } else {
          navigation.navigate('PrivateNavigator', {
            screen: 'ApiariesHome',
            params: {
              reload: true,
            },
          });
        }
      } catch (error) {
        toast.error(error.code);
      }
    }
    if (modalOption === 1) {
      setConfirmButton(t('translations:saving'));
      const dateTime = getDateTime();
      try {
        firestore()
          .collection(`users/${userUuid}/apiaries`)
          .doc(data.code)
          .collection('notes')
          .doc(selectedNoteCode)
          .update({
            title: value.title || '',
            description: value.description,
            lastModify: dateTime,
          });
      } catch (error) {
        toast.error(error.code);
      }
    }
    if (modalOption === 2) {
      setConfirmButton(t('translations:deleting'));
      try {
        firestore()
          .collection(`users/${userUuid}/apiaries`)
          .doc(data.code)
          .collection('notes')
          .doc(selectedNoteCode)
          .delete();
      } catch (error) {
        toast.error(error.code);
      }
    }
    if (modalOption === 3) {
      setConfirmButton(t('translations:saving'));
      const dateTime = getDateTime();
      try {
        firestore()
          .collection(`users/${userUuid}/apiaries`)
          .doc(data.code)
          .collection('productions')
          .doc(selectedProductionCode)
          .update({
            name: value.name,
            payed: value.payed || t('translations:not'),
            payedQtd: value.payedQtd,
            qtd: value.qtd || '',
            date: value.date,
            lastModify: dateTime,
          });
      } catch (error) {
        toast.error(error.code);
      }
    }
    if (modalOption === 4) {
      setConfirmButton(t('translations:deleting'));
      try {
        firestore()
          .collection(`users/${userUuid}/apiaries`)
          .doc(data.code)
          .collection('productions')
          .doc(selectedProductionCode)
          .delete();
      } catch (error) {
        toast.error(error.code);
      }
    }
    if (modalOption === 5) {
      setConfirmButton(t('translations:deleting'));
      const dateTime = getDateTime();
      const createdAt = Date();
      const noteId = `${uuid.v4()}-${value.title}`;
      try {
        firestore()
          .collection(`users/${userUuid}/apiaries`)
          .doc(data.code)
          .collection('notes')
          .doc(noteId)
          .set({
            code: noteId,
            title: value.title || '',
            description: value.description,
            lastModify: dateTime,
            createdAt: createdAt.toString(),
          });
      } catch (error) {
        toast.error(error.code);
      }
    }
    if (modalOption === 6) {
      setConfirmButton(t('translations:deleting'));
      const dateTime = getDateTime();
      const createdAt = Date();
      const productionId = `${uuid.v4()}-${value.name}`;
      try {
        firestore()
          .collection(`users/${userUuid}/apiaries`)
          .doc(data.code)
          .collection('productions')
          .doc(productionId)
          .set({
            code: productionId,
            name: value.name,
            payed: value.payed || 'Não',
            payedQtd: value.payedQtd,
            qtd: value.qtd || '',
            date: value.date,
            lastModify: dateTime,
            createdAt: createdAt.toString(),
          });
      } catch (error) {
        toast.error(error.code);
      }
    }
    setIsSubmitting(false);
    setShowModal(false);
    setModalOption(null);
    setModalTitle('');
    setModalMode('question');
    setDescription('');
    setCancelButton('');
    setConfirmButton('');
    setDefaultData(null);
  };

  const dismissModal = () => {
    setShowModal(false);
    setModalOption(null);
    setModalTitle('');
    setModalMode('question');
    setDescription('');
    setCancelButton('');
    setConfirmButton('');
    setIsSubmitting(false);
    setDefaultData(null);
  };

  const handleEditApiary = () => {
    navigation.navigate('EditApiary', data);
  };

  const handleDeleteApiary = () => {
    setModalOption(0);
    setModalMode('question');
    setModalTitle(t('translations:warn'));
    setDescription(t('translations:disableApiaryDescription'));
    setCancelButton(t('translations:cancel'));
    setConfirmButton(t('translations:disable'));
    setShowModal(true);
  };

  const handleEditNote = () => {
    setModalOption(1);
    setModalMode('note');
    setModalTitle(t('translations:editNote'));
    setCancelButton(t('translations:cancel'));
    setConfirmButton(t('translations:save'));
    setDefaultData(notes[selectedNoteIndex]);
    setShowModal(true);
  };

  const handleDeleteNote = () => {
    setModalOption(2);
    setModalMode('question');
    setModalTitle(t('translations:warn'));
    setDescription(t('translations:deleteNoteQuestion'));
    setCancelButton(t('translations:cancel'));
    setConfirmButton(t('translations:delete'));
    setShowModal(true);
  };

  const handleEditProduction = () => {
    setModalOption(3);
    setModalMode('production');
    setModalTitle(t('translations:editProductionTitle'));
    setCancelButton(t('translations:cancel'));
    setConfirmButton(t('translations:save'));
    setDefaultData(productions[selectedProductionIndex]);
    setShowModal(true);
  };

  const handleDeleteProduction = () => {
    setModalOption(4);
    setModalMode('question');
    setModalTitle(t('translations:warn'));
    setDescription(t('translations:deleteProductionDescription'));
    setCancelButton(t('translations:cancel'));
    setConfirmButton(t('translations:delete'));
    setShowModal(true);
  };

  const handleAddNote = () => {
    setModalOption(5);
    setModalMode('note');
    setModalTitle(t('translations:addNotes'));
    setCancelButton(t('translations:cancel'));
    setConfirmButton(t('translations:delete'));
    setShowModal(true);
  };

  const handleAddProduction = () => {
    setModalOption(6);
    setModalMode('production');
    setModalTitle(t('translations:addProduction'));
    setCancelButton(t('translations:cancel'));
    setConfirmButton(t('translations:delete'));
    setShowModal(true);
  };

  const apiaryOptions = [
    {
      option: t('translations:editApiary'),
      delete: false,
      onClick: handleEditApiary,
    },
    {
      option: t('translations:disableApiary'),
      delete: true,
      onClick: handleDeleteApiary,
    },
  ];

  const noteOptions = [
    {
      option: t('translations:editNote'),
      delete: false,
      onClick: handleEditNote,
    },
    {
      option: t('translations:deleteNote'),
      delete: true,
      onClick: handleDeleteNote,
    },
  ];

  const productionOptions = [
    {
      option: t('translations:editProduction'),
      delete: false,
      onClick: handleEditProduction,
    },
    {
      option: t('translations:deleteProduction'),
      delete: true,
      onClick: handleDeleteProduction,
    },
  ];

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      setPermission(true);
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      setPermission(true);
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(t('translations:locationDenied'), ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(t('translations:revokedPermission'), ToastAndroid.LONG);
    }

    return false;
  };

  const getLocation = async () => {
    await hasLocationPermission();
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleHome = () => {
    if (data.originMap === true) {
      navigation.navigate('PrivateNavigator', {
        screen: 'ApiariesMapScreen',
        params: {
          reload: data.reload,
        },
      });
    } else {
      navigation.navigate('PrivateNavigator', {
        screen: 'ApiariesHome',
        params: {
          reload: data.reload,
        },
      });
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleHome);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleHome);
  });

  return (
    <>
      <Header title={t('translations:apiaries')} onGoBack={handleHome} />
      <Modal
        title={modalTitle}
        mode={modalMode}
        cancelFunction={() => dismissModal()}
        positiveAction={(value) => handlePositiveAction(value)}
        description={description}
        showModal={showModal}
        isSubmitting={isSubmitting}
        cancelText={cancelButton}
        positiveText={confirmButton}
        defaultData={defaultData}
      />

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
        <View style={styles.infoContainer}>
          <ExpensiveNote
            data={data}
            modalOptions={apiaryOptions}
            mode="apiaryDescription"
          />
        </View>
        {refreshing ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <>
            <View style={styles.add}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleAddNote()}
              >
                <Add size={40} color={colors.secondary} />
              </TouchableOpacity>
              <Title1 centered color={colors.primary}>
                {t('translations:addNotes')}
              </Title1>
            </View>
            <View
              style={notes.length > 0 ? styles.listContainer : styles.noData}
            >
              {notes.length > 0 ? (
                notes.map((note, index) => {
                  return (
                    <ExpensiveNote
                      key={note.code}
                      data={note}
                      hasData
                      modalOptions={noteOptions}
                      mode="noteList"
                      selectedCode={note.code}
                      setSelectedCode={() => {
                        setSelectedNoteCode(note.code);
                        setSelectedNoteIndex(index);
                      }}
                    />
                  );
                })
              ) : (
                <ExpensiveNote hasData={false} mode="noteList" />
              )}
            </View>
            <View style={styles.add}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleAddProduction()}
              >
                <Add size={40} color={colors.secondary} />
              </TouchableOpacity>
              <Title1 centered color={colors.primary}>
                {t('translations:addProduction')}
              </Title1>
            </View>
            <View
              style={
                productions.length > 0
                  ? styles.listProductionContainer
                  : styles.noData
              }
            >
              {productions.length > 0 ? (
                <>
                  <View style={styles.quantity}>
                    <Title2 color={colors.primary} family="medium">
                      {`${t('translations:productionTotal')} ${qtdTotal} ${t(
                        'translations:textKg',
                      )}`}
                    </Title2>
                    <Title2 color={colors.primary} family="medium">
                      {`${t('translations:totalPayed')} ${qtdTotalPayed} ${t(
                        'translations:textKg',
                      )}`}
                    </Title2>
                  </View>
                  {productions.map((production, index) => {
                    return (
                      <ExpensiveNote
                        key={production.code}
                        hasData
                        modalOptions={productionOptions}
                        mode="production"
                        selectedCode={production.code}
                        setSelectedCode={() => {
                          setSelectedProductionCode(production.code);
                          setSelectedProductionIndex(index);
                        }}
                        data={production}
                      />
                    );
                  })}
                </>
              ) : (
                <ExpensiveNote hasData={false} mode="production" />
              )}
            </View>

            {data.latitude !== '' && (
              <View>
                {permission ? (
                  <View style={styles.containerMap}>
                    <MapView
                      style={styles.map}
                      showsUserLocation
                      initialRegion={{
                        latitude: parseFloat(data.latitude),
                        longitude: parseFloat(data.longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                    >
                      <View>
                        <Marker
                          coordinate={{
                            latitude: parseFloat(data.latitude),
                            longitude: parseFloat(data.longitude),
                          }}
                          pinColor={
                            data.type === 'apiary'
                              ? colors.primary
                              : data.type === 'home'
                              ? colors.success
                              : colors.error
                          }
                        />
                        <Circle
                          center={{
                            latitude: parseFloat(data.latitude),
                            longitude: parseFloat(data.longitude),
                          }}
                          radius={1500}
                          fillColor={
                            data.type === 'apiary'
                              ? colors.primaryLight
                              : colors.errorLight
                          }
                          strokeColor={
                            data.type === 'apiary'
                              ? colors.primary
                              : colors.error
                          }
                        />
                      </View>
                    </MapView>
                  </View>
                ) : (
                  <View style={styles.view}>
                    <Title1 centered color={colors.error} family="medium">
                      {t('translations:noPermission')}
                    </Title1>
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </>
  );
}
export default ApiaryHome;
