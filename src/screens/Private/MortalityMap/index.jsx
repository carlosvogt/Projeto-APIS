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
} from 'react-native';
import { useTheme } from '@theme';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { Header } from '@components/layout';
import { useTranslation } from 'react-i18next';
import Geolocation from 'react-native-geolocation-service';
import { Title1 } from '@components/typography';
import { Modal, useToast } from '@components';
import { useNetInfo } from '@react-native-community/netinfo';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '@services/firebase';

function MortalityMap() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [permission, setPermission] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const netInfo = useNetInfo();
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
  });

  const getData = async () => {
    setRefreshing(true);
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      try {
        const querySnapshot = query(collection(db, 'mortalityData'));
        const docsSnap = await getDocs(querySnapshot);
        setApiaries([]);
        docsSnap.forEach((item) => {
          setApiaries((oldArray) => [...oldArray, item.data()]);
        });
      } catch (error) {
        toast.error(error.code);
      }
    } else {
      toast.error(t('mortalityMap:noInternet'));
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

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(t('mortalityMap:locationDenied'), ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(t('mortalityMap:revokedPermission'), ToastAndroid.LONG);
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      setDescription(t('mortalityMap:gpsPermission'));
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
        setDescription(
          `${t('mortalityMap:code')} ${error.code} - ${error.message}`,
        );
        setShowModal(true);
        setUserLocalization({});
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
    const hasInternet = netInfo.isConnected;
    if (hasInternet !== null) {
      getData();
    }
    getLocation();
  }, [netInfo]);

  function onRegionChange(region) {
    setUserLocalization(region);
  }

  return (
    <>
      <Modal
        title={t('apiariesMap:attention')}
        cancelFunction={() => setShowModal(false)}
        cancelText={t('apiariesMap:ok')}
        description={description}
        mode="alert"
        showModal={showModal}
      />
      <Header
        title={t('mortalityMap:name')}
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
              {apiaries.map((item) => {
                return (
                  item.latitude !== '' &&
                  item.longitude !== '' && (
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
                            {`${t('mortalityMap:addDate')}${item.createdAt}`}
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
                  )
                );
              })}
            </MapView>
          )}
        </View>
      ) : (
        <View style={styles.view}>
          <Title1 centered color={colors.error} family="medium">
            {t('mortalityMap:noPermission')}
          </Title1>
        </View>
      )}
    </>
  );
}
export default MortalityMap;
