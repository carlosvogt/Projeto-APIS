/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { Modal, ExpensiveNote } from '@components';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from 'react-native';
import { Header } from '@components/layout';
import { Add } from '@assets';
import { useTheme } from '@theme';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MapView, { Circle, Marker } from 'react-native-maps';

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

  const [permission, setPermission] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    scrollView: {
      marginHorizontal: 16,
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
    listContainer: {
      borderRadius: 25,
      borderWidth: darkMode ? 0 : 1,
      paddingVertical: 16,
      borderColor: colors.primary,
      marginBottom: 16,
      backgroundColor: colors.secondary,
    },
    infoContainer: {
      borderRadius: 25,
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

  // Dado mocado
  const handlePositiveAction = (value) => {
    setIsSubmitting(true);
    if (modalOption === 0) {
      setConfirmButton(t('apiaries:home.deleting'));
      console.log('Apiário apagado');
      navigation.navigate('ApiariesHome');
    }
    if (modalOption === 1) {
      setConfirmButton(t('apiaries:home.saving'));
      console.log('Editar nota', value, selectedNoteCode);
    }
    if (modalOption === 2) {
      setConfirmButton(t('apiaries:home.deleting'));
      console.log('Apagar nota', selectedNoteCode);
    }
    if (modalOption === 3) {
      setConfirmButton(t('apiaries:home.saving'));
      console.log('Editar produção', value, selectedProductionCode);
    }
    if (modalOption === 4) {
      setConfirmButton(t('apiaries:home.deleting'));
      console.log('Apagar produção', selectedProductionCode);
    }
    if (modalOption === 5) {
      setConfirmButton(t('apiaries:home.deleting'));
      console.log('Adicionar nota', value);
    }
    if (modalOption === 6) {
      setConfirmButton(t('apiaries:home.deleting'));
      console.log('Adicionar produção', value);
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
    setModalTitle(t('apiaries:home.deleteApiaryTitle'));
    setDescription(t('apiaries:home.deleteApiaryDescription'));
    setCancelButton(t('apiaries:home.cancel'));
    setConfirmButton(t('apiaries:home.delete'));
    setShowModal(true);
  };

  const handleEditNote = () => {
    setModalOption(1);
    setModalMode('note');
    setModalTitle(t('apiaries:home.editNoteTitle'));
    setCancelButton(t('apiaries:home.cancel'));
    setConfirmButton(t('apiaries:home.save'));
    setDefaultData(data.notes[selectedNoteIndex]);
    setShowModal(true);
  };

  const handleDeleteNote = () => {
    setModalOption(2);
    setModalMode('question');
    setModalTitle(t('apiaries:home.deleteNoteTitle'));
    setDescription(t('apiaries:home.deleteNoteDescription'));
    setCancelButton(t('apiaries:home.cancel'));
    setConfirmButton(t('apiaries:home.delete'));
    setShowModal(true);
  };

  const handleEditProduction = () => {
    setModalOption(3);
    setModalMode('production');
    setModalTitle(t('apiaries:home.editProductionTitle'));
    setCancelButton(t('apiaries:home.cancel'));
    setConfirmButton(t('apiaries:home.save'));
    setDefaultData(data.production[selectedProductionIndex]);
    setShowModal(true);
  };

  const handleDeleteProduction = () => {
    setModalOption(4);
    setModalMode('question');
    setModalTitle(t('apiaries:home.deleteProductionTitle'));
    setDescription(t('apiaries:home.deleteProductionDescription'));
    setCancelButton(t('apiaries:home.cancel'));
    setConfirmButton(t('apiaries:home.delete'));
    setShowModal(true);
  };

  const handleAddNote = () => {
    setModalOption(5);
    setModalMode('note');
    setModalTitle(t('apiaries:addNote'));
    setCancelButton(t('apiaries:home.cancel'));
    setConfirmButton(t('apiaries:home.delete'));
    setShowModal(true);
  };

  const handleAddProduction = () => {
    setModalOption(6);
    setModalMode('production');
    setModalTitle(t('apiaries:home.production'));
    setCancelButton(t('apiaries:home.cancel'));
    setConfirmButton(t('apiaries:home.delete'));
    setShowModal(true);
  };

  const apiaryOptions = [
    {
      option: t('apiaries:home.editApiary'),
      delete: false,
      onClick: handleEditApiary,
    },
    {
      option: t('apiaries:home.deleteApiary'),
      delete: true,
      onClick: handleDeleteApiary,
    },
  ];

  const noteOptions = [
    {
      option: t('apiaries:home.editNote'),
      delete: false,
      onClick: handleEditNote,
    },
    {
      option: t('apiaries:home.deleteNote'),
      delete: true,
      onClick: handleDeleteNote,
    },
  ];

  const productionOptions = [
    {
      option: t('apiaries:home.editProduction'),
      delete: false,
      onClick: handleEditProduction,
    },
    {
      option: t('apiaries:home.deleteProduction'),
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
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(t('apiariesMap:locationDenied'), ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(t('apiariesMap:revokedPermission'), ToastAndroid.LONG);
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
      <Header title={t('apiaries:home:header')} />
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
      >
        <View style={styles.infoContainer}>
          <ExpensiveNote
            data={data}
            modalOptions={apiaryOptions}
            mode="apiaryDescription"
          />
        </View>
        <View style={styles.add}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddNote()}
          >
            <Add size={40} color={colors.secondary} />
          </TouchableOpacity>
          <Title1 centered color={colors.primary}>
            {t('apiaries:home.notes')}
          </Title1>
        </View>
        <View style={styles.listContainer}>
          {data.notes.length > 0 ? (
            data.notes.map((note, index) => {
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
            {t('apiaries:home.production')}
          </Title1>
        </View>
        <View style={styles.listContainer}>
          {data.production.length > 0 ? (
            <>
              <View style={styles.quantity}>
                <Title2 color={colors.primary} family="medium">
                  {`${t('apiaries:home.productionTotal')} ${data.total} ${t(
                    'apiaries:home.kg',
                  )}`}
                </Title2>
                <Title2 color={colors.primary} family="medium">
                  {`${t('apiaries:home.totalPayed')} ${data.totalPayed} ${t(
                    'apiaries:home.kg',
                  )}`}
                </Title2>
              </View>
              {data.production.map((production, index) => {
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
        <View>
          {permission && data.latitude ? (
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
                      data.type === 'apiary' ? colors.primary : colors.error
                    }
                  />
                </View>
              </MapView>
            </View>
          ) : (
            <View style={styles.view}>
              <Title1 centered color={colors.error} family="medium">
                {t('apiaries:home.noPermission')}
              </Title1>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
export default ApiaryHome;
