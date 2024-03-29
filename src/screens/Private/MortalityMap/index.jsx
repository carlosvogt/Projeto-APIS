/* eslint-disable no-empty */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Text,
  Linking,
} from 'react-native';
import { useTheme } from '@theme';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { Header } from '@components/layout';
import { useTranslation } from 'react-i18next';
import Geolocation from 'react-native-geolocation-service';
import { Title1, Title2 } from '@components/typography';
import { Modal, useToast, Button } from '@components';
import firestore from '@react-native-firebase/firestore';

function MortalityMap() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [permission, setPermission] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [apiaries, setApiaries] = useState([]);
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [userLocalization, setUserLocalization] = useState({});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    view: {
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    marginVertical: { marginVertical: 16 },
  });

  const deleteMortality = (item) => {
    try {
      firestore().collection(`mortalityData`).doc(item.code).delete();
    } catch (error) {}
  };

  const getData = () => {
    setRefreshing(true);
    const actualDate = new Date();
    try {
      firestore()
        .collection('mortalityData')
        .onSnapshot({ includeMetadataChanges: true }, (docs) => {
          setApiaries([]);
          docs.forEach((doc) => {
            const inicialDate = new Date(doc.data().createdAt);
            const diffDays = parseInt(
              (actualDate.getTime() - inicialDate.getTime()) /
                (1000 * 60 * 60 * 24),
              10,
            );
            if (diffDays >= 365) {
              deleteMortality(doc.data());
            } else {
              setApiaries((oldArray) => [...oldArray, doc.data()]);
            }
          });
        });
    } catch (error) {
      toast.error(error.code);
    }
    setRefreshing(false);
  };

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

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      setDescription(t('translations:gpsPermission'));
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocalization({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => {
        if (error.code !== 3) {
          setDescription(
            `${t('translations:code')} ${error.code} - ${error.message}`,
          );
          setShowModal(true);
          setUserLocalization({});
        }
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  };

  useEffect(() => {
    getData();
    getLocation();
  }, []);

  function onRegionChange(region) {
    setUserLocalization(region);
  }

  return (
    <>
      <Modal
        title={t('translations:attention')}
        cancelFunction={() => setShowModal(false)}
        cancelText={t('translations:ok')}
        description={description}
        mode="alert"
        showModal={showModal}
      />
      <Header
        title={t('translations:mortalityMap')}
        showRefreshButton
        handleRefresh={() => getData()}
        isRefreshing={refreshing}
      />
      {permission ? (
        <View style={styles.container}>
          {userLocalization.latitude && (
            <MapView
              style={{ flex: 1 }}
              showsUserLocation
              initialRegion={userLocalization}
              onRegionChange={onRegionChange}
              moveOnMarkerPress={false}
            >
              {apiaries.map((item, index) => {
                return (
                  <View key={index}>
                    {item.latitude !== '' && item.longitude !== '' && (
                      <View key={item.code}>
                        <Marker
                          coordinate={{
                            latitude: parseFloat(item.latitude),
                            longitude: parseFloat(item.longitude),
                          }}
                          pinColor={colors.error}
                        >
                          <Callout>
                            <Text style={{ color: colors.primary }}>
                              {`${t('translations:addDate')}${item.lastModify}`}
                            </Text>
                          </Callout>
                        </Marker>
                        <Circle
                          center={{
                            latitude: parseFloat(item.latitude),
                            longitude: parseFloat(item.longitude),
                          }}
                          radius={1500}
                          fillColor={colors.errorLight}
                          strokeColor={colors.error}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </MapView>
          )}
          <Text
            style={{
              color: colors.primary,
              textAlign: 'center',
              marginBottom: 5,
            }}
          >
            {t('translations:diameter')}
          </Text>
        </View>
      ) : (
        <View style={styles.view}>
          <Title1 centered color={colors.error} family="medium">
            {t('translations:noPermission')}
          </Title1>
          <View style={styles.marginVertical}>
            <Title2 centered color={colors.error} family="medium">
              {t('translations:permissionInfo')}
            </Title2>
          </View>
          <Button
            title={t('translations:configurationsHeader')}
            onPress={() => Linking.openSettings()}
          />
        </View>
      )}
    </>
  );
}
export default MortalityMap;
