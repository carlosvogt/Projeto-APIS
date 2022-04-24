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
} from 'react-native';
import { Header } from '@components/layout';
import { Add } from '@assets';
import { useTheme } from '@theme';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MapView, { Circle, Marker } from 'react-native-maps';
import {
  doc,
  collection,
  setDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { userUid } from '@store/auth';
import { db } from '@services/firebase';
import { useNetInfo } from '@react-native-community/netinfo';
import uuid from 'react-native-uuid';

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
  const netInfo = useNetInfo();
  const toast = useToast();
  const apiaryRef = doc(db, `users/${userUuid}/apiaries`, data.code);
  const [refreshing, setRefreshing] = useState(false);
  const [isPullRefreshing, setIsPullRefreshing] = useState(false);
  const [qtdTotalPayed, setQtdTotalPayed] = useState(0);
  const [qtdTotal, setQtdTotal] = useState(0);

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

  const getNotesData = async () => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      try {
        const queryNotesSnapshot = query(
          collection(apiaryRef, 'notes'),
          orderBy('lastModify', 'desc'),
        );
        const docsNotesSnap = await getDocs(queryNotesSnapshot);
        setNotes([]);
        docsNotesSnap.forEach((item) => {
          setNotes((oldArray) => [...oldArray, item.data()]);
        });
      } catch (error) {
        toast.error(error.code);
      }
    } else {
      toast.error(t('translations:noInternet'));
    }
  };

  const getProductionsData = async () => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      try {
        const queryProductionsSnapshot = query(
          collection(apiaryRef, 'productions'),
          orderBy('lastModify', 'desc'),
        );
        const docsProductionsSnap = await getDocs(queryProductionsSnapshot);
        setQtdTotal(0);
        setQtdTotalPayed(0);
        setProductions([]);
        docsProductionsSnap.forEach((item) => {
          setProductions((oldArray) => [...oldArray, item.data()]);
          setQtdTotal(
            (value) => parseInt(value, 10) + parseInt(item.data().qtd, 10),
          );
          if (item.data().payedQtd !== '') {
            setQtdTotalPayed(
              (value) =>
                parseInt(value, 10) + parseInt(item.data().payedQtd, 10),
            );
          }
        });
      } catch (error) {
        toast.error(error.code);
      }
    } else {
      toast.error(t('translations:noInternet'));
    }
  };

  const getData = async () => {
    setRefreshing(true);
    await getNotesData();
    await getProductionsData();
    setRefreshing(false);
    setIsPullRefreshing(false);
  };

  useEffect(() => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet !== null) {
      getData();
    }
  }, [netInfo]);

  const deleteNotes = async () => {
    try {
      const queryNotesSnapshot = query(collection(apiaryRef, 'notes'));
      const docsNotesSnap = await getDocs(queryNotesSnapshot);
      docsNotesSnap.forEach((item) => {
        deleteDoc(doc(apiaryRef, 'notes', item.data().code));
      });
    } catch (error) {
      toast.error(error.code);
    }
  };

  const deleteProductions = async () => {
    try {
      const queryNotesSnapshot = query(collection(apiaryRef, 'productions'));
      const docsNotesSnap = await getDocs(queryNotesSnapshot);
      docsNotesSnap.forEach((item) => {
        deleteDoc(doc(apiaryRef, 'productions', item.data().code));
      });
    } catch (error) {
      toast.error(error.code);
    }
  };

  const deleteApiary = async () => {
    try {
      await deleteDoc(doc(db, `users/${userUuid}/apiaries`, data.code));
    } catch (error) {
      toast.error(error.code);
    }
  };

  const handlePositiveAction = async (value) => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      setIsSubmitting(true);
      if (modalOption === 0) {
        setConfirmButton(t('translations:deleting'));
        try {
          await deleteNotes();
          await deleteProductions();
          await deleteApiary();
          toast.success(t('translations:successApiaryDeleted'));
          navigation.navigate('PrivateNavigator', {
            screen: 'ApiariesHome',
          });
        } catch (error) {
          toast.error(error.code);
        }
      }
      if (modalOption === 1) {
        setConfirmButton(t('translations:saving'));
        const dateTime = getDateTime();
        try {
          await updateDoc(doc(apiaryRef, 'notes', selectedNoteCode), {
            title: value.title || '',
            description: value.description,
            lastModify: dateTime,
          });
          await getNotesData();
          toast.success(t('translations:noteUpdated'));
        } catch (error) {
          toast.error(error.code);
        }
      }
      if (modalOption === 2) {
        setConfirmButton(t('translations:deleting'));
        try {
          await deleteDoc(doc(apiaryRef, 'notes', selectedNoteCode));
          await getNotesData();
          toast.success(t('translations:noteDeleted'));
        } catch (error) {
          toast.error(error.code);
        }
      }
      if (modalOption === 3) {
        setConfirmButton(t('translations:saving'));
        const dateTime = getDateTime();
        try {
          await updateDoc(
            doc(apiaryRef, 'productions', selectedProductionCode),
            {
              name: value.name,
              payed: value.payed || t('translations:not'),
              payedQtd: value.payedQtd,
              qtd: value.qtd || '',
              date: value.date,
              lastModify: dateTime,
            },
          );
          await getProductionsData();
          toast.success(t('translations:productionUpdated'));
        } catch (error) {
          toast.error(error.code);
        }
      }
      if (modalOption === 4) {
        setConfirmButton(t('translations:deleting'));
        try {
          await deleteDoc(
            doc(apiaryRef, 'productions', selectedProductionCode),
          );
          await getProductionsData();
          toast.success(t('translations:productionDeleted'));
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
          await setDoc(doc(apiaryRef, 'notes', noteId), {
            code: noteId,
            title: value.title || '',
            description: value.description,
            lastModify: dateTime,
            createdAt: createdAt.toString(),
          });
          await getNotesData();
          toast.success(t('translations:noteSuccessCreated'));
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
          await setDoc(doc(apiaryRef, 'productions', productionId), {
            code: productionId,
            name: value.name,
            payed: value.payed || 'Não',
            payedQtd: value.payedQtd,
            qtd: value.qtd || '',
            date: value.date,
            lastModify: dateTime,
            createdAt: createdAt.toString(),
          });
          await getProductionsData();
          toast.success(t('translations:productionSuccessCreated'));
        } catch (error) {
          toast.error(error.code);
        }
      }
    } else {
      toast.error(t('translations:noInternet'));
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
    setModalTitle(t('translations:deleteApiaryTitle'));
    setDescription(t('translations:deleteApiaryDescription'));
    setCancelButton(t('translations:cancel'));
    setConfirmButton(t('translations:delete'));
    setShowModal(true);
  };

  const handleEditNote = () => {
    setModalOption(1);
    setModalMode('note');
    setModalTitle(t('translations:editNoteTitle'));
    setCancelButton(t('translations:cancel'));
    setConfirmButton(t('translations:save'));
    setDefaultData(notes[selectedNoteIndex]);
    setShowModal(true);
  };

  const handleDeleteNote = () => {
    setModalOption(2);
    setModalMode('question');
    setModalTitle(t('translations:deleteNoteTitle'));
    setDescription(t('translations:deleteNoteDescription'));
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
    setModalTitle(t('translations:deleteProductionTitle'));
    setDescription(t('translations:deleteProductionDescription'));
    setCancelButton(t('translations:cancel'));
    setConfirmButton(t('translations:delete'));
    setShowModal(true);
  };

  const handleAddNote = () => {
    setModalOption(5);
    setModalMode('note');
    setModalTitle(t('translations:addNote'));
    setCancelButton(t('translations:cancel'));
    setConfirmButton(t('translations:delete'));
    setShowModal(true);
  };

  const handleAddProduction = () => {
    setModalOption(6);
    setModalMode('production');
    setModalTitle(t('translations:production'));
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
      option: t('translations:deleteApiary'),
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

  return (
    <>
      <Header title={t('translations:apiaries')} />
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
                {t('translations:notes')}
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
                {t('translations:production')}
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
